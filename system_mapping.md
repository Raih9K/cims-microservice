# System Mapping: Frontend <-> Backend

## 1. Authentication Module

| Frontend Page      | Component                | Backend Controller              | API Endpoint                | DB Model             | Status                   |
| :----------------- | :----------------------- | :------------------------------ | :-------------------------- | :------------------- | :----------------------- |
| `/signin`          | `SignInForm.tsx`         | `AuthController@login`          | `POST /api/login`           | `User`               | ✅ Mapped                |
| `/signup`          | `SignUpForm.tsx`         | `AuthController@signup`         | `POST /api/signup`          | `User`, `Company`    | ✅ Mapped                |
| `/verify-email`    | `VerifyEmailForm.tsx`    | `AuthController@verifyOtp`      | `POST /api/verify-otp`      | `User`               | ✅ Mapped                |
| `/forgot-password` | `ForgotPasswordForm.tsx` | `AuthController@forgotPassword` | `POST /api/forgot-password` | `PasswordResetToken` | ⚠️ Pending Backend Logic |
| `/reset-password`  | `ResetPasswordForm.tsx`  | `AuthController@resetPassword`  | `POST /api/reset-password`  | `User`               | ⚠️ Pending Backend Logic |

**Data Flow:**

1. Frontend sends credentials -> Backend verifies & issues Sanctum Token.
2. User state (Roles, Permissions) loaded via `GET /api/me`.

## 2. Product Management

| Frontend Page        | Component             | Backend Controller          | API Endpoint                | DB Model                           | Status    |
| :------------------- | :-------------------- | :-------------------------- | :-------------------------- | :--------------------------------- | :-------- |
| `/inventory`         | `ProductTable.tsx`    | `ProductController@index`   | `GET /api/products`         | `Product`                          | ✅ Mapped |
| `/add-product`       | `AddProductForm.tsx`  | `ProductController@store`   | `POST /api/products`        | `Product`, `Variant`, `StockLevel` | ✅ Mapped |
| `/edit-product/[id]` | `EditProductForm.tsx` | `ProductController@update`  | `PUT /api/products/{id}`    | `Product`                          | ✅ Mapped |
| `/inventory`         | `ProductTable.tsx`    | `ProductController@destroy` | `DELETE /api/products/{id}` | `Product`                          | ✅ Mapped |

**Key Mappings:**

- **Frontend** `basicInfo.title` -> **Backend** `name`
- **Frontend** `inventory.stocks` -> **Backend** `stock_levels` table
- **Frontend** `variants.variantItems` -> **Backend** `product_variants` table

## 3. Marketplace & Integrations

| Frontend Page            | Component             | Backend Controller                | API Endpoint                       | DB Model                | Status    |
| :----------------------- | :-------------------- | :-------------------------------- | :--------------------------------- | :---------------------- | :-------- |
| `/marketplace`           | `ListingTable.tsx`    | `ShopifyChannelController@index`  | `GET /api/shopify/channels`        | `ShopifyStore`          | ✅ Mapped |
| `/settings/integrations` | `IntegrationCard.tsx` | `ShopifyController@syncInventory` | `POST /api/shopify/sync-inventory` | `ShopifyInventoryLevel` | ✅ Mapped |
| Webhook                  | N/A                   | `ShopifyWebhookController@handle` | `POST /api/webhooks/shopify`       | `ShopifyLog`            | ✅ Mapped |

## 4. Settings & Metadata

| Frontend Page          | Component            | Backend Controller    | API Endpoint                | DB Model    | Status    |
| :--------------------- | :------------------- | :-------------------- | :-------------------------- | :---------- | :-------- |
| `/settings/brands`     | `BrandTable.tsx`     | `BrandController`     | `apiResource('brands')`     | `Brand`     | ✅ Mapped |
| `/settings/categories` | `CategoryTable.tsx`  | `CategoryController`  | `apiResource('categories')` | `Category`  | ✅ Mapped |
| `/settings/attributes` | `AttributeTable.tsx` | `AttributeController` | `apiResource('attributes')` | `Attribute` | ✅ Mapped |
| `/settings/warehouse`  | `WarehouseTable.tsx` | `WarehouseController` | `apiResource('warehouses')` | `Warehouse` | ✅ Mapped |
