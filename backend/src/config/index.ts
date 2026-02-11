import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  database: {
    type: process.env.DB_TYPE || 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'cims_db',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000', 10),
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  
  // File Upload Configuration
  upload: {
    directory: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp'
    ],
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  
  // CORS Configuration
  cors: {
    origins: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
  
  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log',
  },
  
  // External API Keys
  apis: {
    ebay: {
      appId: process.env.EBAY_APP_ID || '',
    },
    shopify: {
      apiKey: process.env.SHOPIFY_API_KEY || '',
    },
    bigcommerce: {
      apiKey: process.env.BIGCOMMERCE_API_KEY || '',
    },
  },
  
  // Redis Configuration (Optional)
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  
  // Email Configuration (Optional)
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};