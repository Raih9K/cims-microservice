export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  description?: string;
  cost_price: number;
  selling_price: number;
  stock: number;
  status: string;
  company_id?: number;
}

export interface Warehouse {
  id: string;
  name: string;
  address?: string;
  company_id?: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Supplier {
  id: string;
  name: string;
}

export interface IInventoryRepository {
  // Products
  createProduct(data: any): Promise<any>;
  getProducts(params?: any): Promise<any[]>;
  getProductById(id: string): Promise<any>;
  updateProduct(id: string, data: any): Promise<any>;
  deleteProduct(id: string): Promise<boolean>;

  // Warehouses
  getWarehouses(companyId?: number): Promise<any[]>;
  createWarehouse(data: any): Promise<any>;
  updateWarehouse(id: string, data: any): Promise<any>;
  deleteWarehouse(id: string): Promise<boolean>;

  // Others
  getCategories(): Promise<any[]>;
  getBrands(): Promise<any[]>;
  getSuppliers(): Promise<any[]>;
}
