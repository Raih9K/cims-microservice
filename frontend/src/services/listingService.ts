import { api } from "./authService";

export interface Listing {
  listing_id: string;
  channel_id: string;
  stock_item_id?: string;
  status: 'draft' | 'active' | 'inactive' | 'warning' | 'error' | 'delisted';
  mapped_attributes: any;
  is_linked: boolean;
  is_mismatched?: boolean;
  is_stub?: boolean;
  live_url?: string;
  channel?: {
    name: string;
    marketplace: string;
    marketplace_data?: any;
  };
  product?: {
    name: string;
    sku: string;
    price: number;
    stock: number;
    image?: string;
  };
  stock_type?: 'basic' | 'parent' | 'variant';
  variants?: Listing[];
  created_at?: string;
  updated_at?: string;
}

export const listingService = {
  getListings: async (params?: any) => {
    const query = new URLSearchParams(params).toString();
    const response = await api.get(`/listings?${query}`);
    return response.data;
  },

  getListing: async (id: string) => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  updateListing: async (id: string, data: Partial<Listing>) => {
    const response = await api.put(`/listings/${id}`, data);
    return response.data;
  },

  deleteListing: async (id: string) => {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  },

  createListing: async (data: any) => {
    const response = await api.post('/listings', data);
    return response.data;
  },

  publishListing: async (id: string) => {
    const response = await api.post(`/listings/${id}/publish`, {});
    return response.data;
  }
};
