import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read service target URLs from env with local fallbacks
  const useMockDb = process.env.USE_MOCK_DB === 'true';
  const mockDbUrl = process.env.MOCK_DB_URL || 'http://localhost:4000';

  const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
  const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
  const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3003';
  const SHOPIFY_SERVICE_URL = process.env.SHOPIFY_SERVICE_URL || 'http://localhost:3004';
  const MARKETPLACE_SERVICE_URL = process.env.MARKETPLACE_SERVICE_URL || 'http://localhost:3005';
  const AUDIT_SERVICE_URL = process.env.AUDIT_SERVICE_URL || 'http://localhost:3006';
  const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3007';
  const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3008';

  app.use(
    '/api',
    createProxyMiddleware({
      target: useMockDb ? mockDbUrl : USER_SERVICE_URL,
      router: (req) => {
        if (useMockDb) {
          return mockDbUrl;
        }

        const url: string = req.url || '';
        const full = url.startsWith('/') ? '/api' + url : '/api/' + url;

        // Routing endpoints mapping
        const inventoryEndpoints = [
          '/api/warehouses',
          '/api/inventory',
          '/api/stock-levels',
        ];

        const productEndpoints = [
          '/api/products',
          '/api/categories',
          '/api/brands',
          '/api/suppliers',
          '/api/attributes',
        ];

        const shopifyEndpoints = [
          '/api/shopify',
        ];

        const marketplaceEndpoints = [
          '/api/marketplace',
          '/api/listings',
          '/api/channels',
        ];

        const auditEndpoints = [
          '/api/audit-logs',
        ];

        const orderEndpoints = [
          '/api/orders',
        ];

        const notificationEndpoints = [
          '/api/notifications',
        ];

        if (inventoryEndpoints.some((p) => full.startsWith(p))) {
          return INVENTORY_SERVICE_URL;
        }
        if (productEndpoints.some((p) => full.startsWith(p))) {
          return PRODUCT_SERVICE_URL;
        }
        if (shopifyEndpoints.some((p) => full.startsWith(p))) {
          return SHOPIFY_SERVICE_URL;
        }
        if (marketplaceEndpoints.some((p) => full.startsWith(p))) {
          return MARKETPLACE_SERVICE_URL;
        }
        if (auditEndpoints.some((p) => full.startsWith(p))) {
          return AUDIT_SERVICE_URL;
        }
        if (orderEndpoints.some((p) => full.startsWith(p))) {
          return ORDER_SERVICE_URL;
        }
        if (notificationEndpoints.some((p) => full.startsWith(p))) {
          return NOTIFICATION_SERVICE_URL;
        }

        return USER_SERVICE_URL;
      },
      changeOrigin: true,
      pathRewrite: (path: string) => {
        if (useMockDb) {
          // json-server serves database tables directly on root paths (e.g. /products)
          // Express middleware mounted on '/api' already strips '/api' from path
          return path;
        }
        // Microservices expect the '/api' prefix (e.g. /api/products)
        return path.startsWith('/') ? '/api' + path : '/api/' + path;
      },
    }),
  );

  app.enableCors();
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));
