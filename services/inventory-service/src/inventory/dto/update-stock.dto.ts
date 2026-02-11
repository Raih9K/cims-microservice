import { TransactionType } from '@prisma/client';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateStockDto {
  @IsInt()
  @IsNotEmpty()
  variantId: number;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsOptional()
  warehouseId?: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  reason?: string;
}
