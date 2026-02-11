import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service'; // I'll assume ProductService handles these or I'll create new ones

@Controller('categories')
export class CategoryController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: any) {
    return this.productService.createCategory(data);
  }

  @Get()
  findAll(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.productService.findAllCategories(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneCategory(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productService.updateCategory(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteCategory(id);
  }
}

@Controller('brands')
export class BrandController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: any) {
    return this.productService.createBrand(data);
  }

  @Get()
  findAll(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.productService.findAllBrands(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneBrand(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productService.updateBrand(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteBrand(id);
  }
}
