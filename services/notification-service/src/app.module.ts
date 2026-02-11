import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    NotificationModule,
  ],
})
export class AppModule {}
