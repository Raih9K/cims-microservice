import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationController } from './notification.controller';
import { NotificationProcessor } from './notification.processor';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationProcessor],
})
export class NotificationModule {}
