"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

// Define the shape of the form data
// Expanding this as we implement more tabs
export interface ProductFormData {
  // ============================================================================
  // SYSTEM & AUDIT FIELDS (Auto-populated by API, read-only in UI)
  // ============================================================================
  meta: {
    id: string;                    // Product UUID (auto-generated)
    company_id: string;            // Tenant isolation - REQUIRED
    created_by: string;            // User ID who created
    updated_by: string;            // User ID who last updated
    created_by_name?: string;      // Display name (for UI)
    updated_by_name?: string;      // Display name (for UI)
    created_at: string;            // ISO 8601 timestamp
    updated_at: string;            // ISO 8601 timestamp
    deleted_at?: string;           // Soft delete timestamp
    version: number;               // Optimistic locking
    status: 'draft' | 'active' | 'archived';  // Product lifecycle
    is_published: boolean;         // Visibility flag
    published_at?: string;         // First publish date
  };
  // ============================================================================
  basicInfo: {
    sku: string;
    productIdentifierType: string;
    productIdentifierValue: string;
    title: string;
    category: string;
    condition: string;
    brand: string;
    manufacturer: string;
    msrp: string;
    purchasePrice: string;
    retailPrice: string;
    map: string;
    dimensionLength: string;
    dimensionWidth: string;
    dimensionHeight: string;
    dimensionUnit: string;
    weightValue: string;
    weightUnit: string;
    manufacturedCountry: string;
    manufacturedState: string;
    manufacturedCity: string;
    manufacturedPostalCode: string;
  };
  description: {
    shortDescription: string;
    mainDescription: string;
    features: string[];
  };
  variants: {
    themes: {
      name: string;
      values: string[];
    }[];
    hasVariation: boolean;
    variantItems: {
      id: string;
      combination: { [key: string]: string };
      sku: string;
      title: string;
      barcode: string;
      price: string;
      quantity: string;
      warehouse: string;
      stocks: {
        id: string;
        warehouse: string;
        sku: string;
        price?: string;
        available: number;
        reserved: number;
        binLocations: string[];
        priorityOrder: number;
        isDefault: boolean;
      }[];
    }[];
  };
  inventory: {
    stocks: {
      id: string;
      warehouse: string;
      sku: string;
      price?: string;
      available: number;
      reserved: number;
      binLocations: string[];
      priorityOrder: number;
      isDefault: boolean;
    }[];
  };
  pricing: {
    costPrice: string;
    sellingPrice: string;
    discountType: string;
    discountValue: string;
    taxClass: string;
  };
  media: {
    images: {
      id: string;
      url: string;
      type: 'upload' | 'url';
      order: number;
    }[];
    videos: {
      url: string;
      type: 'url' | 'upload';
    }[];
  };
  attributes: {
    id: string;
    attribute_id: string;
    name: string;
    value: string;
  }[];
  marketplace: {
    channels: {
      id: string;
      name: string;
      price: string;
      title: string;
      description: string;
      tags: string[];
    }[];
  };
  listingStatus: {
    active: {
      id: string;
      channel: string;
      sku: string;
      quantity: string;
      price: string;
      marketplaceId: string;
    }[];
    drafts: {
      id: string;
      channel: string;
      sku: string;
      quantity: string;
      price: string;
      marketplaceId: string;
      selected: boolean;
    }[];
    notListed: {
      id: string;
      channel: string;
      sku: string;
      quantity: string;
      price: string;
      marketplaceId: string;
    }[];
  };
  suppliers: {
    id: string;
    name: string;
    code: string;
    purchasePrice: string;
    quantity: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
  }[];
}

interface ProductFormContextType {
  data: ProductFormData;
  updateBasicInfo: (field: keyof ProductFormData["basicInfo"], value: string) => void;
  updateDescription: (updates: Partial<ProductFormData["description"]>) => void;
  updateVariants: (updates: Partial<ProductFormData["variants"]>) => void;
  updateInventory: (updates: Partial<ProductFormData["inventory"]>) => void;
  updatePricing: (updates: Partial<ProductFormData["pricing"]>) => void;
  updateMedia: (updates: Partial<ProductFormData["media"]>) => void;
  updateAttributes: (attributes: ProductFormData["attributes"]) => void;
  updateMarketplace: (updates: Partial<ProductFormData["marketplace"]>) => void;
  updateListingStatus: (updates: Partial<ProductFormData["listingStatus"]>) => void;
  updateSuppliers: (suppliers: ProductFormData["suppliers"]) => void;
  loadProduct: (data: ProductFormData) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  resetForm: () => void;
}

const defaultData: ProductFormData = {
  meta: {
    id: "",
    company_id: "",
    created_by: "",
    updated_by: "",
    created_by_name: "",
    updated_by_name: "",
    created_at: "",
    updated_at: "",
    version: 1,
    status: "draft",
    is_published: false,
  },
  basicInfo: {
    sku: "",
    productIdentifierType: "",
    productIdentifierValue: "",
    title: "",
    category: "",
    condition: "",
    brand: "",
    manufacturer: "",
    msrp: "",
    purchasePrice: "",
    retailPrice: "",
    map: "",
    dimensionLength: "",
    dimensionWidth: "",
    dimensionHeight: "",
    dimensionUnit: "inch",
    weightValue: "",
    weightUnit: "kg",
    manufacturedCountry: "",
    manufacturedState: "",
    manufacturedCity: "",
    manufacturedPostalCode: "",
  },
  description: {
    shortDescription: "",
    mainDescription: "",
    features: ["", "", "", "", ""],
  },
  variants: {
    themes: [],
    hasVariation: false,
    variantItems: [],
  },
  inventory: {
    stocks: [
      {
        id: "1",
        warehouse: "Default",
        sku: "",
        available: 0,
        reserved: 0,
        price: "",
        binLocations: [""],
        priorityOrder: 0,
        isDefault: true
      }
    ],
  },
  pricing: {
    costPrice: "",
    sellingPrice: "",
    discountType: "none",
    discountValue: "",
    taxClass: "standard",
  },
  media: {
    images: [],
    videos: [],
  },
  attributes: [],
  marketplace: {
    channels: [],
  },
  listingStatus: {
    active: [],
    drafts: [],
    notListed: [],
  },
  suppliers: [],
};

const ProductFormContext = createContext<ProductFormContextType | undefined>(undefined);

export function ProductFormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProductFormData>(defaultData);
  const [isDirty, setIsDirty] = useState(false);

  const updateBasicInfo = useCallback((field: keyof ProductFormData["basicInfo"], value: string) => {
    setData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }));
    setIsDirty(true);
  }, []);

  const updateDescription = useCallback((updates: Partial<ProductFormData["description"]>) => {
    setData((prev) => ({
      ...prev,
      description: { ...prev.description, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updateVariants = useCallback((updates: Partial<ProductFormData["variants"]>) => {
    setData((prev) => ({
      ...prev,
      variants: { ...prev.variants, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updateInventory = useCallback((updates: Partial<ProductFormData["inventory"]>) => {
    setData((prev) => ({
      ...prev,
      inventory: { ...prev.inventory, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updatePricing = useCallback((updates: Partial<ProductFormData["pricing"]>) => {
    setData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updateMedia = useCallback((updates: Partial<ProductFormData["media"]>) => {
    setData((prev) => ({
      ...prev,
      media: { ...prev.media, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updateAttributes = useCallback((attributes: ProductFormData["attributes"]) => {
    setData((prev) => ({
      ...prev,
      attributes,
    }));
    setIsDirty(true);
  }, []);

  const updateMarketplace = useCallback((updates: Partial<ProductFormData["marketplace"]>) => {
    setData((prev) => ({
      ...prev,
      marketplace: { ...prev.marketplace, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updateListingStatus = useCallback((updates: Partial<ProductFormData["listingStatus"]>) => {
    setData((prev) => ({
      ...prev,
      listingStatus: { ...prev.listingStatus, ...updates },
    }));
    setIsDirty(true);
  }, []);

  const updateSuppliers = useCallback((suppliers: ProductFormData["suppliers"]) => {
    setData((prev) => ({
      ...prev,
      suppliers,
    }));
    setIsDirty(true);
  }, []);

  const loadProduct = useCallback((product: ProductFormData) => {
    setData(product);
    setIsDirty(false);
  }, []);

  const resetForm = useCallback(() => {
    setData(defaultData);
    setIsDirty(false);
  }, []);

  const contextValue = useMemo(() => ({
    data,
    updateBasicInfo,
    updateDescription,
    updateVariants,
    updateInventory,
    updatePricing,
    updateMedia,
    updateAttributes,
    updateMarketplace,
    updateListingStatus,
    updateSuppliers,
    loadProduct,
    isDirty,
    setIsDirty,
    resetForm
  }), [
    data,
    updateBasicInfo,
    updateDescription,
    updateVariants,
    updateInventory,
    updatePricing,
    updateMedia,
    updateAttributes,
    updateMarketplace,
    updateListingStatus,
    updateSuppliers,
    loadProduct,
    isDirty,
    setIsDirty,
    resetForm
  ]);

  return (
    <ProductFormContext.Provider value={contextValue}>
      {children}
    </ProductFormContext.Provider>
  );
}
export function useProductForm() {
  const context = useContext(ProductFormContext);
  if (context === undefined) {
    throw new Error("useProductForm must be used within a ProductFormProvider");
  }
  return context;
}
