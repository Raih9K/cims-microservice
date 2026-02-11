import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  send(
    @Body()
    data: {
      type: string;
      companyId: number;
      userId: number;
      message: string;
    },
  ) {
    return this.notificationService.sendNotification(data);
  }
}
