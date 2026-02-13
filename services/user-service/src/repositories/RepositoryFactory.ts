import { config } from '../config';
import { IUserRepository } from '../interfaces/IUserRepository';
import { JsonUserRepository } from './JsonUserRepository';
import { SqlUserRepository } from './SqlUserRepository';

export class RepositoryFactory {
  static createUserRepository(): IUserRepository {
    if (config.dataMode === 'mock') {
      console.log('📦 Using JSON Repository (Mock Mode)');
      return new JsonUserRepository();
    } else {
      console.log('🗄️  Using SQL Repository (PostgreSQL)');
      return new SqlUserRepository();
    }
  }
}
