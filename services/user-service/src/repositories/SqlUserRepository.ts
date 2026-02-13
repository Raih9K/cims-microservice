import { PrismaClient } from '@prisma/client';
import {
    CreateUserDTO,
    IUserRepository,
    UpdateUserDTO,
    User,
} from '../interfaces/IUserRepository';

export class SqlUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateUserDTO): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          companyId: data.companyId,
          status: 'active',
        },
      });
      return this.mapToUser(user);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('User with this email already exists');
      }
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.mapToUser(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.mapToUser(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u) => this.mapToUser(u));
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.email && { email: data.email }),
          ...(data.password && { password: data.password }),
          ...(data.status && { status: data.status }),
          ...(data.companyId !== undefined && { companyId: data.companyId }),
        },
      });
      return this.mapToUser(user);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return null;
      }
      if (error.code === 'P2002') {
        throw new Error('Email already in use');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }

  private mapToUser(prismaUser: any): User {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password || undefined,
      status: prismaUser.status,
      companyId: prismaUser.companyId || undefined,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
