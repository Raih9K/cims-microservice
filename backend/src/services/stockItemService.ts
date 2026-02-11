import { Database } from '@/database/connection';
import { StockItem, StockItemPricing, StockItemDimensions, PaginationParams, PaginationResult } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class StockItemService {
  private db = Database.getInstance();

  async createStockItem(itemData: Omit<StockItem, 'stock_item_id' | 'created_at' | 'updated_at' | 'deleted_at'> & { belongs_to: number }, 
    pricingData?: Omit<StockItemPricing, 'id' | 'stock_item_id' | 'created_at' | 'updated_at'>,
    dimensionsData?: Omit<StockItemDimensions, 'dimension_id' | 'stock_item_id' | 'created_at' | 'updated_at'>): Promise<StockItem> {
    const stockItemId = uuidv4();
    
    const sql = `
      INSERT INTO stock_item (
        stock_item_id, sku, belongs_to, title, short_description, description, barcode,
        stock_type, item_type, condition, parent_item_id, brand_id, manufacturer_name,
        manufacturer_country_code, manufacturer_state, manufacturer_postal_code, status, is_deleted
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `;
    
    const params = [
      stockItemId,
      itemData.sku,
      itemData.belongs_to,
      itemData.title,
      itemData.short_description || null,
      itemData.description || null,
      itemData.barcode || null,
      itemData.stock_type,
      itemData.item_type,
      itemData.condition,
      itemData.parent_item_id || null,
      itemData.brand_id || null,
      itemData.manufacturer_name || null,
      itemData.manufacturer_country_code || null,
      itemData.manufacturer_state || null,
      itemData.manufacturer_postal_code || null,
      itemData.status,
      false,
    ];
    
    const result = await this.db.query(sql, params);
    const createdStockItem = result[0];

    // Create pricing data if provided
    if (pricingData) {
      const pricingSql = `
        INSERT INTO stock_item_pricing (
          stock_item_id, cost_price, selling_price, msrp, retail_price, map_price,
          discount_type, discount_value, tax_class
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      
      const pricingParams = [
        stockItemId,
        pricingData.cost_price || null,
        pricingData.selling_price || null,
        pricingData.msrp || null,
        pricingData.retail_price || null,
        pricingData.map_price || null,
        pricingData.discount_type || 'none',
        pricingData.discount_value || 0,
        pricingData.tax_class || 'standard'
      ];
      
      await this.db.query(pricingSql, pricingParams);
    }

    // Create dimensions data if provided
    if (dimensionsData) {
      const dimensionsId = uuidv4();
      const dimensionsSql = `
        INSERT INTO stock_item_dimensions (
          dimension_id, stock_item_id, length, width, height, weight, weight_unit, dimension_unit,
          package_length, package_width, package_height, package_weight,
          manufactured_city, manufactured_state, manufactured_country_code, manufactured_postal_code
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `;
      
      const dimensionsParams = [
        dimensionsId,
        stockItemId,
        dimensionsData.length || null,
        dimensionsData.width || null,
        dimensionsData.height || null,
        dimensionsData.weight || null,
        dimensionsData.weight_unit || 'pounds',
        dimensionsData.dimension_unit || 'inches',
        dimensionsData.package_length || null,
        dimensionsData.package_width || null,
        dimensionsData.package_height || null,
        dimensionsData.package_weight || null,
        dimensionsData.manufactured_city || null,
        dimensionsData.manufactured_state || null,
        dimensionsData.manufactured_country_code || null,
        dimensionsData.manufactured_postal_code || null
      ];
      
      await this.db.query(dimensionsSql, dimensionsParams);
    }

    return createdStockItem;
  }

  async getStockItems(userId: number, params: PaginationParams & { 
    search?: string; 
    status?: string; 
    stock_type?: string; 
    brand_id?: number;
  }): Promise<PaginationResult<StockItem>> {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE belongs_to = $1 AND is_deleted = false';
    const queryParams: any[] = [userId];
    let paramIndex = 2;

    if (params.search) {
      whereClause += ` AND (title ILIKE $${paramIndex} OR sku ILIKE $${paramIndex} OR short_description ILIKE $${paramIndex})`;
      queryParams.push(`%${params.search}%`);
      paramIndex++;
    }

    if (params.status) {
      whereClause += ` AND status = $${paramIndex}`;
      queryParams.push(params.status);
      paramIndex++;
    }

    if (params.stock_type) {
      whereClause += ` AND stock_type = $${paramIndex}`;
      queryParams.push(params.stock_type);
      paramIndex++;
    }

    if (params.brand_id) {
      whereClause += ` AND brand_id = $${paramIndex}`;
      queryParams.push(params.brand_id);
      paramIndex++;
    }

    const sortBy = params.sortBy || 'created_at';
    const sortOrder = params.sortOrder || 'desc';
    
    const countSql = `SELECT COUNT(*) as total FROM stock_item ${whereClause}`;
    const dataSql = `
      SELECT * FROM stock_item 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    queryParams.push(limit, offset);

    const [countResult, dataResult] = await Promise.all([
      this.db.query(countSql, queryParams.slice(0, -2)),
      this.db.query(dataSql, queryParams)
    ]);

    const total = parseInt(countResult[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      data: dataResult,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getStockItemById(stockItemId: string, userId: number): Promise<StockItem | null> {
    const sql = `
      SELECT * FROM stock_item 
      WHERE stock_item_id = $1 AND belongs_to = $2 AND is_deleted = false
    `;
    const result = await this.db.query(sql, [stockItemId, userId]);
    return result[0] || null;
  }

  async updateStockItem(stockItemId: string, userId: number, updates: Partial<Omit<StockItem, 'stock_item_id' | 'belongs_to' | 'created_at' | 'updated_at' | 'deleted_at'>>): Promise<StockItem | null> {
    const setClause = [];
    const params = [];
    let paramIndex = 1;

    const updateableFields = [
      'sku', 'title', 'short_description', 'description', 'barcode',
      'stock_type', 'item_type', 'condition', 'parent_item_id', 'brand_id',
      'manufacturer_name', 'manufacturer_country_code', 'manufacturer_state',
      'manufacturer_postal_code', 'status'
    ];

    for (const field of updateableFields) {
      if (updates[field as keyof typeof updates] !== undefined) {
        setClause.push(`${field} = $${paramIndex++}`);
        params.push(updates[field as keyof typeof updates]);
      }
    }

    if (setClause.length === 0) {
      return this.getStockItemById(stockItemId, userId);
    }

    setClause.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(stockItemId, userId);

    const sql = `
      UPDATE stock_item 
      SET ${setClause.join(', ')}
      WHERE stock_item_id = $${paramIndex} AND belongs_to = $${paramIndex + 1} AND is_deleted = false
      RETURNING *
    `;

    const result = await this.db.query(sql, params);
    return result[0] || null;
  }

  async deleteStockItem(stockItemId: string, userId: number): Promise<boolean> {
    const sql = `
      UPDATE stock_item 
      SET is_deleted = true, deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE stock_item_id = $1 AND belongs_to = $2 AND is_deleted = false
    `;
    const result = await this.db.query(sql, [stockItemId, userId]);
    return result.length > 0;
  }

  async getStockItemVariants(stockItemId: string, userId: number): Promise<any[]> {
    const sql = `
      SELECT siv.* FROM stock_item_variant siv
      JOIN stock_item si ON siv.stock_item_id = si.stock_item_id
      WHERE siv.stock_item_id = $1 AND si.belongs_to = $2 AND si.is_deleted = false
      ORDER BY siv.display_order
    `;
    const result = await this.db.query(sql, [stockItemId, userId]);
    return result;
  }

  async addStockItemVariant(stockItemId: string, userId: number, variantData: {
    attribute_name: string;
    attribute_value: string;
    display_order?: number;
  }): Promise<any> {
    const variantId = uuidv4();
    
    const sql = `
      INSERT INTO stock_item_variant (variant_id, stock_item_id, attribute_name, attribute_value, display_order)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const params = [
      variantId,
      stockItemId,
      variantData.attribute_name,
      variantData.attribute_value,
      variantData.display_order || 0,
    ];
    
    const result = await this.db.query(sql, params);
    return result[0];
  }
}