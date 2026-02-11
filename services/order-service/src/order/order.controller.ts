import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.orderService.findAll(companyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.orderService.findOne(id, companyId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', ParseIntPipe) companyId: number,
    @Body('status') status: string,
  ) {
    return this.orderService.updateStatus(id, companyId, status);
  }
}
