import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, email: true, name: true },
        },
      },
    });
    if (!company) throw new NotFoundException(`Company #${id} not found`);
    return company;
  }

  async findUserCompany(userId: number) {
    const membership = await this.prisma.membership.findFirst({
      where: { userId },
      select: { companyId: true }
    });
    if (!membership) throw new NotFoundException(`No company found for user #${userId}`);
    return this.findOne(membership.companyId);
  }

  async update(id: number, ownerId: number, dto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (company.ownerId !== ownerId) {
      throw new Error('Only company owner can update company settings');
    }

    return this.prisma.company.update({
      where: { id },
      data: dto,
    });
  }

  async updateUserCompany(userId: number, dto: UpdateCompanyDto) {
    const membership = await this.prisma.membership.findFirst({
      where: { userId },
      select: { companyId: true }
    });
    if (!membership) throw new NotFoundException(`No company found for user #${userId}`);
    return this.update(membership.companyId, userId, dto);
  }
}
