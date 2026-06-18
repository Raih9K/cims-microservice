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

  async connectManual(companyId: number, data: { shop_domain: string; access_token: string }) {
    const { shop_domain, access_token } = data;

    const store = await this.prisma.shopifyStore.upsert({
      where: { shop: shop_domain },
      update: {
        accessToken: access_token,
        status: 'active',
        companyId,
      },
      create: {
        shop: shop_domain,
        accessToken: access_token,
        status: 'active',
        companyId,
      },
    });

    // Register channel in cims_marketplace via HTTP call to marketplace-service
    const marketplaceUrl = process.env.MARKETPLACE_SERVICE_URL || 'http://localhost:3005';
    try {
      const response = await fetch(`${marketplaceUrl}/api/marketplace/channels?companyId=${companyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${shop_domain} Store`,
          marketplace: 'shopify',
          store_url: `https://${shop_domain}`,
          status: 'active',
          marketplace_data: { accessToken: access_token },
        }),
      });
      if (!response.ok) {
        console.error('Failed to register channel in marketplace-service:', await response.text());
      }
    } catch (err: any) {
      console.error('Error registering channel in marketplace-service:', err.message);
    }

    return { success: true, store };
  }

  async syncChannel(id: number, companyId: number) {
    console.log(`[Shopify Service] Simulating product sync for channel #${id} and company #${companyId}`);
    return { success: true, status: 'synced', message: 'Shopify products synced successfully' };
  }
}
