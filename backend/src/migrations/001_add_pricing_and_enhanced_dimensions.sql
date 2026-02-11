-- Add pricing table for stock items
CREATE TABLE `stock_item_pricing` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `stock_item_id` UUID NOT NULL,
  `cost_price` DECIMAL(12,2),
  `selling_price` DECIMAL(12,2),
  `msrp` DECIMAL(12,2),
  `retail_price` DECIMAL(12,2),
  `map_price` DECIMAL(12,2),
  `discount_type` ENUM('percentage', 'fixed', 'none') DEFAULT 'none',
  `discount_value` DECIMAL(12,2) DEFAULT 0,
  `tax_class` VARCHAR(50) DEFAULT 'standard',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`stock_item_id`) REFERENCES `stock_item`(`stock_item_id`) ON DELETE CASCADE
);

-- Add indexes for performance
CREATE INDEX idx_stock_item_pricing_stock_item_id ON stock_item_pricing(stock_item_id);

-- Update stock_item_dimensions table to use UUID primary key and add missing fields
ALTER TABLE `stock_item_dimensions` 
  DROP COLUMN `id`,
  ADD COLUMN `dimension_id` UUID PRIMARY KEY DEFAULT (UUID());

-- Insert dimension_id as UUID for existing records if any
UPDATE stock_item_dimensions SET dimension_id = UUID() WHERE dimension_id IS NULL;

-- Add missing dimension fields that the form supports
ALTER TABLE `stock_item_dimensions` 
  ADD COLUMN `manufactured_city` VARCHAR(100),
  ADD COLUMN `manufactured_state` VARCHAR(100),
  ADD COLUMN `manufactured_country_code` CHAR(2),
  ADD COLUMN `manufactured_postal_code` VARCHAR(20);

-- Add indexes for foreign key relationships
CREATE INDEX idx_stock_item_dimensions_stock_item_id ON stock_item_dimensions(stock_item_id);