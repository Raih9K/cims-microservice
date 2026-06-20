import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';


import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
  const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
  const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3003';
  const SHOPIFY_SERVICE_URL = process.env.SHOPIFY_SERVICE_URL || 'http://localhost:3004';
  const MARKETPLACE_SERVICE_URL = process.env.MARKETPLACE_SERVICE_URL || 'http://localhost:3005';
  const AUDIT_SERVICE_URL = process.env.AUDIT_SERVICE_URL || 'http://localhost:3006';
  const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3007';
  const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3008';

  // SaaS Gatekeeping Middleware (only runs when token is present)
  app.use('/api', async (req: any, res: any, next: any) => {

    // Allow public routes
    const publicPaths = ['/api/auth', '/api/packages', '/api/apply-coupon', '/api/subscribe'];
    if (publicPaths.some((p) => req.path.startsWith(p))) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // Let the microservice handle 401 Unauthorized errors
      return next();
    }

    try {
      // Call user-service to fetch the profile containing subscription status
      const response = await fetch(`${USER_SERVICE_URL}/api/me`, {
        headers: { Authorization: authHeader },
      });

      if (!response.ok) {
        return next();
      }

      const userProfile = await response.json();
      if (userProfile) {
        if (userProfile.company_id) {
          req.headers['x-company-id'] = userProfile.company_id.toString();
        }
        req.headers['x-user-id'] = userProfile.id.toString();
      }
      const packageName = userProfile?.company?.package?.name || 'Starter';

      // Define endpoint restrictions per package
      const path = req.path; // e.g. /shopify/stores

      if (packageName === 'Starter') {
        const forbiddenPrefixes = ['/shopify', '/marketplace', '/listings', '/channels', '/audit-logs', '/orders', '/notifications'];
        if (forbiddenPrefixes.some((p) => path.startsWith(p))) {
          return res.status(403).json({
            success: false,
            message: `Your Starter subscription plan does not include access to this service. Please upgrade your package.`,
          });
        }
      } else if (packageName === 'Pro') {
        const forbiddenPrefixes = ['/audit-logs'];
        if (forbiddenPrefixes.some((p) => path.startsWith(p))) {
          return res.status(403).json({
            success: false,
            message: `Your Pro subscription plan does not include access to audit logs. Please upgrade to Enterprise.`,
          });
        }
      }
    } catch (err) {
      console.error('Gateway subscription check error:', err.message);
      // Fallback: let the request pass through if user-service is temporarily unavailable
    }

    return next();
  });

  const apiProxy = createProxyMiddleware({
      target: USER_SERVICE_URL,
      router: (req) => {
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
        let rewritten = path;
        if (path.startsWith('/listings')) {
          rewritten = '/marketplace' + path;
        } else if (path.startsWith('/channels')) {
          rewritten = '/marketplace' + path;
        }
        return rewritten.startsWith('/') ? '/api' + rewritten : '/api/' + rewritten;
      },
    });

  app.use('/api', (req: any, res: any, next: any) => {
    if (req.originalUrl === '/api/dashboard/stats' || req.path === '/dashboard/stats') {
      return next();
    }
    return apiProxy(req, res, next);
  });

  app.enableCors();
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));
