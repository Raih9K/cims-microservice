import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { type, companyId, userId, message } = job.data;

    console.log(
      `Processing notification job ${job.id}: ${type} to user ${userId} in company ${companyId}`,
    );

    // Simulate sending email/alert
    // await this.emailService.send(...)

    // Record in database
    return this.prisma.notification.create({
      data: {
        type,
        companyId,
        userId,
        message,
      },
    });
  }
}
