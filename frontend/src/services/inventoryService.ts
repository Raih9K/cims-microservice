import { ApiResponse } from "@/types";
import { api } from "./authService";

const BASE_URL = "/inventory";

export interface StockUpdateData {
  variantId: number;
  companyId: number;
  quantity: number;
  type: 'set' | 'increment' | 'decrement';
  reason?: string;
  warehouseId?: number;
}

export interface StockLevel {
  variantId: number;
  quantity: number;
  reserved: number;
  available: number;
  warehouseName?: string;
}

export const inventoryService = {
  /**
   * Update stock levels
   */
  updateStock: async (data: StockUpdateData): Promise<ApiResponse<any>> => {
    const res = await api.post(`${BASE_URL}/update`, data);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  /**
   * Get stock level for a variant
   */
  getStock: async (variantId: number, companyId: number): Promise<ApiResponse<StockLevel>> => {
    const res = await api.get(`${BASE_URL}/stock?variantId=${variantId}&companyId=${companyId}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  /**
   * Get all warehouses
   */
  getWarehouses: async (companyId: number): Promise<ApiResponse<any[]>> => {
    const res = await api.get(`/warehouses?companyId=${companyId}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  /**
   * Get stock levels across all warehouses
   */
  getStockLevels: async (params: { companyId: number; productId?: number }): Promise<ApiResponse<any[]>> => {
    const queryString = new URLSearchParams(params as any).toString();
    const res = await api.get(`/stock-levels?${queryString}`);
    return { ...res.data, ok: res.ok, status: res.status };
  }
};
