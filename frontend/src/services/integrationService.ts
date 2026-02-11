import { MOCK_CHANNELS, simulateApiDelay } from '@/mocks';
import { api } from "./authService";

const USE_MOCK_DATA = false; // Forced to false for real DB connection

export interface ChannelSettings {
  matchingProtocol?: string;
  autoLink?: boolean;
  conflictResolution?: string;
  syncFrequency?: string;
  stockBufferType?: string;
  stockBufferValue?: string;
  maxQty?: string;
  leadTime?: string;
}

export interface Channel {
  channel_id: string;
  name: string;
  marketplace: string;
  marketplace_data: any;
  belongs_to?: number;
  status?: string;
  store_url?: string;
}

export const integrationService = {
  getChannels: async () => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(500);
      return { success: true, data: MOCK_CHANNELS };
    }

    const response = await api.get('/channels');
    return response.data;
  },

  updateChannel: async (id: string, data: Partial<Channel>) => {
    const response = await api.put(`/channels/${id}`, data);
    return response.data;
  },

  deleteChannel: async (id: string) => {
    const response = await api.delete(`/channels/${id}`);
    return response.data;
  },

  connectManualShopify: async (data: { shop_domain: string; access_token: string }) => {
    const response = await api.post('/shopify/connect', data);
    return response.data;
  },

  updateChannelSettings: async (id: string, settings: ChannelSettings) => {
    // We store these under marketplace_data
    const channelResponse = await api.get(`/channels/${id}`);
    if (channelResponse.data.success) {
      const channel = channelResponse.data.data;
      const updatedMarketplaceData = {
        ...(channel.marketplace_data || {}),
        settings: {
          ...(channel.marketplace_data?.settings || {}),
          ...settings
        }
      };

      const response = await api.put(`/channels/${id}`, {
        marketplace_data: updatedMarketplaceData
      });
      return response.data;
    }
    throw new Error("Failed to fetch channel before update");
  },

  syncChannel: async (id: string) => {
    const response = await api.post(`/shopify/channels/${id}/sync`, {});
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/channels/stats');
    return response.data;
  }
};
