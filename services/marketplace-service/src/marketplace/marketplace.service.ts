import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  async createChannel(companyId: number, data: any) {
    return this.prisma.channel.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async getChannels(companyId: number) {
    return this.prisma.channel.findMany({
      where: { companyId },
    });
  }

  async findOneChannel(id: number, companyId: number) {
    const channel = await this.prisma.channel.findFirst({
      where: { id, companyId },
    });
    if (!channel) throw new NotFoundException('Channel not found');
    return channel;
  }

  async updateChannel(id: number, companyId: number, data: any) {
    const channel = await this.findOneChannel(id, companyId);
    return this.prisma.channel.update({
      where: { id: channel.id },
      data,
    });
  }

  async deleteChannel(id: number, companyId: number) {
    const channel = await this.findOneChannel(id, companyId);
    return this.prisma.channel.delete({
      where: { id: channel.id },
    });
  }

  async getChannelStats(companyId: number) {
    const channels = await this.getChannels(companyId);
    return {
      total: channels.length,
      active: channels.filter((c) => c.status === 'active').length,
      inactive: channels.filter((c) => c.status === 'inactive').length,
    };
  }

  async createListing(companyId: number, data: any) {
    return this.prisma.listing.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async getListings(companyId: number, channelId?: number) {
    return this.prisma.listing.findMany({
      where: {
        companyId,
        channelId,
      },
      include: {
        channel: true,
      },
    });
  }

  async updateListing(id: number, companyId: number, data: any) {
    const listing = await this.prisma.listing.findFirst({
      where: { id, companyId },
    });
    if (!listing) throw new NotFoundException('Listing not found');

    return this.prisma.listing.update({
      where: { id },
      data: {
        ...data,
        version: { increment: 1 },
      },
    });
  }
}
