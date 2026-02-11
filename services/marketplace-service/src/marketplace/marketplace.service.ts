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
