import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return await this.prisma.warehouse.create({
      data: {
        name: data.name,
        companyId: data.companyId,
        address: data.address,
        city: data.city,
        status: data.status || 'active',
      },
    });
  }

  async findAll(companyId: number) {
    return await this.prisma.warehouse.findMany({
      where: { companyId },
    });
  }

  async findOne(id: number) {
    return await this.prisma.warehouse.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    return await this.prisma.warehouse.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.warehouse.delete({
      where: { id },
    });
  }
}
