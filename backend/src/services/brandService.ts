import { Database } from '@/database/connection';
import { Brand } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class BrandService {
  private db = Database.getInstance();

  async getAllBrands(userId: number, params: any) {
    const { page = 1, limit = 20, sortBy = 'brand_name', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM brand
      WHERE created_by = $1
    `;
    const countResult = await this.db.query(countQuery, [userId]);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT *
      FROM brand
      WHERE created_by = $1
      ORDER BY ${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;
    
    const brands = await this.db.query(query, [userId, limit, offset]);

    return {
      data: brands,
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

  async getBrandById(brandId: number, userId: number): Promise<Brand | null> {
    const query = `
      SELECT *
      FROM brand
      WHERE brand_id = $1 AND created_by = $2
    `;
    
    const result = await this.db.query(query, [brandId, userId]);
    return result.length > 0 ? result[0] : null;
  }

  async createBrand(brandData: Partial<Brand>, userId: number): Promise<Brand> {
    const { brand_name, brand_code, website, is_active = true } = brandData;

    if (brand_code) {
      const existingCode = await this.db.query(
        'SELECT brand_id FROM brand WHERE brand_code = $1 AND created_by = $2',
        [brand_code, userId]
      );
      if (existingCode.length > 0) {
        throw new Error('Brand code already exists');
      }
    }

    const query = `
      INSERT INTO brand (brand_name, brand_code, website, is_active, created_by, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      brand_name,
      brand_code || null,
      website || null,
      is_active,
      userId
    ]);
    
    return result[0];
  }

  async updateBrand(brandId: number, brandData: Partial<Brand>, userId: number): Promise<Brand | null> {
    const existingBrand = await this.getBrandById(brandId, userId);
    if (!existingBrand) {
      return null;
    }

    const { brand_name, brand_code, website, is_active } = brandData;

    if (brand_code && brand_code !== existingBrand.brand_code) {
      const existingCode = await this.db.query(
        'SELECT brand_id FROM brand WHERE brand_code = $1 AND created_by = $2 AND brand_id != $3',
        [brand_code, userId, brandId]
      );
      if (existingCode.length > 0) {
        throw new Error('Brand code already exists');
      }
    }

    const query = `
      UPDATE brand
      SET 
        brand_name = COALESCE($1, brand_name),
        brand_code = COALESCE($2, brand_code),
        website = COALESCE($3, website),
        is_active = COALESCE($4, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE brand_id = $5 AND created_by = $6
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      brand_name,
      brand_code,
      website,
      is_active,
      brandId,
      userId
    ]);
    
    return result.length > 0 ? result[0] : null;
  }

  async deleteBrand(brandId: number, userId: number): Promise<boolean> {
    const stockItemsUsingBrand = await this.db.query(
      'SELECT COUNT(*) as count FROM stock_item WHERE brand_id = $1 AND belongs_to = $2',
      [brandId, userId]
    );

    if (parseInt(stockItemsUsingBrand[0].count) > 0) {
      throw new Error('Cannot delete brand with associated stock items');
    }

    const query = 'DELETE FROM brand WHERE brand_id = $1 AND created_by = $2';
    const result = await this.db.query(query, [brandId, userId]);
    
    return result.rowCount > 0;
  }

  async toggleBrandStatus(brandId: number, userId: number): Promise<Brand | null> {
    const query = `
      UPDATE brand
      SET 
        is_active = NOT is_active,
        updated_at = CURRENT_TIMESTAMP
      WHERE brand_id = $1 AND created_by = $2
      RETURNING *
    `;
    
    const result = await this.db.query(query, [brandId, userId]);
    
    return result.length > 0 ? result[0] : null;
  }

  async getBrandsByIds(brandIds: number[], userId: number): Promise<Brand[]> {
    if (brandIds.length === 0) return [];
    
    const placeholders = brandIds.map((_, index) => `$${index + 2}`).join(',');
    const query = `
      SELECT *
      FROM brand
      WHERE brand_id IN (${placeholders}) AND created_by = $1
    `;
    
    return await this.db.query(query, [userId, ...brandIds]);
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}