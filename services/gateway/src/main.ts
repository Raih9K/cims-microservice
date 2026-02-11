import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const services = [
    {
      context: ['/api/auth', '/api/users', '/api/company', '/api/team'],
      target: process.env.USER_SERVICE_URL || 'http://user-service:3001',
    },
    {
      context: ['/api/products', '/api/categories', '/api/brands'],
      target: process.env.PRODUCT_SERVICE_URL || 'http://product-service:3002',
    },
    {
      context: ['/api/inventory', '/api/stock-levels', '/api/warehouses'],
      target:
        process.env.INVENTORY_SERVICE_URL || 'http://inventory-service:3003',
    },
    {
      context: ['/api/shopify'],
      target: process.env.SHOPIFY_SERVICE_URL || 'http://shopify-service:3004',
    },
    {
      context: ['/api/channels', '/api/listings'],
      target:
        process.env.MARKETPLACE_SERVICE_URL ||
        'http://marketplace-service:3005',
    },
    {
      context: ['/api/audit-logs'],
      target: process.env.AUDIT_SERVICE_URL || 'http://audit-service:3006',
    },
    {
      context: ['/api/orders'],
      target: process.env.ORDER_SERVICE_URL || 'http://order-service:3007',
    },
    {
      context: ['/api/notifications'],
      target:
        process.env.NOTIFICATION_SERVICE_URL ||
        'http://notification-service:3008',
    },
  ];

  services.forEach((service) => {
    app.use(
      service.context,
      createProxyMiddleware({
        target: service.target,
        changeOrigin: true,
      }),
    );
  });

  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
