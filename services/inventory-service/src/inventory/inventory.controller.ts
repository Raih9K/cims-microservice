import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('update')
  updateStock(@Body() updateStockDto: UpdateStockDto) {
    return this.inventoryService.updateStock(updateStockDto);
  }

  @Get('stock')
  getStock(
    @Query('variantId', ParseIntPipe) variantId: number,
    @Query('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.inventoryService.getStock(variantId, companyId);
  }
}
