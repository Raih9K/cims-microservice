import type { ApiResponse, MarketplaceListing, Product } from '@/types';
import { useCallback, useEffect, useState } from 'react';

// ============================================================================
// INVENTORY HOOKS
// Dual inventory system - Central + Marketplace listings
// ============================================================================

interface UseInventoryOptions {
  autoFetch?: boolean;
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

interface UseInventoryReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  } | null;
}

// ============================================================================
// CENTRAL INVENTORY HOOK
// ============================================================================

export function useCentralInventory(options: UseInventoryOptions = {}): UseInventoryReturn<Product> {
  const { autoFetch = true } = options;

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<UseInventoryReturn<Product>['meta']>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
        ? '/api/mock'
        : process.env.NEXT_PUBLIC_API_URL + '/api';

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      const response = await fetch(`${API_URL}/central-inventory`, { headers });
      const result: ApiResponse<Product[]> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
        if (result.meta) {
          setMeta({
            currentPage: result.meta.current_page,
            perPage: result.meta.per_page,
            total: result.meta.total,
            totalPages: result.meta.total_pages
          });
        }
      } else {
        throw new Error(result.error?.message || 'Failed to fetch central inventory');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData, meta };
}

// ============================================================================
// MARKETPLACE LISTINGS HOOK
// ============================================================================

export function useMarketplaceListings(options: UseInventoryOptions = {}): UseInventoryReturn<MarketplaceListing> {
  const { autoFetch = true } = options;

  const [data, setData] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<UseInventoryReturn<MarketplaceListing>['meta']>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
        ? '/api/mock'
        : process.env.NEXT_PUBLIC_API_URL + '/api';

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      const response = await fetch(`${API_URL}/listings`, { headers });
      const result: ApiResponse<MarketplaceListing[]> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
        if (result.meta) {
          setMeta({
            currentPage: result.meta.current_page,
            perPage: result.meta.per_page,
            total: result.meta.total,
            totalPages: result.meta.total_pages
          });
        }
      } else {
        throw new Error(result.error?.message || 'Failed to fetch marketplace listings');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData, meta };
}

// ============================================================================
// COMBINED INVENTORY HOOK
// Returns both central inventory and listings with relationship
// ============================================================================

interface CombinedInventoryItem extends Product {
  listings: MarketplaceListing[];
}

export function useCombinedInventory(): {
  products: CombinedInventoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [products, setProducts] = useState<CombinedInventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
        ? '/api/mock'
        : process.env.NEXT_PUBLIC_API_URL + '/api';

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      // Fetch both in parallel
      const [inventoryRes, listingsRes] = await Promise.all([
        fetch(`${API_URL}/central-inventory`, { headers }),
        fetch(`${API_URL}/listings`, { headers })
      ]);

      const inventoryData: ApiResponse<Product[]> = await inventoryRes.json();
      const listingsData: ApiResponse<MarketplaceListing[]> = await listingsRes.json();

      if (inventoryData.success && inventoryData.data && listingsData.success && listingsData.data) {
        // Combine: attach listings to each product
        const combined = inventoryData.data.map(product => ({
          ...product,
          listings: listingsData.data!.filter(listing => listing.product_id === product.id)
        }));

        setProducts(combined);
      } else {
        throw new Error('Failed to fetch inventory data');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { products, loading, error, refetch: fetchData };
}

// ============================================================================
// LISTING BY PRODUCT HOOK
// Get all marketplace listings for a specific product
// ============================================================================

export function useProductListings(productId: string): {
  listings: MarketplaceListing[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const { data, loading, error, refetch } = useMarketplaceListings();

  const listings = data.filter(listing => listing.product_id === productId);

  return { listings, loading, error, refetch };
}

// ============================================================================
// INVENTORY STATS HOOK
// ============================================================================

interface InventoryStats {
  totalProducts: number;
  totalStock: number;
  allocatedStock: number;
  availableStock: number;
  totalListings: number;
  activeListings: number;
  draftListings: number;
  errorListings: number;
  channels: {
    platform: string;
    count: number;
    active: number;
  }[];
}

export function useInventoryStats(): {
  stats: InventoryStats | null;
  loading: boolean;
  error: string | null;
} {
  const { products, loading: productsLoading, error: productsError } = useCombinedInventory();

  const [stats, setStats] = useState<InventoryStats | null>(null);

  useEffect(() => {
    if (products.length > 0) {
      const channelMap = new Map<string, { count: number; active: number }>();

      let totalListings = 0;
      let activeListings = 0;
      let draftListings = 0;
      let errorListings = 0;

      products.forEach(product => {
        product.listings.forEach(listing => {
          totalListings++;

          if (listing.status === 'active') activeListings++;
          else if (listing.status === 'draft') draftListings++;
          else if (listing.status === 'error') errorListings++;

          const platform = (listing as any).channel_platform || 'unknown';
          const current = channelMap.get(platform) || { count: 0, active: 0 };
          current.count++;
          if (listing.status === 'active') current.active++;
          channelMap.set(platform, current);
        });
      });

      setStats({
        totalProducts: products.length,
        totalStock: products.reduce((sum, p) => sum + ((p as any).total_stock || 0), 0),
        allocatedStock: products.reduce((sum, p) => sum + ((p as any).allocated_stock || 0), 0),
        availableStock: products.reduce((sum, p) => sum + ((p as any).available_stock || 0), 0),
        totalListings,
        activeListings,
        draftListings,
        errorListings,
        channels: Array.from(channelMap.entries()).map(([platform, data]) => ({
          platform,
          count: data.count,
          active: data.active
        }))
      });
    }
  }, [products]);

  return { stats, loading: productsLoading, error: productsError };
}
