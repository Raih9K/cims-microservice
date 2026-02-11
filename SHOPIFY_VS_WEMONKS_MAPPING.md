# Shopify vs WeMonks (CIMS) Data Mapping

This document outlines how Shopify Product and Variant fields map to the WeMonks Central Inventory (`products`) and Channel Listings (`listings` + `variants`) tables.

## 📦 1. Product Level Mapping

| Shopify Field     | CIMS Table       | CIMS Column         | Notes                                                                                |
| :---------------- | :--------------- | :------------------ | :----------------------------------------------------------------------------------- |
| `title`           | `products`       | `name`              | Central product name. Can be overridden in `listings.title_override`.                |
| `body_html`       | `products`       | `description`       | HTML content. Can be overridden in `listings.description_override`.                  |
| `vendor`          | `products`       | `brand`             | The brand or manufacturer of the product.                                            |
| `product_type`    | `listings`       | `product_type`      | **New!** Marketplace-specific category string (e.g., "Apparel > T-Shirt").           |
| `status`          | `listings`       | `status`            | Mapped values: `active` -> `active`, `draft` -> `draft`, `archived` -> `ended`.      |
| `handle`          | `products`       | `slug`              | URL slug. Shopify handles are unique per shop; CIMS slugs are unique per company.    |
| `tags`            | `listings`       | `tags`              | **New!** Stored as JSON array `["tag1", "tag2"]` in the listings table.              |
| `options`         | `products`       | `options`           | **New!** JSON array defining options (e.g., `[{"name":"Size","values":["S","M"]}]`). |
| `images`          | `product_images` | `url`               | Stored in a separate `product_images` table linked by `product_id`.                  |
| `seo.title`       | `listings`       | `custom_attributes` | SEO title stored inside `custom_attributes` JSON if needed.                          |
| `seo.description` | `listings`       | `custom_attributes` | SEO description stored inside `custom_attributes` JSON.                              |

---

## 🎨 2. Variant / SKU Level Mapping

Shopify "Variants" map primarily to CIMS `listings` (for price/inventory on a channel) and CIMS `variants` (for central attributes).

| Shopify Variant Field  | CIMS Table              | CIMS Column          | Notes                                                                          |
| :--------------------- | :---------------------- | :------------------- | :----------------------------------------------------------------------------- |
| `id` (Variant ID)      | `listings`              | `marketplace_id`     | The Shopify Variant ID (e.g., `45234...`).                                     |
| `sku`                  | `products` / `variants` | `sku`                | The master SKU. Also stored as `marketplace_sku` in `listings` if different.   |
| `barcode`              | `products` / `variants` | `barcode_value`      | ISBN/UPC/EAN code.                                                             |
| `price`                | `listings`              | `price_override`     | The selling price on Shopify. If null, falls back to `products.selling_price`. |
| `compare_at_price`     | `listings`              | `compare_at_price`   | The "Slash" price (MSRP).                                                      |
| `inventory_quantity`   | `listings`              | `quantity_allocated` | The stock allocated/synced to Shopify.                                         |
| `inventory_management` | `listings`              | `sync_quantity`      | If "shopify", set `sync_quantity = true`.                                      |
| `inventory_policy`     | `listings`              | `inventory_policy`   | **New!** `deny` (stop selling) or `continue` (allow backorder).                |
| `taxable`              | `listings`              | `is_taxable`         | **New!** Boolean `true/false`.                                                 |
| `weight`               | `products`              | `weight_value`       | Weight amount (e.g., 0.25).                                                    |
| `weight_unit`          | `products`              | `weight_unit`        | Unit (kg, lb, oz).                                                             |
| `requires_shipping`    | `products`              | `type`               | If true, usually `type = 'Simple'` or `Physical`. If false, `Service`.         |
| `option1`              | `variants`              | `options->Option1`   | Value for 1st option (e.g., "S").                                              |
| `option2`              | `variants`              | `options->Option2`   | Value for 2nd option (e.g., "Black").                                          |

---

## 🛠 3. JSON Structure Visualization

### Shopify Payload

```json
{
  "product": {
    "title": "Classic T-Shirt",
    "vendor": "Nike",
    "variants": [
      {
        "sku": "TS-001",
        "price": "20.00",
        "inventory_policy": "deny"
      }
    ]
  }
}
```

### CIMS Database Record (Concept)

**Table: `products`**

```json
{
  "id": 101,
  "name": "Classic T-Shirt",
  "brand": "Nike",
  "sku": "TS-001",
  "selling_price": 20.0
}
```

**Table: `listings` (Shopify Channel)**

```json
{
  "id": 5001,
  "product_id": 101,
  "channel_id": "CH_SHOPIFY_01",
  "product_type": "Apparel",
  "inventory_policy": "deny",
  "is_taxable": true,
  "price_override": 20.0,
  "quantity_allocated": 50
}
```
