# CIMS Backend - API Blueprint v2.0

> **Version:** 2.0 (Security Enhanced)
> **Generated:** 2026-01-22
> **Framework:** Laravel 11.x

---

## 🔐 Authentication

All protected routes require:

```
Authorization: Bearer {access_token}
```

---

## 📋 API Endpoints

### Authentication

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| POST   | `/api/signup`     | Register new user + company  |
| POST   | `/api/login`      | Login and get tokens         |
| POST   | `/api/verify-otp` | Verify email with OTP        |
| POST   | `/api/resend-otp` | Resend OTP                   |
| POST   | `/api/logout`     | Logout (protected)           |
| GET    | `/api/me`         | Get current user (protected) |

---

### Central Inventory (Products)

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/products`      | List all products  |
| POST   | `/api/products`      | Create product     |
| GET    | `/api/products/{id}` | Get single product |
| PUT    | `/api/products/{id}` | Update product     |
| DELETE | `/api/products/{id}` | Delete product     |

---

### Channels (Marketplace Connections)

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/api/channels`                 | List all channels         |
| POST   | `/api/channels`                 | Create channel            |
| GET    | `/api/channels/{id}`            | Get channel with listings |
| PUT    | `/api/channels/{id}`            | Update channel            |
| DELETE | `/api/channels/{id}`            | Delete channel            |
| GET    | `/api/channels/stats`           | Channel statistics        |
| POST   | `/api/channels/{id}/activate`   | Activate channel          |
| POST   | `/api/channels/{id}/deactivate` | Deactivate channel        |
| POST   | `/api/channels/{id}/test`       | Test connection           |

---

### Listings (Marketplace Published Inventory)

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/listings`              | List all listings      |
| POST   | `/api/listings`              | Create listing         |
| GET    | `/api/listings/{id}`         | Get listing details    |
| PUT    | `/api/listings/{id}`         | Update listing         |
| DELETE | `/api/listings/{id}`         | Delete listing         |
| GET    | `/api/listings/stats`        | Listing statistics     |
| POST   | `/api/listings/{id}/publish` | Publish to marketplace |
| POST   | `/api/listings/{id}/pause`   | Pause listing          |

**Query Parameters:**

- `channel_id` - Filter by channel
- `product_id` - Filter by product
- `status` - Filter by status (draft, pending, active, paused, error, ended)
- `sync_status` - Filter by sync status (synced, pending, error)
- `is_published` - Filter by published state
- `page`, `per_page` - Pagination

---

## 📦 Request/Response Examples

### Create Listing

```http
POST /api/listings
Authorization: Bearer {token}
Content-Type: application/json

{
  "channel_id": "ch_abc123...",
  "stock_item_id": "1234567890",
  "title_override": "Optimized Title for Shopify",
  "price_override": 99.99,
  "quantity_allocated": 50,
  "sync_quantity": true,
  "tags": ["bestseller", "featured"]
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "listing_id": "lst_def456...",
        "company_id": 1,
        "channel_id": "ch_abc123...",
        "stock_item_id": "1234567890",
        "status": "draft",
        "sync_status": "pending",
        "created_by": 1,
        "version": 1
    },
    "message": "Listing created successfully"
}
```

---

### Publish Listing

```http
POST /api/listings/{id}/publish
Authorization: Bearer {token}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "listing_id": "lst_def456...",
        "status": "active",
        "is_published": true,
        "published_at": "2026-01-22T06:48:44Z"
    },
    "message": "Listing published successfully"
}
```

---

### Get Listings Stats

```http
GET /api/listings/stats
Authorization: Bearer {token}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "total": 125,
        "active": 80,
        "draft": 30,
        "paused": 10,
        "error": 5,
        "pending_sync": 15,
        "total_allocated": 5000
    }
}
```

---

## 🗃️ Database Tables

### channels

| Column       | Type             | Description                      |
| ------------ | ---------------- | -------------------------------- |
| channel_id   | string (PK)      | UUID-like ID                     |
| company_id   | bigint (FK)      | Owner company                    |
| name         | string           | Display name                     |
| platform     | enum             | shopify/amazon/ebay/etsy/walmart |
| status       | enum             | active/inactive/error/pending    |
| credentials  | text (encrypted) | API keys                         |
| store_url    | string           | Store URL                        |
| last_sync_at | timestamp        | Last sync time                   |
| sync_error   | text             | Last error                       |
| connected_by | bigint (FK)      | User who connected               |
| created_by   | bigint (FK)      | Created by user                  |
| updated_by   | bigint (FK)      | Updated by user                  |
| deleted_at   | timestamp        | Soft delete                      |

### listings

| Column               | Type        | Description                             |
| -------------------- | ----------- | --------------------------------------- |
| listing_id           | string (PK) | UUID-like ID                            |
| company_id           | bigint (FK) | Owner company                           |
| channel_id           | string (FK) | Target channel                          |
| stock_item_id        | string (FK) | Source product                          |
| variant_id           | string (FK) | Specific variant                        |
| marketplace_id       | string      | External ID (ASIN, etc.)                |
| marketplace_sku      | string      | Marketplace SKU                         |
| listing_url          | string      | Live listing URL                        |
| title_override       | string      | Channel-specific title                  |
| description_override | text        | Channel-specific description            |
| price_override       | decimal     | Channel-specific price                  |
| compare_at_price     | decimal     | Strike-through price                    |
| currency             | string      | ISO currency                            |
| quantity_allocated   | integer     | Stock allocated                         |
| quantity_reserved    | integer     | Reserved for orders                     |
| buffer_quantity      | integer     | Safety buffer                           |
| sync_quantity        | boolean     | Auto-sync from central?                 |
| status               | enum        | draft/pending/active/paused/error/ended |
| sync_status          | enum        | synced/pending/error                    |
| last_synced_at       | timestamp   | Last sync time                          |
| sync_error           | text        | Last sync error                         |
| is_published         | boolean     | Live on marketplace?                    |
| published_at         | timestamp   | First publish date                      |
| tags                 | json        | Marketplace tags                        |
| custom_attributes    | json        | Extra fields                            |
| created_by           | bigint (FK) | Created by user                         |
| updated_by           | bigint (FK) | Updated by user                         |
| version              | integer     | Optimistic lock                         |
| deleted_at           | timestamp   | Soft delete                             |

### audit_logs

| Column      | Type        | Description                                        |
| ----------- | ----------- | -------------------------------------------------- |
| id          | uuid (PK)   | Unique ID                                          |
| company_id  | bigint (FK) | Company context                                    |
| user_id     | bigint (FK) | Actor                                              |
| action      | enum        | create/update/delete/view/export/login/logout/sync |
| entity_type | string      | Table/model name                                   |
| entity_id   | string      | Affected record ID                                 |
| old_values  | json        | Previous state                                     |
| new_values  | json        | New state                                          |
| ip_address  | string      | Request IP                                         |
| user_agent  | string      | Browser info                                       |
| request_id  | string      | Correlation ID                                     |
| created_at  | timestamp   | Event time                                         |

---

## 🚀 Migration Command

```bash
php artisan migrate
```

---

## 📁 Files Created/Modified

### New Files

- `database/migrations/2026_01_22_064800_enhance_channels_listings_blueprint_v2.php`
- `app/Models/AuditLog.php`

### Modified Files

- `app/Models/Channel.php` - Added audit fields, relationships, scopes
- `app/Models/Listing.php` - Full Blueprint v2.0 implementation
- `app/Http/Controllers/Api/ChannelController.php` - Full CRUD + actions
- `app/Http/Controllers/Api/ListingController.php` - Full CRUD + actions
- `routes/api.php` - Added new routes

---

_End of Backend Blueprint v2.0_
