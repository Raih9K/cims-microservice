# CIMS System Audit - January 23, 2026

## 1. Backend Architecture (Laravel)

### Database Schema Overview

- **Multi-Tenancy**: Most tables (Products, Channels, Listings) are isolated by `company_id`.
- **Central Inventory (`products`)**: The source of truth for all stock items. Supports Simple and Variant types.
- **Marketplace Connections (`channels`)**: Stores connection details for Shopify, Amazon, eBay, etc.
- **Channel Inventory (`listings`)**: Acts as a bridge between Central Inventory and specific Marketplaces. Stores title/price overrides and synchronization status.
- **Audit System**: `audit_logs` table tracks creation, updates, and deletes across the system.

### API Layer

- **ListingController**: Handles marketplace listing logic, including the unique "Inactive" tab logic that pulls from central inventory.
- **ChannelController**: Manages marketplace connections and credentials.
- **ProductController**: Manages core inventory catalog.

### Recent Changes

- Updated `status` columns in `listings` and `channels` from ENUM to STRING for better cross-platform compatibility.
- Implemented soft deletes for listings to allow movement between tabs (Marketplace -> Inactive).

## 2. Frontend Architecture (Next.js)

### Routing Structure

- `/(admin)/marketplace`: The main hub for managing all marketplace data.
- `/(admin)/active-channel/[channel]/[id]`: Dynamic route for synchronizing specific listings with marketplace-tailored forms.
- `/(admin)/inventory`: Management of the central catalog.

### Component System

- **Platform-Specific Forms**: Custom forms for Shopify, Amazon, eBay, and BigCommerce, each with its own branding and specific terminology.
- **Context API**: `ProductFormContext` manages complex multi-tab form states and ensures data consistency before syncing.
- **Service Layer**: Centralized API calls via `listingService.ts` and `productService.ts`.

### Visual Identity

- Modern, premium UI with distinct color identities for each marketplace (Shopify: Emerald, Amazon: Orange, eBay: Multi/Blue, BigCommerce: Indigo).
- Interactive dashboard with glassmorphic elements and smooth transitions.

## 3. Data Integrity & Sync

- The system prevents direct editing of external data without first establishing a "Handshake" (Listing creation).
- Soft deletion of a listing effectively "delists" it and moves it back to the "Inactive" pool of the central inventory.
