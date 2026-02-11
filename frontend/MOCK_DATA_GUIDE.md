# 🎯 Mock Data Setup - Complete Guide

## ✅ What Has Been Done

Your CIMS frontend is now fully configured to work **WITHOUT a backend API**. All tables will show dynamic mock data until your backend is ready.

### Files Created/Modified:

1. **`src/mocks/index.ts`** - Central mock data repository
   - Products (6 sample items)
   - Warehouses (3 locations)
   - Suppliers (3 vendors)
   - Categories (5 categories)
   - Brands (3 brands)
   - Attributes (4 attribute types)
   - Team Members (4 users including you)
   - Notifications (4 recent alerts)
   - Marketplace Listings (3 listings)
   - Integrations (Shopify, eBay, Amazon)
   - Templates (2 product templates)
   - Export History (3 export records)
   - Channels (3 marketplace channels)

2. **`.env`** - Environment configuration
   ```bash
   NEXT_PUBLIC_USE_MOCK_DATA=true  # Toggle mock data ON/OFF
   NEXT_PUBLIC_API_URL=http://localhost:8000  # Your backend URL
   ```

3. **Services Updated with Mock Support:**
   - ✅ `productService.ts` - Products, Warehouses, Suppliers, Categories, Brands, Attributes
   - ✅ `teamService.ts` - Team members
   - ✅ `integrationService.ts` - Channels/Integrations
   - ✅ `listingService.ts` - Marketplace listings

4. **Bug Fixes:**
   - ✅ Fixed Image empty src error in `settings/integrations/page.tsx`

---

## 🚀 How It Works

### Current Mode: **MOCK DATA (No Backend Required)**

With `NEXT_PUBLIC_USE_MOCK_DATA=true` in your `.env`:

- **All tables automatically show sample data**
- **Search, pagination, and filtering work**
- **No API calls are made**
- **Simulated loading delays (600-800ms) for realistic UX**
- **You can develop and test UI without waiting for backend**

### Switching to Real API:

When your backend is ready, simply change `.env`:

```bash
NEXT_PUBLIC_USE_MOCK_DATA=false  # Use real API
```

**That's it!** No code changes needed. All your tables will seamlessly switch to using real backend data.

---

## 📊 Tables Covered

| Table/Section | Mock Data | Search | Pagination | Filter |
|--------------|-----------|--------|------------|--------|
| ✅ Inventory Feed | 6 Products | ✅ | ✅ | ✅ Tabs |
| ✅ Warehouses | 3 Locations | ✅ | ✅ | - |
| ✅ Suppliers | 3 Vendors | ✅ | ✅ | - |
| ✅ Categories | 5 Categories | ✅ | ✅ | - |
| ✅ Brands | 3 Brands | ✅ | ✅ | - |
| ✅ Attributes | 4 Attributes | ✅ | ✅ | - |
| ✅ Team Members | 4 Users | ✅ | - | - |
| ✅ Notifications | 4 Alerts | - | - | ✅ Read/Unread |
| ✅ Marketplace | 3 Listings | ✅ | ✅ | ✅ Channel |
| ✅ Integrations | 3 Channels | - | - | ✅ Status |

---

## 💡 Key Features

### 1. **Realistic Data**
- All mock data mimics real-world scenarios
- Proper timestamps, IDs, and relationships
- Variety of statuses (active, draft, out_of_stock, etc.)

### 2. **Smart Filtering**
```typescript
// Inventory tabs work:
- All Listing → Shows all products
- In Stock → Only items with quantity > 0
- Out Of Stock → Only items with quantity = 0
- Draft Listings → Only draft status items

// Search works across:
- Product Title
- SKU
- Category
```

### 3. **Pagination**
- Default: 15 items per page
- Supports page navigation
- Returns total count and page info

### 4. **Simulated Delays**
- Products: 600ms delay
- Other entities: 400-500ms
- Mimics real API latency for realistic testing

---

## 🎨 Example: How Data Flows

### Without Backend (Current Setup):
```
Component → Service → Mock Data → Component
     ↓
 [Inventory Page]
     ↓
 productService.getProducts()
     ↓
 Returns MOCK_PRODUCTS from mocks/index.ts
     ↓
 Table displays 6 sample products
```

### With Backend (After you set USE_MOCK_DATA=false):
```
Component → Service → **Real API** → Component
     ↓
 [Inventory Page]
     ↓
 productService.getProducts()
     ↓
 Fetches from http://localhost:8000/api/products
     ↓
 Table displays real data from PostgreSQL
```

---

## 🔧 Customizing Mock Data

If you need to add/modify sample data:

1. Open `src/mocks/index.ts`
2. Edit the relevant constant (e.g., `MOCK_PRODUCTS`)
3. Save - changes reflect immediately

Example:
```typescript
export const MOCK_PRODUCTS = [
  {
    stock_item_id: '7',  // Add new product
    title: 'Your Product',
    sku: 'SKU-001',
    // ... other fields
  },
  // ... existing products
];
```

---

## ✨ Benefits

### For You (Frontend Developer):

✅ **No backend dependency** - Continue building UI
✅ **Test all features** - Search, filter, pagination work
✅ **Realistic data** - Better than hardcoded placeholders
✅ **Easy switching** - One env variable to toggle
✅ **No code changes** - Same components work with both mock and real data

### For Backend Developer:

✅ **Clear API contract** - See exactly what frontend expects
✅ **No urgent pressure** - Frontend can proceed independently
✅ **Easy integration** - Just match the data structure in mocks

---

## 🚨 Important Notes

1. **Mock data is frontend-only** - No persistence
   - Adding/editing products in UI won't save
   - Reloading page resets to original mock data

2. **When backend is ready:**
   - Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
   - Restart dev server (`npm run dev`)
   - Ensure backend API matches mock data structure

3. **Error handling:**
   - Mock mode simulates success responses only
   - Real API mode handles errors normally

---

## 📝 Next Steps

1. **Continue building UI** with full confidence
2. **Test all table features** with realistic data
3. **When backend ready:**
   - Change `.env` setting
   - Test with real API
   - Verify everything works seamlessly

---

## 🎯 Result

**You can now work on ANY table in your system without worrying about the backend!**

Every table will show realistic, dynamic data. Search, pagination, and filtering all work perfectly. When the backend is ready, just flip the switch in `.env` and you're done.

**Tahole ar kono time waste hobe na - frontend ebong backend parallel-e kaaj hobe!** 🚀
