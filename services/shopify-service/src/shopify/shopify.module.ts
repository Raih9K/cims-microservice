import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';
import { ShopifyController } from './shopify.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ShopifyController],
  providers: [ShopifyService],
})
export class ShopifyModule {}
