# CIMS Backend API Documentation

## Overview

The Comprehensive Inventory Management System (CIMS) Backend API provides a robust RESTful interface for managing inventory, users, warehouses, suppliers, multi-channel integrations, and more. This API is built with Node.js, TypeScript, Express, and supports both PostgreSQL and MySQL databases.

## Table of Contents

- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Pagination](#pagination)
- [Rate Limiting](#rate-limiting)
- [Frontend Implementation Guide](#frontend-implementation-guide)

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+ or MySQL 8+
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Database setup:**
```bash
# Import the provided SQL schema (Pippa.sql) into your database
psql -U your_user -d cims_db < Pippa.sql
```

4. **Start development server:**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "first_name": "John",
  "last_name": "Doe",
  "company_name": "ACME Corp"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

## API Endpoints

### Stock Items

#### Get All Stock Items
```http
GET /api/stock-items?page=1&limit=20&search=laptop&status=active&sortBy=created_at&sortOrder=desc
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page, max 100 (default: 20)
- `search` (string): Search in title, SKU, description
- `status` (string): Filter by status (active, inactive, discontinued, draft)
- `stock_type` (string): Filter by type (basic, parent, variant, kit)
- `brand_id` (number): Filter by brand ID
- `sortBy` (string): Sort field (default: created_at)
- `sortOrder` (string): Sort direction (asc, desc)

#### Create Stock Item
```http
POST /api/stock-items
Authorization: Bearer <token>
Content-Type: application/json

{
  "sku": "LAPTOP-001",
  "title": "Gaming Laptop Pro",
  "short_description": "High-performance gaming laptop",
  "description": "Full product description...",
  "barcode": "1234567890123",
  "stock_type": "basic",
  "item_type": "physical",
  "condition": "new",
  "brand_id": 1,
  "manufacturer_name": "TechCorp",
  "status": "active"
}
```

#### Get Stock Item by ID
```http
GET /api/stock-items/{stockItemId}
Authorization: Bearer <token>
```

#### Update Stock Item
```http
PUT /api/stock-items/{stockItemId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Product Title",
  "status": "inactive"
}
```

#### Delete Stock Item
```http
DELETE /api/stock-items/{stockItemId}
Authorization: Bearer <token>
```

### Brands

#### Get All Brands
```http
GET /api/brands?page=1&limit=20&sortBy=brand_name&sortOrder=asc
Authorization: Bearer <token>
```

#### Create Brand
```http
POST /api/brands
Authorization: Bearer <token>
Content-Type: application/json

{
  "brand_name": "Apple",
  "brand_code": "APPLE",
  "website": "https://apple.com",
  "is_active": true
}
```

#### Update Brand
```http
PUT /api/brands/{brandId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "brand_name": "Apple Inc.",
  "website": "https://apple.com/store"
}
```

#### Delete Brand
```http
DELETE /api/brands/{brandId}
Authorization: Bearer <token>
```

#### Toggle Brand Status
```http
PATCH /api/brands/{brandId}/toggle-status
Authorization: Bearer <token>
```

### Warehouses

#### Get All Warehouses
```http
GET /api/warehouses?page=1&limit=20
Authorization: Bearer <token>
```

#### Create Warehouse
```http
POST /api/warehouses
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Main Warehouse",
  "address": "123 Storage St",
  "country": "USA",
  "state": "CA",
  "city": "Los Angeles",
  "zip_code": "90210",
  "is_default": false
}
```

#### Update Warehouse
```http
PUT /api/warehouses/{warehouseId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Warehouse Name",
  "address": "456 New Address"
}
```

#### Set Default Warehouse
```http
PATCH /api/warehouses/{warehouseId}/set-default
Authorization: Bearer <token>
```

#### Get Warehouse Stock Levels
```http
GET /api/warehouses/{warehouseId}/stock-levels?page=1&limit=20
Authorization: Bearer <token>
```

### Suppliers

#### Get All Suppliers
```http
GET /api/suppliers?page=1&limit=20&search=tech
Authorization: Bearer <token>
```

#### Search Suppliers
```http
GET /api/suppliers/search?q=electronics&limit=10
Authorization: Bearer <token>
```

#### Create Supplier
```http
POST /api/suppliers
Authorization: Bearer <token>
Content-Type: application/json

{
  "supplier_code": "SUP-001",
  "supplier_name": "Tech Supplies Inc",
  "contact_person_name": "John Smith",
  "email_address": "contact@techsupplies.com",
  "phone_number": "+1-555-0123",
  "address": "789 Supplier Blvd",
  "country": "USA",
  "state": "NY",
  "city": "New York",
  "zip_code": "10001"
}
```

#### Get Supplier Purchase Orders
```http
GET /api/suppliers/{supplierId}/purchase-orders?page=1&limit=20
Authorization: Bearer <token>
```

### Channels

#### Get All Channels
```http
GET /api/channels?page=1&limit=20
Authorization: Bearer <token>
```

#### Create Channel
```http
POST /api/channels
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My eBay Store",
  "marketplace": "ebay",
  "marketplace_data": {
    "app_id": "your_ebay_app_id",
    "access_token": "your_access_token"
  }
}
```

#### Test Channel Connection
```http
POST /api/channels/{channelId}/test-connection
Authorization: Bearer <token>
```

#### Sync Channel
```http
POST /api/channels/{channelId}/sync
Authorization: Bearer <token>
```

### Listings

#### Get All Listings
```http
GET /api/listings?page=1&limit=20&channelId=uuid&status=active
Authorization: Bearer <token>
```

#### Create Listing
```http
POST /api/listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "channel_id": "channel-uuid",
  "channel_type": "ebay",
  "listing_id_external": "123456789",
  "status": "draft",
  "stock_item_id": "stock-item-uuid",
  "mapped_attributes": {
    "title": "Custom Title",
    "price": 99.99
  },
  "is_linked": true
}
```

#### Publish Listing
```http
POST /api/listings/{listingId}/publish
Authorization: Bearer <token>
```

#### Unpublish Listing
```http
POST /api/listings/{listingId}/unpublish
Authorization: Bearer <token>
```

#### Sync Listing
```http
POST /api/listings/{listingId}/sync
Authorization: Bearer <token>
```

### Images

#### Get All Images
```http
GET /api/images?page=1&limit=20&stock_item_id=uuid&is_active=true
Authorization: Bearer <token>
```

#### Upload Image
```http
POST /api/images
Authorization: Bearer <token>
Content-Type: multipart/form-data

image: [file]
alt_text: "Product image"
position: 1
is_main: true
stock_item_id: "stock-item-uuid"
```

#### Set Main Image
```http
PATCH /api/images/{imageId}/set-main
Authorization: Bearer <token>
```

#### Reorder Images
```http
POST /api/images/reorder
Authorization: Bearer <token>
Content-Type: application/json

{
  "images": [
    {"image_id": 1, "position": 1},
    {"image_id": 2, "position": 2},
    {"image_id": 3, "position": 3}
  ]
}
```

#### Get Storage Usage
```http
GET /api/images/storage-usage
Authorization: Bearer <token>
```

### Purchase Orders

#### Get All Purchase Orders
```http
GET /api/purchase-orders?page=1&limit=20&status=pending
Authorization: Bearer <token>
```

#### Create Purchase Order
```http
POST /api/purchase-orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "supplier_id": "supplier-uuid",
  "status": "pending",
  "items": [
    {
      "stock_item_id": "stock-item-uuid-1",
      "quantity_ordered": 10
    },
    {
      "stock_item_id": "stock-item-uuid-2", 
      "quantity_ordered": 5
    }
  ]
}
```

#### Receive Purchase Order
```http
POST /api/purchase-orders/{purchaseOrderId}/receive
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "stock_item_id": "stock-item-uuid-1",
      "quantity_received": 10,
      "warehouse_id": "warehouse-uuid"
    }
  ]
}
```

#### Update Purchase Order Status
```http
PATCH /api/purchase-orders/{purchaseOrderId}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Dashboard Analytics

#### Get Dashboard Overview
```http
GET /api/dashboard/overview?timeframe=30
Authorization: Bearer <token>
```

#### Get Inventory Analytics
```http
GET /api/dashboard/inventory
Authorization: Bearer <token>
```

#### Get Sales Analytics
```http
GET /api/dashboard/sales?timeframe=30
Authorization: Bearer <token>
```

#### Get Low Stock Items
```http
GET /api/dashboard/low-stock?limit=10
Authorization: Bearer <token>
```

#### Get Top Selling Items
```http
GET /api/dashboard/top-selling?timeframe=30&limit=10
Authorization: Bearer <token>
```

#### Get Channel Performance
```http
GET /api/dashboard/channel-performance?timeframe=30
Authorization: Bearer <token>
```

## Data Models

### User
```typescript
interface User {
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
```

### Stock Item
```typescript
interface StockItem {
  stock_item_id: string;  // UUID
  sku: string;
  belongs_to: number;     // User ID
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
  status: 'active' | 'inactive' | 'discontinued' | 'draft';
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### Brand
```typescript
interface Brand {
  brand_id: number;
  brand_name: string;
  brand_code?: string;
  website?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### Warehouse
```typescript
interface Warehouse {
  warehouse_id: string;  // UUID
  name: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  is_default: boolean;
  created_at: Date;
  belongs_to: number;  // User ID
}
```

### Supplier
```typescript
interface Supplier {
  supplier_id: string;  // UUID
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
  created_by: number;  // User ID
  created_at: Date;
  updated_at: Date;
}
```

### Channel
```typescript
interface Channel {
  channel_id: string;  // UUID
  name: string;
  marketplace: 'bigcommerce' | 'ebay' | 'shopify';
  marketplace_data: any;  // JSON data specific to marketplace
  belongs_to?: number;  // User ID
  created_at: Date;
}
```

### Listing
```typescript
interface Listing {
  listing_id: string;  // UUID
  channel_id: string;
  channel_type: 'bigcommerce' | 'ebay' | 'shopify';
  listing_id_external?: string;
  status: 'draft' | 'active' | 'inactive';
  stock_item_id?: string;
  mapped_attributes?: any;  // JSON
  is_linked: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### Image
```typescript
interface Image {
  image_id: number;
  owner_id: number;  // User ID
  filename: string;
  mime_type: string;
  alt_text: string;
  width?: number;
  height?: number;
  file_size_bytes: number;
  sha256?: Buffer;
  exif_json?: any;  // JSON
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
```

### Purchase Order
```typescript
interface PurchaseOrder {
  purchase_order_id: string;  // UUID
  supplier_id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'received' | 'cancelled';
  created_at: Date;
  updated_at: Date;
  items: PurchaseOrderItem[];
}
```

### API Response Format
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Pagination

List endpoints support pagination with these parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page, max 100 (default: 20)

**Response includes pagination metadata:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Headers**: Rate limit info included in response headers

## Frontend Implementation Guide

### 1. Authentication Flow

```javascript
// Login
const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
      return data.data.user;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// API Client with auth
const apiClient = {
  get: async (url) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  post: async (url, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

### 2. Stock Items Management

```javascript
// Get stock items with pagination and filtering
const getStockItems = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await apiClient.get(`/api/stock-items?${queryString}`);
  return response;
};

// Create new stock item
const createStockItem = async (itemData) => {
  const response = await apiClient.post('/api/stock-items', itemData);
  return response;
};

// Update stock item
const updateStockItem = async (stockItemId, updates) => {
  const response = await fetch(`/api/stock-items/${stockItemId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
};
```

### 3. React Component Example

```jsx
import React, { useState, useEffect } from 'react';

const StockItemList = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
    limit: 20
  });

  useEffect(() => {
    fetchStockItems();
  }, [filters]);

  const fetchStockItems = async () => {
    setLoading(true);
    try {
      const response = await getStockItems(filters);
      if (response.success) {
        setStockItems(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch stock items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <StockItemTable items={stockItems} />
          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
```

### 4. Error Handling

```javascript
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const handleApiError = (response) => {
  if (!response.success) {
    throw new ApiError(response.error, response.status, response);
  }
  return response;
};

// Usage in components
const createStockItem = async (itemData) => {
  try {
    const response = await apiClient.post('/api/stock-items', itemData);
    handleApiError(response);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      // Show user-friendly error message
      showErrorToast(error.message);
    } else {
      // Handle network errors
      showErrorToast('Network error. Please try again.');
    }
    throw error;
  }
};
```

### 5. Form Validation

```javascript
// Client-side validation matching server schema
const validateStockItem = (data) => {
  const errors = {};
  
  if (!data.sku || data.sku.length > 100) {
    errors.sku = 'SKU is required and must be less than 100 characters';
  }
  
  if (!data.title || data.title.length > 500) {
    errors.title = 'Title is required and must be less than 500 characters';
  }
  
  if (!['basic', 'parent', 'variant', 'kit'].includes(data.stock_type)) {
    errors.stock_type = 'Invalid stock type';
  }
  
  return Object.keys(errors).length === 0 ? null : errors;
};
```

### 6. State Management (Redux/Context)

```javascript
// Redux slice example
const stockItemsSlice = createSlice({
  name: 'stockItems',
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Async thunk
export const fetchStockItems = createAsyncThunk(
  'stockItems/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getStockItems(params);
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### 7. Image Upload Component

```jsx
const ImageUpload = ({ stockItemId, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = async (file) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt_text', 'Product image');
    formData.append('stock_item_id', stockItemId);
    formData.append('is_main', 'true');
    
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        onUploadComplete(data.data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <Spinner />}
    </div>
  );
};
```

### 8. Multi-channel Management

```javascript
// Channel management utilities
const channelUtils = {
  // Test channel connection
  testConnection: async (channelId) => {
    const response = await apiClient.post(`/api/channels/${channelId}/test-connection`);
    return response;
  },
  
  // Sync channel data
  syncChannel: async (channelId) => {
    const response = await apiClient.post(`/api/channels/${channelId}/sync`);
    return response;
  },
  
  // Publish listing to channel
  publishListing: async (listingId) => {
    const response = await apiClient.post(`/api/listings/${listingId}/publish`);
    return response;
  },
  
  // Get channel performance
  getChannelPerformance: async (timeframe = 30) => {
    const response = await apiClient.get(`/api/dashboard/channel-performance?timeframe=${timeframe}`);
    return response;
  }
};
```

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

### Environment Variables
See `.env.example` for all available configuration options.

## Support

For API support and questions:
- Check API documentation above
- Review error messages for detailed information
- Ensure proper authentication headers are included
- Verify request body matches expected schemas