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
        const inv = [
          '/api/products',
          '/api/warehouses',
          '/api/categories',
          '/api/brands',
          '/api/inventory',
          '/api/suppliers',
          '/api/attributes',
          '/api/stock-levels',
        ];
        if (inv.some((p) => full.startsWith(p))) return 'http://localhost:3002';
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
