import { api } from "./authService";

const BASE_URL = "/products";

export interface Product {
    id: number;
    name: string; // mapped from basicInfo.title
    sku: string;
    category: string;
    brand: string;
    description: string;
    item_type: string;
    cost_price: number;
    selling_price: number;
    discount_type: string;
    discount_value: number;
    tax_class: string;
    images: string[];
    status: string;
    initial_quantity?: number;
    variants?: any[];
    [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  status: string;
  message?: string;
  data?: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  ok?: boolean;
}

export const productService = {
  // Create a new product
  create: async (data: any) => {
    const res = await api.post(BASE_URL, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  // Get all products with filters
  getProducts: async (params?: any) => {
    const cleanParams: any = {};
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
          cleanParams[key] = params[key];
        }
      });
    }
    const queryString = new URLSearchParams(cleanParams).toString();
    const res = await api.get(`${BASE_URL}${queryString ? `?${queryString}` : ""}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  // Get single product
  getById: async (id: string) => {
    const res = await api.get(`${BASE_URL}/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  // Update product
  update: async (id: string, data: any) => {
    const res = await api.put(`${BASE_URL}/${id}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  updateVariant: async (productId: string, variantId: string, data: any) => {
    const res = await api.put(`${BASE_URL}/${productId}/variants/${variantId}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  // Delete product
  delete: async (id: string) => {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  // Resource Getters
  getWarehouses: async () => {
    const res = await api.get("/warehouses");
    return { ...res.data, ok: res.ok, status: res.status };
  },

  createWarehouse: async (data: any) => {
    const res = await api.post("/warehouses", data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  updateWarehouse: async (id: string, data: any) => {
    const res = await api.put(`/warehouses/${id}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  deleteWarehouse: async (id: string) => {
    const res = await api.delete(`/warehouses/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  getCategories: async () => {
    const res = await api.get("/categories");
    return { ...res.data, ok: res.ok, status: res.status };
  },

  createCategory: async (data: any) => {
    const res = await api.post("/categories", data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  updateCategory: async (id: string, data: any) => {
    const res = await api.put(`/categories/${id}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  deleteCategory: async (id: string) => {
    const res = await api.delete(`/categories/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  getSuppliers: async () => {
    const res = await api.get("/suppliers");
    return { ...res.data, ok: res.ok, status: res.status };
  },

  getBrands: async () => {
    const res = await api.get("/brands");
    return { ...res.data, ok: res.ok, status: res.status };
  },

  createBrand: async (data: any) => {
    const res = await api.post("/brands", data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  updateBrand: async (id: string, data: any) => {
    const res = await api.put(`/brands/${id}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  deleteBrand: async (id: string) => {
    const res = await api.delete(`/brands/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  createSupplier: async (data: any) => {
    const res = await api.post("/suppliers", data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  updateSupplier: async (id: string, data: any) => {
    const res = await api.put(`/suppliers/${id}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  deleteSupplier: async (id: string) => {
    const res = await api.delete(`/suppliers/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  getAttributes: async () => {
    const res = await api.get("/attributes");
    return { ...res.data, ok: res.ok, status: res.status };
  },

  createAttribute: async (data: any) => {
    const res = await api.post("/attributes", data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  updateAttribute: async (id: string, data: any) => {
    const res = await api.put(`/attributes/${id}`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  deleteAttribute: async (id: string) => {
    const res = await api.delete(`/attributes/${id}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  // Marketplace Connectors
  publishToListing: async (id: string, channelId: string) => {
    const res = await api.post(`${BASE_URL}/${id}/publish`, { channelId });
    return { ...res.data, ok: res.ok, status: res.status };
  }
};
