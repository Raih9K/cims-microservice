import {
    IsInt,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateAuditLogDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  entityType: string;

  @IsString()
  @IsOptional()
  entityId?: string;

  @IsObject()
  @IsOptional()
  oldValues?: any;

  @IsObject()
  @IsOptional()
  newValues?: any;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsString()
  @IsOptional()
  requestId?: string;
}
