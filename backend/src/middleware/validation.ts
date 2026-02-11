import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const response: ApiResponse = {
        success: false,
        error: 'Validation failed',
        message: error.details[0].message,
      };
      res.status(400).json(response);
      return;
    }
    
    next();
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query);
    
    if (error) {
      const response: ApiResponse = {
        success: false,
        error: 'Query validation failed',
        message: error.details[0].message,
      };
      res.status(400).json(response);
      return;
    }
    
    next();
  };
};

export const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().max(50).optional(),
  last_name: Joi.string().max(50).optional(),
  company_name: Joi.string().max(100).optional(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const stockItemSchema = Joi.object({
  sku: Joi.string().max(100).required(),
  title: Joi.string().max(500).required(),
  short_description: Joi.string().max(1000).optional(),
  description: Joi.string().optional(),
  barcode: Joi.string().max(50).optional(),
  stock_type: Joi.string().valid('basic', 'parent', 'variant', 'kit').default('basic'),
  item_type: Joi.string().valid('physical', 'digital', 'service').default('physical'),
  condition: Joi.string().valid('new', 'used', 'used_like_new', 'refurbished', 'reconditioned').default('new'),
  parent_item_id: Joi.string().uuid().optional(),
  brand_id: Joi.number().integer().optional(),
  manufacturer_name: Joi.string().max(200).optional(),
  manufacturer_country_code: Joi.string().length(2).optional(),
  manufacturer_state: Joi.string().max(100).optional(),
  manufacturer_postal_code: Joi.string().max(20).optional(),
  status: Joi.string().valid('active', 'inactive', 'discontinued', 'draft').default('active'),
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

export const brandCreateSchema = Joi.object({
  brand_name: Joi.string().max(200).required(),
  brand_code: Joi.string().max(50).optional(),
  website: Joi.string().uri().optional(),
  is_active: Joi.boolean().default(true),
});

export const brandUpdateSchema = Joi.object({
  brand_name: Joi.string().max(200).optional(),
  brand_code: Joi.string().max(50).optional(),
  website: Joi.string().uri().optional(),
  is_active: Joi.boolean().optional(),
});

export const warehouseCreateSchema = Joi.object({
  name: Joi.string().max(255).required(),
  address: Joi.string().optional(),
  country: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  zip_code: Joi.string().max(20).optional(),
  is_default: Joi.boolean().default(false),
});

export const warehouseUpdateSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  address: Joi.string().optional(),
  country: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  zip_code: Joi.string().max(20).optional(),
  is_default: Joi.boolean().optional(),
});

export const supplierCreateSchema = Joi.object({
  supplier_code: Joi.string().max(100).required(),
  supplier_name: Joi.string().max(255).required(),
  contact_person_name: Joi.string().max(255).optional(),
  email_address: Joi.string().email().optional(),
  phone_number: Joi.string().max(50).optional(),
  address: Joi.string().optional(),
  country: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  zip_code: Joi.string().max(20).optional(),
});

export const supplierUpdateSchema = Joi.object({
  supplier_code: Joi.string().max(100).optional(),
  supplier_name: Joi.string().max(255).optional(),
  contact_person_name: Joi.string().max(255).optional(),
  email_address: Joi.string().email().optional(),
  phone_number: Joi.string().max(50).optional(),
  address: Joi.string().optional(),
  country: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  zip_code: Joi.string().max(20).optional(),
});

export const channelCreateSchema = Joi.object({
  name: Joi.string().max(255).required(),
  marketplace: Joi.string().valid('bigcommerce', 'ebay', 'shopify').required(),
  marketplace_data: Joi.object().optional(),
});

export const channelUpdateSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  marketplace: Joi.string().valid('bigcommerce', 'ebay', 'shopify').optional(),
  marketplace_data: Joi.object().optional(),
});

export const listingCreateSchema = Joi.object({
  channel_id: Joi.string().uuid().required(),
  channel_type: Joi.string().valid('bigcommerce', 'ebay', 'shopify').required(),
  listing_id_external: Joi.string().max(255).optional(),
  status: Joi.string().valid('draft', 'active', 'inactive').default('draft'),
  stock_item_id: Joi.string().uuid().optional(),
  mapped_attributes: Joi.object().optional(),
  is_linked: Joi.boolean().default(true),
});

export const listingUpdateSchema = Joi.object({
  listing_id_external: Joi.string().max(255).optional(),
  status: Joi.string().valid('draft', 'active', 'inactive').optional(),
  stock_item_id: Joi.string().uuid().optional(),
  mapped_attributes: Joi.object().optional(),
  is_linked: Joi.boolean().optional(),
});

export const categoryCreateSchema = Joi.object({
  category_name: Joi.string().max(100).required(),
  parent_id: Joi.number().integer().optional(),
});

export const categoryUpdateSchema = Joi.object({
  category_name: Joi.string().max(100).optional(),
  parent_id: Joi.number().integer().optional(),
});

export const stockLevelCreateSchema = Joi.object({
  stock_item_id: Joi.string().uuid().required(),
  warehouse_id: Joi.string().uuid().required(),
  available_quantity: Joi.number().integer().min(0).default(0),
  minimum_level: Joi.number().integer().min(0).default(0),
});

export const stockLevelUpdateSchema = Joi.object({
  available_quantity: Joi.number().integer().min(0).optional(),
  minimum_level: Joi.number().integer().min(0).optional(),
});

export const imageUploadSchema = Joi.object({
  alt_text: Joi.string().max(255).optional(),
  position: Joi.number().integer().min(1).default(1),
  is_main: Joi.boolean().default(false),
  stock_item_id: Joi.string().uuid().optional(),
  listing_id: Joi.string().uuid().optional(),
  kit_id: Joi.string().uuid().optional(),
});

export const purchaseOrderCreateSchema = Joi.object({
  supplier_id: Joi.string().uuid().required(),
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'received', 'cancelled').default('pending'),
  items: Joi.array().items(
    Joi.object({
      stock_item_id: Joi.string().uuid().required(),
      quantity_ordered: Joi.number().integer().min(1).required(),
    })
  ).required(),
});

export const purchaseOrderUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'received', 'cancelled').optional(),
});

export const searchSchema = Joi.object({
  q: Joi.string().min(1).max(255).required(),
  limit: Joi.number().integer().min(1).max(50).default(10),
});

export const uuidParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});

// Validation middleware functions
export const validateBrandCreate = validateRequest(brandCreateSchema);
export const validateBrandUpdate = validateRequest(brandUpdateSchema);
export const validateWarehouseCreate = validateRequest(warehouseCreateSchema);
export const validateWarehouseUpdate = validateRequest(warehouseUpdateSchema);
export const validateSupplierCreate = validateRequest(supplierCreateSchema);
export const validateSupplierUpdate = validateRequest(supplierUpdateSchema);
export const validateChannelCreate = validateRequest(channelCreateSchema);
export const validateChannelUpdate = validateRequest(channelUpdateSchema);
export const validateListingCreate = validateRequest(listingCreateSchema);
export const validateListingUpdate = validateRequest(listingUpdateSchema);
export const validateCategoryCreate = validateRequest(categoryCreateSchema);
export const validateCategoryUpdate = validateRequest(categoryUpdateSchema);
export const validateStockLevelCreate = validateRequest(stockLevelCreateSchema);
export const validateStockLevelUpdate = validateRequest(stockLevelUpdateSchema);
export const validateImageUpload = validateRequest(imageUploadSchema);
export const validatePurchaseOrderCreate = validateRequest(purchaseOrderCreateSchema);
export const validatePurchaseOrderUpdate = validateRequest(purchaseOrderUpdateSchema);
export const validateSearch = validateQuery(searchSchema);
export const validatePagination = validateQuery(paginationSchema);
export const validateUuidParam = validateRequest(uuidParamSchema);
export const validateIdParam = validateRequest(idParamSchema);