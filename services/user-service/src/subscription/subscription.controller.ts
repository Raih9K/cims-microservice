import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplyCouponDto, SubscribeDto } from './dto/subscribe.dto';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('packages')
  getPackages() {
    return this.subscriptionService.getPackages();
  }

  @UseGuards(JwtAuthGuard)
  @Post('apply-coupon')
  @HttpCode(HttpStatus.OK)
  applyCoupon(@Body() dto: ApplyCouponDto) {
    return this.subscriptionService.applyCoupon(dto.code);
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  subscribe(@Request() req: any, @Body() dto: SubscribeDto) {
    return this.subscriptionService.subscribe(req.user.userId, dto);
  }
}
