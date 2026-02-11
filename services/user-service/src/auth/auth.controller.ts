import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AcceptInviteDto } from '../team/dto/team.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('accept-invite')
  @HttpCode(HttpStatus.OK)
  async acceptInvite(@Body() acceptInviteDto: AcceptInviteDto) {
    return this.authService.acceptInvite(acceptInviteDto);
  }
}
