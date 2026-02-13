import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { IInventoryRepository } from '../interfaces/IProductRepository';

export class JsonProductRepository implements IInventoryRepository {
  private baseDir: string;

  constructor() {
    this.baseDir = path.dirname(path.resolve(config.mockDataPath));
    this.ensureDirExists();
  }

  private async ensureDirExists(): Promise<void> {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  private async readData(filename: string): Promise<any[]> {
    const filePath = path.join(this.baseDir, filename);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private async writeData(filename: string, data: any[]): Promise<void> {
    const filePath = path.join(this.baseDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  // Products
  async createProduct(data: any): Promise<any> {
    const products = await this.readData('products.json');
    const newProduct = {
      id: uuidv4(),
      ...data,
      status: 'active',
      createdAt: new Date(),
    };
    products.push(newProduct);
    await this.writeData('products.json', products);
    return newProduct;
  }

  async getProducts(params?: any): Promise<any[]> {
    return await this.readData('products.json');
  }

  async getProductById(id: string): Promise<any> {
    const products = await this.readData('products.json');
    return products.find((p) => p.id === id) || null;
  }

  async updateProduct(id: string, data: any): Promise<any> {
    const products = await this.readData('products.json');
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data, updatedAt: new Date() };
    await this.writeData('products.json', products);
    return products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = await this.readData('products.json');
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    await this.writeData('products.json', filtered);
    return true;
  }

  // Warehouses
  async getWarehouses(companyId?: number): Promise<any[]> {
    return await this.readData('warehouses.json');
  }

  async createWarehouse(data: any): Promise<any> {
    const warehouses = await this.readData('warehouses.json');
    const newWarehouse = { id: uuidv4(), ...data };
    warehouses.push(newWarehouse);
    await this.writeData('warehouses.json', warehouses);
    return newWarehouse;
  }

  async updateWarehouse(id: string, data: any): Promise<any> {
    const warehouses = await this.readData('warehouses.json');
    const index = warehouses.findIndex((w) => w.id === id);
    if (index === -1) return null;
    warehouses[index] = { ...warehouses[index], ...data };
    await this.writeData('warehouses.json', warehouses);
    return warehouses[index];
  }

  async deleteWarehouse(id: string): Promise<boolean> {
    const warehouses = await this.readData('warehouses.json');
    const filtered = warehouses.filter((w) => w.id !== id);
    if (filtered.length === warehouses.length) return false;
    await this.writeData('warehouses.json', filtered);
    return true;
  }

  // Others
  async getCategories(): Promise<any[]> {
    return await this.readData('categories.json');
  }
  async getBrands(): Promise<any[]> {
    return await this.readData('brands.json');
  }
  async getSuppliers(): Promise<any[]> {
    return await this.readData('suppliers.json');
  }
}
