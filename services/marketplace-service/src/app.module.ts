import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MarketplaceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
