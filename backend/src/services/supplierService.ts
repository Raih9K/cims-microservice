import { Database } from '@/database/connection';
import { Supplier } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export class SupplierService {
  private db = Database.getInstance();

  async getAllSuppliers(userId: number, params: any) {
    const { page = 1, limit = 20, sortBy = 'supplier_name', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM suppliers
      WHERE created_by = $1
    `;
    const countResult = await this.db.query(countQuery, [userId]);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT *
      FROM suppliers
      WHERE created_by = $1
      ORDER BY ${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;
    
    const suppliers = await this.db.query(query, [userId, limit, offset]);

    return {
      data: suppliers,
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

  async getSupplierById(supplierId: string, userId: number): Promise<Supplier | null> {
    const query = `
      SELECT *
      FROM suppliers
      WHERE supplier_id = $1 AND created_by = $2
    `;
    
    const result = await this.db.query(query, [supplierId, userId]);
    return result.length > 0 ? result[0] : null;
  }

  async createSupplier(supplierData: Partial<Supplier>, userId: number): Promise<Supplier> {
    const {
      supplier_code,
      supplier_name,
      contact_person_name,
      email_address,
      phone_number,
      address,
      country,
      state,
      city,
      zip_code
    } = supplierData;

    const existingCode = await this.db.query(
      'SELECT supplier_id FROM suppliers WHERE supplier_code = $1 AND created_by = $2',
      [supplier_code, userId]
    );
    if (existingCode.length > 0) {
      throw new Error('Supplier code already exists');
    }

    const supplierId = uuidv4();

    const query = `
      INSERT INTO suppliers (
        supplier_id, supplier_code, supplier_name, contact_person_name, 
        email_address, phone_number, address, country, state, city, 
        zip_code, created_by, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      supplierId,
      supplier_code,
      supplier_name,
      contact_person_name || null,
      email_address || null,
      phone_number || null,
      address || null,
      country || null,
      state || null,
      city || null,
      zip_code || null,
      userId
    ]);
    
    return result[0];
  }

  async updateSupplier(supplierId: string, supplierData: Partial<Supplier>, userId: number): Promise<Supplier | null> {
    const existingSupplier = await this.getSupplierById(supplierId, userId);
    if (!existingSupplier) {
      return null;
    }

    const {
      supplier_code,
      supplier_name,
      contact_person_name,
      email_address,
      phone_number,
      address,
      country,
      state,
      city,
      zip_code
    } = supplierData;

    if (supplier_code && supplier_code !== existingSupplier.supplier_code) {
      const existingCode = await this.db.query(
        'SELECT supplier_id FROM suppliers WHERE supplier_code = $1 AND created_by = $2 AND supplier_id != $3',
        [supplier_code, userId, supplierId]
      );
      if (existingCode.length > 0) {
        throw new Error('Supplier code already exists');
      }
    }

    const query = `
      UPDATE suppliers
      SET 
        supplier_code = COALESCE($1, supplier_code),
        supplier_name = COALESCE($2, supplier_name),
        contact_person_name = COALESCE($3, contact_person_name),
        email_address = COALESCE($4, email_address),
        phone_number = COALESCE($5, phone_number),
        address = COALESCE($6, address),
        country = COALESCE($7, country),
        state = COALESCE($8, state),
        city = COALESCE($9, city),
        zip_code = COALESCE($10, zip_code),
        updated_at = CURRENT_TIMESTAMP
      WHERE supplier_id = $11 AND created_by = $12
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      supplier_code,
      supplier_name,
      contact_person_name,
      email_address,
      phone_number,
      address,
      country,
      state,
      city,
      zip_code,
      supplierId,
      userId
    ]);
    
    return result.length > 0 ? result[0] : null;
  }

  async deleteSupplier(supplierId: string, userId: number): Promise<boolean> {
    const purchaseOrders = await this.db.query(
      'SELECT COUNT(*) as count FROM purchase_order WHERE supplier_id = $1',
      [supplierId]
    );

    if (parseInt(purchaseOrders[0].count) > 0) {
      throw new Error('Cannot delete supplier with existing purchase orders');
    }

    const query = 'DELETE FROM suppliers WHERE supplier_id = $1 AND created_by = $2';
    const result = await this.db.query(query, [supplierId, userId]);
    
    return result.rowCount > 0;
  }

  async searchSuppliers(userId: number, searchTerm: string): Promise<Supplier[]> {
    const query = `
      SELECT *
      FROM suppliers
      WHERE created_by = $1 AND (
        supplier_name ILIKE $2 OR
        supplier_code ILIKE $2 OR
        contact_person_name ILIKE $2 OR
        email_address ILIKE $2 OR
        phone_number ILIKE $2
      )
      ORDER BY supplier_name ASC
      LIMIT 50
    `;
    
    return await this.db.query(query, [userId, `%${searchTerm}%`]);
  }

  async getSupplierPurchaseOrders(supplierId: string, userId: number, params: any) {
    const { page = 1, limit = 20, sortBy = 'created_at', sortOrder = 'desc' } = params;
    const offset = (page - 1) * limit;

    const supplierExists = await this.getSupplierById(supplierId, userId);
    if (!supplierExists) {
      throw new Error('Supplier not found');
    }

    const countQuery = `
      SELECT COUNT(*) as total
      FROM purchase_order
      WHERE supplier_id = $1
    `;
    const countResult = await this.db.query(countQuery, [supplierId]);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT *
      FROM purchase_order
      WHERE supplier_id = $1
      ORDER BY ${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;
    
    const purchaseOrders = await this.db.query(query, [supplierId, limit, offset]);

    for (const po of purchaseOrders) {
      const itemsQuery = `
        SELECT poi.*, si.sku, si.title
        FROM purchase_order_item poi
        JOIN stock_item si ON poi.stock_item_id = si.stock_item_id
        WHERE poi.purchase_order_id = $1
      `;
      po.items = await this.db.query(itemsQuery, [po.purchase_order_id]);
    }

    return {
      data: purchaseOrders,
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

  async getSuppliersByIds(supplierIds: string[], userId: number): Promise<Supplier[]> {
    if (supplierIds.length === 0) return [];
    
    const placeholders = supplierIds.map((_, index) => `$${index + 2}`).join(',');
    const query = `
      SELECT *
      FROM suppliers
      WHERE supplier_id IN (${placeholders}) AND created_by = $1
    `;
    
    return await this.db.query(query, [userId, ...supplierIds]);
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}