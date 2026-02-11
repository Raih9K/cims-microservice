# Marketplace Inventory Management System Design

## Overview

এই সিস্টেমে Central Inventory এবং Marketplace Inventory আলাদাভাবে manage করা হবে।

## Database Structure

### 1. `products` Table (Central Inventory)

- **Purpose**: মূল inventory যেখানে সব products থাকবে
- **Primary Key**: `id` (auto-increment)
- **Unique Key**: `sku`
- **Fields**: name, sku, category, brand, price, stock, images, etc.

### 2. `listings` Table (Marketplace Inventory)

- **Purpose**: Marketplace-specific product listings
- **Primary Key**: `listing_id` (string, e.g., "SHOP-001")
- **Foreign Keys**:
  - `channel_id` → `channels.channel_id`
  - `stock_item_id` → `products.id`
- **Fields**:
  - `status`: 'active', 'inactive', 'delisted', 'warning', 'error'
  - `mapped_attributes`: JSON (channel-specific data)
  - `is_linked`: boolean (whether synced with external marketplace)

### 3. `channels` Table

- **Purpose**: Marketplace channels (Shopify, Amazon, eBay, etc.)
- **Primary Key**: `channel_id` (e.g., "shopify-001")
- **Fields**: name, marketplace, marketplace_data, belongs_to (company_id)

## Tab Structure & Data Flow

### Tab 1: **Inactive** (Central Inventory)

**Data Source**: `products` table WHERE NOT EXISTS in `listings`

```sql
SELECT * FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM listings l
  WHERE l.stock_item_id = p.id
  AND l.channel_id = :channel_id
)
```

**Actions**:

- ✅ **Plus Icon**: Create new listing in marketplace
  - Insert into `listings` table
  - Status = 'delisted'
  - Generates unique `listing_id`
  - Links to `product.id` via `stock_item_id`

### Tab 2: **Active**

**Data Source**: `listings` WHERE `status = 'active'` AND `channel_id = :channel_id`

**Actions**:

- 🔗 Link icon (if not synced)
- 🔄 Sync status indicator
- 🔴 Delete (moves to Delisted)

### Tab 3: **Warning**

**Data Source**: `listings` WHERE `status = 'warning'` AND `channel_id = :channel_id`

**Actions**:

- ⚠️ View warnings
- ✏️ Edit
- 🔄 Resync

### Tab 4: **Error**

**Data Source**: `listings` WHERE `status = 'error'` AND `channel_id = :channel_id`

**Actions**:

- 🛠️ Fix errors
- ✏️ Edit
- 🗑️ Delete

### Tab 5: **Delisted** (Marketplace Inventory)

**Data Source**: `listings` WHERE `status = 'delisted'` AND `channel_id = :channel_id`

**Actions**:

- ✏️ **Edit**: Update listing details
- 🗑️ **Delete**:
  - DELETE from `listings` table
  - Product remains in `products` table
  - Product appears in "Inactive" tab again

## Data Flow Diagram

```
CENTRAL INVENTORY (products table)
         |
         | (Product not in listings)
         ↓
   [INACTIVE TAB]
         |
         | Click (+) Plus Icon
         ↓
   Create Listing
         |
         | INSERT INTO listings
         | (status = 'delisted')
         ↓
   [DELISTED TAB]
         |
    ────────────────
    |              |
  Edit          Delete
    |              |
    ↓              ↓
  Update      DELETE listing
  Listing     (back to INACTIVE)
    |
    ↓
  [ACTIVE TAB]
  (when published)
```

## API Endpoints

### 1. Get Central Inventory (Inactive Tab)

```
GET /api/products/not-listed?channel_id={channel_id}
```

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sku": "PROD-001",
      "name": "Product Name",
      "price": 99.99,
      "stock": 100,
      "image": "url"
    }
  ]
}
```

### 2. Create Listing (Plus Icon Action)

```
POST /api/listings
```

**Request Body**:

```json
{
  "channel_id": "shopify-001",
  "stock_item_id": 1,
  "status": "delisted",
  "mapped_attributes": {
    "title": "Product Name",
    "price": 99.99,
    "sku": "PROD-001"
  }
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "listing_id": "LIST-12345",
    "channel_id": "shopify-001",
    "stock_item_id": 1,
    "status": "delisted"
  }
}
```

### 3. Get Listings by Status

```
GET /api/listings?channel_id={channel_id}&status={status}
```

### 4. Update Listing (Edit Action)

```
PUT /api/listings/{listing_id}
```

### 5. Delete Listing (Delete Action)

```
DELETE /api/listings/{listing_id}
```

**Effect**:

- Removes listing from `listings` table
- Product remains in `products` table
- Product appears in Inactive tab

## Frontend Implementation

### State Management

```typescript
const [activeTab, setActiveTab] = useState<
  "inactive" | "active" | "warning" | "error" | "delisted"
>("inactive");
const [listings, setListings] = useState<Listing[]>([]);
const [centralProducts, setCentralProducts] = useState<Product[]>([]);
```

### Tab Switching Logic

```typescript
useEffect(() => {
  if (activeTab === "inactive") {
    fetchCentralInventory(); // Products NOT in listings
  } else {
    fetchListings({ status: activeTab }); // Listings with specific status
  }
}, [activeTab, channelId]);
```

### Plus Icon Action (Inactive Tab)

```typescript
const handleCreateListing = async (productId: number) => {
  const response = await listingService.createListing({
    channel_id: channelId,
    stock_item_id: productId,
    status: "delisted",
    mapped_attributes: {
      /* product data */
    },
  });

  if (response.success) {
    toast.success("Listing created in Delisted");
    // Refresh both tabs
    fetchCentralInventory();
    fetchListings({ status: "delisted" });
  }
};
```

### Delete Action (Delisted Tab)

```typescript
const handleDeleteListing = async (listingId: string) => {
  const response = await listingService.deleteListing(listingId);

  if (response.success) {
    toast.success("Listing deleted, moved to Inactive");
    // Refresh both tabs
    fetchListings({ status: "delisted" });
    fetchCentralInventory();
  }
};
```

## Database Queries (Laravel Backend)

### Get Central Inventory (Not Listed)

```php
public function getNotListedProducts(Request $request)
{
    $channelId = $request->query('channel_id');

    $products = Product::whereNotExists(function ($query) use ($channelId) {
        $query->select(DB::raw(1))
              ->from('listings')
              ->whereColumn('listings.stock_item_id', 'products.id')
              ->where('listings.channel_id', $channelId);
    })->get();

    return response()->json([
        'success' => true,
        'data' => $products
    ]);
}
```

### Create Listing

```php
public function createListing(Request $request)
{
    $listing = Listing::create([
        'listing_id' => 'LIST-' . Str::uuid(),
        'channel_id' => $request->channel_id,
        'stock_item_id' => $request->stock_item_id,
        'status' => 'delisted',
        'mapped_attributes' => $request->mapped_attributes,
        'is_linked' => false
    ]);

    return response()->json([
        'success' => true,
        'data' => $listing
    ]);
}
```

### Delete Listing

```php
public function deleteListing($listingId)
{
    $listing = Listing::find($listingId);
    $listing->delete();

    return response()->json([
        'success' => true,
        'message' => 'Listing deleted successfully'
    ]);
}
```

## Summary

✅ **Inactive Tab**: Shows central inventory products that are NOT in any marketplace
✅ **Plus Icon**: Creates a new listing in "Delisted" status
✅ **Delisted Tab**: Shows all marketplace listings (can edit/delete)
✅ **Delete**: Removes listing, product goes back to Inactive
✅ **Product ID**: Used as foreign key (`stock_item_id`) to link tables
✅ **Two-Table System**: `products` (central) + `listings` (marketplace)
