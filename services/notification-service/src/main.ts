import 'dotenv/config';
import * as net from 'net';
import { NestFactory } from '@nestjs/core';

async function checkRedis(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function bootstrap() {
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

  const redisAvailable = await checkRedis(redisHost, redisPort);
  if (!redisAvailable) {
    console.warn(`⚠️  [Notification Service] Redis is not running at ${redisHost}:${redisPort}. In-memory fallback will be used.`);
    process.env.REDIS_AVAILABLE = 'false';
  } else {
    process.env.REDIS_AVAILABLE = 'true';
  }

  // Dynamically import AppModule after setting REDIS_AVAILABLE
  const { AppModule } = await import('./app.module.js');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const port = process.env.PORT || 3008;
  await app.listen(port);
  console.log(`Notification service is running on: ${await app.getUrl()}`);
}
bootstrap();

