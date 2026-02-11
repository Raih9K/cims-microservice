import bcrypt from 'bcryptjs';
import { Database } from '@/database/connection';
import { User, JwtPayload } from '@/types';

export class UserService {
  private db = Database.getInstance();

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    company_name?: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const sql = `
      INSERT INTO users (username, email, password_hash, first_name, last_name, company_name)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, username, email, first_name, last_name, company_name, created_at, updated_at, is_active
    `;
    
    const params = [
      userData.username,
      userData.email,
      hashedPassword,
      userData.first_name || null,
      userData.last_name || null,
      userData.company_name || null,
    ];
    
    const result = await this.db.query(sql, params);
    return result[0];
  }

  async findByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
    const sql = 'SELECT * FROM users WHERE email = $1 AND is_active = true';
    const result = await this.db.query(sql, [email]);
    return result[0] || null;
  }

  async findById(userId: number): Promise<User | null> {
    const sql = `
      SELECT user_id, username, email, first_name, last_name, company_name, created_at, updated_at, is_active
      FROM users 
      WHERE user_id = $1 AND is_active = true
    `;
    const result = await this.db.query(sql, [userId]);
    return result[0] || null;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateUser(userId: number, updates: Partial<{
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    company_name: string;
  }>): Promise<User | null> {
    const setClause = [];
    const params = [];
    let paramIndex = 1;

    if (updates.username) {
      setClause.push(`username = $${paramIndex++}`);
      params.push(updates.username);
    }
    if (updates.email) {
      setClause.push(`email = $${paramIndex++}`);
      params.push(updates.email);
    }
    if (updates.first_name !== undefined) {
      setClause.push(`first_name = $${paramIndex++}`);
      params.push(updates.first_name);
    }
    if (updates.last_name !== undefined) {
      setClause.push(`last_name = $${paramIndex++}`);
      params.push(updates.last_name);
    }
    if (updates.company_name !== undefined) {
      setClause.push(`company_name = $${paramIndex++}`);
      params.push(updates.company_name);
    }

    if (setClause.length === 0) {
      return this.findById(userId);
    }

    setClause.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(userId);

    const sql = `
      UPDATE users 
      SET ${setClause.join(', ')}
      WHERE user_id = $${paramIndex}
      RETURNING user_id, username, email, first_name, last_name, company_name, created_at, updated_at, is_active
    `;

    const result = await this.db.query(sql, params);
    return result[0] || null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const sql = 'UPDATE users SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1';
    const result = await this.db.query(sql, [userId]);
    return result.length > 0;
  }
}