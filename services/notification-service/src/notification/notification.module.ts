import { BullModule, getQueueToken } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationController } from './notification.controller';
import { NotificationProcessor } from './notification.processor';
import { NotificationService } from './notification.service';

const imports: any[] = [PrismaModule];
const providers: any[] = [NotificationService];

if (process.env.REDIS_AVAILABLE !== 'false') {
  imports.push(
    BullModule.registerQueue({
      name: 'notifications',
    }),
  );
  providers.push(NotificationProcessor);
} else {
  providers.push({
    provide: getQueueToken('notifications'),
    useFactory: (prisma: PrismaService) => ({
      add: async (name: string, data: any) => {
        console.log(`[Notification Service] [InMemoryQueue] Queueing notification (processing immediately):`, data);
        try {
          const notification = await prisma.notification.create({
            data: {
              type: data.type,
              companyId: data.companyId,
              userId: data.userId,
              message: data.message,
            },
          });
          return { id: `mock-${Date.now()}`, data, returnvalue: notification };
        } catch (err) {
          console.error(`[Notification Service] [InMemoryQueue] Failed to save notification:`, err);
          throw err;
        }
      },
    }),
    inject: [PrismaService],
  });
}

@Module({
  imports,
  controllers: [NotificationController],
  providers,
})
export class NotificationModule {}

