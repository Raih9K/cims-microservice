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
import { ProductService } from './product.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: any) {
    return this.productService.createCategory(data);
  }

  @Get()
  async findAll(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.findAllCategories(companyId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneCategory(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productService.updateCategory(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteCategory(id);
  }
}

@Controller('brands')
export class BrandController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: any) {
    return this.productService.createBrand(data);
  }

  @Get()
  async findAll(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.findAllBrands(companyId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneBrand(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productService.updateBrand(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteBrand(id);
  }
}

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: any) {
    return this.productService.createSupplier(data);
  }

  @Get()
  async findAll(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.findAllSuppliers(companyId);
  }
}

@Controller('attributes')
export class AttributeController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: any) {
    return this.productService.createAttribute(data);
  }

  @Get()
  async findAll(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe)
    companyId: number,
  ) {
    return this.productService.findAllAttributes(companyId);
  }
}
