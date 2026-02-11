import {
    BadRequestException,
    ConflictException,
    Injectable
} from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async updateStock(dto: UpdateStockDto) {
    const { variantId, companyId, warehouseId, type, quantity, reason } = dto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Get current stock or create if not exists
      let stock = await tx.stockLevel.findFirst({
        where: { variantId, companyId, warehouseId },
      });

      if (!stock) {
        if (type === TransactionType.OUT || type === TransactionType.RESERVE) {
          throw new BadRequestException(
            'Cannot remove stock from empty inventory',
          );
        }
        stock = await tx.stockLevel.create({
          data: {
            variantId,
            companyId,
            warehouseId,
            quantity: 0,
            reserved: 0,
          },
        });
      }

      // 2. Calculate new totals
      let newQuantity = stock.quantity;
      let newReserved = stock.reserved;

      switch (type) {
        case TransactionType.IN:
          newQuantity += quantity;
          break;
        case TransactionType.OUT:
          if (stock.quantity < quantity)
            throw new ConflictException('Insufficient stock');
          newQuantity -= quantity;
          break;
        case TransactionType.RESERVE:
          if (stock.quantity < quantity)
            throw new ConflictException('Insufficient stock to reserve');
          newQuantity -= quantity;
          newReserved += quantity;
          break;
        case TransactionType.RELEASE:
          if (stock.reserved < quantity)
            throw new ConflictException(
              'Insufficient reserved stock to release',
            );
          newReserved -= quantity;
          newQuantity += quantity;
          break;
        case TransactionType.ADJUSTMENT:
          newQuantity = quantity; // Absolute adjustment
          break;
      }

      // 3. Update stock level
      const updatedStock = await tx.stockLevel.update({
        where: { id: stock.id },
        data: {
          quantity: newQuantity,
          reserved: newReserved,
        },
      });

      // 4. Record transaction
      await tx.stockTransaction.create({
        data: {
          stockLevelId: stock.id,
          type,
          quantity,
          reason,
        },
      });

      return updatedStock;
    });
  }

  async getStock(variantId: number, companyId: number) {
    return this.prisma.stockLevel.findMany({
      where: { variantId, companyId },
      include: {
        warehouse: true,
      },
    });
  }
}
