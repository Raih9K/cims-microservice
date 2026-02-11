import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString
} from 'class-validator';

export class InviteMemberDto {
  @IsEmail()
  email: string;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsNotEmpty()
  roleName: string; // e.g., "TEAM_MANAGER", "TEAM_MEMBER"
}

export class AcceptInviteDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
