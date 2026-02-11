import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  businessType?: string;
}
