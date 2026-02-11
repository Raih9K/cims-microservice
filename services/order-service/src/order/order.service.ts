import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return this.prisma.order.create({
      data: {
        ...orderData,
        totalAmount,
        items: {
          create: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll(companyId: number) {
    return this.prisma.order.findMany({
      where: { companyId },
      include: { items: true },
    });
  }

  async findOne(id: number, companyId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id, companyId },
      include: { items: true },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async updateStatus(id: number, companyId: number, status: string) {
    const order = await this.findOne(id, companyId);
    return this.prisma.order.update({
      where: { id: order.id },
      data: { status },
    });
  }
}
