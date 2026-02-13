import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import {
  Company,
  CreateUserDTO,
  IUserRepository,
  UpdateUserDTO,
  User,
} from '../interfaces/IUserRepository';

export class JsonUserRepository implements IUserRepository {
  private usersPath: string;
  private companiesPath: string;

  constructor() {
    this.usersPath = path.resolve(config.mockDataPath);
    this.companiesPath = path.resolve(
      path.dirname(config.mockDataPath),
      'companies.json',
    );
    this.ensureFilesExist();
  }

  private async ensureFilesExist(): Promise<void> {
    const dir = path.dirname(this.usersPath);
    await fs.mkdir(dir, { recursive: true });

    try {
      await fs.access(this.usersPath);
    } catch {
      await fs.writeFile(this.usersPath, JSON.stringify([], null, 2));
    }
    try {
      await fs.access(this.companiesPath);
    } catch {
      await fs.writeFile(
        this.companiesPath,
        JSON.stringify(
          [
            {
              id: 1,
              name: 'Demo Tech Solutions',
              business_type: 'Technology',
              management_type: 'team',
              subscription_status: 'trial',
              package_id: 1,
            },
          ],
          null,
          2,
        ),
      );
    }
  }

  private async readUsers(): Promise<User[]> {
    const data = await fs.readFile(this.usersPath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(this.usersPath, JSON.stringify(users, null, 2));
  }

  private async readCompanies(): Promise<Company[]> {
    const data = await fs.readFile(this.companiesPath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeCompanies(companies: Company[]): Promise<void> {
    await fs.writeFile(this.companiesPath, JSON.stringify(companies, null, 2));
  }

  async create(data: CreateUserDTO): Promise<User> {
    const users = await this.readUsers();
    const newUser: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      password: data.password || '123456', // default mock password
      company_id: data.company_id || 1,
      status: 'active',
      roles: ['user'],
      permissions: [],
    };
    users.push(newUser);
    await this.writeUsers(users);
    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    const users = await this.readUsers();
    const user = users.find((u) => u.id === id);
    if (user) {
      user.company = (await this.getCompany(user.company_id)) || undefined;
    }
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.readUsers();
    const user = users.find((u) => u.email === email);
    if (user) {
      user.company = (await this.getCompany(user.company_id)) || undefined;
    }
    return user || null;
  }

  async findAll(): Promise<User[]> {
    return await this.readUsers();
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    const users = await this.readUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    await this.writeUsers(users);
    return users[index];
  }

  async delete(id: string): Promise<boolean> {
    const users = await this.readUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) return false;
    await this.writeUsers(filtered);
    return true;
  }

  async getCompany(companyId: number): Promise<Company | null> {
    const companies = await this.readCompanies();
    return companies.find((c) => c.id === companyId) || null;
  }

  async updateCompany(companyId: number, data: any): Promise<Company | null> {
    const companies = await this.readCompanies();
    const index = companies.findIndex((c) => c.id === companyId);
    if (index === -1) return null;
    companies[index] = { ...companies[index], ...data };
    await this.writeCompanies(companies);
    return companies[index];
  }

  async getTeam(companyId: number): Promise<User[]> {
    const users = await this.readUsers();
    const team = users.filter((u) => u.company_id === companyId);

    // Attach company to each member
    const company = await this.getCompany(companyId);
    return team.map((u) => ({ ...u, company: company || undefined }));
  }
}
