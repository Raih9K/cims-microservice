import {
 
 
 
 
 
 
 
 ,

  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
,
  @Get()
  findAll(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.productService.findAll(companyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,,
    @Query('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.productService.findOne(id, companyId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.productService.delete(id, companyId);
  }
}
