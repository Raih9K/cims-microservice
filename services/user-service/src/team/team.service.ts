import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { InviteMemberDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async inviteMember(dto: InviteMemberDto, _invitedById: number) {
    const { email, companyId, roleName } = dto;

    // 1. Check if user already exists
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      // Check if already a member
      const existingMembership = await this.prisma.membership.findUnique({
        where: { userId_companyId: { userId: user.id, companyId } },
      });
      if (existingMembership) {
        throw new ConflictException('User is already a member of this company');
      }
    } else {
      // Create pending user
      user = await this.prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Placeholder name
          status: 'pending',
          otp: Math.random().toString(36).substring(2, 10), // Invite Token
        },
      });
    }

    // 2. Assign Role
    let role = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await this.prisma.role.create({ data: { name: roleName } });
    }

    // 3. Create Membership
    await this.prisma.membership.create({
      data: {
        userId: user.id,
        companyId,
        roleId: role.id,
      },
    });

    // 4. Trigger notification-service to send invite email
    try {
      await firstValueFrom(
        this.httpService.post(
          'http://notification-service:3008/api/notifications/send',
          {
            type: 'EMAIL',
            companyId,
            userId: user.id,
            message: `You have been invited to join company ${companyId}. Use token ${user.otp} to accept.`,
          },
        ) as any,
      );
    } catch (error: any) {
      console.error('Failed to trigger notification-service:', error.message);
      // We don't throw here to avoid failing the invite if notification fails
    }

    return {
      message: 'Invitation sent successfully',
      inviteToken: user.otp,
    };
  }

  async getMembers(companyId: number) {
    return this.prisma.membership.findMany({
      where: { companyId },
      include: {
        user: {
          select: { id: true, email: true, name: true, status: true },
        },
        role: true,
      },
    });
  }

  async removeMember(userId: number, companyId: number) {
    return this.prisma.membership.delete({
      where: { userId_companyId: { userId, companyId } },
    });
  }
}
