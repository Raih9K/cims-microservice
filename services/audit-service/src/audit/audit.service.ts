import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAuditLogDto) {
    return this.prisma.auditLog.create({
      data: dto,
    });
  }

  async findAll(companyId: number, entityType?: string, entityId?: string) {
    return this.prisma.auditLog.findMany({
      where: {
        companyId,
        entityType,
        entityId,
      },
      orderBy: { createdAt: 'desc' },
      take: 100, // Basic pagination limit
    });
  }
}
