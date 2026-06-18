import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly services = [
    { name: 'user-service', url: (process.env.USER_SERVICE_URL || 'http://localhost:3001') + '/api' },
    { name: 'product-service', url: (process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002') + '/api' },
    { name: 'inventory-service', url: (process.env.INVENTORY_SERVICE_URL || 'http://localhost:3003') + '/api' },
    { name: 'shopify-service', url: (process.env.SHOPIFY_SERVICE_URL || 'http://localhost:3004') + '/api' },
    { name: 'marketplace-service', url: (process.env.MARKETPLACE_SERVICE_URL || 'http://localhost:3005') + '/api' },
    { name: 'audit-service', url: (process.env.AUDIT_SERVICE_URL || 'http://localhost:3006') + '/api' },
    { name: 'order-service', url: (process.env.ORDER_SERVICE_URL || 'http://localhost:3007') + '/api' },
    { name: 'notification-service', url: (process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3008') + '/api' },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async checkSystemHealth() {
    const results: Record<string, any> = {};
    let systemStatus = 'healthy';

    await Promise.all(
      this.services.map(async (service) => {
        const startTime = Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
          const response = await fetch(service.url, { signal: controller.signal });
          const latencyMs = Date.now() - startTime;
          clearTimeout(timeoutId);

          if (response.ok) {
            const text = await response.text();
            results[service.name] = {
              status: 'up',
              url: service.url,
              latencyMs,
              message: text.trim(),
            };
          } else {
            systemStatus = 'degraded';
            results[service.name] = {
              status: 'error',
              url: service.url,
              statusCode: response.status,
              latencyMs,
            };
          }
        } catch (error: any) {
          clearTimeout(timeoutId);
          systemStatus = 'degraded';
          results[service.name] = {
            status: 'down',
            url: service.url,
            error: error.message,
            latencyMs: Date.now() - startTime,
          };
        }
      }),
    );

    return {
      status: systemStatus,
      timestamp: new Date().toISOString(),
      services: results,
    };
  }
}

