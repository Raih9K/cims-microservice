import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [InventoryModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
