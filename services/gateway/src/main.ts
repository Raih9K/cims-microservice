import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      router: (req) => {
        const url: string = req.url || '';
        const full = url.startsWith('/') ? '/api' + url : '/api/' + url;

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

        if (inventoryEndpoints.some((p) => full.startsWith(p)))
          return 'http://localhost:3003';
        if (productEndpoints.some((p) => full.startsWith(p)))
          return 'http://localhost:3002';

        return 'http://localhost:3001';
      },
      changeOrigin: true,
      pathRewrite: (path: string) =>
        path.startsWith('/') ? '/api' + path : '/api/' + path,
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));
