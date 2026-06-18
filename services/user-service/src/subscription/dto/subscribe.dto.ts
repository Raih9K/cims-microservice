import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
  @IsNotEmpty()
  @IsNumber()
  packageId: number;

  @IsOptional()
  @IsString()
  couponCode?: string;
}

export class ApplyCouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
