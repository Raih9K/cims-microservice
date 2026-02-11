import { Database } from '@/database/connection';

export class DashboardService {
  private db = Database.getInstance();

  async getOverview(userId: number, days: number): Promise<any> {
    const queries = {
      totalProducts: `
        SELECT COUNT(*) as count 
        FROM stock_item 
        WHERE belongs_to = $1 AND is_deleted = false
      `,
      activeProducts: `
        SELECT COUNT(*) as count 
        FROM stock_item 
        WHERE belongs_to = $1 AND is_deleted = false AND status = 'active'
      `,
      totalStock: `
        SELECT COALESCE(SUM(available_quantity), 0) as total
        FROM stock_level sl
        JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
        WHERE si.belongs_to = $1
      `,
      lowStockItems: `
        SELECT COUNT(DISTINCT sl.stock_item_id) as count
        FROM stock_level sl
        JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
        WHERE si.belongs_to = $1 
        AND sl.available_quantity <= sl.minimum_level 
        AND si.status = 'active'
      `,
      totalListings: `
        SELECT COUNT(*) as count
        FROM listing l
        JOIN channel c ON l.channel_id = c.channel_id
        WHERE c.belongs_to = $1
      `,
      activeListings: `
        SELECT COUNT(*) as count
        FROM listing l
        JOIN channel c ON l.channel_id = c.channel_id
        WHERE c.belongs_to = $1 AND l.status = 'active'
      `,
      totalOrders: `
        SELECT COUNT(*) as count
        FROM bc_orders bo
        JOIN bc_stores bs ON bo.store_id = bs.id
        WHERE bs.store_hash IN (
          SELECT marketplace_data->>'store_hash' 
          FROM channel 
          WHERE belongs_to = $1 AND marketplace = 'bigcommerce'
        )
        AND bo.created_at >= NOW() - INTERVAL '${days} days'
      `,
      totalRevenue: `
        SELECT COALESCE(SUM(total_amount), 0) as total
        FROM bc_orders bo
        JOIN bc_stores bs ON bo.store_id = bs.id
        WHERE bs.store_hash IN (
          SELECT marketplace_data->>'store_hash' 
          FROM channel 
          WHERE belongs_to = $1 AND marketplace = 'bigcommerce'
        )
        AND bo.created_at >= NOW() - INTERVAL '${days} days'
      `,
      pendingPOs: `
        SELECT COUNT(*) as count
        FROM purchase_order po
        JOIN suppliers s ON po.supplier_id = s.supplier_id
        WHERE s.created_by = $1 AND po.status = 'pending'
      `,
    };

    const results: any = {};
    
    for (const [key, query] of Object.entries(queries)) {
      const result = await this.db.query(query, [userId]);
      results[key] = parseInt(result[0]?.count || result[0]?.total || 0);
    }

    const stockValueQuery = `
      SELECT 
        COALESCE(SUM(sl.available_quantity * COALESCE(si.cost_price, 0)), 0) as total_value
      FROM stock_level sl
      JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
      WHERE si.belongs_to = $1
    `;
    const stockValueResult = await this.db.query(stockValueQuery, [userId]);
    results.totalStockValue = parseFloat(stockValueResult[0]?.total_value || 0);

    return results;
  }

  async getInventoryAnalytics(userId: number): Promise<any> {
    const queries = {
      stockTypeDistribution: `
        SELECT stock_type, COUNT(*) as count
        FROM stock_item
        WHERE belongs_to = $1 AND is_deleted = false
        GROUP BY stock_type
        ORDER BY count DESC
      `,
      itemConditionDistribution: `
        SELECT condition, COUNT(*) as count
        FROM stock_item
        WHERE belongs_to = $1 AND is_deleted = false
        GROUP BY condition
        ORDER BY count DESC
      `,
      statusDistribution: `
        SELECT status, COUNT(*) as count
        FROM stock_item
        WHERE belongs_to = $1 AND is_deleted = false
        GROUP BY status
        ORDER BY count DESC
      `,
      warehouseDistribution: `
        SELECT 
          w.name,
          COALESCE(SUM(sl.available_quantity), 0) as total_stock,
          COUNT(DISTINCT sl.stock_item_id) as unique_items
        FROM warehouse w
        LEFT JOIN stock_level sl ON w.warehouse_id = sl.warehouse_id
        LEFT JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
        WHERE w.belongs_to = $1
        GROUP BY w.warehouse_id, w.name
        ORDER BY total_stock DESC
      `,
      brandDistribution: `
        SELECT 
          b.brand_name,
          COUNT(si.stock_item_id) as product_count
        FROM brand b
        LEFT JOIN stock_item si ON b.brand_id = si.brand_id
        WHERE b.created_by = $1 AND si.is_deleted = false
        GROUP BY b.brand_id, b.brand_name
        ORDER BY product_count DESC
        LIMIT 10
      `,
    };

    const results: any = {};
    
    for (const [key, query] of Object.entries(queries)) {
      results[key] = await this.db.query(query, [userId]);
    }

    return results;
  }

  async getSalesAnalytics(userId: number, days: number): Promise<any> {
    const queries = {
      salesTrend: `
        SELECT 
          DATE_TRUNC('day', bo.created_at) as date,
          COUNT(*) as orders,
          SUM(total_amount) as revenue
        FROM bc_orders bo
        JOIN bc_stores bs ON bo.store_id = bs.id
        WHERE bs.store_hash IN (
          SELECT marketplace_data->>'store_hash' 
          FROM channel 
          WHERE belongs_to = $1 AND marketplace = 'bigcommerce'
        )
        AND bo.created_at >= NOW() - INTERVAL '${days} days'
        GROUP BY DATE_TRUNC('day', bo.created_at)
        ORDER BY date ASC
      `,
      topSellingCategories: `
        SELECT 
          bc.name as category,
          COUNT(DISTINCT bcop.product_id) as products_sold,
          SUM(bcop.quantity) as total_quantity,
          SUM(bcop.total) as total_revenue
        FROM bc_order_items bcop
        JOIN bc_orders bo ON bcop.order_id = bo.id
        JOIN bc_stores bs ON bo.store_id = bs.id
        JOIN bc_products bp ON bcop.product_id = bp.id
        LEFT JOIN bc_categories bc ON bp.category_id = bc.id
        WHERE bs.store_hash IN (
          SELECT marketplace_data->>'store_hash' 
          FROM channel 
          WHERE belongs_to = $1 AND marketplace = 'bigcommerce'
        )
        AND bo.created_at >= NOW() - INTERVAL '${days} days'
        GROUP BY bc.category_id, bc.name
        ORDER BY total_revenue DESC
        LIMIT 10
      `,
    };

    const results: any = {};
    
    for (const [key, query] of Object.entries(queries)) {
      results[key] = await this.db.query(query, [userId]);
    }

    return results;
  }

  async getLowStockItems(userId: number, limit: number): Promise<any[]> {
    const query = `
      SELECT 
        si.stock_item_id,
        si.sku,
        si.title,
        si.barcode,
        sl.warehouse_id,
        w.name as warehouse_name,
        sl.available_quantity,
        sl.minimum_level,
        (sl.minimum_level - sl.available_quantity) as needed_quantity
      FROM stock_level sl
      JOIN stock_item si ON sl.stock_item_id = si.stock_item_id
      JOIN warehouse w ON sl.warehouse_id = w.warehouse_id
      WHERE si.belongs_to = $1 
      AND sl.available_quantity <= sl.minimum_level 
      AND si.status = 'active'
      ORDER BY needed_quantity DESC, si.sku ASC
      LIMIT $2
    `;
    
    return await this.db.query(query, [userId, limit]);
  }

  async getTopSellingItems(userId: number, days: number, limit: number): Promise<any[]> {
    const query = `
      SELECT 
        bp.sku,
        bp.name as title,
        COUNT(DISTINCT bcop.order_id) as orders_count,
        SUM(bcop.quantity) as total_quantity,
        SUM(bcop.total) as total_revenue,
        AVG(bcop.price) as avg_price
      FROM bc_order_items bcop
      JOIN bc_orders bo ON bcop.order_id = bo.id
      JOIN bc_stores bs ON bo.store_id = bs.id
      JOIN bc_products bp ON bcop.product_id = bp.id
      WHERE bs.store_hash IN (
        SELECT marketplace_data->>'store_hash' 
        FROM channel 
        WHERE belongs_to = $1 AND marketplace = 'bigcommerce'
      )
      AND bo.created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY bp.id, bp.sku, bp.name
      ORDER BY total_revenue DESC
      LIMIT $2
    `;
    
    return await this.db.query(query, [userId, limit]);
  }

  async getChannelPerformance(userId: number, days: number): Promise<any[]> {
    const query = `
      SELECT 
        c.channel_id,
        c.name,
        c.marketplace,
        COUNT(DISTINCT l.listing_id) as total_listings,
        COUNT(DISTINCT CASE WHEN l.status = 'active' THEN l.listing_id END) as active_listings,
        COALESCE(order_stats.orders_count, 0) as orders_count,
        COALESCE(order_stats.revenue, 0) as revenue
      FROM channel c
      LEFT JOIN listing l ON c.channel_id = l.channel_id
      LEFT JOIN LATERAL (
        SELECT 
          COUNT(*) as orders_count,
          SUM(total_amount) as revenue
        FROM bc_orders bo
        WHERE bo.store_id = (
          SELECT id FROM bc_stores 
          WHERE store_hash = c.marketplace_data->>'store_hash'
        )
        AND bo.created_at >= NOW() - INTERVAL '${days} days'
      ) order_stats ON true
      WHERE c.belongs_to = $1
      GROUP BY c.channel_id, c.name, c.marketplace, order_stats.orders_count, order_stats.revenue
      ORDER BY revenue DESC
    `;
    
    return await this.db.query(query, [userId]);
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}