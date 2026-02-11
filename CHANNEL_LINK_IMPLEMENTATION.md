# Channel Link Implementation

## Overview

This document describes the implementation of a generic channel linking system that allows users to link external marketplace listings to internal CIMS inventory.

## Features Implemented

### 1. Generic Channel Link View Component

**File:** `frontend/src/components/marketplace/ChannelLinkView.tsx`

- Generic component that works for any marketplace channel (Shopify, Amazon, eBay, Etsy, WooCommerce, etc.)
- Dynamic channel branding with color-coded UI based on channel type
- Two-panel interface:
  - **Left Panel:** External channel product (from marketplace)
  - **Right Panel:** Internal CIMS inventory search and selection
- Real-time search filtering of central inventory
- Visual connection indicator that animates when a product is selected
- "Link & Synchronize" button to establish the connection

### 2. Active Channel Page

**File:** `frontend/src/app/(admin)/active-channel/[channel]/[id]/page.tsx`

- Dynamic routing for any channel: `/active-channel/[channel]/[id]`
- Two modes:
  - **Edit Mode** (default): Shows the channel-specific edit form
  - **Link Mode** (`?mode=link`): Shows the ChannelLinkView component for linking

#### Query Parameter: `?mode=link`

When this parameter is present:

- All previous form data is **automatically cleared** using `resetForm()`
- The ChannelLinkView component is displayed instead of the edit form
- After linking, users are redirected back to the marketplace hub

### 3. Marketplace Hub Integration

**File:** `frontend/src/app/(admin)/marketplace/page.tsx`

Updated the "Establish Handshake" link icon for unlinked products:

- Previously routed to: `/marketplace/mapping`
- Now routes to: `/active-channel/[channel]/[id]?mode=link`
- Automatically passes the correct channel type and listing ID

## User Flow

1. **User clicks the link icon** (🔗) on an unlinked product in the marketplace table
2. **Navigates to:** `/active-channel/[channel]/[id]?mode=link`
   - Example: `/active-channel/shopify/123?mode=link`
3. **ChannelLinkView displays:**
   - Left side: The external channel product details
   - Right side: Search interface for CIMS central inventory
4. **User searches and selects** a matching CIMS product
5. **Clicks "Link & Synchronize"** button
6. **Redirects** back to `/marketplace` after successful linking

## Technical Details

### Channel Configuration

The ChannelLinkView supports the following channels with automatic icon and color mapping:

- **Shopify:** Emerald green theme
- **Amazon:** Orange theme
- **eBay:** Blue theme
- **Etsy:** Orange theme
- **WooCommerce:** Purple theme
- **Default:** Gray theme (for unknown channels)

### Data Flow

```typescript
URL → useParams() → Extract channel & id
        ↓
Query Param → mode === 'link'?
        ↓ Yes
resetForm() → Clear all previous data
        ↓
Load product data → Display ChannelLinkView
        ↓
User selects match → handleLink()
        ↓
Navigate to /marketplace → Success
```

### Form State Management

- Uses `ProductFormContext` for state management
- `resetForm()` function clears all form data when entering link mode
- `loadProduct()` only called when NOT in link mode
- Ensures fresh state for each linking session

## File Structure

```
frontend/src/
├── components/
│   └── marketplace/
│       ├── ChannelLinkView.tsx          # Generic link view component
│       └── shopify/
│           ├── ShopifyLinkView.tsx      # Shopify-specific (reference)
│           └── ShopifyEditForm.tsx      # Shopify edit form
├── app/(admin)/
│   ├── marketplace/
│   │   └── page.tsx                     # Marketplace hub (updated)
│   └── active-channel/
│       └── [channel]/
│           └── [id]/
│               └── page.tsx             # Channel page with link mode
└── context/
    └── ProductFormContext.tsx           # Form state management
```

## Testing Routes

Test the implementation with these URLs:

- Link mode: `http://localhost:3000/active-channel/shopify/1?mode=link`
- Edit mode: `http://localhost:3000/active-channel/shopify/1`
- Different channel: `http://localhost:3000/active-channel/amazon/2?mode=link`

## Key Differences from Shopify Implementation

1. **Generic vs Specific:** Works for any channel, not just Shopify
2. **Dynamic Branding:** Channel icons and colors change based on channel type
3. **Automatic Data Clearing:** Previous data is cleared when `?mode=link` is present
4. **Flexible Routing:** `/active-channel/[channel]/[id]` instead of `/shopify/edit-listing/[id]`

## Future Enhancements

Potential improvements:

- API integration for real product linking
- Bulk linking interface
- Advanced matching algorithms (fuzzy SKU matching)
- Link history and audit trail
- Unlink functionality
- Sync conflict resolution UI
