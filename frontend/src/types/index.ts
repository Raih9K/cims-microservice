// ============================================================================
// CIMS - Core Type Definitions
// Enterprise-grade types with security and audit fields
// ============================================================================

// ============================================================================
// SYSTEM & AUDIT TYPES
// ============================================================================

export interface AuditFields {
  id: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  created_by_name?: string;
  updated_by_name?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  version: number;
}

// ============================================================================
// COMPANY & USER TYPES
// ============================================================================

export type BusinessType = 'ecommerce' | 'retail' | 'wholesale' | 'manufacturing';
export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';
export type UserRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface Company extends AuditFields {
  name: string;
  slug: string;
  business_type: BusinessType;
  subscription_plan: SubscriptionPlan;
  subscription_status: SubscriptionStatus;
  trial_ends_at?: string;
  contact_email: string;
  contact_phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  timezone: string;
  currency: string;
  logo_url?: string;
  settings?: Record<string, any>;
  is_active: boolean;
}

export interface User extends AuditFields {
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  permissions?: string[];
  status: UserStatus;
  email_verified_at?: string;
  last_login_at?: string;
  last_login_ip?: string;
  two_factor_enabled: boolean;
}

// ============================================================================
// CENTRAL INVENTORY TYPES
// ============================================================================

export type ProductStatus = 'draft' | 'active' | 'archived';
export type ProductCondition = 'new' | 'used' | 'refurbished' | 'open_box';
export type WeightUnit = 'kg' | 'lb' | 'oz' | 'g';
export type DimensionUnit = 'in' | 'cm' | 'mm';

export interface Product extends AuditFields {
  // Basic Info
  sku: string;
  barcode_type?: 'UPC' | 'EAN' | 'GTIN' | 'ISBN';
  barcode_value?: string;
  title: string;
  slug: string;
  category_id?: string;
  condition: ProductCondition;
  brand?: string;
  manufacturer?: string;
  model?: string;

  // Pricing
  cost_price?: number;
  msrp?: number;
  retail_price?: number;
  map_price?: number;
  currency: string;
  tax_class?: 'standard' | 'reduced' | 'zero' | 'exempt';

  // Dimensions
  weight_value?: number;
  weight_unit?: WeightUnit;
  length?: number;
  width?: number;
  height?: number;
  dimension_unit?: DimensionUnit;

  // Content
  short_description?: string;
  description?: string;
  features?: string[];

  // Origin
  country_of_origin?: string;
  harmonized_code?: string;

  // Status
  status: ProductStatus;
  is_published: boolean;
  published_at?: string;
}

export interface StockEntry extends AuditFields {
  product_id: string;
  variant_id?: string;
  warehouse_id: string;
  sku?: string;
  quantity_available: number;
  quantity_reserved: number;
  quantity_incoming: number;
  reorder_point?: number;
  reorder_quantity?: number;
  bin_location?: string;
  cost_per_unit?: number;
  is_default: boolean;
  priority_order: number;
  last_counted_at?: string;
}

export interface Variant extends AuditFields {
  product_id: string;
  sku: string;
  barcode?: string;
  title?: string;
  options: Record<string, string>; // { "Color": "Red", "Size": "XL" }
  price_adjustment?: number;
  cost_adjustment?: number;
  weight_adjustment?: number;
  image_id?: string;
  position: number;
  is_active: boolean;
}

export interface ProductImage extends AuditFields {
  product_id: string;
  variant_id?: string;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  position: number;
  is_primary: boolean;
  file_size?: number;
  width?: number;
  height?: number;
  mime_type?: string;
  uploaded_by: string;
}

// ============================================================================
// MARKETPLACE TYPES
// ============================================================================

export type ChannelPlatform = 'shopify' | 'amazon' | 'ebay' | 'etsy' | 'walmart';
export type ChannelStatus = 'active' | 'inactive' | 'error' | 'pending';
export type ListingStatus = 'draft' | 'pending' | 'active' | 'paused' | 'error' | 'ended';
export type SyncStatus = 'synced' | 'pending' | 'error';

export interface Channel extends AuditFields {
  platform: ChannelPlatform;
  name: string;
  status: ChannelStatus;
  credentials: Record<string, any>; // Encrypted in storage
  settings?: Record<string, any>;
  store_url?: string;
  last_sync_at?: string;
  sync_error?: string;
  connected_by: string;
}

// ============================================================================
// MARKETPLACE LISTING (PUBLISHED INVENTORY)
// This is the SECOND inventory table - per channel with overrides
// ============================================================================

export interface MarketplaceListing extends AuditFields {
  // References
  product_id: string;
  variant_id?: string;
  channel_id: string;

  // Marketplace Identifiers
  marketplace_id?: string;      // Shopify product_id, Amazon ASIN, etc.
  marketplace_sku?: string;
  listing_url?: string;

  // Content Overrides (null = use Central)
  title_override?: string;
  description_override?: string;
  short_description_override?: string;
  features_override?: string[];

  // Pricing Overrides
  price_override?: number;
  compare_at_price?: number;
  currency: string;

  // Inventory Allocation
  quantity_allocated: number;
  quantity_reserved: number;
  buffer_quantity: number;
  sync_quantity: boolean;       // Auto-sync from Central?

  // Status & Sync
  status: ListingStatus;
  sync_status: SyncStatus;
  last_synced_at?: string;
  sync_error?: string;
  is_published: boolean;
  published_at?: string;

  // Marketplace-specific Data
  category_id?: string;
  tags?: string[];
  shipping_template_id?: string;
  return_policy_id?: string;
  custom_attributes?: Record<string, any>;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  request_id?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  user: User & { company_id: string };
}

// ============================================================================
// FORM DATA TYPES (For UI State)
// ============================================================================

export interface ProductFormMeta {
  id: string;
  company_id: string;
  created_by: string;
  updated_by: string;
  created_by_name?: string;
  updated_by_name?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  version: number;
  status: ProductStatus;
  is_published: boolean;
  published_at?: string;
}

export interface ListingFormData {
  id?: string;
  product_id: string;
  channel_id: string;
  channel_name?: string;         // For display
  channel_platform?: ChannelPlatform;

  // Overrides
  title_override?: string;
  description_override?: string;
  price_override?: number;

  // Allocation
  quantity_allocated: number;
  sync_quantity: boolean;

  // Status
  status: ListingStatus;
  is_published: boolean;

  // Marketplace Data
  marketplace_id?: string;
  listing_url?: string;
  last_synced_at?: string;
}

// ============================================================================
// AUDIT LOG
// ============================================================================

export type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'export' | 'login' | 'logout';

export interface AuditEntry {
  id: string;
  company_id: string;
  user_id: string;
  action: AuditAction;
  entity_type: string;
  entity_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address: string;
  user_agent?: string;
  request_id?: string;
  created_at: string;
}
