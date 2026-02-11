import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from '@/config';
import { errorHandler, notFoundHandler, requestLogger } from '@/middleware/errorHandler';
import authRoutes from '@/routes/auth';
import stockItemRoutes from '@/routes/stockItems';
import brandRoutes from '@/routes/brands';
import warehouseRoutes from '@/routes/warehouses';
import supplierRoutes from '@/routes/suppliers';
import channelRoutes from '@/routes/channels';
import listingRoutes from '@/routes/listings';
import imageRoutes from '@/routes/images';
import purchaseOrderRoutes from '@/routes/purchaseOrders';
import dashboardRoutes from '@/routes/dashboard';

const app = express();

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(cors({
  origin: config.cors.origins,
  credentials: config.cors.credentials,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CIMS API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/stock-items', stockItemRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 CIMS API Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;