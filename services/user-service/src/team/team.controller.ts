import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InviteMemberDto } from './dto/team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(JwtAuthGuard)
  @Post('invite')
  invite(@Body() inviteMemberDto: InviteMemberDto, @Request() req) {
    return this.teamService.inviteMember(inviteMemberDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('members')
  getMembers(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.teamService.getMembers(companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('members/:userId')
  removeMember(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.teamService.removeMember(userId, companyId);
  }
}
