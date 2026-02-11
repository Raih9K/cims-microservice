CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `first_name` VARCHAR(50),
  `last_name` VARCHAR(50),
  `company_name` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `is_active` BOOLEAN DEFAULT true
);

CREATE TABLE `stock_item` (
  `stock_item_id` UUID PRIMARY KEY,
  `sku` VARCHAR(100) NOT NULL,
  `belongs_to` INT NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `short_description` VARCHAR(1000),
  `description` TEXT,
  `barcode` VARCHAR(50),
  `stock_type` ENUM(basic,parent,variant,kit) NOT NULL DEFAULT 'basic',
  `item_type` ENUM(physical,digital,service) NOT NULL DEFAULT 'physical',
  `condition` ENUM(new,used,used_like_new,refurbished,reconditioned) NOT NULL DEFAULT 'new',
  `parent_item_id` UUID,
  `brand_id` INT,
  `manufacturer_name` VARCHAR(200),
  `manufacturer_country_code` CHAR(2),
  `manufacturer_state` VARCHAR(100),
  `manufacturer_postal_code` VARCHAR(20),
  `status` ENUM(active,inactive,discontinued,draft) NOT NULL DEFAULT 'active',
  `is_deleted` BOOLEAN NOT NULL DEFAULT false,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `deleted_at` TIMESTAMP
);

CREATE TABLE `stock_item_variant` (
  `variant_id` UUID PRIMARY KEY,
  `stock_item_id` UUID NOT NULL,
  `attribute_name` VARCHAR(100) NOT NULL,
  `attribute_value` VARCHAR(200) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `stock_item_kit` (
  `kit_id` UUID PRIMARY KEY,
  `kit_stock_item_id` UUID NOT NULL,
  `component_stock_item_id` UUID NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `is_required` BOOLEAN NOT NULL DEFAULT true,
  `display_order` INT NOT NULL DEFAULT 0,
  `component_title_override` VARCHAR(500),
  `component_description_override` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `brand` (
  `brand_id` INT PRIMARY KEY AUTO_INCREMENT,
  `brand_name` VARCHAR(200) NOT NULL,
  `brand_code` VARCHAR(50) UNIQUE,
  `website` VARCHAR(500),
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `stock_item_identifier` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `stock_item_id` UUID NOT NULL,
  `product_identifier` VARCHAR(100) NOT NULL,
  `product_identifier_value` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `item_bullet_points` (
  `id` SERIAL PRIMARY KEY,
  `stock_item_id` UUID,
  `listing_id` UUID,
  `bullet_text` VARCHAR(500) NOT NULL,
  `display_order` INT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `stock_item_dimensions` (
  `id` int PRIMARY KEY,
  `stock_item_id` uuid,
  `length` DECIMAL(10,2),
  `width` DECIMAL(10,2),
  `height` DECIMAL(10,2),
  `weight` DECIMAL(10,2),
  `weight_unit` VARCHAR(10) DEFAULT 'pounds',
  `dimension_unit` VARCHAR(10) DEFAULT 'inches',
  `package_length` DECIMAL(10,2),
  `package_width` DECIMAL(10,2),
  `package_height` DECIMAL(10,2),
  `package_weight` DECIMAL(10,2),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `stock_categories` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  `created_by` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `stock_item_attributes` (
  `attribute_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `stock_item_id` UUID NOT NULL,
  `attribute_name` VARCHAR(100) NOT NULL,
  `attribute_value` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `is_global` BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE `global_attributes` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `attribute_name` VARCHAR(100) NOT NULL,
  `created_by` INT NOT NULL
);

CREATE TABLE `item_categories` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `stock_item_id` UUID NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `warehouse` (
  `warehouse_id` UUID PRIMARY KEY,
  `name` VARCHAR NOT NULL,
  `address` VARCHAR,
  `country` VARCHAR,
  `state` VARCHAR,
  `city` VARCHAR,
  `zip_code` VARCHAR,
  `is_default` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `belongs_to` INT NOT NULL
);

CREATE TABLE `suppliers` (
  `supplier_id` UUID PRIMARY KEY,
  `supplier_code` VARCHAR NOT NULL,
  `supplier_name` VARCHAR NOT NULL,
  `contact_person_name` VARCHAR,
  `email_address` VARCHAR,
  `phone_number` VARCHAR,
  `address` VARCHAR,
  `country` VARCHAR,
  `state` VARCHAR,
  `city` VARCHAR,
  `zip_code` VARCHAR,
  `created_by` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `stock_level` (
  `id` UUID PRIMARY KEY,
  `stock_item_id` UUID NOT NULL,
  `warehouse_id` UUID NOT NULL,
  `available_quantity` INT NOT NULL DEFAULT 0,
  `minimum_level` INT NOT NULL DEFAULT 0,
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `channel` (
  `channel_id` UUID PRIMARY KEY,
  `name` VARCHAR NOT NULL,
  `marketplace` ENUM(bigcommerce,ebay,shopify) NOT NULL,
  `marketplace_data` json,
  `belongs_to` INT,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `listing` (
  `listing_id` UUID PRIMARY KEY,
  `channel_id` UUID NOT NULL,
  `channel_type` ENUM(bigcommerce,ebay,shopify) NOT NULL,
  `listing_id_external` VARCHAR,
  `status` ENUM(draft,active,inactine) NOT NULL DEFAULT 'draft',
  `stock_item_id` UUID,
  `mapped_attributes` JSONB,
  `is_linked` BOOLEAN NOT NULL DEFAULT true,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ebay_listings` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `listing_id` UUID NOT NULL,
  `ebay_item_id` VARCHAR(50) UNIQUE NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `condition_id` INT,
  `condition_description` VARCHAR(100),
  `start_price` DECIMAL(10,2),
  `current_price` DECIMAL(10,2),
  `buy_it_now_price` DECIMAL(10,2),
  `reserve_price` DECIMAL(10,2),
  `listing_type` ENUM(Auction,FixedPrice,StoreInventory,AdFormat) NOT NULL,
  `listing_format` ENUM(Auction,BuyItNow,BestOffer) NOT NULL,
  `primary_category_id` INT,
  `primary_category_name` VARCHAR(255),
  `secondary_category_id` INT,
  `secondary_category_name` VARCHAR(255),
  `location` VARCHAR(255),
  `country` VARCHAR(2),
  `postal_code` VARCHAR(20),
  `currency` VARCHAR(3) DEFAULT 'USD',
  `start_time` DATETIME,
  `end_time` DATETIME,
  `listing_duration` VARCHAR(20),
  `listing_status` ENUM(Active,Completed,Cancelled,Ended,Sold) NOT NULL,
  `quantity_available` INT DEFAULT 1,
  `quantity_sold` INT DEFAULT 0,
  `view_count` INT DEFAULT 0,
  `watch_count` INT DEFAULT 0,
  `bid_count` INT DEFAULT 0,
  `best_offer_enabled` BOOLEAN DEFAULT false,
  `buy_it_now_available` BOOLEAN DEFAULT false,
  `gallery_plus_enabled` BOOLEAN DEFAULT false,
  `bold_title` BOOLEAN DEFAULT false,
  `featured_listing` BOOLEAN DEFAULT false,
  `view_item_url` TEXT,
  `gallery_url` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ebay_listing_variations` (
  `id` BIGINT PRIMARY KEY,
  `listing_id` BIGINT NOT NULL,
  `variation_sku` VARCHAR(100),
  `quantity` INT DEFAULT 0,
  `start_price` DECIMAL(10,2)
);

CREATE TABLE `ebay_variation_specifics` (
  `id` BIGINT PRIMARY KEY,
  `variation_id` BIGINT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `value` VARCHAR(100) NOT NULL
);

CREATE TABLE `variation_sets` (
  `id` BIGINT PRIMARY KEY,
  `listing_id` BIGINT NOT NULL,
  `variation_name` VARCHAR(50) NOT NULL,
  `variation_values` TEXT NOT NULL
);

CREATE TABLE `ebay_shipping_options` (
  `shipping_option_id` UUID PRIMARY KEY,
  `listing_id` UUID NOT NULL,
  `service_name` VARCHAR(100) NOT NULL,
  `service_priority` INT,
  `shipping_cost` DECIMAL(8,2),
  `additional_cost` DECIMAL(8,2),
  `shipping_time_min` INT,
  `shipping_time_max` INT,
  `shipping_type` ENUM(Calculated,Flat,Free,NotSpecified),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ebay_item_specifics` (
  `item_specific_id` UUID PRIMARY KEY,
  `listing_id` UUID NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `value` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ebay_return_policies` (
  `return_policy_id` UUID PRIMARY KEY,
  `listing_id` UUID NOT NULL,
  `returns_accepted` BOOLEAN NOT NULL DEFAULT false,
  `return_period` VARCHAR(20),
  `return_policy_description` TEXT,
  `refund_method` VARCHAR(50),
  `return_shipping_paid_by` VARCHAR(20),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `shopify_products` (
  `id` BIGINT PRIMARY KEY,
  `listing_id` UUID NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `body_html` TEXT,
  `vendor` VARCHAR(255),
  `product_type` VARCHAR(255),
  `handle` VARCHAR(255) UNIQUE,
  `status` VARCHAR(50) DEFAULT 'draft',
  `published_at` TIMESTAMP,
  `template_suffix` VARCHAR(255),
  `tags` TEXT,
  `seo_title` VARCHAR(255),
  `seo_description` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `published_scope` VARCHAR(50) DEFAULT 'web',
  `admin_graphql_api_id` VARCHAR(255)
);

CREATE TABLE `shopify_product_variants` (
  `id` BIGINT PRIMARY KEY,
  `product_id` BIGINT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `compare_at_price` DECIMAL(10,2),
  `sku` VARCHAR(255),
  `barcode` VARCHAR(255),
  `position` INT DEFAULT 1,
  `inventory_policy` VARCHAR(50) DEFAULT 'deny',
  `fulfillment_service` VARCHAR(255) DEFAULT 'manual',
  `inventory_management` VARCHAR(255),
  `option1` VARCHAR(255),
  `option2` VARCHAR(255),
  `option3` VARCHAR(255),
  `taxable` BOOLEAN DEFAULT true,
  `grams` INT DEFAULT 0,
  `weight` DECIMAL(8,3),
  `weight_unit` VARCHAR(10) DEFAULT 'kg',
  `inventory_item_id` BIGINT,
  `inventory_quantity` INT DEFAULT 0,
  `old_inventory_quantity` INT DEFAULT 0,
  `requires_shipping` BOOLEAN DEFAULT true,
  `admin_graphql_api_id` VARCHAR(255),
  `image_id` BIGINT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `shopify_inventory_items` (
  `id` BIGINT PRIMARY KEY,
  `sku` VARCHAR(255),
  `requires_shipping` BOOLEAN DEFAULT true,
  `cost` DECIMAL(10,2),
  `country_code_of_origin` VARCHAR(2),
  `province_code_of_origin` VARCHAR(10),
  `harmonized_system_code` VARCHAR(50),
  `tracked` BOOLEAN DEFAULT true,
  `country_harmonized_system_codes` JSON,
  `admin_graphql_api_id` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `shopify_inventory_levels` (
  `id` BIGINT PRIMARY KEY,
  `inventory_item_id` BIGINT NOT NULL,
  `location_id` BIGINT NOT NULL,
  `available` INTEGER DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `admin_graphql_api_id` VARCHAR(255)
);

CREATE TABLE `shopify_product_options` (
  `id` BIGINT PRIMARY KEY,
  `product_id` BIGINT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `position` INT DEFAULT 1,
  `values` JSON
);

CREATE TABLE `shopify_collections` (
  `id` BIGINT PRIMARY KEY,
  `handle` VARCHAR(255) UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `body_html` TEXT,
  `sort_order` VARCHAR(50),
  `template_suffix` VARCHAR(255),
  `disjunctive` BOOLEAN DEFAULT false,
  `rules` JSON,
  `published_at` TIMESTAMP,
  `published_scope` VARCHAR(50) DEFAULT 'web',
  `admin_graphql_api_id` VARCHAR(255),
  `image` JSON,
  `seo_title` VARCHAR(255),
  `seo_description` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `shopify_product_collections` (
  `id` BIGINT PRIMARY KEY,
  `product_id` BIGINT NOT NULL,
  `collection_id` BIGINT NOT NULL,
  `position` INTEGER,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `shopify_locations` (
  `id` BIGINT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `address1` VARCHAR(255),
  `address2` VARCHAR(255),
  `city` VARCHAR(255),
  `zip` VARCHAR(20),
  `province` VARCHAR(255),
  `country` VARCHAR(255),
  `phone` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `country_code` VARCHAR(2),
  `country_name` VARCHAR(255),
  `province_code` VARCHAR(10),
  `legacy` BOOLEAN DEFAULT false,
  `active` BOOLEAN DEFAULT true,
  `admin_graphql_api_id` VARCHAR(255),
  `localized_country_name` VARCHAR(255),
  `localized_province_name` VARCHAR(255)
);

CREATE TABLE `shopify_metafields` (
  `id` BIGINT PRIMARY KEY,
  `namespace` VARCHAR(255) NOT NULL,
  `key_name` VARCHAR(255) NOT NULL,
  `value` TEXT,
  `value_type` VARCHAR(50),
  `description` TEXT,
  `owner_id` BIGINT NOT NULL,
  `owner_resource` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `admin_graphql_api_id` VARCHAR(255)
);

CREATE TABLE `bc_stores` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_hash` VARCHAR(255) UNIQUE NOT NULL,
  `store_name` VARCHAR(255) NOT NULL,
  `store_url` VARCHAR(255) NOT NULL,
  `api_token` TEXT NOT NULL,
  `client_id` VARCHAR(255) NOT NULL,
  `client_secret` TEXT NOT NULL,
  `webhook_secret` VARCHAR(255),
  `is_active` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_categories` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `bc_category_id` INTEGER NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `parent_id` UUID,
  `description` TEXT,
  `sort_order` INTEGER DEFAULT 0,
  `is_visible` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_products` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `bc_product_id` INTEGER,
  `category_id` UUID NOT NULL,
  `sku` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `type` VARCHAR(50) DEFAULT 'physical',
  `weight` DECIMAL(10,2),
  `width` DECIMAL(10,2),
  `depth` DECIMAL(10,2),
  `height` DECIMAL(10,2),
  `price` DECIMAL(12,2) NOT NULL,
  `cost_price` DECIMAL(12,2),
  `retail_price` DECIMAL(12,2),
  `sale_price` DECIMAL(12,2),
  `tax_class_id` INTEGER,
  `inventory_level` INTEGER DEFAULT 0,
  `inventory_warning_level` INTEGER DEFAULT 0,
  `inventory_tracking` VARCHAR(50) DEFAULT 'none',
  `is_visible` BOOLEAN DEFAULT true,
  `is_featured` BOOLEAN DEFAULT false,
  `availability` VARCHAR(50) DEFAULT 'available',
  `condition` VARCHAR(50) DEFAULT 'New',
  `brand_id` UUID,
  `status` VARCHAR(50) DEFAULT 'draft',
  `sync_status` VARCHAR(50) DEFAULT 'pending',
  `last_sync_at` TIMESTAMP,
  `sync_error_message` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_brands` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `bc_brand_id` INTEGER,
  `name` VARCHAR(255) NOT NULL,
  `page_title` VARCHAR(255),
  `meta_keywords` TEXT,
  `meta_description` TEXT,
  `image_url` VARCHAR(500),
  `search_keywords` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_product_variants` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `product_id` UUID NOT NULL,
  `bc_variant_id` INTEGER,
  `sku` VARCHAR(255),
  `option_values` JSONB,
  `price` DECIMAL(12,2),
  `cost_price` DECIMAL(12,2),
  `weight` DECIMAL(10,2),
  `inventory_level` INTEGER DEFAULT 0,
  `is_default` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_product_categories` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `product_id` UUID NOT NULL,
  `category_id` UUID NOT NULL,
  `sort_order` INTEGER DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_orders` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `bc_order_id` INTEGER NOT NULL,
  `order_number` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `payment_status` VARCHAR(50),
  `fulfillment_status` VARCHAR(50),
  `customer_email` VARCHAR(255),
  `customer_name` VARCHAR(255),
  `billing_address` JSONB,
  `shipping_address` JSONB,
  `subtotal` DECIMAL(12,2) NOT NULL,
  `tax_amount` DECIMAL(12,2) DEFAULT 0,
  `shipping_amount` DECIMAL(12,2) DEFAULT 0,
  `discount_amount` DECIMAL(12,2) DEFAULT 0,
  `total_amount` DECIMAL(12,2) NOT NULL,
  `currency` VARCHAR(3) DEFAULT 'USD',
  `payment_method` VARCHAR(100),
  `shipping_method` VARCHAR(100),
  `order_source` VARCHAR(100),
  `notes` TEXT,
  `bc_created_at` TIMESTAMP,
  `bc_updated_at` TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_order_items` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `order_id` UUID NOT NULL,
  `product_id` UUID,
  `variant_id` UUID,
  `bc_product_id` INTEGER,
  `bc_variant_id` INTEGER,
  `name` VARCHAR(255) NOT NULL,
  `sku` VARCHAR(255),
  `quantity` INTEGER NOT NULL,
  `price` DECIMAL(12,2) NOT NULL,
  `total` DECIMAL(12,2) NOT NULL,
  `product_options` JSONB,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_shipments` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `order_id` UUID NOT NULL,
  `bc_shipment_id` INTEGER,
  `tracking_number` VARCHAR(255),
  `tracking_carrier` VARCHAR(100),
  `tracking_url` VARCHAR(500),
  `shipping_method` VARCHAR(100),
  `shipping_cost` DECIMAL(12,2),
  `shipped_at` TIMESTAMP,
  `delivered_at` TIMESTAMP,
  `status` VARCHAR(50) DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_shipment_items` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `shipment_id` UUID NOT NULL,
  `order_item_id` UUID NOT NULL,
  `quantity` INTEGER NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_inventory_transactions` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `product_id` UUID NOT NULL,
  `variant_id` UUID,
  `transaction_type` VARCHAR(50) NOT NULL,
  `quantity_change` INTEGER NOT NULL,
  `previous_quantity` INTEGER,
  `new_quantity` INTEGER,
  `reason` VARCHAR(255),
  `reference_id` UUID,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_returns` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `order_id` UUID NOT NULL,
  `bc_return_id` INTEGER,
  `return_number` VARCHAR(100),
  `reason` VARCHAR(255),
  `status` VARCHAR(50) DEFAULT 'pending',
  `refund_amount` DECIMAL(12,2),
  `customer_comments` TEXT,
  `admin_comments` TEXT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_return_items` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `return_id` UUID NOT NULL,
  `order_item_id` UUID NOT NULL,
  `quantity` INTEGER NOT NULL,
  `reason` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_policies` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `policy_type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `is_active` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_shipping_policies` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `type` VARCHAR(50) NOT NULL,
  `base_cost` DECIMAL(12,2) DEFAULT 0,
  `cost_per_item` DECIMAL(12,2) DEFAULT 0,
  `cost_per_weight` DECIMAL(12,2) DEFAULT 0,
  `free_shipping_threshold` DECIMAL(12,2),
  `handling_fee` DECIMAL(12,2) DEFAULT 0,
  `zones` JSONB,
  `is_active` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_tax_policies` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `tax_rate` DECIMAL(5,4) NOT NULL,
  `tax_class` VARCHAR(100),
  `regions` JSONB,
  `is_active` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_webhooks` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `bc_webhook_id` INTEGER,
  `event_type` VARCHAR(100) NOT NULL,
  `callback_url` VARCHAR(500) NOT NULL,
  `is_active` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_webhook_events` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `webhook_id` UUID,
  `event_type` VARCHAR(100) NOT NULL,
  `payload` JSONB NOT NULL,
  `processed` BOOLEAN DEFAULT false,
  `processed_at` TIMESTAMP,
  `error_message` TEXT,
  `retry_count` INTEGER DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_sync_jobs` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `job_type` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'pending',
  `total_items` INTEGER DEFAULT 0,
  `processed_items` INTEGER DEFAULT 0,
  `failed_items` INTEGER DEFAULT 0,
  `error_details` JSONB,
  `started_at` TIMESTAMP,
  `completed_at` TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_api_rate_limits` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `endpoint` VARCHAR(255) NOT NULL,
  `requests_made` INTEGER DEFAULT 0,
  `requests_limit` INTEGER NOT NULL,
  `window_start` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `window_duration` INTEGER DEFAULT 3600,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `bc_error_logs` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `store_id` UUID NOT NULL,
  `error_type` VARCHAR(100) NOT NULL,
  `error_message` TEXT NOT NULL,
  `error_details` JSONB,
  `endpoint` VARCHAR(255),
  `request_payload` JSONB,
  `response_payload` JSONB,
  `resolved` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `img_plans` (
  `id` pk,
  `name` TEXT UNIQUE NOT NULL,
  `max_storage_mb` INTEGER NOT NULL,
  `max_images` INTEGER,
  `max_file_size_mb` INTEGER DEFAULT 10,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `img_users_plan` (
  `id` uuid,
  `user_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `images` (
  `image_id` BIGINT PRIMARY KEY,
  `owner_id` int NOT NULL,
  `filename` VARCHAR NOT NULL,
  `mime_type` VARCHAR NOT NULL,
  `alt_text` VARCHAR NOT NULL,
  `width` int,
  `height` int,
  `file_size_bytes` BIGINT NOT NULL DEFAULT 0,
  `sha256` BYTEA,
  `exif_json` JSONB,
  `image_url` VARCHAR NOT NULL,
  `position` INT DEFAULT 1,
  `stock_item_id` UUID,
  `listing_id` UUID,
  `kit_id` UUID,
  `is_active` BOOLEAN NOT NULL DEFAULT false,
  `is_main` BOOLEAN NOT NULL DEFAULT false,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `deleted_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `shopify_product_images` (
  `id` BIGINT PRIMARY KEY,
  `image_id` BIGINT NOT NULL,
  `product_id` BIGINT NOT NULL,
  `shopify_url` VARCHAR(500) NOT NULL,
  `position` INT DEFAULT 1,
  `variant_ids` JSON,
  `admin_graphql_api_id` VARCHAR(255)
);

CREATE TABLE `bc_product_images` (
  `id` UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  `image_id` BIGINT NOT NULL,
  `product_id` UUID NOT NULL,
  `bc_image_id` INTEGER,
  `bc_image_url` VARCHAR(500) NOT NULL,
  `is_thumbnail` BOOLEAN DEFAULT false,
  `sort_order` INTEGER DEFAULT 0
);

CREATE TABLE `user_storage_usage` (
  `id` INT PRIMARY KEY,
  `user_id` int NOT NULL,
  `used_bytes` BIGINT NOT NULL DEFAULT 0,
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `purchase_order` (
  `purchase_order_id` UUID PRIMARY KEY,
  `supplier_id` UUID NOT NULL,
  `status` VARCHAR NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `purchase_order_item` (
  `purchase_order_item_id` UUID PRIMARY KEY,
  `purchase_order_id` UUID NOT NULL,
  `quantity_ordered` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Imports` (
  `id` uuid PRIMARY KEY,
  `file_path` text,
  `original_filename` text,
  `type` enum,
  `mime` text,
  `size_bytes` bigint,
  `sha256_checksum` text,
  `schema_version` text,
  `mapping_profile_id` uuid,
  `status` enum(PENDING,RUNNING,PAUSED,COMPLETED,PARTIAL,FAILED,CANCELED),
  `total_rows` bigint,
  `processed_rows` bigint,
  `succeeded_rows` bigint,
  `failed_rows` bigint,
  `created_by` text,
  `started_at` timestamp,
  `ended_at` timestamp,
  `last_checkpoint_row` bigint,
  `idempotency_key` text,
  `resume_token` text,
  `meta` json,
  `timestamps` timestamp
);

CREATE TABLE `Import_Rows` (
  `id` uuid PRIMARY KEY,
  `import_id` uuid,
  `row_no` bigint,
  `status` enum(PENDING,SUCCESS,ERROR,SKIPPED),
  `payload` jsonb,
  `errors_count` integer,
  `timestamps` timestamp
);

CREATE TABLE `Import_Errors` (
  `id` uuid PRIMARY KEY,
  `import_id` uuid,
  `row_no` bigint,
  `field` text,
  `error_code` text,
  `message` text,
  `raw_row` jsonb,
  `timestamps` timestamp
);

CREATE TABLE `import_sources` (
  `id` uuid PRIMARY KEY,
  `type` enum(local,http,dropbox,sftp),
  `config_json` json,
  `auth_json` json,
  `status` text,
  `timestamps` timestamp
);

CREATE TABLE `import_schedules` (
  `id` uuid PRIMARY KEY,
  `source_id` uuid,
  `kind` enum(one-time,recurring),
  `run_at` time,
  `timezone` timestamp,
  `next_run_at` time,
  `last_run_at` time,
  `status` enum(ENABLED,DISABLED),
  `timestamps` timestamp
);

CREATE TABLE `import_runs` (
  `id` uuid PRIMARY KEY,
  `schedule_id` uuid,
  `started_at` time,
  `ended_at` time,
  `result` enum(COMPLETED,PARTIAL,FAILED),
  `meta` json,
  `last_run_at` time,
  `status` enum(ENABLED,DISABLED),
  `timestamps` timestamp
);

CREATE TABLE `mapping_profiles` (
  `id` uuid PRIMARY KEY,
  `name` string,
  `schema_version` text,
  `columns_map` json,
  `options_json` json,
  `created_by` uuid,
  `timestamps` timestamp
);

CREATE UNIQUE INDEX `unique_tenant_sku` ON `stock_item` (`belongs_to`, `sku`);

CREATE UNIQUE INDEX `unique_tenant_barcode` ON `stock_item` (`belongs_to`, `barcode`);

CREATE INDEX `idx_tenant_status_type` ON `stock_item` (`belongs_to`, `status`, `stock_type`);

CREATE UNIQUE INDEX `unique_item_attribute` ON `stock_item_variant` (`stock_item_id`, `attribute_name`);

CREATE UNIQUE INDEX `unique_kit_component` ON `stock_item_kit` (`kit_stock_item_id`, `component_stock_item_id`);

CREATE INDEX `idx_kit_display_order` ON `stock_item_kit` (`kit_stock_item_id`, `display_order`);

CREATE UNIQUE INDEX `unique_brand_code` ON `brand` (`brand_code`);

CREATE UNIQUE INDEX `unique_stockitem_identifier` ON `stock_item_identifier` (`stock_item_id`, `product_identifier`);

CREATE UNIQUE INDEX `unique_category_name` ON `stock_categories` (`created_by`, `category_name`);

CREATE UNIQUE INDEX `unique_warehouse_name` ON `warehouse` (`belongs_to`, `name`);

CREATE UNIQUE INDEX `unique_supplier_code` ON `suppliers` (`created_by`, `supplier_code`);

CREATE INDEX `idx_stock_item_warehouse_id` ON `stock_level` (`stock_item_id`, `warehouse_id`);

CREATE UNIQUE INDEX `unique_location` ON `shopify_inventory_levels` (`inventory_item_id`, `location_id`);

CREATE UNIQUE INDEX `unique_collection` ON `shopify_product_collections` (`product_id`, `collection_id`);

CREATE UNIQUE INDEX `bc_categories_index_14` ON `bc_categories` (`store_id`, `bc_category_id`);

CREATE UNIQUE INDEX `bc_products_index_15` ON `bc_products` (`store_id`, `sku`);

CREATE INDEX `bc_products_index_16` ON `bc_products` (`store_id`);

CREATE INDEX `bc_products_index_17` ON `bc_products` (`sku`);

CREATE INDEX `bc_products_index_18` ON `bc_products` (`bc_product_id`);

CREATE INDEX `bc_products_index_19` ON `bc_products` (`status`);

CREATE INDEX `bc_products_index_20` ON `bc_products` (`sync_status`);

CREATE UNIQUE INDEX `bc_brands_index_21` ON `bc_brands` (`store_id`, `bc_brand_id`);

CREATE UNIQUE INDEX `bc_product_categories_index_22` ON `bc_product_categories` (`product_id`, `category_id`);

CREATE UNIQUE INDEX `bc_orders_index_23` ON `bc_orders` (`store_id`, `bc_order_id`);

CREATE INDEX `bc_orders_index_24` ON `bc_orders` (`store_id`);

CREATE INDEX `bc_orders_index_25` ON `bc_orders` (`bc_order_id`);

CREATE INDEX `bc_orders_index_26` ON `bc_orders` (`status`);

CREATE INDEX `bc_orders_index_27` ON `bc_orders` (`created_at`);

CREATE INDEX `bc_order_items_index_28` ON `bc_order_items` (`order_id`);

CREATE INDEX `bc_order_items_index_29` ON `bc_order_items` (`product_id`);

CREATE INDEX `bc_inventory_transactions_index_30` ON `bc_inventory_transactions` (`product_id`);

CREATE INDEX `bc_inventory_transactions_index_31` ON `bc_inventory_transactions` (`created_at`);

CREATE INDEX `bc_webhook_events_index_32` ON `bc_webhook_events` (`processed`);

CREATE INDEX `bc_webhook_events_index_33` ON `bc_webhook_events` (`created_at`);

CREATE INDEX `bc_sync_jobs_index_34` ON `bc_sync_jobs` (`status`);

CREATE INDEX `bc_sync_jobs_index_35` ON `bc_sync_jobs` (`created_at`);

ALTER TABLE `stock_item` ADD FOREIGN KEY (`belongs_to`) REFERENCES `users` (`user_id`);

ALTER TABLE `stock_item` ADD FOREIGN KEY (`parent_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `stock_item_variant` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `stock_item_kit` ADD FOREIGN KEY (`kit_stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `stock_item_kit` ADD FOREIGN KEY (`component_stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `stock_item_identifier` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `item_bullet_points` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `item_bullet_points` ADD FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`);

ALTER TABLE `stock_item_dimensions` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `stock_categories` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `stock_item_attributes` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `global_attributes` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `item_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `stock_categories` (`id`);

ALTER TABLE `item_categories` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `warehouse` ADD FOREIGN KEY (`belongs_to`) REFERENCES `users` (`user_id`);

ALTER TABLE `suppliers` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `listing` ADD FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`);

ALTER TABLE `ebay_listings` ADD FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`);

ALTER TABLE `ebay_listing_variations` ADD FOREIGN KEY (`listing_id`) REFERENCES `ebay_listings` (`id`);

ALTER TABLE `ebay_variation_specifics` ADD FOREIGN KEY (`variation_id`) REFERENCES `ebay_listing_variations` (`id`);

ALTER TABLE `variation_sets` ADD FOREIGN KEY (`listing_id`) REFERENCES `ebay_listings` (`id`);

ALTER TABLE `ebay_shipping_options` ADD FOREIGN KEY (`listing_id`) REFERENCES `ebay_listings` (`id`);

ALTER TABLE `ebay_item_specifics` ADD FOREIGN KEY (`listing_id`) REFERENCES `ebay_listings` (`id`);

ALTER TABLE `ebay_return_policies` ADD FOREIGN KEY (`listing_id`) REFERENCES `ebay_listings` (`id`);

ALTER TABLE `shopify_products` ADD FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`);

ALTER TABLE `shopify_product_variants` ADD FOREIGN KEY (`product_id`) REFERENCES `shopify_products` (`id`);

ALTER TABLE `shopify_inventory_levels` ADD FOREIGN KEY (`inventory_item_id`) REFERENCES `shopify_inventory_items` (`id`);

ALTER TABLE `shopify_product_options` ADD FOREIGN KEY (`product_id`) REFERENCES `shopify_products` (`id`);

ALTER TABLE `shopify_product_collections` ADD FOREIGN KEY (`product_id`) REFERENCES `shopify_products` (`id`);

ALTER TABLE `shopify_product_collections` ADD FOREIGN KEY (`collection_id`) REFERENCES `shopify_collections` (`id`);

ALTER TABLE `bc_categories` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_categories` ADD FOREIGN KEY (`parent_id`) REFERENCES `bc_categories` (`id`);

ALTER TABLE `bc_products` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_products` ADD FOREIGN KEY (`category_id`) REFERENCES `bc_categories` (`id`);

ALTER TABLE `bc_products` ADD FOREIGN KEY (`brand_id`) REFERENCES `bc_brands` (`id`);

ALTER TABLE `bc_brands` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_product_variants` ADD FOREIGN KEY (`product_id`) REFERENCES `bc_products` (`id`);

ALTER TABLE `bc_product_categories` ADD FOREIGN KEY (`product_id`) REFERENCES `bc_products` (`id`);

ALTER TABLE `bc_product_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `bc_categories` (`id`);

ALTER TABLE `bc_orders` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `bc_orders` (`id`);

ALTER TABLE `bc_order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `bc_products` (`id`);

ALTER TABLE `bc_order_items` ADD FOREIGN KEY (`variant_id`) REFERENCES `bc_product_variants` (`id`);

ALTER TABLE `bc_shipments` ADD FOREIGN KEY (`order_id`) REFERENCES `bc_orders` (`id`);

ALTER TABLE `bc_shipment_items` ADD FOREIGN KEY (`shipment_id`) REFERENCES `bc_shipments` (`id`);

ALTER TABLE `bc_shipment_items` ADD FOREIGN KEY (`order_item_id`) REFERENCES `bc_order_items` (`id`);

ALTER TABLE `bc_inventory_transactions` ADD FOREIGN KEY (`product_id`) REFERENCES `bc_products` (`id`);

ALTER TABLE `bc_inventory_transactions` ADD FOREIGN KEY (`variant_id`) REFERENCES `bc_product_variants` (`id`);

ALTER TABLE `bc_returns` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_returns` ADD FOREIGN KEY (`order_id`) REFERENCES `bc_orders` (`id`);

ALTER TABLE `bc_return_items` ADD FOREIGN KEY (`return_id`) REFERENCES `bc_returns` (`id`);

ALTER TABLE `bc_return_items` ADD FOREIGN KEY (`order_item_id`) REFERENCES `bc_order_items` (`id`);

ALTER TABLE `bc_policies` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_shipping_policies` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_tax_policies` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_webhooks` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_webhook_events` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_webhook_events` ADD FOREIGN KEY (`webhook_id`) REFERENCES `bc_webhooks` (`id`);

ALTER TABLE `bc_sync_jobs` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_api_rate_limits` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `bc_error_logs` ADD FOREIGN KEY (`store_id`) REFERENCES `bc_stores` (`id`);

ALTER TABLE `img_users_plan` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `img_users_plan` ADD FOREIGN KEY (`plan_id`) REFERENCES `img_plans` (`id`);

ALTER TABLE `images` ADD FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `images` ADD FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item` (`stock_item_id`);

ALTER TABLE `images` ADD FOREIGN KEY (`listing_id`) REFERENCES `listing` (`listing_id`);

ALTER TABLE `images` ADD FOREIGN KEY (`kit_id`) REFERENCES `stock_item_kit` (`kit_id`);

ALTER TABLE `shopify_product_images` ADD FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`);

ALTER TABLE `shopify_product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `shopify_products` (`id`);

ALTER TABLE `bc_product_images` ADD FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`);

ALTER TABLE `bc_product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `bc_products` (`id`);

ALTER TABLE `user_storage_usage` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `purchase_order_item` ADD FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_order` (`purchase_order_id`);

ALTER TABLE `Import_Rows` ADD FOREIGN KEY (`import_id`) REFERENCES `Imports` (`id`);

ALTER TABLE `Import_Errors` ADD FOREIGN KEY (`import_id`) REFERENCES `Imports` (`id`);

ALTER TABLE `import_schedules` ADD FOREIGN KEY (`source_id`) REFERENCES `import_sources` (`id`);

ALTER TABLE `import_runs` ADD FOREIGN KEY (`schedule_id`) REFERENCES `import_schedules` (`id`);
