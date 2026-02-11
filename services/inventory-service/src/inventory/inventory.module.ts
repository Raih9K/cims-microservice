import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { StockLevelController } from './stock-level.controller';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController, StockLevelController],
  providers: [InventoryService],
})
export class InventoryModule {}
