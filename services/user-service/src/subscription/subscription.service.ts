import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  // Mock coupon codes lookup
  private mockCoupons: Record<string, number> = {
    SAVE20: 20,
    SAVE50: 50,
  };

  async getPackages() {
    return this.prisma.package.findMany({
      orderBy: { price: 'asc' },
    });
  }

  async applyCoupon(code: string) {
    const uppercaseCode = code.toUpperCase();
    const discount = this.mockCoupons[uppercaseCode];
    if (discount === undefined) {
      throw new BadRequestException('Invalid or expired coupon code');
    }
    return {
      coupon: uppercaseCode,
      discount_percent: discount,
    };
  }

  async subscribe(userId: number, dto: SubscribeDto) {
    const { packageId, couponCode } = dto;

    // 1. Resolve company membership
    const membership = await this.prisma.membership.findFirst({
      where: { userId },
      include: { company: true },
    });

    if (!membership) {
      throw new BadRequestException('User is not associated with a company');
    }

    const companyId = membership.companyId;

    // 2. Resolve package details
    const pkg = await this.prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) {
      throw new NotFoundException('Selected subscription plan not found');
    }

    // 3. Compute price with coupon
    let finalPrice = Number(pkg.price);
    if (couponCode) {
      const discountPercent = this.mockCoupons[couponCode.toUpperCase()];
      if (discountPercent !== undefined) {
        finalPrice = finalPrice * (1 - discountPercent / 100);
      }
    }

    // 4. Record payment & active subscription via transaction
    return this.prisma.$transaction(async (tx) => {
      // Create payment transaction log
      const payment = await tx.payment.create({
        data: {
          companyId,
          amount: finalPrice,
          status: 'succeeded',
          transactionId: 'txn_' + Math.random().toString(36).substring(2, 15),
        },
      });

      const startsAt = new Date();
      const endsAt = new Date();
      endsAt.setDate(startsAt.getDate() + 30); // 30-day active billing cycle

      // Upsert subscription
      const subscription = await tx.subscription.upsert({
        where: { companyId },
        update: {
          packageId,
          status: 'active',
          startsAt,
          endsAt,
          couponCode: couponCode ? couponCode.toUpperCase() : null,
        },
        create: {
          companyId,
          packageId,
          status: 'active',
          startsAt,
          endsAt,
          couponCode: couponCode ? couponCode.toUpperCase() : null,
        },
      });

      return {
        success: true,
        message: `Subscription to plan ${pkg.name} activated successfully`,
        data: {
          subscriptionId: subscription.id,
          packageName: pkg.name,
          startsAt: subscription.startsAt,
          endsAt: subscription.endsAt,
          paymentAmount: payment.amount,
          transactionId: payment.transactionId,
        },
      };
    });
  }
}
