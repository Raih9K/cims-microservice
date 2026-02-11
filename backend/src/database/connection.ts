import { Pool, PoolConfig } from 'pg';
import mysql from 'mysql2/promise';
import { config } from './index';

export interface DatabaseConnection {
  query: (sql: string, params?: any[]) => Promise<any>;
  close: () => Promise<void>;
  transaction: (callback: (conn: any) => Promise<any>) => Promise<any>;
}

class PostgreSQLConnection implements DatabaseConnection {
  private pool: Pool;

  constructor() {
    const poolConfig: PoolConfig = {
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.username,
      password: config.database.password,
      max: config.database.maxConnections,
      connectionTimeoutMillis: config.database.connectionTimeout,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
    };

    this.pool = new Pool(poolConfig);
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async transaction(callback: (conn: any) => Promise<any>): Promise<any> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

class MySQLConnection implements DatabaseConnection {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.username,
      password: config.database.password,
      connectionLimit: config.database.maxConnections,
      acquireTimeout: config.database.connectionTimeout,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
    });
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const [rows] = await this.pool.execute(sql, params);
    return rows;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async transaction(callback: (conn: any) => Promise<any>): Promise<any> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export class Database {
  private static instance: DatabaseConnection;

  static getInstance(): DatabaseConnection {
    if (!Database.instance) {
      if (config.database.type === 'mysql') {
        Database.instance = new MySQLConnection();
      } else {
        Database.instance = new PostgreSQLConnection();
      }
    }
    return Database.instance;
  }

  static async closeConnection(): Promise<void> {
    if (Database.instance) {
      await Database.instance.close();
      Database.instance = null as any;
    }
  }
}

export default Database;