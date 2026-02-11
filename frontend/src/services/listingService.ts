import { MOCK_LISTINGS, simulateApiDelay } from '@/mocks';
import { api } from "./authService";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

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
    if (USE_MOCK_DATA) {
      await simulateApiDelay(500);
      let filtered = [...MOCK_LISTINGS] as any[];

      // Filter by Channel
      if (params?.channel && params.channel !== 'all') {
        filtered = filtered.filter(l => l.channel === params.channel);
      }

      // Filter by Status
      if (params?.status && params.status !== 'All') {
        filtered = filtered.filter(l => l.status?.toLowerCase() === params.status?.toLowerCase());
      }

      // Filter by Search
      if (params?.q) {
        const query = params.q.toLowerCase();
        filtered = filtered.filter(l =>
          l.product?.sku?.toLowerCase().includes(query) ||
          l.product?.name?.toLowerCase().includes(query) ||
          l.channel?.name?.toLowerCase().includes(query) ||
          l.listing_id?.toLowerCase().includes(query)
        );
      }

      return {
        success: true,
        data: filtered,
        stats: {
          active: MOCK_LISTINGS.filter(l => l.status === 'active').length,
          warning: MOCK_LISTINGS.filter(l => l.status === 'warning').length,
          error: MOCK_LISTINGS.filter(l => l.status === 'error').length,
          delisted: MOCK_LISTINGS.filter(l => l.status === 'delisted').length,
          inactive: MOCK_LISTINGS.filter(l => l.status === 'inactive').length,
        },
        meta: {
          total: filtered.length,
          current_page: 1,
          total_pages: 1
        }
      };
    }

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
