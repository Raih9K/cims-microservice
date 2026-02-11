import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShopifyService {
  constructor(private prisma: PrismaService) {}

  async install(shop: string, companyId: number) {
    // Generate OAuth URL Logic
    return { url: `https://${shop}/admin/oauth/authorize?...` };
  }

  async callback(query: any) {
    // Handle OAuth Callback, exchange code for token
    // Save to database
    return { status: 'success' };
  }

  async syncProducts(shop: string) {
    // Queue product sync job
    return { status: 'sync_started' };
  }
}
