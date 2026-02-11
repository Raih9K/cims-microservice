import { Database } from '@/database/connection';
import { Warehouse, StockLevel } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class WarehouseService {
  private db = Database.getInstance();

  async getAllWarehouses(userId: number, params: any) {
    const { page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM warehouse
      WHERE belongs_to = $1
    `;
    const countResult = await this.db.query(countQuery, [userId]);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT *
      FROM warehouse
      WHERE belongs_to = $1
      ORDER BY ${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;
    
    const warehouses = await this.db.query(query, [userId, limit, offset]);

    return {
      data: warehouses,
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

  async getWarehouseById(warehouseId: string, userId: number): Promise<Warehouse | null> {
    const query = `
      SELECT *
      FROM warehouse
      WHERE warehouse_id = $1 AND belongs_to = $2
    `;
    
    const result = await this.db.query(query, [warehouseId, userId]);
    return result.length > 0 ? result[0] : null;
  }

  async createWarehouse(warehouseData: Partial<Warehouse>, userId: number): Promise<Warehouse> {
    const { name, address, country, state, city, zip_code, is_default = false } = warehouseData;

    const existingName = await this.db.query(
      'SELECT warehouse_id FROM warehouse WHERE name = $1 AND belongs_to = $2',
      [name, userId]
    );
    if (existingName.length > 0) {
      throw new Error('Warehouse name already exists');
    }

    const warehouseId = uuidv4();

    await this.db.transaction(async (conn: any) => {
      if (is_default) {
        await conn.query(
          'UPDATE warehouse SET is_default = false WHERE belongs_to = $1',
          [userId]
        );
      }

      const query = `
        INSERT INTO warehouse (warehouse_id, name, address, country, state, city, zip_code, is_default, created_at, belongs_to)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, $9)
      `;
      
      await conn.query(query, [
        warehouseId,
        name,
        address || null,
        country || null,
        state || null,
        city || null,
        zip_code || null,
        is_default,
        userId
      ]);
    });

    return await this.getWarehouseById(warehouseId, userId) as Warehouse;
  }

  async updateWarehouse(warehouseId: string, warehouseData: Partial<Warehouse>, userId: number): Promise<Warehouse | null> {
    const existingWarehouse = await this.getWarehouseById(warehouseId, userId);
    if (!existingWarehouse) {
      return null;
    }

    const { name, address, country, state, city, zip_code, is_default } = warehouseData;

    if (name && name !== existingWarehouse.name) {
      const existingName = await this.db.query(
        'SELECT warehouse_id FROM warehouse WHERE name = $1 AND belongs_to = $2 AND warehouse_id != $3',
        [name, userId, warehouseId]
      );
      if (existingName.length > 0) {
        throw new Error('Warehouse name already exists');
      }
    }

    await this.db.transaction(async (conn: any) => {
      if (is_default !== undefined && is_default !== existingWarehouse.is_default) {
        if (is_default) {
          await conn.query(
            'UPDATE warehouse SET is_default = false WHERE belongs_to = $1 AND warehouse_id != $2',
            [userId, warehouseId]
          );
        }
      }

      const query = `
        UPDATE warehouse
        SET 
          name = COALESCE($1, name),
          address = COALESCE($2, address),
          country = COALESCE($3, country),
          state = COALESCE($4, state),
          city = COALESCE($5, city),
          zip_code = COALESCE($6, zip_code),
          is_default = COALESCE($7, is_default),
          updated_at = CURRENT_TIMESTAMP
        WHERE warehouse_id = $8 AND belongs_to = $9
      `;
      
      await conn.query(query, [
        name,
        address,
        country,
        state,
        city,
        zip_code,
        is_default,
        warehouseId,
        userId
      ]);
    });

    return await this.getWarehouseById(warehouseId, userId);
  }

  async deleteWarehouse(warehouseId: string, userId: number): Promise<boolean> {
    const stockLevels = await this.db.query(
      'SELECT COUNT(*) as count FROM stock_level WHERE warehouse_id = $1',
      [warehouseId]
    );

    if (parseInt(stockLevels[0].count) > 0) {
      throw new Error('Cannot delete warehouse with existing stock levels');
    }

    const query = 'DELETE FROM warehouse WHERE warehouse_id = $1 AND belongs_to = $2';
    const result = await this.db.query(query, [warehouseId, userId]);
    
    return result.rowCount > 0;
  }

  async setDefaultWarehouse(warehouseId: string, userId: number): Promise<Warehouse | null> {
    await this.db.transaction(async (conn: any) => {
      await conn.query(
        'UPDATE warehouse SET is_default = false WHERE belongs_to = $1',
        [userId]
      );

      const query = `
        UPDATE warehouse
        SET is_default = true, updated_at = CURRENT_TIMESTAMP
        WHERE warehouse_id = $1 AND belongs_to = $2
        RETURNING *
      `;
      
      await conn.query(query, [warehouseId, userId]);
    });

    return await this.getWarehouseById(warehouseId, userId);
  }

  async getDefaultWarehouse(userId: number): Promise<Warehouse | null> {
    const query = `
      SELECT *
      FROM warehouse
      WHERE belongs_to = $1 AND is_default = true
      ORDER BY created_at ASC
      LIMIT 1
    `;
    
    const result = await this.db.query(query, [userId]);
    return result.length > 0 ? result[0] : null;
  }

  async getWarehouseStockLevels(warehouseId: string, userId: number, params: any) {
    const { page = 1, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const warehouseExists = await this.getWarehouseById(warehouseId, userId);
    if (!warehouseExists) {
      throw new Error('Warehouse not found');
    }

    const countQuery = `
      SELECT COUNT(*) as total
      FROM stock_level sl
      JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
      WHERE sl.warehouse_id = $1 AND si.belongs_to = $2
    `;
    const countResult = await this.db.query(countQuery, [warehouseId, userId]);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT 
        sl.*,
        si.sku,
        si.title,
        si.barcode,
        si.status as item_status
      FROM stock_level sl
      JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
      WHERE sl.warehouse_id = $1 AND si.belongs_to = $2
      ORDER BY si.sku ASC
      LIMIT $3 OFFSET $4
    `;
    
    const stockLevels = await this.db.query(query, [warehouseId, userId, limit, offset]);

    return {
      data: stockLevels,
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

  async getWarehousesByIds(warehouseIds: string[], userId: number): Promise<Warehouse[]> {
    if (warehouseIds.length === 0) return [];
    
    const placeholders = warehouseIds.map((_, index) => `$${index + 2}`).join(',');
    const query = `
      SELECT *
      FROM warehouse
      WHERE warehouse_id IN (${placeholders}) AND belongs_to = $1
    `;
    
    return await this.db.query(query, [userId, ...warehouseIds]);
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}