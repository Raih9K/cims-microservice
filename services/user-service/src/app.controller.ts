import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const userId = req.user.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
            company: {
              include: {
                subscription: {
                  include: {
                    package: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const firstMembership = user.memberships[0];
    const company = firstMembership?.company;
    const subscription = company?.subscription;
    const pkg = subscription?.package;

    const roles = user.memberships.map((m) => m.role.name);
    const permissions = user.memberships.flatMap((m) =>
      m.role.permissions.map((p) => p.permission.name),
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      company_id: company?.id || null,
      status: user.status,
      roles,
      permissions,
      company: company
        ? {
            id: company.id,
            name: company.name,
            business_type: company.businessType,
            management_type: company.managementType.toLowerCase(),
            subscription_status: subscription?.status || 'trial',
            package_id: subscription?.packageId || null,
            package: pkg
              ? {
                  id: pkg.id,
                  name: pkg.name,
                  price: pkg.price.toString(),
                }
              : null,
            max_seats: pkg?.maxSeats || 2,
          }
        : null,
    };
  }
}
