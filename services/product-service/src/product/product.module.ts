import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import {
    BrandController,
    CategoryController,
} from './category-brand.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController, BrandController, CategoryController],
  providers: [ProductService],
})
export class ProductModule {}
