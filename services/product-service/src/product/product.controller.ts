import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.findOne(id, companyId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.delete(id, companyId);
  }
}
