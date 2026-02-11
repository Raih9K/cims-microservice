export interface User {
  user_id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

export interface StockItem {
  stock_item_id: string;
  sku: string;
  belongs_to: number;
  title: string;
  short_description?: string;
  description?: string;
  barcode?: string;
  stock_type: 'basic' | 'parent' | 'variant' | 'kit';
  item_type: 'physical' | 'digital' | 'service';
  condition: 'new' | 'used' | 'used_like_new' | 'refurbished' | 'reconditioned';
  parent_item_id?: string;
  brand_id?: number;
  manufacturer_name?: string;
  manufacturer_country_code?: string;
  manufacturer_state?: string;
  manufacturer_postal_code?: string;
  status: 'active' | 'inactive' | 'discontinued' | 'draft';
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface StockItemPricing {
  id: number;
  stock_item_id: string;
  cost_price?: number;
  selling_price?: number;
  msrp?: number;
  retail_price?: number;
  map_price?: number;
  discount_type: 'percentage' | 'fixed' | 'none';
  discount_value?: number;
  tax_class?: string;
  created_at: Date;
  updated_at: Date;
}

export interface StockItemDimensions {
  dimension_id: string;
  stock_item_id?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  weight_unit?: string;
  dimension_unit?: string;
  package_length?: number;
  package_width?: number;
  package_height?: number;
  package_weight?: number;
  manufactured_city?: string;
  manufactured_state?: string;
  manufactured_country_code?: string;
  manufactured_postal_code?: string;
  created_at: Date;
  updated_at: Date;
}

export interface StockItemVariant {
  variant_id: string;
  stock_item_id: string;
  attribute_name: string;
  attribute_value: string;
  display_order: number;
  created_at: Date;
}

export interface KitInfo {
  id: string;
  stock_item_id: string;
  max_quantity: number;
  belongs_to: number;
  created_at: Date;
  updated_at: Date;
}

export interface StockItemMapKit {
  id: string;
  kit_id: string;
  component_stock_item_id: string;
  requered_quantity: number;
  display_order: number;
  component_title_override?: string;
  component_description_override?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Brand {
  brand_id: number;
  brand_name: string;
  brand_code?: string;
  website?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Warehouse {
  warehouse_id: string;
  name: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  is_default: boolean;
  created_at: Date;
  belongs_to: number;
}

export interface Supplier {
  supplier_id: string;
  supplier_code: string;
  supplier_name: string;
  contact_person_name?: string;
  email_address?: string;
  phone_number?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface StockLevel {
  id: string;
  stock_item_id: string;
  warehouse_id: string;
  available_quantity: number;
  minimum_level: number;
  updated_at: Date;
}

export interface Channel {
  channel_id: string;
  name: string;
  marketplace: 'bigcommerce' | 'ebay' | 'shopify';
  marketplace_data: any;
  belongs_to?: number;
  created_at: Date;
}

export interface Listing {
  listing_id: string;
  channel_id: string;
  channel_type: 'bigcommerce' | 'ebay' | 'shopify';
  listing_id_external?: string;
  status: 'draft' | 'active' | 'inactive';
  stock_item_id?: string;
  mapped_attributes?: any;
  is_linked: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  image_id: number;
  owner_id: number;
  filename: string;
  mime_type: string;
  alt_text: string;
  width?: number;
  height?: number;
  file_size_bytes: number;
  sha256?: Buffer;
  exif_json?: any;
  image_url: string;
  position: number;
  stock_item_id?: string;
  listing_id?: string;
  kit_id?: string;
  is_active: boolean;
  is_main: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationResult<T>['pagination'];
}

export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}