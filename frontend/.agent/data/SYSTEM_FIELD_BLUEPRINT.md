# CIMS - Enterprise System Blueprint v2.0
> **Version:** 2.0 (Security Enhanced)
> **Generated:** 2026-01-22
> **Classification:** INTERNAL - CONFIDENTIAL

---

## 🔐 SECURITY MODEL

### Multi-Tenant Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      CIMS PLATFORM                          │
├─────────────────────────────────────────────────────────────┤
│  Company A (Tenant)    │  Company B (Tenant)    │  ...      │
│  ├── Users             │  ├── Users             │           │
│  ├── Products          │  ├── Products          │           │
│  ├── Orders            │  ├── Orders            │           │
│  └── Channels          │  └── Channels          │           │
└─────────────────────────────────────────────────────────────┘
```

### Data Isolation Rules
- ✅ Every record MUST have `company_id`
- ✅ Every record MUST have `created_by` (user_id)
- ✅ Row-Level Security (RLS) enforced at database level
- ✅ API requests validated against user's company context
- ✅ JWT tokens contain company_id and user_id claims

---

## 📊 DUAL INVENTORY ARCHITECTURE

> **KEY CONCEPT:** Central Inventory is the MASTER (Source of Truth). Marketplace Listings are PUBLISHED copies with channel-specific overrides.

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CIMS PLATFORM                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    🏢 CENTRAL INVENTORY                               │   │
│  │                    (Master / Source of Truth)                         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │   │
│  │  │Product A│  │Product B│  │Product C│  │Product D│  ...             │   │
│  │  │SKU: 001 │  │SKU: 002 │  │SKU: 003 │  │SKU: 004 │                  │   │
│  │  │Qty: 100 │  │Qty: 50  │  │Qty: 200 │  │Qty: 75  │                  │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘                  │   │
│  └───────│───────────│───────────│───────────│──────────────────────────┘   │
│          │           │           │           │                               │
│          │    PUBLISH / SYNC     │           │                               │
│          ▼           ▼           ▼           ▼                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    🛒 MARKETPLACE LISTINGS                            │   │
│  │                    (Published / Channel-Specific)                     │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   SHOPIFY   │  │   AMAZON    │  │    EBAY     │  │    ETSY     │  │   │
│  │  │  Listings   │  │  Listings   │  │  Listings   │  │  Listings   │  │   │
│  │  ├─────────────┤  ├─────────────┤  ├─────────────┤  ├─────────────┤  │   │
│  │  │ Product A   │  │ Product A   │  │ Product B   │  │ Product A   │  │   │
│  │  │ Price: $99  │  │ Price: $89  │  │ Price: $45  │  │ Price: $110 │  │   │
│  │  │ Title: ...  │  │ Title: ...  │  │ Title: ...  │  │ Title: ...  │  │   │
│  │  │ Qty: 50     │  │ Qty: 30     │  │ Qty: 50     │  │ Qty: 20     │  │   │
│  │  │ Status: ✅  │  │ Status: ✅  │  │ Status: ✅  │  │ Status: ⏳  │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Inventory Sync Rules

| Rule | Description |
|------|-------------|
| **Master Controls Stock** | Central Inventory holds TRUE quantity |
| **Allocation per Channel** | Split stock across marketplaces (e.g., 50 to Shopify, 30 to Amazon) |
| **Price Override** | Each marketplace can have different pricing |
| **Title/Description Override** | Channel-specific content optimization |
| **Status Independent** | Product can be Active on Shopify but Draft on Amazon |
| **Sync Direction** | Central → Marketplace (Push) OR Marketplace → Central (Pull orders) |

### Entity Relationships

```
┌──────────────────┐
│     COMPANY      │
│    (Tenant)      │
└────────┬─────────┘
         │
         │ 1:N
         ▼
┌──────────────────┐       ┌──────────────────┐
│      USER        │◄──────│   AUDIT_LOG      │
│    (Actor)       │       │   (History)      │
└────────┬─────────┘       └──────────────────┘
         │
         │ creates/updates
         ▼
┌──────────────────────────────────────────────────────────────┐
│                   CENTRAL INVENTORY                           │
├──────────────────┬──────────────────┬───────────────────────┤
│     PRODUCT      │     VARIANT      │     STOCK_ENTRY       │
│   (Master SKU)   │  (Size/Color)    │   (Warehouse Qty)     │
└────────┬─────────┴────────┬─────────┴───────────────────────┘
         │                  │
         │ publish          │ publish
         ▼                  ▼
┌──────────────────────────────────────────────────────────────┐
│                  MARKETPLACE LISTINGS                         │
├──────────────────┬──────────────────┬───────────────────────┤
│ LISTING_SHOPIFY  │ LISTING_AMAZON   │ LISTING_EBAY          │
│ (Channel Copy)   │ (Channel Copy)   │ (Channel Copy)        │
├──────────────────┼──────────────────┼───────────────────────┤
│ - product_id FK  │ - product_id FK  │ - product_id FK       │
│ - channel_id FK  │ - channel_id FK  │ - channel_id FK       │
│ - title_override │ - title_override │ - title_override      │
│ - price_override │ - price_override │ - price_override      │
│ - qty_allocated  │ - qty_allocated  │ - qty_allocated       │
│ - status         │ - status         │ - status              │
│ - marketplace_id │ - asin           │ - ebay_item_id        │
└──────────────────┴──────────────────┴───────────────────────┘
```

---

## 🏢 SECTION 1: COMPANY (TENANT)

### 1.1 Company Entity

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Unique company identifier |
| 2 | `name` | string | ✅ | max:255 | Company legal name |
| 3 | `slug` | string | auto | unique, lowercase | URL-safe identifier |
| 4 | `business_type` | enum | ✅ | ecommerce/retail/wholesale/manufacturing | Business category |
| 5 | `subscription_plan` | enum | ✅ | free/starter/pro/enterprise | Billing tier |
| 6 | `subscription_status` | enum | ✅ | trial/active/suspended/cancelled | Account status |
| 7 | `trial_ends_at` | datetime | ❌ | nullable | Trial expiration |
| 8 | `contact_email` | email | ✅ | unique | Primary contact |
| 9 | `contact_phone` | string | ❌ | max:20 | Primary phone |
| 10 | `address_line1` | string | ❌ | max:255 | Street address |
| 11 | `address_line2` | string | ❌ | max:255 | Additional address |
| 12 | `city` | string | ❌ | max:100 | City |
| 13 | `state` | string | ❌ | max:100 | State/Province |
| 14 | `country` | string | ❌ | ISO 3166-1 alpha-2 | Country code |
| 15 | `postal_code` | string | ❌ | max:20 | ZIP/Postal code |
| 16 | `timezone` | string | ✅ | IANA timezone | Default: UTC |
| 17 | `currency` | string | ✅ | ISO 4217 | Default currency (USD) |
| 18 | `logo_url` | string | ❌ | URL | Company logo |
| 19 | `settings` | JSON | ❌ | - | Company-specific settings |
| 20 | `is_active` | boolean | ✅ | default:true | Soft delete flag |
| 21 | `created_at` | datetime | auto | - | Creation timestamp |
| 22 | `updated_at` | datetime | auto | - | Last update timestamp |

### API: Company Registration
```json
// POST /api/v1/companies
// Headers: { "Content-Type": "application/json" }

// Request Body
{
  "name": "Acme Corporation",
  "business_type": "ecommerce",
  "contact_email": "admin@acme.com",
  "contact_phone": "+1-555-123-4567",
  "country": "US",
  "timezone": "America/New_York",
  "currency": "USD"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "id": "comp_01HQ5K...",
    "name": "Acme Corporation",
    "slug": "acme-corporation",
    "subscription_plan": "trial",
    "subscription_status": "trial",
    "trial_ends_at": "2026-02-05T06:34:39Z"
  }
}
```

---

## 👤 SECTION 2: USER MANAGEMENT

### 2.1 User Entity

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Unique user identifier |
| 2 | `company_id` | UUID | ✅ | FK→companies | Belongs to company |
| 3 | `email` | email | ✅ | unique per company | Login email |
| 4 | `password_hash` | string | ✅ | bcrypt | Hashed password (NEVER exposed) |
| 5 | `full_name` | string | ✅ | max:255 | Display name |
| 6 | `avatar_url` | string | ❌ | URL | Profile picture |
| 7 | `role` | enum | ✅ | owner/admin/manager/staff/viewer | Access level |
| 8 | `permissions` | JSON | ❌ | - | Granular permissions override |
| 9 | `status` | enum | ✅ | active/inactive/suspended | Account status |
| 10 | `email_verified_at` | datetime | ❌ | nullable | Email verification timestamp |
| 11 | `last_login_at` | datetime | ❌ | nullable | Last successful login |
| 12 | `last_login_ip` | string | ❌ | IP address | Security tracking |
| 13 | `two_factor_enabled` | boolean | ✅ | default:false | 2FA status |
| 14 | `two_factor_secret` | string | ❌ | encrypted | TOTP secret |
| 15 | `password_changed_at` | datetime | ❌ | nullable | Password rotation tracking |
| 16 | `failed_login_attempts` | integer | ✅ | default:0 | Brute-force protection |
| 17 | `locked_until` | datetime | ❌ | nullable | Account lockout timestamp |
| 18 | `invite_token` | string | ❌ | unique, nullable | Team invite token |
| 19 | `invite_expires_at` | datetime | ❌ | nullable | Invite expiration |
| 20 | `created_at` | datetime | auto | - | Creation timestamp |
| 21 | `updated_at` | datetime | auto | - | Last update timestamp |
| 22 | `created_by` | UUID | ❌ | FK→users | Created by user |

### 2.2 Role Permissions Matrix

| Permission | Owner | Admin | Manager | Staff | Viewer |
|------------|-------|-------|---------|-------|--------|
| Manage Company Settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Users | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage Billing | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create Products | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edit Products | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete Products | ✅ | ✅ | ✅ | ❌ | ❌ |
| View Products | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage Channels | ✅ | ✅ | ✅ | ❌ | ❌ |
| View Reports | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export Data | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## 🔑 SECTION 3: AUTHENTICATION

### 3.1 Sign In (`auth-signin-v1`)

| # | Field Name | Type | Required | Validation |
|---|------------|------|----------|------------|
| 1 | `email` | email | ✅ | valid email format |
| 2 | `password` | password | ✅ | min:8, max:128 |
| 3 | `remember_me` | boolean | ❌ | default:false |
| 4 | `device_fingerprint` | string | ❌ | Browser fingerprint for security |

```json
// POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "remember_me": true,
  "device_fingerprint": "abc123..."
}

// Response (200 OK)
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2...",
    "user": {
      "id": "usr_01HQ5K...",
      "company_id": "comp_01HQ5K...",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "admin",
      "permissions": ["products:read", "products:write"]
    }
  }
}
```

### 3.2 Sign Up (`auth-signup-v1`)

| # | Field Name | Type | Required | Validation |
|---|------------|------|----------|------------|
| 1 | `full_name` | string | ✅ | min:2, max:255 |
| 2 | `email` | email | ✅ | unique, valid email |
| 3 | `password` | password | ✅ | min:8, max:128, complexity rules |
| 4 | `password_confirmation` | password | ✅ | must match password |
| 5 | `company_name` | string | ✅ | min:2, max:255 |
| 6 | `business_type` | enum | ✅ | ecommerce/retail/wholesale/manufacturing |
| 7 | `management_type` | enum | ✅ | single/team |
| 8 | `terms_agreement` | boolean | ✅ | must be true |
| 9 | `marketing_consent` | boolean | ❌ | default:false |

```json
// POST /api/v1/auth/register
{
  "full_name": "John Doe",
  "email": "john@acme.com",
  "password": "SecureP@ss123",
  "password_confirmation": "SecureP@ss123",
  "company_name": "Acme Corporation",
  "business_type": "ecommerce",
  "management_type": "team",
  "terms_agreement": true,
  "marketing_consent": false
}

// Response (201 Created)
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "user_id": "usr_01HQ5K...",
    "company_id": "comp_01HQ5K...",
    "email": "john@acme.com",
    "verification_required": true
  }
}
```

### 3.3 Forgot Password (`auth-forgot-password-v1`)

| # | Field Name | Type | Required | Validation |
|---|------------|------|----------|------------|
| 1 | `email` | email | ✅ | valid email format |

```json
// POST /api/v1/auth/forgot-password
{
  "email": "user@example.com"
}

// Response (200 OK) - Same response regardless of email existence (security)
{
  "success": true,
  "message": "If an account exists, a reset link has been sent."
}
```

### 3.4 Reset Password (`auth-reset-password-v1`)

| # | Field Name | Type | Required | Validation |
|---|------------|------|----------|------------|
| 1 | `token` | string | ✅ | Valid reset token |
| 2 | `password` | password | ✅ | min:8, max:128, complexity |
| 3 | `password_confirmation` | password | ✅ | must match password |

```json
// POST /api/v1/auth/reset-password
{
  "token": "abc123def456...",
  "password": "NewSecureP@ss456",
  "password_confirmation": "NewSecureP@ss456"
}
```

### 3.5 Email Verification (`auth-verify-email-v1`)

| # | Field Name | Type | Required | Validation |
|---|------------|------|----------|------------|
| 1 | `email` | email | ✅ | From URL/state |
| 2 | `otp` | string | ✅ | 6 digits |

```json
// POST /api/v1/auth/verify-email
{
  "email": "user@example.com",
  "otp": "123456"
}
```

---

## 📦 SECTION 4: PRODUCT ENTITY

### 4.1 Product Master Record

> **CRITICAL:** Every product MUST be linked to a `company_id` and track `created_by`/`updated_by`

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| **SYSTEM FIELDS** |
| 1 | `id` | UUID | auto | PK | Unique product identifier |
| 2 | `company_id` | UUID | ✅ | FK→companies, indexed | **TENANT ISOLATION** |
| 3 | `created_by` | UUID | ✅ | FK→users | User who created |
| 4 | `updated_by` | UUID | ✅ | FK→users | User who last updated |
| 5 | `created_at` | datetime | auto | - | Creation timestamp |
| 6 | `updated_at` | datetime | auto | - | Last update timestamp |
| 7 | `deleted_at` | datetime | ❌ | nullable | Soft delete timestamp |
| 8 | `version` | integer | auto | default:1 | Optimistic locking |
| **BASIC INFO** |
| 9 | `sku` | string | ✅ | unique per company, max:100 | Stock Keeping Unit |
| 10 | `barcode_type` | enum | ❌ | UPC/EAN/GTIN/ISBN | Identifier type |
| 11 | `barcode_value` | string | ❌ | max:50 | Barcode value |
| 12 | `title` | string | ✅ | max:500 | Product title |
| 13 | `slug` | string | auto | unique per company | URL-safe identifier |
| 14 | `category_id` | UUID | ❌ | FK→categories | Product category |
| 15 | `condition` | enum | ✅ | new/used/refurbished/open_box | Product condition |
| 16 | `brand` | string | ❌ | max:100 | Brand name |
| 17 | `manufacturer` | string | ❌ | max:100 | Manufacturer |
| 18 | `model` | string | ❌ | max:100 | Model number |
| **PRICING** |
| 19 | `cost_price` | decimal | ❌ | precision:10,2 | Purchase cost |
| 20 | `msrp` | decimal | ❌ | precision:10,2 | Suggested retail |
| 21 | `retail_price` | decimal | ❌ | precision:10,2 | Selling price |
| 22 | `map_price` | decimal | ❌ | precision:10,2 | Minimum advertised |
| 23 | `currency` | string | ✅ | ISO 4217, default:company currency | Price currency |
| 24 | `tax_class` | enum | ❌ | standard/reduced/zero/exempt | Tax category |
| **DIMENSIONS** |
| 25 | `weight_value` | decimal | ❌ | precision:10,3 | Product weight |
| 26 | `weight_unit` | enum | ❌ | kg/lb/oz/g | Weight unit |
| 27 | `length` | decimal | ❌ | precision:10,2 | Package length |
| 28 | `width` | decimal | ❌ | precision:10,2 | Package width |
| 29 | `height` | decimal | ❌ | precision:10,2 | Package height |
| 30 | `dimension_unit` | enum | ❌ | in/cm/mm | Dimension unit |
| **CONTENT** |
| 31 | `short_description` | text | ❌ | max:500 | Brief summary |
| 32 | `description` | text | ❌ | max:65535 | Full description (HTML allowed) |
| 33 | `features` | JSON | ❌ | array of strings | Bullet features |
| **ORIGIN** |
| 34 | `country_of_origin` | string | ❌ | ISO 3166-1 alpha-2 | Manufacturing country |
| 35 | `harmonized_code` | string | ❌ | max:20 | HS/HTS code for customs |
| **STATUS** |
| 36 | `status` | enum | ✅ | draft/active/archived | Product lifecycle |
| 37 | `is_published` | boolean | ✅ | default:false | Visibility flag |
| 38 | `published_at` | datetime | ❌ | nullable | First publish date |

### 4.2 Product API Endpoints

```json
// GET /api/v1/products
// Headers: { "Authorization": "Bearer {token}" }
// Query: ?page=1&limit=20&status=active&search=laptop

// Response (200 OK)
{
  "success": true,
  "data": [...],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 156,
    "total_pages": 8
  }
}
```

```json
// POST /api/v1/products
// Headers: { "Authorization": "Bearer {token}", "Content-Type": "application/json" }

{
  "sku": "LAPTOP-001",
  "title": "Pro Laptop 15 inch",
  "condition": "new",
  "brand": "TechBrand",
  "cost_price": 500.00,
  "retail_price": 799.99,
  "weight_value": 2.5,
  "weight_unit": "kg",
  "short_description": "High-performance laptop",
  "description": "<p>Full HTML description...</p>",
  "features": ["16GB RAM", "512GB SSD", "4K Display"],
  "country_of_origin": "CN",
  "status": "draft"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "id": "prod_01HQ5K...",
    "company_id": "comp_01HQ5K...",  // Auto-assigned from token
    "created_by": "usr_01HQ5K...",   // Auto-assigned from token
    "updated_by": "usr_01HQ5K...",
    "sku": "LAPTOP-001",
    "slug": "pro-laptop-15-inch",
    "created_at": "2026-01-22T06:34:39Z",
    "updated_at": "2026-01-22T06:34:39Z",
    "version": 1
  }
}
```

---

## 📊 SECTION 5: INVENTORY / STOCK

### 5.1 Stock Entry Entity

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Stock entry ID |
| 2 | `company_id` | UUID | ✅ | FK→companies | **TENANT ISOLATION** |
| 3 | `product_id` | UUID | ✅ | FK→products | Parent product |
| 4 | `variant_id` | UUID | ❌ | FK→variants | Specific variant (null = master) |
| 5 | `warehouse_id` | UUID | ✅ | FK→warehouses | Location |
| 6 | `sku` | string | ❌ | max:100 | Location-specific SKU override |
| 7 | `quantity_available` | integer | ✅ | min:0 | Available stock |
| 8 | `quantity_reserved` | integer | ✅ | default:0, min:0 | Reserved for orders |
| 9 | `quantity_incoming` | integer | ✅ | default:0, min:0 | Expected from PO |
| 10 | `reorder_point` | integer | ❌ | min:0 | Low stock alert threshold |
| 11 | `reorder_quantity` | integer | ❌ | min:1 | Suggested reorder qty |
| 12 | `bin_location` | string | ❌ | max:50 | Physical location code |
| 13 | `cost_per_unit` | decimal | ❌ | precision:10,2 | Location cost override |
| 14 | `is_default` | boolean | ✅ | default:false | Primary fulfillment location |
| 15 | `priority_order` | integer | ✅ | default:0 | Fulfillment priority |
| 16 | `last_counted_at` | datetime | ❌ | nullable | Last inventory count |
| 17 | `created_by` | UUID | ✅ | FK→users | Created by |
| 18 | `updated_by` | UUID | ✅ | FK→users | Updated by |
| 19 | `created_at` | datetime | auto | - | Creation timestamp |
| 20 | `updated_at` | datetime | auto | - | Update timestamp |

---

## 🔄 SECTION 6: VARIANTS

### 6.1 Variant Entity

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Variant ID |
| 2 | `company_id` | UUID | ✅ | FK→companies | **TENANT ISOLATION** |
| 3 | `product_id` | UUID | ✅ | FK→products | Parent product |
| 4 | `sku` | string | ✅ | unique per company | Variant SKU |
| 5 | `barcode` | string | ❌ | max:50 | Variant barcode |
| 6 | `title` | string | ❌ | max:255 | Variant-specific title |
| 7 | `options` | JSON | ✅ | - | Option values {"Color": "Red", "Size": "XL"} |
| 8 | `price_adjustment` | decimal | ❌ | precision:10,2 | Price difference from base |
| 9 | `cost_adjustment` | decimal | ❌ | precision:10,2 | Cost difference from base |
| 10 | `weight_adjustment` | decimal | ❌ | precision:10,3 | Weight difference |
| 11 | `image_id` | UUID | ❌ | FK→product_images | Variant image |
| 12 | `position` | integer | ✅ | default:0 | Display order |
| 13 | `is_active` | boolean | ✅ | default:true | Availability |
| 14 | `created_by` | UUID | ✅ | FK→users | Created by |
| 15 | `updated_by` | UUID | ✅ | FK→users | Updated by |
| 16 | `created_at` | datetime | auto | - | Creation timestamp |
| 17 | `updated_at` | datetime | auto | - | Update timestamp |

---

## 🖼️ SECTION 7: MEDIA

### 7.1 Product Image Entity

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Image ID |
| 2 | `company_id` | UUID | ✅ | FK→companies | **TENANT ISOLATION** |
| 3 | `product_id` | UUID | ✅ | FK→products | Parent product |
| 4 | `variant_id` | UUID | ❌ | FK→variants | Specific variant |
| 5 | `url` | string | ✅ | URL, max:2048 | CDN URL |
| 6 | `thumbnail_url` | string | ❌ | URL | Thumbnail version |
| 7 | `alt_text` | string | ❌ | max:255 | Accessibility text |
| 8 | `position` | integer | ✅ | default:0 | Display order |
| 9 | `is_primary` | boolean | ✅ | default:false | Main image flag |
| 10 | `file_size` | integer | ❌ | bytes | Original file size |
| 11 | `width` | integer | ❌ | pixels | Image width |
| 12 | `height` | integer | ❌ | pixels | Image height |
| 13 | `mime_type` | string | ❌ | max:50 | image/jpeg, image/png, etc. |
| 14 | `uploaded_by` | UUID | ✅ | FK→users | Uploader |
| 15 | `created_at` | datetime | auto | - | Upload timestamp |

---

## 🏪 SECTION 8: MARKETPLACE CHANNELS

### 8.1 Channel Entity

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Channel ID |
| 2 | `company_id` | UUID | ✅ | FK→companies | **TENANT ISOLATION** |
| 3 | `platform` | enum | ✅ | shopify/amazon/ebay/etsy/walmart | Marketplace |
| 4 | `name` | string | ✅ | max:100 | Display name |
| 5 | `status` | enum | ✅ | active/inactive/error/pending | Connection status |
| 6 | `credentials` | JSON | ✅ | encrypted | API keys/tokens |
| 7 | `settings` | JSON | ❌ | - | Channel-specific settings |
| 8 | `store_url` | string | ❌ | URL | Store URL |
| 9 | `last_sync_at` | datetime | ❌ | nullable | Last synchronization |
| 10 | `sync_error` | text | ❌ | nullable | Last error message |
| 11 | `connected_by` | UUID | ✅ | FK→users | Who connected |
---

### 8.2 Marketplace Listing Entity (PUBLISHED INVENTORY)

> **This is the SECOND inventory table** - Published copies per channel with overrides

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| **SYSTEM FIELDS** |
| 1 | `id` | UUID | auto | PK | Listing ID |
| 2 | `company_id` | UUID | ✅ | FK→companies | **TENANT ISOLATION** |
| 3 | `product_id` | UUID | ✅ | FK→products | Source product (Central Inventory) |
| 4 | `variant_id` | UUID | ❌ | FK→variants | Specific variant |
| 5 | `channel_id` | UUID | ✅ | FK→channels | Target marketplace |
| **MARKETPLACE IDENTIFIERS** |
| 6 | `marketplace_id` | string | ❌ | max:100 | External ID (Shopify product_id, Amazon ASIN) |
| 7 | `marketplace_sku` | string | ❌ | max:100 | Marketplace-specific SKU |
| 8 | `listing_url` | string | ❌ | URL | Live listing URL |
| **CONTENT OVERRIDES (Null = Use Central)** |
| 9 | `title_override` | string | ❌ | max:500 | Channel-specific title |
| 10 | `description_override` | text | ❌ | max:65535 | Channel-specific description |
| 11 | `short_description_override` | text | ❌ | max:500 | Channel-specific summary |
| 12 | `features_override` | JSON | ❌ | array | Channel-specific features |
| **PRICING OVERRIDES** |
| 13 | `price_override` | decimal | ❌ | precision:10,2 | Channel-specific price |
| 14 | `compare_at_price` | decimal | ❌ | precision:10,2 | Original/strike-through price |
| 15 | `currency` | string | ✅ | ISO 4217 | Listing currency |
| **INVENTORY ALLOCATION** |
| 16 | `quantity_allocated` | integer | ✅ | min:0 | Stock allocated to this channel |
| 17 | `quantity_reserved` | integer | ✅ | default:0 | Reserved (pending orders) |
| 18 | `buffer_quantity` | integer | ❌ | default:0 | Safety stock buffer |
| 19 | `sync_quantity` | boolean | ✅ | default:true | Auto-sync from Central? |
| **STATUS & SYNC** |
| 20 | `status` | enum | ✅ | draft/pending/active/paused/error/ended | Listing lifecycle |
| 21 | `sync_status` | enum | ✅ | synced/pending/error | Sync state |
| 22 | `last_synced_at` | datetime | ❌ | nullable | Last successful sync |
| 23 | `sync_error` | text | ❌ | nullable | Last sync error message |
| 24 | `is_published` | boolean | ✅ | default:false | Live on marketplace? |
| 25 | `published_at` | datetime | ❌ | nullable | First publish date |
| **MARKETPLACE-SPECIFIC DATA** |
| 26 | `category_id` | string | ❌ | max:100 | Marketplace category ID |
| 27 | `tags` | JSON | ❌ | array | Marketplace tags |
| 28 | `shipping_template_id` | string | ❌ | max:100 | Marketplace shipping profile |
| 29 | `return_policy_id` | string | ❌ | max:100 | Marketplace return policy |
| 30 | `custom_attributes` | JSON | ❌ | - | Any extra marketplace fields |
| **AUDIT FIELDS** |
| 31 | `created_by` | UUID | ✅ | FK→users | Who published |
| 32 | `updated_by` | UUID | ✅ | FK→users | Who last updated |
| 33 | `created_at` | datetime | auto | - | Creation timestamp |
| 34 | `updated_at` | datetime | auto | - | Update timestamp |

### 8.3 Marketplace Listing API

```json
// POST /api/v1/listings (Publish to Marketplace)
// Headers: { "Authorization": "Bearer {token}" }

{
  "product_id": "prod_01HQ5K...",
  "channel_id": "ch_01HQ5K...",
  "title_override": "Optimized Shopify Title",
  "price_override": 99.99,
  "quantity_allocated": 50,
  "sync_quantity": true,
  "tags": ["sale", "featured"],
  "status": "draft"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "id": "lst_01HQ5K...",
    "company_id": "comp_01HQ5K...",
    "product_id": "prod_01HQ5K...",
    "channel_id": "ch_01HQ5K...",
    "status": "draft",
    "sync_status": "pending",
    "created_by": "usr_01HQ5K...",
    "created_at": "2026-01-22T06:39:48Z"
  }
}
```

```json
// PUT /api/v1/listings/{id}/publish (Go Live)
{
  "status": "active",
  "is_published": true
}

// Response (200 OK)
{
  "success": true,
  "data": {
    "id": "lst_01HQ5K...",
    "status": "active",
    "is_published": true,
    "published_at": "2026-01-22T06:45:00Z",
    "marketplace_id": "shopify_123456789",
    "listing_url": "https://mystore.myshopify.com/products/laptop-001"
  }
}
```

### 8.4 Inventory Flow Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    INVENTORY FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CENTRAL INVENTORY (products + stock_entries tables)            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Product: SKU-001                                        │    │
│  │  Total Stock: 100 units                                  │    │
│  │  Warehouses: [NYC: 60] [LA: 40]                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                    ALLOCATION                                    │
│                           ▼                                      │
│  MARKETPLACE LISTINGS (marketplace_listings table)              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │   SHOPIFY    │ │   AMAZON     │ │    EBAY      │            │
│  │  Allocated:  │ │  Allocated:  │ │  Allocated:  │            │
│  │     50       │ │     30       │ │     20       │            │
│  │  Price: $99  │ │  Price: $89  │ │  Price: $95  │            │
│  │  Status: ✅  │ │  Status: ✅  │ │  Status: ⏳  │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  TOTAL ALLOCATED: 50 + 30 + 20 = 100 ✓                          │
│  UNALLOCATED: 100 - 100 = 0                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📜 SECTION 9: AUDIT LOG

### 9.1 Audit Entry Entity

> **Purpose:** Complete audit trail for compliance and security

| # | Field Name | Type | Required | Constraints | Description |
|---|------------|------|----------|-------------|-------------|
| 1 | `id` | UUID | auto | PK | Audit entry ID |
| 2 | `company_id` | UUID | ✅ | FK→companies, indexed | **TENANT ISOLATION** |
| 3 | `user_id` | UUID | ✅ | FK→users | Actor |
| 4 | `action` | enum | ✅ | create/update/delete/view/export/login/logout | Action type |
| 5 | `entity_type` | string | ✅ | max:50 | Table/model name |
| 6 | `entity_id` | UUID | ❌ | nullable | Affected record ID |
| 7 | `old_values` | JSON | ❌ | - | Previous state (for updates) |
| 8 | `new_values` | JSON | ❌ | - | New state (for creates/updates) |
| 9 | `ip_address` | string | ✅ | IP | Request origin |
| 10 | `user_agent` | string | ❌ | max:500 | Browser/client info |
| 11 | `request_id` | string | ❌ | max:100 | Correlation ID |
| 12 | `created_at` | datetime | auto | - | Event timestamp |

---

## 🔒 SECURITY HEADERS & API CONVENTIONS

### Required Headers for All API Requests

```http
Authorization: Bearer {jwt_token}
X-Company-ID: {company_id}
X-Request-ID: {uuid}
Content-Type: application/json
Accept: application/json
```

### JWT Token Claims

```json
{
  "sub": "usr_01HQ5K...",           // User ID
  "cid": "comp_01HQ5K...",          // Company ID
  "role": "admin",                   // User role
  "permissions": ["products:*"],     // Permissions array
  "iat": 1706000000,                 // Issued at
  "exp": 1706003600,                 // Expires at
  "jti": "tok_01HQ5K..."            // Token ID (for revocation)
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "details": null
  },
  "request_id": "req_01HQ5K..."
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid/missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Invalid input data |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 📋 FORM ID REGISTRY

| Form ID | Entity | Endpoint | Status |
|---------|--------|----------|--------|
| `auth-signin-v1` | User | `POST /api/v1/auth/login` | ✅ |
| `auth-signup-v1` | User + Company | `POST /api/v1/auth/register` | ✅ |
| `auth-forgot-password-v1` | User | `POST /api/v1/auth/forgot-password` | ✅ |
| `auth-reset-password-v1` | User | `POST /api/v1/auth/reset-password` | ✅ |
| `auth-verify-email-v1` | User | `POST /api/v1/auth/verify-email` | ✅ |
| `inventory-add-product-v1` | Product | `POST /api/v1/products` | ✅ |
| `inventory-edit-product-v1` | Product | `PUT /api/v1/products/{id}` | ✅ |
| `inventory-stock-update-v1` | Stock | `PUT /api/v1/stocks/{id}` | ✅ |
| `channel-connect-v1` | Channel | `POST /api/v1/channels` | ✅ |
| `settings-company-v1` | Company | `PUT /api/v1/companies/{id}` | ✅ |
| `settings-user-profile-v1` | User | `PUT /api/v1/users/me` | ✅ |

---

## 🗂️ MOCK DATA FILES

| File | Endpoint | Purpose |
|------|----------|---------|
| `auth_signin.json` | `/api/mock/auth/signin` | Login response |
| `auth_signup.json` | `/api/mock/auth/signup` | Registration response |
| `auth_forgot_password.json` | `/api/mock/auth/forgot-password` | Password reset |
| `inventory_product_save.json` | `/api/mock/inventory/add-product` | Product create/update |
| `marketplace_mapping.json` | `/api/mock/marketplace-mapping` | Mapping data |
| `field_mapping.json` | `/api/mock/field-mapping` | Field protocols |
| `listing_templates.json` | `/api/mock/listing-templates` | Templates |
| `integrations.json` | `/api/mock/integrations` | Channels |
| `inventory_import.json` | `/api/mock/inventory-import` | Import logs |

---

*End of Enterprise Blueprint v2.0*
*Classification: INTERNAL - CONFIDENTIAL*
