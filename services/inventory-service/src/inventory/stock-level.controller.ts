import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('stock-levels')
export class StockLevelController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('productId', ParseIntPipe) productId?: number,
  ) {
    return this.inventoryService.getStock(productId || 0, companyId); // Update service if needed
  }
}
