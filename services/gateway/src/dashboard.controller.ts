import { Controller, Get, Req, HttpException, HttpStatus } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get('stats')
  async getStats(@Req() req: any) {
    const companyIdStr = req.headers['x-company-id'];
    const companyId = companyIdStr ? parseInt(companyIdStr, 10) : 1;

    try {
      const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
      const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3003';

      // Fetch products
      const productsRes = await fetch(`${PRODUCT_SERVICE_URL}/api/products?companyId=${companyId}`);
      if (!productsRes.ok) {
        throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const productsData = await productsRes.json();
      const products = productsData.data || [];

      // Fetch stock levels
      const stockRes = await fetch(`${INVENTORY_SERVICE_URL}/api/stock-levels?companyId=${companyId}`);
      if (!stockRes.ok) {
        throw new HttpException('Failed to fetch stock levels', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const stockData = await stockRes.json();
      const stockLevels = stockData.data || [];

      // Create a map of variantId -> StockLevel for quick lookup
      const stockMap = new Map<number, any>();
      stockLevels.forEach((sl: any) => {
        stockMap.set(sl.variantId, sl);
      });

      // Compute stats
      const totalProducts = products.length;
      let totalVariants = 0;
      let activeProducts = 0;
      let lowStockProducts = 0;
      let totalStockValue = 0;

      products.forEach((product: any) => {
        if (product.status && product.status.toLowerCase() === 'active') {
          activeProducts++;
        }

        const variants = product.variants || [];
        totalVariants += variants.length;

        if (variants.length === 0) {
          // SIMPLE product
          const price = product.retailPrice ? parseFloat(product.retailPrice) : 0;
          // In some setups, simple product stock is mapped under product.id or a dummy variant
          const stock = stockMap.get(product.id);
          const quantity = stock ? stock.quantity : 0;
          const safetyStock = stock ? stock.safetyStock : 0;

          totalStockValue += price * quantity;
          if (quantity <= safetyStock || quantity < 10) {
            lowStockProducts++;
          }
        } else {
          variants.forEach((variant: any) => {
            const price = variant.sellingPrice ? parseFloat(variant.sellingPrice) : 0;
            const stock = stockMap.get(variant.id);
            const quantity = stock ? stock.quantity : 0;
            const safetyStock = stock ? stock.safetyStock : 0;

            totalStockValue += price * quantity;

            if (quantity <= safetyStock || quantity < 10) {
              lowStockProducts++;
            }
          });
        }
      });

      return {
        status: 'success',
        data: {
          total_products: totalProducts,
          total_variants: totalVariants || totalProducts,
          active_products: activeProducts,
          low_stock_products: lowStockProducts,
          total_stock_value: totalStockValue,
        },
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Failed to aggregate dashboard stats',
      };
    }
  }
}
