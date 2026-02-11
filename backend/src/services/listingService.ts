import { Database } from '@/database/connection';
import { Listing, Channel } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class ListingService {
  private db = Database.getInstance();

  async getAllListings(userId: number, filters: any, params: any) {
    const { page = 1, limit = 20, sortBy = 'created_at', sortOrder = 'desc' } = params;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE c.belongs_to = $1';
    let queryParams: any[] = [userId];
    let paramIndex = 2;

    if (filters.channelId) {
      whereClause += ` AND l.channel_id = $${paramIndex++}`;
      queryParams.push(filters.channelId);
    }

    if (filters.status) {
      whereClause += ` AND l.status = $${paramIndex++}`;
      queryParams.push(filters.status);
    }

    if (filters.channelType) {
      whereClause += ` AND l.channel_type = $${paramIndex++}`;
      queryParams.push(filters.channelType);
    }

    const countQuery = `
      SELECT COUNT(*) as total
      FROM listing l
      JOIN channel c ON l.channel_id = c.channel_id
      ${whereClause}
    `;
    const countResult = await this.db.query(countQuery, queryParams);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT 
        l.*,
        c.name as channel_name,
        c.marketplace,
        si.sku as stock_item_sku,
        si.title as stock_item_title
      FROM listing l
      JOIN channel c ON l.channel_id = c.channel_id
      LEFT JOIN stock_item si ON l.stock_item_id = si.stock_item_id
      ${whereClause}
      ORDER BY l.${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    
    queryParams.push(limit, offset);
    const listings = await this.db.query(query, queryParams);

    return {
      data: listings,
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

  async getListingById(listingId: string, userId: number): Promise<Listing | null> {
    const query = `
      SELECT 
        l.*,
        c.name as channel_name,
        c.marketplace,
        si.sku as stock_item_sku,
        si.title as stock_item_title,
        si.description as stock_item_description
      FROM listing l
      JOIN channel c ON l.channel_id = c.channel_id
      LEFT JOIN stock_item si ON l.stock_item_id = si.stock_item_id
      WHERE l.listing_id = $1 AND c.belongs_to = $2
    `;
    
    const result = await this.db.query(query, [listingId, userId]);
    
    if (result.length === 0) {
      return null;
    }

    const listing = result[0];

    if (listing.channel_type === 'ebay') {
      listing.ebay_details = await this.getEbayListingDetails(listingId);
    } else if (listing.channel_type === 'shopify') {
      listing.shopify_details = await this.getShopifyListingDetails(listingId);
    } else if (listing.channel_type === 'bigcommerce') {
      listing.bigcommerce_details = await this.getBigCommerceListingDetails(listingId);
    }

    return listing;
  }

  async createListing(listingData: Partial<Listing>, userId: number): Promise<Listing> {
    const { channel_id, channel_type, listing_id_external, status = 'draft', stock_item_id, mapped_attributes, is_linked = true } = listingData;

    const channelExists = await this.db.query(
      'SELECT channel_id FROM channel WHERE channel_id = $1 AND belongs_to = $2',
      [channel_id, userId]
    );
    if (channelExists.length === 0) {
      throw new Error('Channel not found or access denied');
    }

    const listingId = uuidv4();

    const query = `
      INSERT INTO listing (listing_id, channel_id, channel_type, listing_id_external, status, stock_item_id, mapped_attributes, is_linked, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      listingId,
      channel_id,
      channel_type,
      listing_id_external || null,
      status,
      stock_item_id || null,
      mapped_attributes ? JSON.stringify(mapped_attributes) : null,
      is_linked
    ]);
    
    return result[0];
  }

  async updateListing(listingId: string, listingData: Partial<Listing>, userId: number): Promise<Listing | null> {
    const existingListing = await this.getListingById(listingId, userId);
    if (!existingListing) {
      return null;
    }

    const { listing_id_external, status, stock_item_id, mapped_attributes, is_linked } = listingData;

    const query = `
      UPDATE listing
      SET 
        listing_id_external = COALESCE($1, listing_id_external),
        status = COALESCE($2, status),
        stock_item_id = COALESCE($3, stock_item_id),
        mapped_attributes = COALESCE($4, mapped_attributes),
        is_linked = COALESCE($5, is_linked),
        updated_at = CURRENT_TIMESTAMP
      WHERE listing_id = $6
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      listing_id_external,
      status,
      stock_item_id,
      mapped_attributes ? JSON.stringify(mapped_attributes) : mapped_attributes,
      is_linked,
      listingId
    ]);
    
    return result.length > 0 ? result[0] : null;
  }

  async deleteListing(listingId: string, userId: number): Promise<boolean> {
    const listing = await this.getListingById(listingId, userId);
    if (!listing) {
      return false;
    }

    await this.db.transaction(async (conn: any) => {
      if (listing.channel_type === 'ebay') {
        await conn.query('DELETE FROM ebay_listings WHERE listing_id = $1', [listingId]);
        await conn.query('DELETE FROM ebay_shipping_options WHERE listing_id = $1', [listingId]);
        await conn.query('DELETE FROM ebay_item_specifics WHERE listing_id = $1', [listingId]);
        await conn.query('DELETE FROM ebay_return_policies WHERE listing_id = $1', [listingId]);
      } else if (listing.channel_type === 'shopify') {
        await conn.query('DELETE FROM shopify_products WHERE listing_id = $1', [listingId]);
      } else if (listing.channel_type === 'bigcommerce') {
        await conn.query('DELETE FROM bc_products WHERE listing_id = $1', [listingId]);
      }

      await conn.query('DELETE FROM listing WHERE listing_id = $1', [listingId]);
    });

    return true;
  }

  async publishListing(listingId: string, userId: number): Promise<Listing | null> {
    const listing = await this.getListingById(listingId, userId);
    if (!listing) {
      return null;
    }

    if (listing.status === 'active') {
      throw new Error('Listing is already active');
    }

    const query = `
      UPDATE listing
      SET status = 'active', updated_at = CURRENT_TIMESTAMP
      WHERE listing_id = $1
      RETURNING *
    `;
    
    const result = await this.db.query(query, [listingId]);
    
    return result.length > 0 ? result[0] : null;
  }

  async unpublishListing(listingId: string, userId: number): Promise<Listing | null> {
    const listing = await this.getListingById(listingId, userId);
    if (!listing) {
      return null;
    }

    if (listing.status !== 'active') {
      throw new Error('Listing is not active');
    }

    const query = `
      UPDATE listing
      SET status = 'inactive', updated_at = CURRENT_TIMESTAMP
      WHERE listing_id = $1
      RETURNING *
    `;
    
    const result = await this.db.query(query, [listingId]);
    
    return result.length > 0 ? result[0] : null;
  }

  async syncListing(listingId: string, userId: number): Promise<any> {
    const listing = await this.getListingById(listingId, userId);
    if (!listing) {
      throw new Error('Listing not found');
    }

    return {
      success: true,
      message: `${listing.channel_type} listing sync initiated`,
      jobId: uuidv4(),
      listingId: listingId,
    };
  }

  private async getEbayListingDetails(listingId: string): Promise<any> {
    const query = `
      SELECT *
      FROM ebay_listings
      WHERE listing_id = $1
    `;
    
    const result = await this.db.query(query, [listingId]);
    return result.length > 0 ? result[0] : null;
  }

  private async getShopifyListingDetails(listingId: string): Promise<any> {
    const query = `
      SELECT *
      FROM shopify_products
      WHERE listing_id = $1
    `;
    
    const result = await this.db.query(query, [listingId]);
    return result.length > 0 ? result[0] : null;
  }

  private async getBigCommerceListingDetails(listingId: string): Promise<any> {
    const query = `
      SELECT *
      FROM bc_products
      WHERE listing_id = $1
    `;
    
    const result = await this.db.query(query, [listingId]);
    return result.length > 0 ? result[0] : null;
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}