import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class BasicInfoDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsOptional()
  productIdentifierType?: string;

  @IsString()
  @IsOptional()
  productIdentifierValue?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  condition?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsOptional()
  msrp?: string | number;

  @IsOptional()
  purchasePrice?: string | number;

  @IsOptional()
  retailPrice?: string | number;

  @IsOptional()
  map?: string | number;

  @IsOptional()
  dimensionLength?: string | number;

  @IsOptional()
  dimensionWidth?: string | number;

  @IsOptional()
  dimensionHeight?: string | number;

  @IsString()
  @IsOptional()
  dimensionUnit?: string;

  @IsOptional()
  weightValue?: string | number;

  @IsString()
  @IsOptional()
  weightUnit?: string;

  @IsString()
  @IsOptional()
  manufacturedCountry?: string;

  @IsString()
  @IsOptional()
  manufacturedState?: string;

  @IsString()
  @IsOptional()
  manufacturedCity?: string;

  @IsString()
  @IsOptional()
  manufacturedPostalCode?: string;
}

export class DescriptionDto {
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  mainDescription?: string;

  @IsArray()
  @IsOptional()
  features?: string[];
}

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  price?: string | number;

  @IsOptional()
  quantity?: string | number;

  @IsArray()
  @IsOptional()
  attributes?: { name: string; value: string }[];
}

export class VariantsDto {
  @IsBoolean()
  @IsOptional()
  hasVariation?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variantItems?: CreateVariantDto[];
}

export class PricingDto {
  @IsOptional()
  costPrice?: string | number;

  @IsOptional()
  sellingPrice?: string | number;

  @IsString()
  @IsOptional()
  discountType?: string;

  @IsOptional()
  discountValue?: string | number;

  @IsString()
  @IsOptional()
  taxClass?: string;
}

export class MediaImageDto {
  @IsString()
  url: string;

  @IsInt()
  @IsOptional()
  order?: number;
}

export class MediaDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MediaImageDto)
  images?: MediaImageDto[];
}

export class AttributeDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class ProductSupplierDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsOptional()
  purchasePrice?: string | number;
}

export class CreateProductDto {
  @IsOptional()
  companyId?: number;

  @ValidateNested()
  @Type(() => BasicInfoDto)
  basicInfo: BasicInfoDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => DescriptionDto)
  description?: DescriptionDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => VariantsDto)
  variants?: VariantsDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => PricingDto)
  pricing?: PricingDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => MediaDto)
  media?: MediaDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  attributes?: AttributeDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductSupplierDto)
  suppliers?: ProductSupplierDto[];
}
