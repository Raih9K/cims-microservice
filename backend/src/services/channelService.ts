import { Database } from '@/database/connection';
import { Channel } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export class ChannelService {
  private db = Database.getInstance();

  async getAllChannels(userId: number, params: any) {
    const { page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM channel
      WHERE belongs_to = $1
    `;
    const countResult = await this.db.query(countQuery, [userId]);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT *
      FROM channel
      WHERE belongs_to = $1
      ORDER BY ${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;
    
    const channels = await this.db.query(query, [userId, limit, offset]);

    for (const channel of channels) {
      channel.listing_count = await this.getChannelListingCount(channel.channel_id);
    }

    return {
      data: channels,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async getChannelById(channelId: string, userId: number): Promise<Channel | null> {
    const query = `
      SELECT *
      FROM channel
      WHERE channel_id = $1 AND belongs_to = $2
    `;
    
    const result = await this.db.query(query, [channelId, userId]);
    
    if (result.length === 0) {
      return null;
    }

    const channel = result[0];
    channel.listing_count = await this.getChannelListingCount(channelId);
    
    return channel;
  }

  async createChannel(channelData: Partial<Channel>, userId: number): Promise<Channel> {
    const { name, marketplace, marketplace_data } = channelData;

    const channelId = uuidv4();

    const query = `
      INSERT INTO channel (channel_id, name, marketplace, marketplace_data, belongs_to, created_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      channelId,
      name,
      marketplace,
      marketplace_data ? JSON.stringify(marketplace_data) : null,
      userId
    ]);
    
    return result[0];
  }

  async updateChannel(channelId: string, channelData: Partial<Channel>, userId: number): Promise<Channel | null> {
    const existingChannel = await this.getChannelById(channelId, userId);
    if (!existingChannel) {
      return null;
    }

    const { name, marketplace, marketplace_data } = channelData;

    const query = `
      UPDATE channel
      SET 
        name = COALESCE($1, name),
        marketplace = COALESCE($2, marketplace),
        marketplace_data = COALESCE($3, marketplace_data),
        updated_at = CURRENT_TIMESTAMP
      WHERE channel_id = $4 AND belongs_to = $5
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      name,
      marketplace,
      marketplace_data ? JSON.stringify(marketplace_data) : marketplace_data,
      channelId,
      userId
    ]);
    
    return result.length > 0 ? result[0] : null;
  }

  async deleteChannel(channelId: string, userId: number): Promise<boolean> {
    const listingCount = await this.getChannelListingCount(channelId);
    if (listingCount > 0) {
      throw new Error('Cannot delete channel with existing listings');
    }

    const query = 'DELETE FROM channel WHERE channel_id = $1 AND belongs_to = $2';
    const result = await this.db.query(query, [channelId, userId]);
    
    return result.rowCount > 0;
  }

  async testChannelConnection(channelId: string, userId: number): Promise<any> {
    const channel = await this.getChannelById(channelId, userId);
    if (!channel) {
      throw new Error('Channel not found');
    }

    try {
      switch (channel.marketplace) {
        case 'ebay':
          return await this.testEbayConnection(channel.marketplace_data);
        case 'shopify':
          return await this.testShopifyConnection(channel.marketplace_data);
        case 'bigcommerce':
          return await this.testBigCommerceConnection(channel.marketplace_data);
        default:
          throw new Error('Unsupported marketplace');
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async syncChannel(channelId: string, userId: number): Promise<any> {
    const channel = await this.getChannelById(channelId, userId);
    if (!channel) {
      throw new Error('Channel not found');
    }

    try {
      switch (channel.marketplace) {
        case 'ebay':
          return await this.syncEbayChannel(channelId, channel.marketplace_data);
        case 'shopify':
          return await this.syncShopifyChannel(channelId, channel.marketplace_data);
        case 'bigcommerce':
          return await this.syncBigCommerceChannel(channelId, channel.marketplace_data);
        default:
          throw new Error('Unsupported marketplace');
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  private async getChannelListingCount(channelId: string): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM listing WHERE channel_id = $1';
    const result = await this.db.query(query, [channelId]);
    return parseInt(result[0].count);
  }

  private async testEbayConnection(marketplaceData: any): Promise<any> {
    try {
      const response = await axios.get('https://api.ebay.com/sell/feeds/v1/order_task', {
        headers: {
          'Authorization': `Bearer ${marketplaceData.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        message: 'Connection successful',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error_description || error.message,
      };
    }
  }

  private async testShopifyConnection(marketplaceData: any): Promise<any> {
    try {
      const response = await axios.get(`https://${marketplaceData.shop_name}.myshopify.com/admin/api/2023-10/shop.json`, {
        headers: {
          'X-Shopify-Access-Token': marketplaceData.access_token,
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        message: 'Connection successful',
        shop: response.data.shop,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.errors || error.message,
      };
    }
  }

  private async testBigCommerceConnection(marketplaceData: any): Promise<any> {
    try {
      const response = await axios.get(`https://api.bigcommerce.com/stores/${marketplaceData.store_hash}/v2/store`, {
        headers: {
          'X-Auth-Token': marketplaceData.access_token,
          'Accept': 'application/json',
        },
      });

      return {
        success: true,
        message: 'Connection successful',
        store: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.title || error.message,
      };
    }
  }

  private async syncEbayChannel(channelId: string, marketplaceData: any): Promise<any> {
    return {
      success: true,
      message: 'eBay sync initiated',
      jobId: uuidv4(),
    };
  }

  private async syncShopifyChannel(channelId: string, marketplaceData: any): Promise<any> {
    return {
      success: true,
      message: 'Shopify sync initiated',
      jobId: uuidv4(),
    };
  }

  private async syncBigCommerceChannel(channelId: string, marketplaceData: any): Promise<any> {
    return {
      success: true,
      message: 'BigCommerce sync initiated',
      jobId: uuidv4(),
    };
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}