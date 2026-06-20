import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: any,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Put(':productId/variants/:variantId')
  async updateVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() data: any,
  ) {
    return this.productService.updateVariant(productId, variantId, data);
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
