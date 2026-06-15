import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ManagementType } from '../../prisma/generated-client';

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
