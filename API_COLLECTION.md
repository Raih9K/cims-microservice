# CIMS System API Reference Collection

This document provides a complete reference for all API endpoints exposed by the CIMS (Channel & Inventory Management System) microservice-based architecture.

## Global Architecture & Routing

All endpoints are accessed through the **API Gateway** on port `3000` (by default, mapping `/api/*` to the respective backend microservices).

| Microservice | Base Internal URL | Gateway Endpoint Prefix | Port |
| :--- | :--- | :--- | :--- |
| **API Gateway** (Local) | `http://localhost:3000` | `/api/dashboard` | `3000` |
| **User Service** | `http://localhost:3001` | `/api/auth`, `/api/packages`, `/api/apply-coupon`, `/api/subscribe`, `/api/company`, `/api/team`, `/api/me` | `3001` |
| **Product Service** | `http://localhost:3002` | `/api/products`, `/api/categories`, `/api/brands`, `/api/suppliers`, `/api/attributes` | `3002` |
| **Inventory Service** | `http://localhost:3003` | `/api/warehouses`, `/api/inventory`, `/api/stock-levels` | `3003` |
| **Shopify Service** | `http://localhost:3004` | `/api/shopify` | `3004` |
| **Marketplace Service** | `http://localhost:3005` | `/api/marketplace`, `/api/listings`, `/api/channels` (rewritten internally) | `3005` |
| **Audit Service** | `http://localhost:3006` | `/api/audit-logs` | `3006` |
| **Order Service** | `http://localhost:3007` | `/api/orders` | `3007` |
| **Notification Service** | `http://localhost:3008` | `/api/notifications` | `3008` |

---

## 1. Authentication & User Management (User Service)

### Signup (Register Company & Admin)
*   **Method**: `POST`
*   **Path**: `/api/auth/signup`
*   **Request Body** (JSON):
    ```json
    {
      "full_name": "Admin User",
      "email": "admin@demo.com",
      "password": "password",
      "password_confirmation": "password",
      "company_name": "Demo Corp",
      "business_type": "Retail",
      "management_type": "team"
    }
    ```

### Login
*   **Method**: `POST`
*   **Path**: `/api/auth/login`
*   **Request Body** (JSON):
    ```json
    {
      "email": "admin@demo.com",
      "password": "password"
    }
    ```
*   **Response**: Returns an `access_token` JWT.

### Accept Invitation
*   **Method**: `POST`
*   **Path**: `/api/auth/accept-invite`
*   **Request Body** (JSON):
    ```json
    {
      "email": "colleague@demo.com",
      "password": "securepassword",
      "token": "invitation-token-uuid",
      "name": "Colleague Name"
    }
    ```

### Get Current User Profile (Me)
*   **Method**: `GET`
*   **Path**: `/api/me`
*   **Headers**: `Authorization: Bearer <token>`
*   **Response**:
    ```json
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@demo.com",
      "company_id": 1,
      "status": "active",
      "roles": ["Admin"],
      "permissions": ["manage_inventory", "manage_team"],
      "company": {
        "id": 1,
        "name": "Demo Corp",
        "business_type": "Retail",
        "management_type": "team",
        "subscription_status": "active",
        "package_id": 2,
        "package": {
          "id": 2,
          "name": "Pro",
          "price": "49.99"
        },
        "max_seats": 5
      }
    }
    ```

---

## 2. Subscription Management (User Service)

### Get Subscription Packages
*   **Method**: `GET`
*   **Path**: `/api/packages`
*   **Headers**: `Authorization: Bearer <token>`

### Apply Coupon
*   **Method**: `POST`
*   **Path**: `/api/apply-coupon`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body** (JSON):
    ```json
    {
      "code": "PROMO50"
    }
    ```

### Subscribe to Package
*   **Method**: `POST`
*   **Path**: `/api/subscribe`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body** (JSON):
    ```json
    {
      "packageId": 2,
      "paymentMethod": "stripe",
      "couponCode": "PROMO50"
    }
    ```

---

## 3. Team Management (User Service)

### Invite Team Member
*   **Method**: `POST`
*   **Path**: `/api/team/invite`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body** (JSON):
    ```json
    {
      "email": "colleague@demo.com",
      "role": "Team Member"
    }
    ```

### Get Team Members
*   **Method**: `GET`
*   **Path**: `/api/team/members`
*   **Headers**: `Authorization: Bearer <token>`
*   **Query Parameters**:
    *   `companyId` (Number, required)

### Remove Team Member
*   **Method**: `DELETE`
*   **Path**: `/api/team/members/:userId`
*   **Headers**: `Authorization: Bearer <token>`
*   **Query Parameters**:
    *   `companyId` (Number, required)

---

## 4. Company Profile Management (User Service)

### Get Current Company
*   **Method**: `GET`
*   **Path**: `/api/company`
*   **Headers**: `Authorization: Bearer <token>`

### Update Current Company
*   **Method**: `PATCH` / `PUT`
*   **Path**: `/api/company`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body** (JSON):
    ```json
    {
      "name": "Updated Corp Name",
      "businessType": "Wholesale"
    }
    ```

### Get Company by ID
*   **Method**: `GET`
*   **Path**: `/api/company/:id`
*   **Headers**: `Authorization: Bearer <token>`

### Update Company by ID
*   **Method**: `PATCH`
*   **Path**: `/api/company/:id`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body** (JSON):
    ```json
    {
      "name": "New Corp Name"
    }
    ```

---

## 5. Product Catalog & Taxonomy (Product Service)

### Get All Products
*   **Method**: `GET`
*   **Path**: `/api/products`
*   **Headers**: `Authorization: Bearer <token>`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Get Product Details
*   **Method**: `GET`
*   **Path**: `/api/products/:id`
*   **Headers**: `Authorization: Bearer <token>`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Create Product
*   **Method**: `POST`
*   **Path**: `/api/products`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body** (JSON):
    ```json
    {
      "basicInfo": {
        "title": "Premium Wireless Mouse",
        "sku": "MOUSE-MX-001",
        "category": "Electronics",
        "brand": "Logitech",
        "productIdentifierType": "UPC",
        "productIdentifierValue": "123456789012"
      },
      "description": {
        "mainDescription": "High precision wireless mouse."
      },
      "pricing": {
        "sellingPrice": 99.99,
        "costPrice": 60.00,
        "taxClass": "standard"
      },
      "inventory": {
        "stocks": [
          {
            "warehouse": "Default",
            "available": 150,
            "binLocations": ["A1-05"]
          }
        ]
      },
      "media": {
        "images": ["https://placehold.co/600x400/png"]
      },
      "variants": {
        "hasVariation": false
      },
      "listingStatus": {
        "status": "Draft"
      }
    }
    ```

### Update Product
*   **Method**: `PUT`
*   **Path**: `/api/products/:id`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body**: Fields to update (JSON).

### Update Product Variant
*   **Method**: `PUT`
*   **Path**: `/api/products/:productId/variants/:variantId`
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body**: Variant fields to update (JSON).

### Delete Product
*   **Method**: `DELETE`
*   **Path**: `/api/products/:id`
*   **Headers**: `Authorization: Bearer <token>`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Categories
*   `POST /api/categories` - Create category.
*   `GET /api/categories` - Get categories (`companyId` query parameter).
*   `GET /api/categories/:id` - Get category details.
*   `PUT /api/categories/:id` - Update category.
*   `DELETE /api/categories/:id` - Delete category.

### Brands
*   `POST /api/brands` - Create brand.
*   `GET /api/brands` - Get brands (`companyId` query parameter).
*   `GET /api/brands/:id` - Get brand details.
*   `PUT /api/brands/:id` - Update brand.
*   `DELETE /api/brands/:id` - Delete brand.

### Suppliers
*   `POST /api/suppliers` - Create supplier.
*   `GET /api/suppliers` - Get suppliers (`companyId` query parameter).

### Attributes
*   `POST /api/attributes` - Create attribute definition.
*   `GET /api/attributes` - Get attributes (`companyId` query parameter).

---

## 6. Warehouse & Stock Levels (Inventory Service)

### Warehouses
*   `POST /api/warehouses` - Create warehouse. (Header: `x-company-id` or defaults to 1).
*   `GET /api/warehouses` - Get warehouses (`companyId` query parameter).
*   `GET /api/warehouses/:id` - Get warehouse by ID.
*   `PUT /api/warehouses/:id` - Update warehouse.
*   `DELETE /api/warehouses/:id` - Delete warehouse.

### Get Stock Levels
*   **Method**: `GET`
*   **Path**: `/api/stock-levels`
*   **Query Parameters**:
    *   `companyId` (Number, required)
    *   `productId` (Number, optional)

### Get Variant Stock
*   **Method**: `GET`
*   **Path**: `/api/inventory/stock`
*   **Query Parameters**:
    *   `variantId` (Number, required)
    *   `companyId` (Number, required)

### Update Stock
*   **Method**: `POST`
*   **Path**: `/api/inventory/update`
*   **Request Body** (JSON):
    ```json
    {
      "variantId": 1,
      "warehouseId": 1,
      "available": 200,
      "safetyStock": 10,
      "binLocation": "A1-05"
    }
    ```

---

## 7. Shopify Integration (Shopify Service)

### Connect Shopify Store Manually
*   **Method**: `POST`
*   **Path**: `/api/shopify/connect`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
*   **Request Body** (JSON):
    ```json
    {
      "shop_domain": "my-cool-store.myshopify.com",
      "access_token": "shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
    ```

### Trigger Manual Channel Sync
*   **Method**: `POST`
*   **Path**: `/api/shopify/channels/:id/sync`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

---

## 8. Sales Channels & Listings (Marketplace Service)

### Create Channel
*   **Method**: `POST`
*   **Path**: `/api/channels` (gateway maps to `/api/marketplace/channels`)
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
*   **Request Body** (JSON):
    ```json
    {
      "name": "Shopify US Store",
      "marketplace": "shopify",
      "store_url": "my-shop.myshopify.com",
      "marketplace_data": {
        "access_token": "shpat_xxxxxxxxxxxxx"
      },
      "status": "active"
    }
    ```

### Get Channels
*   **Method**: `GET`
*   **Path**: `/api/channels`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Get Channel Stats
*   **Method**: `GET`
*   **Path**: `/api/channels/stats`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Get Channel Details
*   **Method**: `GET`
*   **Path**: `/api/channels/:id`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Update Channel
*   **Method**: `PUT`
*   **Path**: `/api/channels/:id`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
*   **Request Body**: Channel fields to update.

### Delete Channel
*   **Method**: `DELETE`
*   **Path**: `/api/channels/:id`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Create Listing
*   **Method**: `POST`
*   **Path**: `/api/listings` (gateway maps to `/api/marketplace/listings`)
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
*   **Request Body** (JSON):
    ```json
    {
      "productId": 1,
      "channelId": 1,
      "externalProductId": "ext_prod_12345",
      "status": "synced",
      "price": 99.99
    }
    ```

### Get Listings
*   **Method**: `GET`
*   **Path**: `/api/listings`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
    *   `channelId` (Number, optional)

### Update Listing
*   **Method**: `PATCH`
*   **Path**: `/api/listings/:id`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
*   **Request Body**: Listing fields to update.

---

## 9. Order Management (Order Service)

### Create Order
*   **Method**: `POST`
*   **Path**: `/api/orders`
*   **Request Body** (JSON):
    ```json
    {
      "companyId": 1,
      "channelId": 1,
      "externalOrderId": "ord_12345",
      "customerName": "John Doe",
      "customerEmail": "john@demo.com",
      "shippingAddress": "123 Main St, New York, NY",
      "totalAmount": 199.98,
      "items": [
        {
          "productId": 1,
          "variantId": 1,
          "sku": "MOUSE-MX-001",
          "quantity": 2,
          "price": 99.99
        }
      ]
    }
    ```

### Get Orders
*   **Method**: `GET`
*   **Path**: `/api/orders`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Get Order Details
*   **Method**: `GET`
*   **Path**: `/api/orders/:id`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)

### Update Order Status
*   **Method**: `PATCH`
*   **Path**: `/api/orders/:id/status`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
*   **Request Body** (JSON):
    ```json
    {
      "status": "fulfilled"
    }
    ```

---

## 10. Notifications (Notification Service)

### Send Notification
*   **Method**: `POST`
*   **Path**: `/api/notifications/send`
*   **Request Body** (JSON):
    ```json
    {
      "type": "low_stock",
      "companyId": 1,
      "userId": 1,
      "message": "Stock level for MOUSE-MX-001 is below safety limit."
    }
    ```

---

## 11. Audit Logs (Audit Service)

### Create Audit Log
*   **Method**: `POST`
*   **Path**: `/api/audit-logs`
*   **Request Body** (JSON):
    ```json
    {
      "companyId": 1,
      "userId": 1,
      "action": "product.update",
      "entityType": "product",
      "entityId": "1",
      "details": {
        "field": "price",
        "oldValue": 99.99,
        "newValue": 109.99
      }
    }
    ```

### Query Audit Logs
*   **Method**: `GET`
*   **Path**: `/api/audit-logs`
*   **Query Parameters**:
    *   `companyId` (Number, optional, defaults to 1)
    *   `entityType` (String, optional)
    *   `entityId` (String, optional)

---

## 12. Dashboard Stats (Gateway Service Local)

### Get Stats Summary
*   **Method**: `GET`
*   **Path**: `/api/dashboard/stats`
*   **Headers**: `Authorization: Bearer <token>` (Retrieves company context automatically)
*   **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "total_products": 12,
        "total_variants": 15,
        "active_products": 8,
        "low_stock_products": 3,
        "total_stock_value": 1499.85
      }
    }
    ```
