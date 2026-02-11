import { ProductType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  costPrice: number;

  @IsNotEmpty()
  sellingPrice: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantAttributeDto)
  attributes?: VariantAttributeDto[];
}

export class VariantAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateProductDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProductType)
  @IsOptional()
  type?: ProductType = ProductType.SIMPLE;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  uom?: string;

  @IsInt()
  @IsOptional()
  brandId?: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants?: CreateVariantDto[];
}
