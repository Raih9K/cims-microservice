import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import {
  AttributeController,
  BrandController,
  CategoryController,
  SupplierController,
} from './category-brand.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    ProductController,
    BrandController,
    CategoryController,
    SupplierController,
    AttributeController,
  ],
  providers: [ProductService],
})
export class ProductModule {}
