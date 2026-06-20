import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Headers,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(
    @Body() data: any,
    @Headers('x-company-id') companyIdHeader?: string,
  ) {
    const companyId = companyIdHeader ? parseInt(companyIdHeader, 10) : 1;
    return this.warehouseService.create({ ...data, companyId });
  }

  @Get()
  findAll(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.warehouseService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.warehouseService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.remove(id);
  }
}
