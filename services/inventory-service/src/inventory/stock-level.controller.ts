import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('stock-levels')
export class StockLevelController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('productId') productId?: string,
  ) {
    const parsedProductId = productId ? parseInt(productId, 10) : undefined;
    return this.inventoryService.getStock(parsedProductId, companyId);
  }
}
