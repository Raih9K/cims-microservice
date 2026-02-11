import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AcceptInviteDto } from '../team/dto/team.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, companyName, businessType } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      if (companyName) {
        const company = await tx.company.create({
          data: {
            name: companyName,
            businessType,
            ownerId: user.id,
          },
        });

        // Assign BUSINESS_ADMIN role by default for the first user
        let role = await tx.role.findUnique({
          where: { name: 'BUSINESS_ADMIN' },
        });
        if (!role) {
          role = await tx.role.create({ data: { name: 'BUSINESS_ADMIN' } });
        }

        await tx.membership.create({
          data: {
            userId: user.id,
            companyId: company.id,
            roleId: role.id,
          },
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findFirst({
      where: { email, status: 'active' },
      include: {
        memberships: {
          include: {
            role: true,
            company: true,
          },
        },
      },
    });

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.memberships.map((m) => m.role.name),
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        memberships: user.memberships.map((m) => ({
          companyId: m.company.id,
          company: m.company.name,
          role: m.role.name,
        })),
      },
    };
  }

  async acceptInvite(dto: AcceptInviteDto) {
    const { token, password, name } = dto;

    const user = await this.prisma.user.findFirst({
      where: { otp: token, status: 'pending' },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired invitation token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        password: hashedPassword,
        status: 'active',
        otp: null, // Clear token
      },
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
