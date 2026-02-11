import { Database } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

export class PurchaseOrderService {
  private db = Database.getInstance();

  async getAllPurchaseOrders(userId: number, filters: any, params: any) {
    const { page = 1, limit = 20, sortBy = 'created_at', sortOrder = 'desc' } = params;
    const offset = (page - 1) * limit;

    let whereClause = `
      WHERE po.supplier_id IN (
        SELECT supplier_id FROM suppliers WHERE created_by = $1
      )
    `;
    let queryParams: any[] = [userId];
    let paramIndex = 2;

    if (filters.supplier_id) {
      whereClause += ` AND po.supplier_id = $${paramIndex++}`;
      queryParams.push(filters.supplier_id);
    }

    if (filters.status) {
      whereClause += ` AND po.status = $${paramIndex++}`;
      queryParams.push(filters.status);
    }

    const countQuery = `
      SELECT COUNT(*) as total
      FROM purchase_order po
      ${whereClause}
    `;
    const countResult = await this.db.query(countQuery, queryParams);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT 
        po.*,
        s.supplier_name,
        s.supplier_code
      FROM purchase_order po
      JOIN suppliers s ON po.supplier_id = s.supplier_id
      ${whereClause}
      ORDER BY po.${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    
    queryParams.push(limit, offset);
    const purchaseOrders = await this.db.query(query, queryParams);

    for (const po of purchaseOrders) {
      po.items = await this.getPurchaseOrderItems(po.purchase_order_id);
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

  async getPurchaseOrderById(purchaseOrderId: string, userId: number): Promise<any> {
    const query = `
      SELECT 
        po.*,
        s.supplier_name,
        s.supplier_code,
        s.contact_person_name,
        s.email_address,
        s.phone_number,
        s.address,
        s.country,
        s.state,
        s.city,
        s.zip_code
      FROM purchase_order po
      JOIN suppliers s ON po.supplier_id = s.supplier_id
      WHERE po.purchase_order_id = $1 AND s.created_by = $2
    `;
    
    const result = await this.db.query(query, [purchaseOrderId, userId]);
    
    if (result.length === 0) {
      return null;
    }

    const purchaseOrder = result[0];
    purchaseOrder.items = await this.getPurchaseOrderItems(purchaseOrderId);
    
    return purchaseOrder;
  }

  async createPurchaseOrder(purchaseOrderData: any, userId: number): Promise<any> {
    const { supplier_id, status = 'pending', items } = purchaseOrderData;

    const supplierExists = await this.db.query(
      'SELECT supplier_id FROM suppliers WHERE supplier_id = $1 AND created_by = $2',
      [supplier_id, userId]
    );
    if (supplierExists.length === 0) {
      throw new Error('Supplier not found or access denied');
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('At least one item is required');
    }

    const purchaseOrderId = uuidv4();

    return await this.db.transaction(async (conn: any) => {
      const poQuery = `
        INSERT INTO purchase_order (purchase_order_id, supplier_id, status, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *
      `;
      
      const poResult = await conn.query(poQuery, [purchaseOrderId, supplier_id, status]);
      const purchaseOrder = poResult[0];

      for (const item of items) {
        const purchaseOrderItemId = uuidv4();
        
        const stockItemExists = await conn.query(
          'SELECT stock_item_id FROM stock_item WHERE stock_item_id = $1 AND belongs_to = $2',
          [item.stock_item_id, userId]
        );
        if (stockItemExists.length === 0) {
          throw new Error(`Stock item ${item.stock_item_id} not found or access denied`);
        }

        const itemQuery = `
          INSERT INTO purchase_order_item (
            purchase_order_item_id, purchase_order_id, stock_item_id, 
            quantity_ordered, created_at
          )
          VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        `;
        
        await conn.query(itemQuery, [
          purchaseOrderItemId,
          purchaseOrderId,
          item.stock_item_id,
          item.quantity_ordered
        ]);
      }

      purchaseOrder.items = await this.getPurchaseOrderItems(purchaseOrderId);
      return purchaseOrder;
    });
  }

  async updatePurchaseOrder(purchaseOrderId: string, purchaseOrderData: any, userId: number): Promise<any> {
    const existingPO = await this.getPurchaseOrderById(purchaseOrderId, userId);
    if (!existingPO) {
      return null;
    }

    const { status } = purchaseOrderData;

    const query = `
      UPDATE purchase_order
      SET status = COALESCE($1, status), updated_at = CURRENT_TIMESTAMP
      WHERE purchase_order_id = $2
      RETURNING *
    `;
    
    const result = await this.db.query(query, [status, purchaseOrderId]);
    
    if (result.length > 0) {
      const purchaseOrder = result[0];
      purchaseOrder.items = await this.getPurchaseOrderItems(purchaseOrderId);
      return purchaseOrder;
    }
    
    return null;
  }

  async deletePurchaseOrder(purchaseOrderId: string, userId: number): Promise<boolean> {
    const purchaseOrder = await this.getPurchaseOrderById(purchaseOrderId, userId);
    if (!purchaseOrder) {
      return false;
    }

    if (purchaseOrder.status !== 'pending') {
      throw new Error('Cannot delete purchase order that is not in pending status');
    }

    return await this.db.transaction(async (conn: any) => {
      await conn.query(
        'DELETE FROM purchase_order_item WHERE purchase_order_id = $1',
        [purchaseOrderId]
      );

      const result = await conn.query(
        'DELETE FROM purchase_order WHERE purchase_order_id = $1',
        [purchaseOrderId]
      );

      return result.rowCount > 0;
    });
  }

  async receivePurchaseOrder(purchaseOrderId: string, items: any[], userId: number): Promise<any> {
    const purchaseOrder = await this.getPurchaseOrderById(purchaseOrderId, userId);
    if (!purchaseOrder) {
      return null;
    }

    if (purchaseOrder.status !== 'confirmed') {
      throw new Error('Can only receive purchase orders that are confirmed');
    }

    return await this.db.transaction(async (conn: any) => {
      for (const receivedItem of items) {
        const { stock_item_id, quantity_received, warehouse_id } = receivedItem;

        const existingItem = purchaseOrder.items.find((item: any) => item.stock_item_id === stock_item_id);
        if (!existingItem) {
          throw new Error(`Item ${stock_item_id} not found in purchase order`);
        }

        if (quantity_received > existingItem.quantity_ordered) {
          throw new Error(`Received quantity exceeds ordered quantity for item ${stock_item_id}`);
        }

        const stockLevelExists = await conn.query(
          'SELECT id FROM stock_level WHERE stock_item_id = $1 AND warehouse_id = $2',
          [stock_item_id, warehouse_id]
        );

        if (stockLevelExists.length === 0) {
          await conn.query(`
            INSERT INTO stock_level (id, stock_item_id, warehouse_id, available_quantity, minimum_level, updated_at)
            VALUES ($1, $2, $3, $4, 0, CURRENT_TIMESTAMP)
          `, [uuidv4(), stock_item_id, warehouse_id, quantity_received]);
        } else {
          await conn.query(`
            UPDATE stock_level 
            SET available_quantity = available_quantity + $1, updated_at = CURRENT_TIMESTAMP
            WHERE stock_item_id = $2 AND warehouse_id = $3
          `, [quantity_received, stock_item_id, warehouse_id]);
        }
      }

      const updatePOQuery = `
        UPDATE purchase_order
        SET status = 'received', updated_at = CURRENT_TIMESTAMP
        WHERE purchase_order_id = $1
        RETURNING *
      `;
      
      const result = await conn.query(updatePOQuery, [purchaseOrderId]);
      const updatedPO = result[0];
      updatedPO.items = await this.getPurchaseOrderItems(purchaseOrderId);
      
      return updatedPO;
    });
  }

  async updatePurchaseOrderStatus(purchaseOrderId: string, status: string, userId: number): Promise<any> {
    const purchaseOrder = await this.getPurchaseOrderById(purchaseOrderId, userId);
    if (!purchaseOrder) {
      return null;
    }

    const validTransitions: any = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['shipped', 'cancelled'],
      'shipped': ['received'],
      'received': [],
      'cancelled': []
    };

    if (!validTransitions[purchaseOrder.status].includes(status)) {
      throw new Error(`Cannot transition from ${purchaseOrder.status} to ${status}`);
    }

    const query = `
      UPDATE purchase_order
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE purchase_order_id = $2
      RETURNING *
    `;
    
    const result = await this.db.query(query, [status, purchaseOrderId]);
    
    if (result.length > 0) {
      const updatedPO = result[0];
      updatedPO.items = await this.getPurchaseOrderItems(purchaseOrderId);
      return updatedPO;
    }
    
    return null;
  }

  private async getPurchaseOrderItems(purchaseOrderId: string): Promise<any[]> {
    const query = `
      SELECT 
        poi.*,
        si.sku,
        si.title,
        si.description,
        si.barcode,
        si.condition
      FROM purchase_order_item poi
      JOIN stock_item si ON poi.stock_item_id = si.stock_item_id
      WHERE poi.purchase_order_id = $1
      ORDER BY poi.created_at ASC
    `;
    
    return await this.db.query(query, [purchaseOrderId]);
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}