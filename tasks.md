# CIMS Project Transformation Tasks

## ✅ Completed Tasks (Backend & Integration)

### 1. Product Attributes API

- [x] Create `attributes` migration (id, name, value, type)
- [x] Implement `Attribute` Model with JSON accessor for options.
- [x] Implement `AttributeController` (CRUD).
- [x] Register API routes in `routes/api.php`.
- [x] Connect to Frontend `productService.ts`.

### 2. Core Catalog Entities (Pippa reference)

- [x] **Brands**: Implementation of `Brand` model, migration, and API endpoints.
- [x] **Warehouses**: Connected to stock management logic.
- [x] **Stock Levels**: Implementation of `StockLevel` tracking and API.
- [x] **Channels & Listings**: Established base tables for marketplace multi-channel support.

### 3. Shopify Marketplace Integration (Master Sync)

- [x] **Stores Management**: Encrypted storage for Admin API tokens and Webhook secrets.
- [x] **Product Mapping Engine**: Bridge table connecting CIMS SKUs to Shopify IDs.
- [x] **Push Engine (CIMS → Shopify)**:
  - [x] Price Autosync (with product-level overrides).
  - [x] Inventory Autosync (buffer support).
  - [x] Queue-based background processing for rate limits (429).
- [x] **Pull Engine (Shopify → CIMS)**:
  - [x] Paginated product import.
  - [x] Auto-mapping logic via SKU matching.
- [x] **Webhook Gateway**:
  - [x] Secure HMAC validation endpoint.
  - [x] `orders/create` handling: Auto-decucting stock from CIMS when sales occur on Shopify.
- [x] **Automation**: Event listener registered to trigger push jobs whenever CIMS master stock is updated.
- [x] **Audit & Resilience**: Detailed logs for every sync action in `shopify_logs`.

---

### 4. Enterprise Multi-Tenancy & Auditing

- [x] **Global Multi-Tenancy**: Implemented `BelongsToCompany` trait with Global Scopes.
- [x] **Auto-Filtering**: Team members now automatically see only their business's data.
- [x] **Audit Logging**: Added `company_id` and `created_by_id` to all core tables (`Attribute`, `Brand`, `Product`, `Warehouse`, `Supplier`, `Store`).
- [x] **Database Constraints**: Added foreign key relations to ensure data integrity.
- [x] **Team Management API**: Full CRUD endpoints for managing business team members.
  - [x] **Policy**: Permanent records maintained—Users can only be `disabled` (inactive), never deleted, to preserve audit logs.

---

## 🛠️ Next Steps / Pending

### 1. Frontend UI Polish

- [ ] Build the "Marketplace" dashboard to view Shopify Store status.
- [ ] Create mapping UI to resolve "Unmapped" products found during pull.
- [ ] Add Shopify settings to the "Add/Edit Product" screen (Sync toggle, Price overrides).

### 2. Advanced Inventory

- [ ] Implement multi-location mapping (Map specific Shopify Location to specific CIMS Warehouse).
- [ ] Handle `orders/cancelled` webhook to restock CIMS.

### 3. Order Management

- [ ] Pull Shopify Orders into CIMS for unified fulfillment tracking.
- [ ] Create unified Order model and migration.
