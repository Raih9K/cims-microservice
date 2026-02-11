import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
  ) {}

  async sendNotification(data: {
    type: string;
    companyId: number;
    userId: number;
    message: string;
  }) {
    await this.notificationQueue.add('send', data);
    return { status: 'queued' };
  }
}
