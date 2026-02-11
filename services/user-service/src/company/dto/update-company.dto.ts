import { ManagementType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  businessType?: string;

  @IsEnum(ManagementType)
  @IsOptional()
  managementType?: ManagementType;
}
