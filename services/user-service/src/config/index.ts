import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  dataMode: (process.env.DATA_MODE || 'mock') as 'mock' | 'sql',
  mockDataPath: process.env.MOCK_DATA_PATH || './data/users.json',
  databaseUrl: process.env.DATABASE_URL || '',
};

export const validateConfig = () => {
  if (config.dataMode === 'sql' && !config.databaseUrl) {
    throw new Error('DATABASE_URL is required when DATA_MODE=sql');
  }

  console.log(`🔧 Configuration loaded:`);
  console.log(`   - Data Mode: ${config.dataMode}`);
  console.log(`   - Port: ${config.port}`);
  if (config.dataMode === 'mock') {
    console.log(`   - Mock Data Path: ${config.mockDataPath}`);
  }
};
