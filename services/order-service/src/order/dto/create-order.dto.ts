import { Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';

export class OrderItemDto {
  @IsInt()
  @IsNotEmpty()
  variantId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
