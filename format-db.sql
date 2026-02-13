-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 12, 2026 at 01:38 AM
-- Server version: 8.4.6
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cims-backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `is_variant` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `company_id`, `created_by_id`, `name`, `type`, `is_variant`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Color', 'text', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(2, 1, 1, 'Size', 'select', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(3, 1, 1, 'Material', 'text', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `action` enum('create','update','delete','view','export','login','logout','sync') COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `company_id`, `user_id`, `action`, `entity_type`, `entity_id`, `old_values`, `new_values`, `ip_address`, `user_agent`, `request_id`, `created_at`) VALUES
('008a80fa-d0e8-4d09-8bc1-ef9da50546e4', 1, 1, 'create', 'listing', 'lst_fdda0ba9ccd77773', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_fdda0ba9ccd77773\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:44'),
('0944f544-6bdc-405d-8144-4a191a2647e7', 1, 1, 'create', 'listing', 'lst_1f1a0cfe3ce48d3a', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_1f1a0cfe3ce48d3a\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4740661352, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:01:02'),
('11752b5f-12cd-48f3-9835-7fbdad465f40', 1, 1, 'create', 'listing', 'lst_0a5bf5071f1a4d6f', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_0a5bf5071f1a4d6f\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:01:58'),
('12e0f56c-5f06-4762-ac8f-24690b8a601b', 1, 1, 'create', 'listing', 'lst_b059bea25c0e27d0', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_b059bea25c0e27d0\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4740661352, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:00:59'),
('28af7d7b-8dd7-4af4-af0d-211fce9de7eb', 1, 1, 'create', 'listing', 'lst_a06de32aaf236543', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_a06de32aaf236543\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:50'),
('301abc10-33ee-456b-8fcf-824cc3bebb88', 1, 1, 'create', 'listing', 'lst_13e594482ea88151', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_13e594482ea88151\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:47'),
('3dcaf32c-da0f-4381-aeaf-1c0d2624e4f2', 1, 1, 'create', 'listing', 'lst_0baee1e6d72e59eb', NULL, '{\"status\": \"draft\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_0baee1e6d72e59eb\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": \"9739817478\", \"price_override\": 293, \"quantity_allocated\": 256}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:31:58'),
('56d92ec8-923d-4c25-b168-5e305038e10f', 1, 1, 'create', 'listing', 'lst_8832bbf51fddb427', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_8832bbf51fddb427\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:47'),
('68499cf1-0364-41dc-817d-6690d4215a8d', 1, 1, 'create', 'listing', 'lst_0d985d0d8eaa0099', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_0d985d0d8eaa0099\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:49'),
('6f310fb6-521f-405c-b8eb-22bf3437bfe8', 1, 1, 'create', 'listing', 'lst_0ea804167d87905a', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_0ea804167d87905a\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:41'),
('78689fd5-2a61-42a2-b4a9-d78130b649f4', 1, 1, 'update', 'listing', 'lst_0a5bf5071f1a4d6f', '{\"tags\": null, \"status\": \"delisted\", \"version\": 1, \"currency\": \"USD\", \"is_linked\": false, \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_at\": \"2026-01-23T03:01:58.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"is_taxable\": 1, \"listing_id\": \"lst_0a5bf5071f1a4d6f\", \"sync_error\": null, \"updated_at\": \"2026-01-23T03:01:58.000000Z\", \"updated_by\": 1, \"variant_id\": null, \"category_id\": null, \"listing_url\": null, \"sync_status\": \"pending\", \"is_published\": false, \"product_type\": null, \"published_at\": null, \"created_by_id\": 1, \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"last_synced_at\": null, \"marketplace_id\": null, \"price_override\": null, \"title_override\": null, \"buffer_quantity\": 0, \"marketplace_sku\": null, \"compare_at_price\": null, \"inventory_policy\": \"deny\", \"return_policy_id\": null, \"custom_attributes\": null, \"features_override\": null, \"mapped_attributes\": null, \"quantity_reserved\": 0, \"quantity_allocated\": 0, \"description_override\": null, \"shipping_template_id\": null, \"short_description_override\": null}', '{\"tags\": null, \"status\": \"draft\", \"channel\": {\"name\": \"My Shopify Store\", \"status\": \"active\", \"platform\": \"shopify\", \"store_url\": \"https://my-store.myshopify.com\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_at\": \"2026-01-23T01:19:04.000000Z\", \"created_by\": 1, \"deleted_at\": null, \"sync_error\": null, \"updated_at\": \"2026-01-23T01:19:04.000000Z\", \"updated_by\": 1, \"marketplace\": \"shopify\", \"connected_by\": 1, \"last_sync_at\": \"2026-01-22T23:19:04.000000Z\", \"created_by_id\": null, \"marketplace_data\": {\"country\": \"US\", \"shop_id\": \"12345678901\", \"currency\": \"USD\", \"shop_name\": \"My Store\"}}, \"product\": {\"id\": 4708892562, \"bin\": null, \"sku\": \"SPO-021\", \"uom\": \"pcs\", \"name\": \"EcoLife Sports Item 21\", \"type\": \"Simple\", \"brand\": \"EcoLife\", \"images\": null, \"status\": \"Active\", \"barcode\": null, \"options\": null, \"version\": 1, \"category\": \"Sports\", \"item_type\": \"physical\", \"tax_class\": null, \"thumbnail\": null, \"video_url\": null, \"warehouse\": null, \"company_id\": 1, \"cost_price\": \"55.00\", \"created_at\": \"2026-01-23T01:36:39.000000Z\", \"deleted_at\": null, \"stock_type\": \"basic\", \"updated_at\": \"2026-01-23T01:36:39.000000Z\", \"updated_by\": null, \"visibility\": \"Public\", \"description\": \"A high-quality Sports item from EcoLife. Perfect for daily use.\", \"is_published\": 0, \"published_at\": null, \"safety_stock\": 9, \"business_name\": null, \"created_by_id\": 1, \"discount_type\": null, \"location_note\": null, \"reorder_level\": 19, \"selling_price\": \"212.00\", \"discount_value\": \"0.00\", \"internal_notes\": null, \"allow_backorder\": false, \"track_inventory\": true, \"initial_quantity\": 350, \"manufacturer_name\": null, \"manufacturer_state\": null, \"manufacturer_postal_code\": null, \"manufacturer_country_code\": null}, \"version\": 2, \"currency\": \"USD\", \"is_linked\": false, \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_at\": \"2026-01-23T03:01:58.000000Z\", \"created_by\": {\"id\": 1, \"name\": \"Raihan Khan\", \"email\": \"admin@demo.com\", \"avatar\": null, \"status\": \"active\", \"otp_code\": null, \"provider\": \"email\", \"google_id\": null, \"company_id\": 1, \"created_at\": \"2026-01-23T01:19:03.000000Z\", \"updated_at\": \"2026-01-23T01:19:03.000000Z\", \"otp_expires_at\": null, \"email_verified_at\": null}, \"deleted_at\": null, \"is_taxable\": 1, \"listing_id\": \"lst_0a5bf5071f1a4d6f\", \"sync_error\": null, \"updated_at\": \"2026-01-23T03:09:18.000000Z\", \"updated_by\": {\"id\": 1, \"name\": \"Raihan Khan\", \"email\": \"admin@demo.com\", \"avatar\": null, \"status\": \"active\", \"otp_code\": null, \"provider\": \"email\", \"google_id\": null, \"company_id\": 1, \"created_at\": \"2026-01-23T01:19:03.000000Z\", \"updated_at\": \"2026-01-23T01:19:03.000000Z\", \"otp_expires_at\": null, \"email_verified_at\": null}, \"variant_id\": null, \"category_id\": null, \"listing_url\": null, \"sync_status\": \"pending\", \"is_published\": false, \"product_type\": null, \"published_at\": null, \"created_by_id\": 1, \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"last_synced_at\": null, \"marketplace_id\": null, \"price_override\": null, \"title_override\": null, \"buffer_quantity\": 0, \"marketplace_sku\": null, \"compare_at_price\": null, \"inventory_policy\": \"deny\", \"return_policy_id\": null, \"custom_attributes\": null, \"features_override\": null, \"mapped_attributes\": {\"meta\": {\"id\": \"4708892562\", \"status\": \"delisted\", \"version\": 1, \"company_id\": 1, \"created_at\": \"2026-01-23T03:01:58.000000Z\", \"created_by\": \"system\", \"updated_at\": \"2026-01-23T03:01:58.000000Z\", \"updated_by\": \"system\", \"is_published\": true}, \"media\": {\"images\": [], \"videos\": []}, \"pricing\": {\"taxClass\": \"standard\", \"costPrice\": null, \"discountType\": \"none\", \"sellingPrice\": null, \"discountValue\": null}, \"variants\": {\"themes\": [], \"hasVariation\": false, \"variantItems\": []}, \"basicInfo\": {\"map\": null, \"sku\": \"SPO-021\", \"msrp\": null, \"brand\": \"EcoLife\", \"title\": \"EcoLife Sports Item 21\", \"category\": \"Sports\", \"condition\": \"new\", \"weightUnit\": \"kg\", \"retailPrice\": null, \"weightValue\": null, \"manufacturer\": null, \"dimensionUnit\": \"inch\", \"purchasePrice\": null, \"dimensionWidth\": null, \"dimensionHeight\": null, \"dimensionLength\": null, \"manufacturedCity\": null, \"manufacturedState\": null, \"manufacturedCountry\": null, \"productIdentifierType\": \"SKU\", \"manufacturedPostalCode\": null, \"productIdentifierValue\": \"SPO-021\"}, \"inventory\": {\"stocks\": [{\"id\": \"1\", \"sku\": \"SPO-021\", \"reserved\": 0, \"available\": 0, \"isDefault\": true, \"warehouse\": \"Local Node\", \"binLocations\": [null], \"priorityOrder\": 0}]}, \"suppliers\": [], \"attributes\": [], \"description\": {\"features\": [null, null, null, null, null], \"mainDescription\": \"A high-quality Sports item from EcoLife. Perfect for daily use.\", \"shortDescription\": null}, \"marketplace\": {\"channels\": [{\"id\": \"shopify\", \"name\": \"My Shopify Store\", \"tags\": [], \"price\": null, \"title\": \"EcoLife Sports Item 21\", \"description\": null}]}, \"listingStatus\": {\"active\": [], \"drafts\": [], \"status\": \"Draft\", \"notListed\": [{\"id\": \"lst_0a5bf5071f1a4d6f\", \"sku\": \"SPO-021\", \"price\": \"0\", \"channel\": \"My Shopify Store\", \"quantity\": \"0\", \"marketplaceId\": \"shopify\"}]}}, \"quantity_reserved\": 0, \"quantity_allocated\": 0, \"description_override\": null, \"shipping_template_id\": null, \"short_description_override\": null}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:09:18'),
('7a096ff5-5fe4-457a-9f9f-eb7bd00fc4a0', 1, 1, 'create', 'listing', 'lst_78735d0ee97a3a6f', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_003\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_78735d0ee97a3a6f\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 20:14:16'),
('7c0445ed-81af-4a55-9df9-f021f44b070e', 1, 1, 'create', 'listing', 'lst_63fa8ee6102b102d', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_63fa8ee6102b102d\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 1450261977, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:00:54'),
('7eca69a1-6b4d-4ef0-83c2-60c74bc4f75d', 1, 1, 'create', 'listing', 'lst_686af40a6199a3e8', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_686af40a6199a3e8\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:00:46'),
('af0a395d-64b1-4de7-8850-80c9f874be12', 1, 1, 'create', 'listing', 'lst_ba9ff50f94faec3f', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_ba9ff50f94faec3f\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 5736782992, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:01:10'),
('c1030f4b-1d11-4eb7-bd18-d5fa32e11044', 1, 1, 'create', 'listing', 'lst_0c6cc65bf750ddd6', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_001\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_0c6cc65bf750ddd6\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 19:53:50'),
('c3a2409a-a45f-4cf7-a41e-26c29d9f77b0', 1, 1, 'create', 'listing', 'lst_c18a545ed8e189dc', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_c18a545ed8e189dc\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 2074962829, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:01:05'),
('c4699611-9ac6-474a-b7fa-c07d340a06a5', 1, 1, 'create', 'listing', 'lst_eeef10d992234d14', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_eeef10d992234d14\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 1040703478, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:01:14'),
('dc233747-62cf-43ff-aa19-3a5f652d36e3', 1, 1, 'create', 'listing', 'lst_21127006b36ac48a', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_21127006b36ac48a\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:00:51'),
('ea1d735f-15df-49fb-a869-a268a5dcae99', 1, 1, 'create', 'listing', 'lst_2920d6ec51aaa79b', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"CH_003\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_2920d6ec51aaa79b\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 20:14:17'),
('ebf8611d-2cec-4ea2-ba1e-2e4058c3412e', 1, 1, 'create', 'listing', 'lst_e277822f1205c368', NULL, '{\"status\": \"delisted\", \"currency\": \"USD\", \"channel_id\": \"ch_shopify_3CAUi8Wv\", \"company_id\": 1, \"created_by\": 1, \"listing_id\": \"lst_e277822f1205c368\", \"updated_by\": 1, \"sync_status\": \"pending\", \"stock_item_id\": 4708892562, \"sync_quantity\": true, \"quantity_allocated\": 0}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', NULL, '2026-01-22 21:01:55');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `brand_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `company_id`, `created_by_id`, `brand_name`, `brand_code`, `website`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Nike', 'NIK', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(2, 1, 1, 'Samsung', 'SAM', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(3, 1, 1, 'Apple', 'APP', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(4, 1, 1, 'Adidas', 'ADI', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(5, 1, 1, 'Sony', 'SON', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(6, 1, 1, 'Lego', 'LEG', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(7, 1, 1, 'Bosch', 'BOS', NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `channel_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `platform` enum('shopify','amazon','ebay','etsy','walmart','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'shopify',
  `marketplace` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `marketplace_data` json DEFAULT NULL,
  `credentials` text COLLATE utf8mb4_unicode_ci,
  `store_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_sync_at` timestamp NULL DEFAULT NULL,
  `sync_error` text COLLATE utf8mb4_unicode_ci,
  `company_id` bigint UNSIGNED NOT NULL,
  `connected_by` bigint UNSIGNED DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`channel_id`, `name`, `platform`, `marketplace`, `status`, `marketplace_data`, `credentials`, `store_url`, `last_sync_at`, `sync_error`, `company_id`, `connected_by`, `created_by`, `updated_by`, `created_by_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
('CH_001', 'Online Store (Shopify)', 'shopify', 'Shopify', 'active', '[]', NULL, 'https://wemonks-test.myshopify.com', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('CH_002', 'Amazon US', 'amazon', 'Amazon', 'active', '[]', NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('CH_003', 'Retail POS', 'other', 'POS', 'active', '[]', NULL, NULL, NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('ch_amazon_0BTA91gJ', 'Amazon US Seller', 'amazon', 'amazon', 'active', '{\"region\": \"NA\", \"country\": \"US\", \"seller_id\": \"A1B2C3D4E5F6G7\", \"marketplace_id\": \"ATVPDKIKX0DER\"}', NULL, 'https://sellercentral.amazon.com', '2026-01-22 18:26:35', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', NULL),
('ch_amazon_gosPffoi', 'Amazon US Seller', 'amazon', 'amazon', 'active', '{\"region\": \"NA\", \"country\": \"US\", \"seller_id\": \"A1B2C3D4E5F6G7\", \"marketplace_id\": \"ATVPDKIKX0DER\"}', NULL, 'https://sellercentral.amazon.com', '2026-01-22 18:19:04', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('ch_amazon_KJ2mzh6e', 'Amazon US Seller', 'amazon', 'amazon', 'active', '{\"region\": \"NA\", \"country\": \"US\", \"seller_id\": \"A1B2C3D4E5F6G7\", \"marketplace_id\": \"ATVPDKIKX0DER\"}', NULL, 'https://sellercentral.amazon.com', '2026-01-22 18:29:19', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', NULL),
('ch_amazon_T991rGxQ', 'Amazon US Seller', 'amazon', 'amazon', 'active', '{\"region\": \"NA\", \"country\": \"US\", \"seller_id\": \"A1B2C3D4E5F6G7\", \"marketplace_id\": \"ATVPDKIKX0DER\"}', NULL, 'https://sellercentral.amazon.com', '2026-01-22 18:36:39', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('ch_ebay_3DDjxBNa', 'eBay Store', 'ebay', 'ebay', 'active', '{\"site_id\": \"0\", \"user_id\": \"mystore_ebay\", \"return_policy_id\": \"return_123\", \"payment_policy_id\": \"policy_123\", \"shipping_policy_id\": \"ship_123\"}', NULL, 'https://www.ebay.com/usr/mystore', '2026-01-22 18:56:35', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:26:36', '2026-01-22 19:26:36', NULL),
('ch_ebay_Ce8BlzeT', 'eBay Store', 'ebay', 'ebay', 'active', '{\"site_id\": \"0\", \"user_id\": \"mystore_ebay\", \"return_policy_id\": \"return_123\", \"payment_policy_id\": \"policy_123\", \"shipping_policy_id\": \"ship_123\"}', NULL, 'https://www.ebay.com/usr/mystore', '2026-01-22 18:49:04', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('ch_ebay_iLk9oXAS', 'eBay Store', 'ebay', 'ebay', 'active', '{\"site_id\": \"0\", \"user_id\": \"mystore_ebay\", \"return_policy_id\": \"return_123\", \"payment_policy_id\": \"policy_123\", \"shipping_policy_id\": \"ship_123\"}', NULL, 'https://www.ebay.com/usr/mystore', '2026-01-22 19:06:39', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('ch_ebay_K0TmKNPW', 'eBay Store', 'ebay', 'ebay', 'active', '{\"site_id\": \"0\", \"user_id\": \"mystore_ebay\", \"return_policy_id\": \"return_123\", \"payment_policy_id\": \"policy_123\", \"shipping_policy_id\": \"ship_123\"}', NULL, 'https://www.ebay.com/usr/mystore', '2026-01-22 18:59:19', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', NULL),
('ch_etsy_2VfpXJ8Z', 'Etsy Shop', 'etsy', 'etsy', 'pending', '{\"shop_id\": \"98765432\", \"currency\": \"USD\", \"shop_name\": \"MyEtsyShop\"}', NULL, 'https://www.etsy.com/shop/myshop', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('ch_etsy_djY2iiTV', 'Etsy Shop', 'etsy', 'etsy', 'pending', '{\"shop_id\": \"98765432\", \"currency\": \"USD\", \"shop_name\": \"MyEtsyShop\"}', NULL, 'https://www.etsy.com/shop/myshop', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:26:36', '2026-01-22 19:26:36', NULL),
('ch_etsy_FZznEBGl', 'Etsy Shop', 'etsy', 'etsy', 'pending', '{\"shop_id\": \"98765432\", \"currency\": \"USD\", \"shop_name\": \"MyEtsyShop\"}', NULL, 'https://www.etsy.com/shop/myshop', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('ch_etsy_hyy1aO8e', 'Etsy Shop', 'etsy', 'etsy', 'pending', '{\"shop_id\": \"98765432\", \"currency\": \"USD\", \"shop_name\": \"MyEtsyShop\"}', NULL, 'https://www.etsy.com/shop/myshop', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', NULL),
('ch_shopify_3CAUi8Wv', 'My Shopify Store', 'shopify', 'shopify', 'active', '{\"country\": \"US\", \"shop_id\": \"12345678901\", \"currency\": \"USD\", \"shop_name\": \"My Store\"}', NULL, 'https://my-store.myshopify.com', '2026-01-22 17:19:04', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('ch_shopify_main', 'Main Shopify Store', 'shopify', 'shopify', 'active', '{\"country\": \"US\", \"shop_id\": \"12345678901\", \"currency\": \"USD\", \"shop_name\": \"Main Store\"}', NULL, 'https://main-store.myshopify.com', '2026-01-22 17:36:39', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('ch_shopify_ne7Z3sHX', 'My Shopify Store', 'shopify', 'shopify', 'active', '{\"country\": \"US\", \"shop_id\": \"12345678901\", \"currency\": \"USD\", \"shop_name\": \"My Store\"}', NULL, 'https://my-store.myshopify.com', '2026-01-22 17:29:19', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', NULL),
('ch_shopify_outlet', 'Fashion Outlet', 'shopify', 'shopify', 'active', '{\"country\": \"US\", \"shop_id\": \"98765432101\", \"currency\": \"USD\", \"shop_name\": \"Fashion Outlet\"}', NULL, 'https://outlet.myshopify.com', '2026-01-22 14:36:39', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('ch_shopify_XhRjzH0g', 'My Shopify Store', 'shopify', 'shopify', 'active', '{\"country\": \"US\", \"shop_id\": \"12345678901\", \"currency\": \"USD\", \"shop_name\": \"My Store\"}', NULL, 'https://my-store.myshopify.com', '2026-01-22 17:26:35', NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', NULL),
('ch_walmart_aUxyPsx0', 'Walmart Marketplace', 'walmart', 'walmart', 'inactive', '{\"feed_id\": null, \"partner_id\": \"WM_PARTNER_123\"}', NULL, 'https://seller.walmart.com', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:26:36', '2026-01-22 19:26:36', NULL),
('ch_walmart_d4N9NvUW', 'Walmart Marketplace', 'walmart', 'walmart', 'inactive', '{\"feed_id\": null, \"partner_id\": \"WM_PARTNER_123\"}', NULL, 'https://seller.walmart.com', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('ch_walmart_dDEBQW2h', 'Walmart Marketplace', 'walmart', 'walmart', 'inactive', '{\"feed_id\": null, \"partner_id\": \"WM_PARTNER_123\"}', NULL, 'https://seller.walmart.com', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', NULL),
('ch_walmart_OsHsPEmp', 'Walmart Marketplace', 'walmart', 'walmart', 'inactive', '{\"feed_id\": null, \"partner_id\": \"WM_PARTNER_123\"}', NULL, 'https://seller.walmart.com', NULL, NULL, 1, 1, 1, 1, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `management_type` enum('single','team') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'single',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `package_id` bigint UNSIGNED DEFAULT NULL,
  `subscription_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'trial',
  `max_seats` int NOT NULL DEFAULT '5',
  `trial_ends_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `business_type`, `management_type`, `created_at`, `updated_at`, `package_id`, `subscription_status`, `max_seats`, `trial_ends_at`) VALUES
(1, 'Demo Tech Solutions', 'Technology', 'team', '2026-01-22 19:19:03', '2026-01-22 19:19:03', NULL, 'trial', 5, NULL),
(2, 'Nexus Global Corp', 'Retail', 'team', '2026-01-22 19:19:42', '2026-01-22 19:19:42', NULL, 'trial', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `company_user`
--

CREATE TABLE `company_user` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Team Member',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_user`
--

INSERT INTO `company_user` (`id`, `company_id`, `user_id`, `role`, `status`, `is_locked`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Business Admin', 'active', 0, '2026-01-22 19:19:05', '2026-01-22 19:36:46'),
(2, 1, 2, 'Team Manager', 'active', 0, '2026-01-22 19:19:05', '2026-01-22 19:36:46'),
(3, 1, 3, 'Team Member', 'active', 0, '2026-01-22 19:19:05', '2026-01-22 19:36:46');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL,
  `valid_until` timestamp NULL DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `discount_percent`, `valid_until`, `usage_limit`, `created_at`, `updated_at`) VALUES
(1, 'WELCOME20', 20.00, '2026-02-22 19:36:46', 100, '2026-01-22 19:19:05', '2026-01-22 19:36:46');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invitations`
--

CREATE TABLE `invitations` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` bigint UNSIGNED NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Team Member',
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invited_by` bigint UNSIGNED NOT NULL,
  `expires_at` timestamp NOT NULL,
  `status` enum('pending','accepted','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_bullet_points`
--

CREATE TABLE `item_bullet_points` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `bullet_text` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `listing_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `channel_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marketplace_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `marketplace_sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listing_url` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_override` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_override` text COLLATE utf8mb4_unicode_ci,
  `short_description_override` text COLLATE utf8mb4_unicode_ci,
  `features_override` json DEFAULT NULL,
  `price_override` decimal(10,2) DEFAULT NULL,
  `compare_at_price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
  `quantity_allocated` int NOT NULL DEFAULT '0',
  `quantity_reserved` int NOT NULL DEFAULT '0',
  `buffer_quantity` int NOT NULL DEFAULT '0',
  `sync_quantity` tinyint(1) NOT NULL DEFAULT '1',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sync_status` enum('synced','pending','error') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `last_synced_at` timestamp NULL DEFAULT NULL,
  `sync_error` text COLLATE utf8mb4_unicode_ci,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `category_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `inventory_policy` enum('deny','continue') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deny',
  `is_taxable` tinyint(1) NOT NULL DEFAULT '1',
  `shipping_template_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `return_policy_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_attributes` json DEFAULT NULL,
  `stock_item_id` bigint UNSIGNED NOT NULL,
  `variant_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mapped_attributes` json DEFAULT NULL,
  `is_linked` tinyint(1) NOT NULL DEFAULT '0',
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `version` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`listing_id`, `company_id`, `created_by_id`, `channel_id`, `marketplace_id`, `marketplace_sku`, `listing_url`, `title_override`, `description_override`, `short_description_override`, `features_override`, `price_override`, `compare_at_price`, `currency`, `quantity_allocated`, `quantity_reserved`, `buffer_quantity`, `sync_quantity`, `status`, `sync_status`, `last_synced_at`, `sync_error`, `is_published`, `published_at`, `category_id`, `product_type`, `tags`, `inventory_policy`, `is_taxable`, `shipping_template_id`, `return_policy_id`, `custom_attributes`, `stock_item_id`, `variant_id`, `mapped_attributes`, `is_linked`, `created_by`, `updated_by`, `version`, `created_at`, `updated_at`, `deleted_at`) VALUES
('lst_0423zE2kNv7I', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/5245861750', 'SHOPIFY-HOM-016', 'https://main-store.myshopify.com/products/techgiant-home-garden-item-16', 'TechGiant Home & Garden Item 16', NULL, NULL, NULL, 153.00, 183.60, 'USD', 100, 2, 2, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-16 19:36:45', 'gid://shopify/Collection/835612', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 9152769640, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_0a5bf5071f1a4d6f', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'draft', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, '{\"meta\": {\"id\": \"4708892562\", \"status\": \"delisted\", \"version\": 1, \"company_id\": 1, \"created_at\": \"2026-01-23T03:01:58.000000Z\", \"created_by\": \"system\", \"updated_at\": \"2026-01-23T03:01:58.000000Z\", \"updated_by\": \"system\", \"is_published\": true}, \"media\": {\"images\": [], \"videos\": []}, \"pricing\": {\"taxClass\": \"standard\", \"costPrice\": null, \"discountType\": \"none\", \"sellingPrice\": null, \"discountValue\": null}, \"variants\": {\"themes\": [], \"hasVariation\": false, \"variantItems\": []}, \"basicInfo\": {\"map\": null, \"sku\": \"SPO-021\", \"msrp\": null, \"brand\": \"EcoLife\", \"title\": \"EcoLife Sports Item 21\", \"category\": \"Sports\", \"condition\": \"new\", \"weightUnit\": \"kg\", \"retailPrice\": null, \"weightValue\": null, \"manufacturer\": null, \"dimensionUnit\": \"inch\", \"purchasePrice\": null, \"dimensionWidth\": null, \"dimensionHeight\": null, \"dimensionLength\": null, \"manufacturedCity\": null, \"manufacturedState\": null, \"manufacturedCountry\": null, \"productIdentifierType\": \"SKU\", \"manufacturedPostalCode\": null, \"productIdentifierValue\": \"SPO-021\"}, \"inventory\": {\"stocks\": [{\"id\": \"1\", \"sku\": \"SPO-021\", \"reserved\": 0, \"available\": 0, \"isDefault\": true, \"warehouse\": \"Local Node\", \"binLocations\": [null], \"priorityOrder\": 0}]}, \"suppliers\": [], \"attributes\": [], \"description\": {\"features\": [null, null, null, null, null], \"mainDescription\": \"A high-quality Sports item from EcoLife. Perfect for daily use.\", \"shortDescription\": null}, \"marketplace\": {\"channels\": [{\"id\": \"shopify\", \"name\": \"My Shopify Store\", \"tags\": [], \"price\": null, \"title\": \"EcoLife Sports Item 21\", \"description\": null}]}, \"listingStatus\": {\"active\": [], \"drafts\": [], \"status\": \"Draft\", \"notListed\": [{\"id\": \"lst_0a5bf5071f1a4d6f\", \"sku\": \"SPO-021\", \"price\": \"0\", \"channel\": \"My Shopify Store\", \"quantity\": \"0\", \"marketplaceId\": \"shopify\"}]}}', 0, 1, 1, 2, '2026-01-22 21:01:58', '2026-01-22 21:09:18', NULL),
('lst_0c6cc65bf750ddd6', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:50', '2026-01-22 19:53:50', NULL),
('lst_0d985d0d8eaa0099', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:49', '2026-01-22 19:53:49', NULL),
('lst_0ea804167d87905a', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:41', '2026-01-22 19:53:41', NULL),
('lst_0EDKWV86BeVG', 1, NULL, 'CH_001', 'gid://shopify/Product/4369624499', 'SHOPIFY-SPO-009', 'https://wemonks-test.myshopify.com/products/ecolife-sports-item-9', 'EcoLife Sports Item 9', NULL, NULL, NULL, 300.00, 360.00, 'USD', 76, 3, 2, 1, 'paused', 'synced', '2026-01-22 18:35:39', NULL, 1, '2026-01-07 19:36:39', 'gid://shopify/Collection/761084', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 1040703478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_0QvEpubzmo78', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8287392140', 'SHOPIFY-TOY-007', 'https://main-store.myshopify.com/products/ecolife-toys-item-7', 'EcoLife Toys Item 7', NULL, NULL, NULL, 290.00, 348.00, 'USD', 18, 6, 2, 1, 'active', 'synced', '2026-01-22 18:19:41', NULL, 1, '2025-12-28 19:36:41', 'gid://shopify/Collection/817183', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 3149329870, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_0w61HeGYpz99', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/8030859961', 'SHOPIFY-TOY-017', 'https://my-store.myshopify.com/products/techgiant-toys-item-17', 'TechGiant Toys Item 17', NULL, NULL, NULL, 268.00, 321.60, 'USD', 100, 3, 5, 1, 'error', 'synced', '2026-01-22 19:13:42', NULL, 0, NULL, 'gid://shopify/Collection/935119', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 4278376300, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_11KR9Ln2JS1r', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2930445877', 'SHOPIFY-SPO-006', 'https://main-store.myshopify.com/products/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6', NULL, NULL, NULL, 168.00, 201.60, 'USD', 30, 4, 2, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/466409', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 6400266186, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_12Ekkwasnvsh', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5961166606', 'SHOPIFY-HOM-006', 'https://my-store.myshopify.com/products/generic-home-garden-item-6', 'Generic Home & Garden Item 6', NULL, NULL, NULL, 143.00, 171.60, 'USD', 66, 9, 5, 1, 'active', 'error', NULL, NULL, 1, '2025-12-28 19:36:42', 'gid://shopify/Collection/467087', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 4161307707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_13e594482ea88151', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:47', '2026-01-22 19:53:47', NULL),
('lst_1A1Vz4rkOyTr', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4186588447', 'SHOPIFY-ELE-012', 'https://main-store.myshopify.com/products/generic-electronics-item-12', 'Generic Electronics Item 12', NULL, NULL, NULL, 128.00, 153.60, 'USD', 90, 1, 5, 1, 'active', 'synced', '2026-01-22 19:13:41', NULL, 1, '2026-01-08 19:36:41', 'gid://shopify/Collection/789000', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2431860707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_1EKkylAG99uC', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2814070753', 'SHOPIFY-HOM-015', 'https://my-store.myshopify.com/products/generic-home-garden-item-15', 'Generic Home & Garden Item 15', NULL, NULL, NULL, 229.00, 274.80, 'USD', 72, 7, 1, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-06 19:36:44', 'gid://shopify/Collection/505400', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 6700392339, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_1f1a0cfe3ce48d3a', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4740661352, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:01:02', '2026-01-22 21:01:02', NULL),
('lst_1G8yDECU07iy', 1, NULL, 'ch_ebay_K0TmKNPW', '940774973564', 'EBAY-SPO-013', 'https://www.ebay.com/itm/684236541423', 'NEW EcoLife Sports Item 13 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 214.20, 257.04, 'USD', 38, 7, 1, 1, 'active', 'synced', '2026-01-22 18:51:20', NULL, 1, '2026-01-16 19:29:20', '70045', NULL, '[\"new-arrival\", \"fast-n-free\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5383015778, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_1GJfPO1GlgFj', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4734970435', 'SHOPIFY-TOY-001', 'https://main-store.myshopify.com/products/ecolife-toys-item-1', 'EcoLife Toys Item 1', NULL, NULL, NULL, 239.00, 286.80, 'USD', 81, 6, 4, 1, 'error', 'synced', '2026-01-22 18:56:43', NULL, 0, NULL, 'gid://shopify/Collection/302167', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 6405736263, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_1hlUjs4D7ThL', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8105377614', 'SHOPIFY-ELE-006', 'https://my-store.myshopify.com/products/speedy-electronics-item-6', 'Speedy Electronics Item 6', NULL, NULL, NULL, 184.00, 220.80, 'USD', 72, 4, 0, 1, 'active', 'error', NULL, NULL, 1, '2026-01-14 19:36:43', 'gid://shopify/Collection/904585', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5819467921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_1Lu6kYrKdY0q', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/3847636744', 'SHOPIFY-CLO-020', 'https://main-store.myshopify.com/products/generic-clothing-item-20', 'Generic Clothing Item 20', NULL, NULL, NULL, 181.00, 217.20, 'USD', 10, 5, 2, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-21 19:36:44', 'gid://shopify/Collection/688524', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 6950582016, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_1O4UJB24ndjD', 1, NULL, 'CH_001', 'gid://shopify/Product/4538016040', 'SHOPIFY-TOY-010', 'https://wemonks-test.myshopify.com/products/generic-toys-item-10', 'Generic Toys Item 10', NULL, NULL, NULL, 272.00, 326.40, 'USD', 81, 1, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-16 19:36:44', 'gid://shopify/Collection/874372', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6991073921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_1Xxta8UB2Kep', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4527297738', 'SHOPIFY-CLO-025', 'https://my-store.myshopify.com/products/techgiant-clothing-item-25', 'TechGiant Clothing Item 25', NULL, NULL, NULL, 169.00, 202.80, 'USD', 36, 5, 1, 1, 'active', 'synced', '2026-01-22 17:51:44', NULL, 1, '2026-01-16 19:36:44', 'gid://shopify/Collection/939508', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6694279816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_1zqUU3p9kQ33', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2164386054', 'SHOPIFY-TOY-009', 'https://my-store.myshopify.com/products/speedy-toys-item-9', 'Speedy Toys Item 9', NULL, NULL, NULL, 142.00, 170.40, 'USD', 19, 7, 1, 1, 'paused', 'synced', '2026-01-22 18:26:45', NULL, 1, '2026-01-16 19:36:45', 'gid://shopify/Collection/859891', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 8812856134, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_21127006b36ac48a', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:00:51', '2026-01-22 21:00:51', NULL),
('lst_279s3v7XkeMv', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2556389244', 'SHOPIFY-ELE-006', 'https://my-store.myshopify.com/products/speedy-electronics-item-6', 'Speedy Electronics Item 6', NULL, NULL, NULL, 184.00, 220.80, 'USD', 12, 4, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-17 19:36:43', 'gid://shopify/Collection/674680', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5819467921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_2920d6ec51aaa79b', 1, 1, 'CH_003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 20:14:17', '2026-01-22 20:14:17', NULL),
('lst_2dLQEVqbpigA', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8792517805', 'SHOPIFY-ELE-024', 'https://my-store.myshopify.com/products/premiumbrand-electronics-item-24', 'PremiumBrand Electronics Item 24', NULL, NULL, NULL, 290.00, 348.00, 'USD', 14, 4, 4, 1, 'pending', 'synced', '2026-01-22 18:34:39', NULL, 0, NULL, 'gid://shopify/Collection/143631', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 1328101457, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_2FHoXPnAFiFM', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8538976321', 'SHOPIFY-CLO-020', 'https://outlet.myshopify.com/products/generic-clothing-item-20', 'Generic Clothing Item 20', NULL, NULL, NULL, 181.00, 217.20, 'USD', 49, 5, 5, 1, 'error', 'synced', '2026-01-22 17:42:44', NULL, 0, NULL, 'gid://shopify/Collection/134770', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 6950582016, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_2IJNYXJPDqnx', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8271642945', 'SHOPIFY-ELE-002', 'https://my-store.myshopify.com/products/techgiant-electronics-item-2', 'TechGiant Electronics Item 2', NULL, NULL, NULL, 202.00, 242.40, 'USD', 56, 10, 4, 1, 'error', 'synced', '2026-01-22 17:57:44', NULL, 0, NULL, 'gid://shopify/Collection/707959', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7390406486, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_2u9K1OFt04dW', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/7809747087', 'SHOPIFY-CLO-015', 'https://outlet.myshopify.com/products/techgiant-clothing-item-15', 'TechGiant Clothing Item 15', NULL, NULL, NULL, 103.00, 123.60, 'USD', 35, 1, 4, 1, 'pending', 'synced', '2026-01-22 17:39:44', NULL, 0, NULL, 'gid://shopify/Collection/486123', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 7391172006, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_31MKVRzGtOpu', 1, NULL, 'CH_001', 'gid://shopify/Product/9866755560', 'SHOPIFY-HOM-009', 'https://wemonks-test.myshopify.com/products/premiumbrand-home-garden-item-9', 'PremiumBrand Home & Garden Item 9', NULL, NULL, NULL, 101.00, 121.20, 'USD', 53, 7, 0, 1, 'active', 'synced', '2026-01-22 17:49:45', NULL, 1, '2026-01-13 19:36:45', 'gid://shopify/Collection/846954', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 7721435113, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_33Yloai6RdmV', 1, NULL, 'CH_001', 'gid://shopify/Product/7653048287', 'SHOPIFY-TOY-023', 'https://wemonks-test.myshopify.com/products/premiumbrand-toys-item-23', 'PremiumBrand Toys Item 23', NULL, NULL, NULL, 282.00, 338.40, 'USD', 71, 3, 2, 1, 'active', 'synced', '2026-01-22 17:43:44', NULL, 1, '2026-01-11 19:36:44', 'gid://shopify/Collection/328302', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 7443455361, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:44', NULL),
('lst_39jy2ajImsMS', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/1212319392', 'SHOPIFY-SPO-024', 'https://outlet.myshopify.com/products/premiumbrand-sports-item-24', 'PremiumBrand Sports Item 24', NULL, NULL, NULL, 182.00, 218.40, 'USD', 16, 6, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-18 19:36:42', 'gid://shopify/Collection/965024', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4927976650, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_3c0K4BY4R3mG', 1, NULL, 'CH_001', 'gid://shopify/Product/7359851481', 'SHOPIFY-SPO-018', 'https://wemonks-test.myshopify.com/products/premiumbrand-sports-item-18', 'PremiumBrand Sports Item 18', NULL, NULL, NULL, 209.00, 250.80, 'USD', 56, 5, 1, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/263145', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 2259027665, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_3H001VuUgnRQ', 1, NULL, 'CH_001', 'gid://shopify/Product/4387248316', 'SHOPIFY-CLO-024', 'https://wemonks-test.myshopify.com/products/speedy-clothing-item-24', 'Speedy Clothing Item 24', NULL, NULL, NULL, 175.00, 210.00, 'USD', 53, 6, 0, 1, 'draft', 'synced', '2026-01-22 19:15:45', NULL, 0, NULL, 'gid://shopify/Collection/616208', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 8441661960, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_3IqC3X5HhR5u', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8026670442', 'SHOPIFY-TOY-014', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-14', 'PremiumBrand Toys Item 14', NULL, NULL, NULL, 249.00, 298.80, 'USD', 46, 8, 0, 1, 'paused', 'synced', '2026-01-22 19:10:41', NULL, 1, '2026-01-20 19:36:41', 'gid://shopify/Collection/659116', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 2530572154, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_3pmQdeyUNA2W', 1, NULL, 'CH_001', 'gid://shopify/Product/1342722630', 'SHOPIFY-ELE-014', 'https://wemonks-test.myshopify.com/products/speedy-electronics-item-14', 'Speedy Electronics Item 14', NULL, NULL, NULL, 125.00, 150.00, 'USD', 51, 7, 0, 1, 'active', 'synced', '2026-01-22 18:02:45', NULL, 1, '2025-12-27 19:36:45', 'gid://shopify/Collection/664328', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 8622969261, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_3qYu2O6xkXA7', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2657398296', 'SHOPIFY-SPO-009', 'https://my-store.myshopify.com/products/ecolife-sports-item-9', 'EcoLife Sports Item 9', NULL, NULL, NULL, 300.00, 360.00, 'USD', 49, 8, 1, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/190467', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 1040703478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_3RjK9hFXkUBn', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/3074364048', 'SHOPIFY-SPO-025', 'https://my-store.myshopify.com/products/generic-sports-item-25', 'Generic Sports Item 25', NULL, NULL, NULL, 245.00, 294.00, 'USD', 70, 7, 4, 1, 'active', 'synced', '2026-01-22 18:27:42', NULL, 1, '2025-12-25 19:36:42', 'gid://shopify/Collection/753359', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 4153094542, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_400wuiYGKi56', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2970001682', 'SHOPIFY-TOY-002', 'https://main-store.myshopify.com/products/generic-toys-item-2', 'Generic Toys Item 2', NULL, NULL, NULL, 277.00, 332.40, 'USD', 78, 2, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/444786', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 8239632713, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_4C616Zk6guC4', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5520197132', 'SHOPIFY-TOY-002', 'https://my-store.myshopify.com/products/generic-toys-item-2', 'Generic Toys Item 2', NULL, NULL, NULL, 277.00, 332.40, 'USD', 18, 10, 1, 1, 'active', 'error', NULL, NULL, 1, '2025-12-23 19:36:45', 'gid://shopify/Collection/334089', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 8239632713, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_4Gq7Hj8lziRs', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/6033718282', 'SHOPIFY-ELE-003', 'https://outlet.myshopify.com/products/generic-electronics-item-3', 'Generic Electronics Item 3', NULL, NULL, NULL, 150.00, 180.00, 'USD', 65, 1, 1, 1, 'active', 'synced', '2026-01-22 19:10:41', NULL, 1, '2025-12-24 19:36:41', 'gid://shopify/Collection/971600', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2390461105, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_4jcNW2v6WyKv', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3620196137', 'SHOPIFY-ELE-022', 'https://my-store.myshopify.com/products/ecolife-electronics-item-22', 'EcoLife Electronics Item 22', NULL, NULL, NULL, 247.00, 296.40, 'USD', 74, 0, 4, 1, 'error', 'synced', '2026-01-22 18:05:40', NULL, 0, NULL, 'gid://shopify/Collection/844268', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 1649019816, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_4n6td1ugPk0Y', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/3197569178', 'SHOPIFY-SPO-015', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-15', 'PremiumBrand Sports Item 15', NULL, NULL, NULL, 111.00, 133.20, 'USD', 84, 2, 2, 1, 'pending', 'synced', '2026-01-22 18:13:43', NULL, 0, NULL, 'gid://shopify/Collection/760476', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 5845138823, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_4wdmD813Gc5q', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6873203839', 'SHOPIFY-ELE-023', 'https://my-store.myshopify.com/products/ecolife-electronics-item-23', 'EcoLife Electronics Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 25, 6, 4, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/411635', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 1450261977, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_4Y78s9TP0ezw', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/1329463424', 'SHOPIFY-HOM-016', 'https://outlet.myshopify.com/products/techgiant-home-garden-item-16', 'TechGiant Home & Garden Item 16', NULL, NULL, NULL, 153.00, 183.60, 'USD', 99, 8, 5, 1, 'error', 'synced', '2026-01-22 18:19:45', NULL, 0, NULL, 'gid://shopify/Collection/688905', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 9152769640, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_50PdUp5RaiFi', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8444517936', 'SHOPIFY-HOM-006', 'https://main-store.myshopify.com/products/generic-home-garden-item-6', 'Generic Home & Garden Item 6', NULL, NULL, NULL, 143.00, 171.60, 'USD', 80, 0, 2, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-01 19:36:42', 'gid://shopify/Collection/212775', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4161307707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_5C8iFFVDSWjH', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2845017879', 'SHOPIFY-CLO-017', 'https://main-store.myshopify.com/products/ecolife-clothing-item-17', 'EcoLife Clothing Item 17', NULL, NULL, NULL, 192.00, 230.40, 'USD', 76, 3, 1, 1, 'active', 'synced', '2026-01-22 17:38:45', NULL, 1, '2026-01-21 19:36:45', 'gid://shopify/Collection/481675', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7710154815, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_5EmLilc9fgmg', 1, NULL, 'CH_001', 'gid://shopify/Product/3227665439', 'SHOPIFY-CLO-017', 'https://wemonks-test.myshopify.com/products/ecolife-clothing-item-17', 'EcoLife Clothing Item 17', NULL, NULL, NULL, 192.00, 230.40, 'USD', 27, 7, 5, 1, 'pending', 'synced', '2026-01-22 19:31:45', NULL, 0, NULL, 'gid://shopify/Collection/773896', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 7710154815, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_5eSuzRNkUHKS', 1, NULL, 'CH_001', 'gid://shopify/Product/7360345525', 'SHOPIFY-TOY-007', 'https://wemonks-test.myshopify.com/products/ecolife-toys-item-7', 'EcoLife Toys Item 7', NULL, NULL, NULL, 290.00, 348.00, 'USD', 35, 8, 1, 1, 'active', 'error', NULL, NULL, 1, '2026-01-09 19:36:41', 'gid://shopify/Collection/958580', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 3149329870, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_5KDfiatK6mfU', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3565258288', 'SHOPIFY-SPO-023', 'https://outlet.myshopify.com/products/generic-sports-item-23', 'Generic Sports Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 21, 3, 0, 1, 'paused', 'synced', '2026-01-22 19:07:45', NULL, 1, '2026-01-19 19:36:45', 'gid://shopify/Collection/803884', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 8337904751, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_5qhgHQvtVUjE', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8932397242', 'SHOPIFY-SPO-024', 'https://main-store.myshopify.com/products/premiumbrand-sports-item-24', 'PremiumBrand Sports Item 24', NULL, NULL, NULL, 182.00, 218.40, 'USD', 57, 7, 3, 1, 'active', 'error', NULL, NULL, 1, '2026-01-14 19:36:42', 'gid://shopify/Collection/844026', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 4927976650, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_5va939kguzUI', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4182494205', 'SHOPIFY-HOM-012', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-12', 'TechGiant Home & Garden Item 12', NULL, NULL, NULL, 292.00, 350.40, 'USD', 68, 1, 2, 1, 'active', 'synced', '2026-01-22 18:33:42', NULL, 1, '2026-01-19 19:36:42', 'gid://shopify/Collection/363281', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 3161539957, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_5xvojTZgGt65', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7803039655', 'SHOPIFY-ELE-014', 'https://my-store.myshopify.com/products/speedy-electronics-item-14', 'Speedy Electronics Item 14', NULL, NULL, NULL, 125.00, 150.00, 'USD', 26, 3, 5, 1, 'error', 'synced', '2026-01-22 17:58:45', NULL, 0, NULL, 'gid://shopify/Collection/392238', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 8622969261, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_61V3zG3A6cio', 1, NULL, 'CH_001', 'gid://shopify/Product/7116444313', 'SHOPIFY-SPO-003', 'https://wemonks-test.myshopify.com/products/speedy-sports-item-3', 'Speedy Sports Item 3', NULL, NULL, NULL, 294.00, 352.80, 'USD', 45, 8, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-12 19:36:44', 'gid://shopify/Collection/241720', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 6458516504, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:44', NULL),
('lst_63fa8ee6102b102d', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 1450261977, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:00:54', '2026-01-22 21:00:54', NULL),
('lst_63NhSP6mO6IJ', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4122213550', 'SHOPIFY-ELE-008', 'https://main-store.myshopify.com/products/premiumbrand-electronics-item-8', 'PremiumBrand Electronics Item 8', NULL, NULL, NULL, 232.00, 278.40, 'USD', 95, 7, 1, 1, 'active', 'synced', '2026-01-22 17:53:43', NULL, 1, '2025-12-23 19:36:43', 'gid://shopify/Collection/916319', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4928798305, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_686af40a6199a3e8', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:00:46', '2026-01-22 21:00:46', NULL),
('lst_6B6oZYHCQi4u', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/8038023357', 'SHOPIFY-SPO-006', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6', NULL, NULL, NULL, 168.00, 201.60, 'USD', 63, 0, 5, 1, 'active', 'synced', '2026-01-22 18:53:43', NULL, 1, '2025-12-29 19:36:43', 'gid://shopify/Collection/655921', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 6400266186, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_6g18Ea7cexii', 1, NULL, 'ch_etsy_hyy1aO8e', '264577105', 'ETSY-HOM-006', 'https://www.etsy.com/listing/242744133/generic-home-garden-item-6', 'Generic Home & Garden Item 6 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 164.45, 197.34, 'USD', 57, 1, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-19 19:29:20', 'category_574', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\", \"artisan\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 4161307707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_6X2b90vBYIyx', 1, NULL, 'CH_001', 'gid://shopify/Product/9606966355', 'SHOPIFY-HOM-015', 'https://wemonks-test.myshopify.com/products/generic-home-garden-item-15', 'Generic Home & Garden Item 15', NULL, NULL, NULL, 229.00, 274.80, 'USD', 66, 0, 1, 1, 'active', 'synced', '2026-01-22 18:28:44', NULL, 1, '2026-01-03 19:36:44', 'gid://shopify/Collection/336908', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 6700392339, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:44', NULL),
('lst_6yPgpihUFBdR', 1, NULL, 'ch_amazon_KJ2mzh6e', 'BA0FG8TGVX', 'AMAZON-SPO-003', 'https://www.amazon.com/dp/B27GKWJCYE', 'Speedy Sports Item 3 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 279.30, 335.16, 'USD', 34, 3, 3, 1, 'pending', 'synced', '2026-01-22 18:25:44', NULL, 0, NULL, 'electronics_8130', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 6458516504, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_76pptfZuGW1W', 1, NULL, 'CH_001', 'gid://shopify/Product/4936074521', 'SHOPIFY-SPO-021', 'https://wemonks-test.myshopify.com/products/ecolife-sports-item-21', 'EcoLife Sports Item 21', NULL, NULL, NULL, 212.00, 254.40, 'USD', 28, 10, 3, 1, 'active', 'synced', '2026-01-22 18:02:42', NULL, 1, '2026-01-19 19:36:42', 'gid://shopify/Collection/524701', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 4708892562, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_77ZFenlCh1IA', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6214197603', 'SHOPIFY-SPO-003', 'https://my-store.myshopify.com/products/speedy-sports-item-3', 'Speedy Sports Item 3', NULL, NULL, NULL, 294.00, 352.80, 'USD', 30, 3, 3, 1, 'paused', 'synced', '2026-01-22 17:48:44', NULL, 1, '2026-01-11 19:36:44', 'gid://shopify/Collection/304177', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 6458516504, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_78735d0ee97a3a6f', 1, 1, 'CH_003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 20:14:16', '2026-01-22 20:14:16', NULL),
('lst_7irFqMkb7FW8', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9371850232', 'SHOPIFY-TOY-021', 'https://outlet.myshopify.com/products/ecolife-toys-item-21', 'EcoLife Toys Item 21', NULL, NULL, NULL, 213.00, 255.60, 'USD', 90, 5, 3, 1, 'draft', 'synced', '2026-01-22 18:09:44', NULL, 0, NULL, 'gid://shopify/Collection/407040', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7590524661, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_7j1GCnJUBS2d', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6714534776', 'SHOPIFY-CLO-022', 'https://my-store.myshopify.com/products/ecolife-clothing-item-22', 'EcoLife Clothing Item 22', NULL, NULL, NULL, 267.00, 320.40, 'USD', 51, 9, 0, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-21 19:36:41', 'gid://shopify/Collection/960444', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2745553505, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_7NlNcZbpee8K', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/3758012092', 'SHOPIFY-HOM-005', 'https://my-store.myshopify.com/products/premiumbrand-home-garden-item-5', 'PremiumBrand Home & Garden Item 5', NULL, NULL, NULL, 296.00, 355.20, 'USD', 68, 9, 1, 1, 'active', 'synced', '2026-01-22 18:45:41', NULL, 1, '2026-01-14 19:36:41', 'gid://shopify/Collection/915188', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 2110471872, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_7SmslMmFfzQ1', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5900589743', 'SHOPIFY-TOY-023', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-23', 'PremiumBrand Toys Item 23', NULL, NULL, NULL, 282.00, 338.40, 'USD', 79, 0, 5, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-25 19:36:44', 'gid://shopify/Collection/744574', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 7443455361, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_7TJmfd53gP7T', 1, NULL, 'ch_ebay_Ce8BlzeT', '249780244289', 'EBAY-SPO-018', 'https://www.ebay.com/itm/344268178374', 'NEW PremiumBrand Sports Item 18 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 219.45, 263.34, 'USD', 54, 4, 3, 1, 'active', 'synced', '2026-01-22 19:03:41', NULL, 1, '2025-12-28 19:36:41', '48710', NULL, '[\"new-arrival\", \"fast-n-free\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 2259027665, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_7XUFilHMHGWg', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2128021824', 'SHOPIFY-TOY-016', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-16', 'PremiumBrand Toys Item 16', NULL, NULL, NULL, 103.00, 123.60, 'USD', 12, 2, 0, 1, 'active', 'error', NULL, NULL, 1, '2025-12-25 19:36:43', 'gid://shopify/Collection/226809', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 5083021107, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_7Yfm7YBj9Msd', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/3663255549', 'SHOPIFY-TOY-023', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-23', 'PremiumBrand Toys Item 23', NULL, NULL, NULL, 282.00, 338.40, 'USD', 10, 3, 3, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/995685', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7443455361, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_7yvvnBCoMVbZ', 1, NULL, 'CH_002', 'BTPPA1VHWY', 'AMAZON-TSHIRT-001', 'https://www.amazon.com/dp/BZTM74DUA5', 'Classic White T-Shirt - Premium Quality | Fast Shipping', NULL, NULL, NULL, 14.25, 17.10, 'USD', 62, 8, 5, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'electronics_2737', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5580469046, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('lst_83YIcvHZGrka', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5514414210', 'SHOPIFY-SPO-013', 'https://my-store.myshopify.com/products/ecolife-sports-item-13', 'EcoLife Sports Item 13', NULL, NULL, NULL, 204.00, 244.80, 'USD', 80, 1, 3, 1, 'error', 'synced', '2026-01-22 18:39:43', NULL, 0, NULL, 'gid://shopify/Collection/899844', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5383015778, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_8832bbf51fddb427', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:47', '2026-01-22 19:53:47', NULL),
('lst_89tzCIu8AT2p', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2211541443', 'SHOPIFY-TSHIRT-001', 'https://my-store.myshopify.com/products/classic-white-t-shirt', 'Classic White T-Shirt', NULL, NULL, NULL, 15.00, 18.00, 'USD', 29, 1, 1, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-08 19:36:43', 'gid://shopify/Collection/621973', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 5580469046, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_8Dxq5HpG5Kou', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1480157490', 'SHOPIFY-SPO-008', 'https://my-store.myshopify.com/products/ecolife-sports-item-8', 'EcoLife Sports Item 8', NULL, NULL, NULL, 101.00, 121.20, 'USD', 24, 7, 4, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-17 19:36:43', 'gid://shopify/Collection/889675', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4985216591, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_8OtwNFqjQncw', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9512762620', 'SHOPIFY-TOY-023', 'https://main-store.myshopify.com/products/premiumbrand-toys-item-23', 'PremiumBrand Toys Item 23', NULL, NULL, NULL, 282.00, 338.40, 'USD', 70, 9, 0, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-16 19:36:44', 'gid://shopify/Collection/653767', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 7443455361, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_8qUhaGiEzlGF', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/9336437901', 'SHOPIFY-ELE-008', 'https://my-store.myshopify.com/products/premiumbrand-electronics-item-8', 'PremiumBrand Electronics Item 8', NULL, NULL, NULL, 232.00, 278.40, 'USD', 70, 5, 5, 1, 'active', 'synced', '2026-01-22 18:43:43', NULL, 1, '2026-01-04 19:36:43', 'gid://shopify/Collection/755508', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 4928798305, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_9a98Fm51OGMb', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/5594214449', 'SHOPIFY-CLO-022', 'https://main-store.myshopify.com/products/ecolife-clothing-item-22', 'EcoLife Clothing Item 22', NULL, NULL, NULL, 267.00, 320.40, 'USD', 98, 2, 0, 1, 'draft', 'synced', '2026-01-22 17:40:41', NULL, 0, NULL, 'gid://shopify/Collection/182055', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 2745553505, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_9e0P5nYeI8uz', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5740182468', 'SHOPIFY-ELE-020', 'https://outlet.myshopify.com/products/techgiant-electronics-item-20', 'TechGiant Electronics Item 20', NULL, NULL, NULL, 183.00, 219.60, 'USD', 58, 7, 0, 1, 'pending', 'synced', '2026-01-22 19:14:40', NULL, 0, NULL, 'gid://shopify/Collection/857432', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2074962829, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_9h1eYHWsxKPC', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4813584970', 'SHOPIFY-TOY-010', 'https://my-store.myshopify.com/products/generic-toys-item-10', 'Generic Toys Item 10', NULL, NULL, NULL, 272.00, 326.40, 'USD', 33, 4, 2, 1, 'active', 'synced', '2026-01-22 18:26:44', NULL, 1, '2025-12-23 19:36:44', 'gid://shopify/Collection/988933', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 6991073921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_9hdw3x95vGks', 1, NULL, 'ch_ebay_3DDjxBNa', '389208041117', 'EBAY-SPO-008', 'https://www.ebay.com/itm/494516454522', 'NEW EcoLife Sports Item 8 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 106.05, 127.26, 'USD', 84, 1, 1, 1, 'pending', 'synced', '2026-01-22 18:24:20', NULL, 0, NULL, '82565', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\", \"top-rated\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4985216591, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_a06de32aaf236543', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:50', '2026-01-22 19:53:50', NULL),
('lst_A2z306jUXTz0', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/4345868913', 'SHOPIFY-TOY-003', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-3', 'PremiumBrand Toys Item 3', NULL, NULL, NULL, 202.00, 242.40, 'USD', 19, 6, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-14 19:36:41', 'gid://shopify/Collection/340400', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 2946391230, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_a64bIaPL1fsB', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2668612403', 'SHOPIFY-CLO-017', 'https://outlet.myshopify.com/products/ecolife-clothing-item-17', 'EcoLife Clothing Item 17', NULL, NULL, NULL, 192.00, 230.40, 'USD', 51, 2, 4, 1, 'draft', 'synced', '2026-01-22 18:04:45', NULL, 0, NULL, 'gid://shopify/Collection/790924', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7710154815, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_A7al44I3nn4q', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8494987916', 'SHOPIFY-NIKE-AM-001', 'https://main-store.myshopify.com/products/nike-air-max', 'Nike Air Max', NULL, NULL, NULL, 120.00, 144.00, 'USD', 48, 0, 3, 1, 'draft', 'synced', '2026-01-22 18:39:42', NULL, 0, NULL, 'gid://shopify/Collection/170444', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_aaF8oLybYIgq', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5734906031', 'SHOPIFY-TOY-001', 'https://my-store.myshopify.com/products/ecolife-toys-item-1', 'EcoLife Toys Item 1', NULL, NULL, NULL, 239.00, 286.80, 'USD', 33, 9, 2, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-31 19:36:44', 'gid://shopify/Collection/988590', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 6405736263, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_AAnK5mV7elW2', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/9851653114', 'SHOPIFY-ELE-022', 'https://my-store.myshopify.com/products/ecolife-electronics-item-22', 'EcoLife Electronics Item 22', NULL, NULL, NULL, 247.00, 296.40, 'USD', 18, 0, 4, 1, 'active', 'synced', '2026-01-22 18:20:40', NULL, 1, '2026-01-19 19:36:40', 'gid://shopify/Collection/114465', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 1649019816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_aKhvFXN8aJOw', 1, NULL, 'ch_ebay_Ce8BlzeT', '820237637274', 'EBAY-CLO-022', 'https://www.ebay.com/itm/510813711804', 'NEW EcoLife Clothing Item 22 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 280.35, 336.42, 'USD', 53, 8, 0, 1, 'active', 'error', NULL, NULL, 1, '2026-01-21 19:36:41', '69911', NULL, '[\"new-arrival\", \"fast-n-free\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 2745553505, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_AlC55LOLIHWn', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2920587926', 'SHOPIFY-CLO-025', 'https://main-store.myshopify.com/products/techgiant-clothing-item-25', 'TechGiant Clothing Item 25', NULL, NULL, NULL, 169.00, 202.80, 'USD', 45, 8, 1, 1, 'active', 'error', NULL, NULL, 1, '2025-12-29 19:36:44', 'gid://shopify/Collection/101039', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 6694279816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_ALESYksUHmBw', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2494869802', 'SHOPIFY-SPO-015', 'https://main-store.myshopify.com/products/premiumbrand-sports-item-15', 'PremiumBrand Sports Item 15', NULL, NULL, NULL, 111.00, 133.20, 'USD', 69, 9, 5, 1, 'active', 'synced', '2026-01-22 19:15:43', NULL, 1, '2026-01-17 19:36:43', 'gid://shopify/Collection/736613', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 5845138823, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_ALl8rpOL24eH', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3533155678', 'SHOPIFY-CLO-004', 'https://outlet.myshopify.com/products/speedy-clothing-item-4', 'Speedy Clothing Item 4', NULL, NULL, NULL, 174.00, 208.80, 'USD', 21, 0, 1, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-18 19:36:43', 'gid://shopify/Collection/123902', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 5732917962, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_AMZRGrI36T40', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/9449334699', 'SHOPIFY-ELE-004', 'https://my-store.myshopify.com/products/generic-electronics-item-4', 'Generic Electronics Item 4', NULL, NULL, NULL, 121.00, 145.20, 'USD', 84, 5, 4, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-25 19:36:43', 'gid://shopify/Collection/461822', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5083470229, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_ApesmFtCxKKI', 1, NULL, 'ch_etsy_djY2iiTV', '658461754', 'ETSY-SPO-006', 'https://www.etsy.com/listing/161947679/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 193.20, 231.84, 'USD', 80, 5, 3, 1, 'active', 'synced', '2026-01-22 18:39:43', NULL, 1, '2026-01-04 19:36:43', 'category_888', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 6400266186, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_aRvTEpIx6Xrj', 1, NULL, 'CH_001', 'gid://shopify/Product/5889407224', 'SHOPIFY-ELE-018', 'https://wemonks-test.myshopify.com/products/techgiant-electronics-item-18', 'TechGiant Electronics Item 18', NULL, NULL, NULL, 275.00, 330.00, 'USD', 80, 9, 0, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-28 19:36:41', 'gid://shopify/Collection/777942', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 3010326362, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL);
INSERT INTO `listings` (`listing_id`, `company_id`, `created_by_id`, `channel_id`, `marketplace_id`, `marketplace_sku`, `listing_url`, `title_override`, `description_override`, `short_description_override`, `features_override`, `price_override`, `compare_at_price`, `currency`, `quantity_allocated`, `quantity_reserved`, `buffer_quantity`, `sync_quantity`, `status`, `sync_status`, `last_synced_at`, `sync_error`, `is_published`, `published_at`, `category_id`, `product_type`, `tags`, `inventory_policy`, `is_taxable`, `shipping_template_id`, `return_policy_id`, `custom_attributes`, `stock_item_id`, `variant_id`, `mapped_attributes`, `is_linked`, `created_by`, `updated_by`, `version`, `created_at`, `updated_at`, `deleted_at`) VALUES
('lst_avvyBRAZrCxn', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/7663830113', 'SHOPIFY-CLO-012', 'https://main-store.myshopify.com/products/speedy-clothing-item-12', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 56, 5, 0, 1, 'active', 'synced', '2026-01-22 17:42:44', NULL, 1, '2026-01-14 19:36:44', 'gid://shopify/Collection/299384', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 6817690120, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_aXOcDQwodrnT', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5376609040', 'SHOPIFY-CLO-017', 'https://my-store.myshopify.com/products/ecolife-clothing-item-17', 'EcoLife Clothing Item 17', NULL, NULL, NULL, 192.00, 230.40, 'USD', 26, 2, 4, 1, 'active', 'synced', '2026-01-22 18:54:45', NULL, 1, '2026-01-13 19:36:45', 'gid://shopify/Collection/533776', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7710154815, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_aZYuMhW9LA54', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/6018331847', 'SHOPIFY-TOY-022', 'https://my-store.myshopify.com/products/techgiant-toys-item-22', 'TechGiant Toys Item 22', NULL, NULL, NULL, 282.00, 338.40, 'USD', 87, 5, 3, 1, 'error', 'synced', '2026-01-22 17:51:40', NULL, 0, NULL, 'gid://shopify/Collection/103258', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 1686068420, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_b059bea25c0e27d0', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4740661352, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:00:59', '2026-01-22 21:00:59', NULL),
('lst_b4hrFKjIaLNe', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8808944542', 'SHOPIFY-SPO-006', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6', NULL, NULL, NULL, 168.00, 201.60, 'USD', 85, 6, 4, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/948427', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6400266186, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_ba9ff50f94faec3f', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 5736782992, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:01:10', '2026-01-22 21:01:10', NULL),
('lst_BcjbmYKyhEwO', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/5542428553', 'SHOPIFY-CLO-021', 'https://main-store.myshopify.com/products/speedy-clothing-item-21', 'Speedy Clothing Item 21', NULL, NULL, NULL, 104.00, 124.80, 'USD', 39, 3, 4, 1, 'paused', 'synced', '2026-01-22 17:49:44', NULL, 1, '2026-01-10 19:36:44', 'gid://shopify/Collection/863868', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 6776571785, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_bDi0SXERz1HY', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8584331878', 'SHOPIFY-TOY-016', 'https://outlet.myshopify.com/products/premiumbrand-toys-item-16', 'PremiumBrand Toys Item 16', NULL, NULL, NULL, 103.00, 123.60, 'USD', 11, 2, 3, 1, 'active', 'error', NULL, NULL, 1, '2026-01-08 19:36:43', 'gid://shopify/Collection/515515', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 5083021107, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_BLjMvJHmuv5l', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8825341196', 'SHOPIFY-CLO-020', 'https://my-store.myshopify.com/products/generic-clothing-item-20', 'Generic Clothing Item 20', NULL, NULL, NULL, 181.00, 217.20, 'USD', 19, 1, 4, 1, 'active', 'synced', '2026-01-22 19:19:44', NULL, 1, '2026-01-08 19:36:44', 'gid://shopify/Collection/576639', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 6950582016, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_BOOoCS6Z9Iu8', 1, NULL, 'ch_walmart_dDEBQW2h', 'WM543546187', 'WALMART-HOM-009', 'https://www.walmart.com/ip/premiumbrand-home-garden-item-9/258003083', 'PremiumBrand Home & Garden Item 9 - Best Value', NULL, NULL, NULL, 101.00, 121.20, 'USD', 78, 5, 5, 1, 'error', 'synced', '2026-01-22 17:49:21', NULL, 0, NULL, 'cat_34755', NULL, '[\"new-arrival\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 7721435113, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_BsDMCXz1DbcN', 1, NULL, 'ch_ebay_Ce8BlzeT', '506116178315', 'EBAY-NIKE-AM-001', 'https://www.ebay.com/itm/186022590810', 'NEW Nike Air Max - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 126.00, 151.20, 'USD', 42, 2, 5, 1, 'draft', 'error', NULL, 'Sample sync error: API rate limit exceeded', 0, NULL, '81149', NULL, '[\"new-arrival\", \"fast-n-free\", \"top-rated\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('lst_bV3z4GO9xznR', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1539739419', 'SHOPIFY-TSHIRT-001', 'https://my-store.myshopify.com/products/classic-white-t-shirt', 'Classic White T-Shirt', NULL, NULL, NULL, 15.00, 18.00, 'USD', 67, 10, 2, 1, 'active', 'error', NULL, NULL, 1, '2025-12-31 19:36:43', 'gid://shopify/Collection/105920', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 5580469046, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_bxvafby97vSs', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1731430190', 'SHOPIFY-SPO-009', 'https://my-store.myshopify.com/products/ecolife-sports-item-9', 'EcoLife Sports Item 9', NULL, NULL, NULL, 300.00, 360.00, 'USD', 15, 10, 0, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/475018', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 1040703478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_Bzqdy9R3s0kb', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1382197590', 'SHOPIFY-HOM-015', 'https://my-store.myshopify.com/products/generic-home-garden-item-15', 'Generic Home & Garden Item 15', NULL, NULL, NULL, 229.00, 274.80, 'USD', 55, 4, 5, 1, 'error', 'synced', '2026-01-22 19:21:44', NULL, 0, NULL, 'gid://shopify/Collection/567681', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 6700392339, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_c18a545ed8e189dc', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 2074962829, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:01:05', '2026-01-22 21:01:05', NULL),
('lst_CaE2KEQ5UQ4P', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4996374452', 'SHOPIFY-SPO-024', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-24', 'PremiumBrand Sports Item 24', NULL, NULL, NULL, 182.00, 218.40, 'USD', 23, 10, 3, 1, 'active', 'error', NULL, NULL, 1, '2026-01-20 19:36:42', 'gid://shopify/Collection/337400', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4927976650, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_cbYF8Ak2xqA9', 1, NULL, 'ch_etsy_FZznEBGl', '238343036', 'ETSY-HOM-015', 'https://www.etsy.com/listing/818723106/generic-home-garden-item-15', 'Generic Home & Garden Item 15 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 263.35, 316.02, 'USD', 62, 8, 4, 1, 'active', 'synced', '2026-01-22 18:00:20', NULL, 1, '2026-01-14 19:29:20', 'category_829', NULL, '[\"new-arrival\", \"handmade\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 6700392339, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_CGiIIRQRVncx', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8419873964', 'SHOPIFY-SPO-013', 'https://my-store.myshopify.com/products/ecolife-sports-item-13', 'EcoLife Sports Item 13', NULL, NULL, NULL, 204.00, 244.80, 'USD', 99, 3, 1, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-24 19:36:43', 'gid://shopify/Collection/310852', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 5383015778, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_CgKtyIGwaHfy', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/8927586904', 'SHOPIFY-SPO-018', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-18', 'PremiumBrand Sports Item 18', NULL, NULL, NULL, 209.00, 250.80, 'USD', 23, 8, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-10 19:36:41', 'gid://shopify/Collection/554244', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 2259027665, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_cHcgmyge61Fg', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1852848140', 'SHOPIFY-ELE-023', 'https://my-store.myshopify.com/products/ecolife-electronics-item-23', 'EcoLife Electronics Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 89, 7, 1, 1, 'pending', 'synced', '2026-01-22 18:14:40', NULL, 0, NULL, 'gid://shopify/Collection/830334', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 1450261977, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_cHNpU6OGb4qf', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3805177360', 'SHOPIFY-HOM-001', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-1', 'TechGiant Home & Garden Item 1', NULL, NULL, NULL, 147.00, 176.40, 'USD', 100, 5, 3, 1, 'error', 'synced', '2026-01-22 19:03:41', NULL, 0, NULL, 'gid://shopify/Collection/795556', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 3066199103, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_cLv4B8FTqany', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/7380687220', 'SHOPIFY-ELE-008', 'https://outlet.myshopify.com/products/premiumbrand-electronics-item-8', 'PremiumBrand Electronics Item 8', NULL, NULL, NULL, 232.00, 278.40, 'USD', 83, 5, 0, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-24 19:36:43', 'gid://shopify/Collection/438873', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 4928798305, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_CnQvN1pa1p9N', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/8791293290', 'SHOPIFY-SPO-011', 'https://my-store.myshopify.com/products/generic-sports-item-11', 'Generic Sports Item 11', NULL, NULL, NULL, 262.00, 314.40, 'USD', 83, 1, 2, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/956874', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 8712397485, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_CSeho42I6O0b', 1, NULL, 'CH_001', 'gid://shopify/Product/6604851861', 'SHOPIFY-ELE-022', 'https://wemonks-test.myshopify.com/products/ecolife-electronics-item-22', 'EcoLife Electronics Item 22', NULL, NULL, NULL, 247.00, 296.40, 'USD', 21, 9, 5, 1, 'active', 'synced', '2026-01-22 19:23:40', NULL, 1, '2025-12-29 19:36:40', 'gid://shopify/Collection/773094', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 1649019816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_CtFYCIe0m86Q', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5316748599', 'SHOPIFY-SPO-010', 'https://outlet.myshopify.com/products/techgiant-sports-item-10', 'TechGiant Sports Item 10', NULL, NULL, NULL, 178.00, 213.60, 'USD', 55, 10, 0, 1, 'active', 'synced', '2026-01-22 19:13:43', NULL, 1, '2025-12-25 19:36:43', 'gid://shopify/Collection/438342', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 5800114824, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_CVhq4F0xfXzo', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3268910348', 'SHOPIFY-SPO-013', 'https://my-store.myshopify.com/products/ecolife-sports-item-13', 'EcoLife Sports Item 13', NULL, NULL, NULL, 204.00, 244.80, 'USD', 79, 0, 3, 1, 'active', 'synced', '2026-01-22 18:29:43', NULL, 1, '2025-12-31 19:36:43', 'gid://shopify/Collection/607700', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5383015778, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_CYFVJCOY4ywU', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5397234824', 'SHOPIFY-ELE-020', 'https://my-store.myshopify.com/products/techgiant-electronics-item-20', 'TechGiant Electronics Item 20', NULL, NULL, NULL, 183.00, 219.60, 'USD', 86, 5, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-21 19:36:40', 'gid://shopify/Collection/968037', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 2074962829, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_cZ1WKjNawimd', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1082177446', 'SHOPIFY-ELE-008', 'https://my-store.myshopify.com/products/premiumbrand-electronics-item-8', 'PremiumBrand Electronics Item 8', NULL, NULL, NULL, 232.00, 278.40, 'USD', 79, 8, 1, 1, 'active', 'synced', '2026-01-22 18:58:43', NULL, 1, '2026-01-15 19:36:43', 'gid://shopify/Collection/925721', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 4928798305, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_czZ7x7xj3NuT', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4059713458', 'SHOPIFY-CLO-014', 'https://main-store.myshopify.com/products/ecolife-clothing-item-14', 'EcoLife Clothing Item 14', NULL, NULL, NULL, 208.00, 249.60, 'USD', 61, 7, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-18 19:36:45', 'gid://shopify/Collection/522693', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 9251079947, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_d97F8cTSNCMV', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/1928570166', 'SHOPIFY-ELE-012', 'https://outlet.myshopify.com/products/generic-electronics-item-12', 'Generic Electronics Item 12', NULL, NULL, NULL, 128.00, 153.60, 'USD', 51, 9, 3, 1, 'active', 'synced', '2026-01-22 18:45:41', NULL, 1, '2026-01-04 19:36:41', 'gid://shopify/Collection/897816', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 2431860707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_dAvAnZe0gUFL', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1267997501', 'SHOPIFY-ELE-003', 'https://my-store.myshopify.com/products/generic-electronics-item-3', 'Generic Electronics Item 3', NULL, NULL, NULL, 150.00, 180.00, 'USD', 62, 4, 5, 1, 'error', 'synced', '2026-01-22 19:27:41', NULL, 0, NULL, 'gid://shopify/Collection/474265', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 2390461105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_dc8vgjYxx8JU', 1, NULL, 'CH_001', 'gid://shopify/Product/4806837649', 'SHOPIFY-TOY-019', 'https://wemonks-test.myshopify.com/products/ecolife-toys-item-19', 'EcoLife Toys Item 19', NULL, NULL, NULL, 183.00, 219.60, 'USD', 65, 6, 5, 1, 'draft', 'synced', '2026-01-22 17:39:40', NULL, 0, NULL, 'gid://shopify/Collection/831936', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 2035094708, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:40', NULL),
('lst_DDEtFJNioW51', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5276425282', 'SHOPIFY-CLO-024', 'https://my-store.myshopify.com/products/speedy-clothing-item-24', 'Speedy Clothing Item 24', NULL, NULL, NULL, 175.00, 210.00, 'USD', 82, 6, 2, 1, 'error', 'synced', '2026-01-22 18:20:45', NULL, 0, NULL, 'gid://shopify/Collection/155872', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 8441661960, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_DgWbzZefvm3h', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/1811208106', 'SHOPIFY-CLO-014', 'https://my-store.myshopify.com/products/ecolife-clothing-item-14', 'EcoLife Clothing Item 14', NULL, NULL, NULL, 208.00, 249.60, 'USD', 52, 3, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-08 19:36:45', 'gid://shopify/Collection/428358', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 9251079947, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_DHQxj5gCDY7f', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6358204842', 'SHOPIFY-TOY-009', 'https://my-store.myshopify.com/products/speedy-toys-item-9', 'Speedy Toys Item 9', NULL, NULL, NULL, 142.00, 170.40, 'USD', 19, 8, 3, 1, 'active', 'error', NULL, NULL, 1, '2026-01-03 19:36:45', 'gid://shopify/Collection/575197', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 8812856134, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_DiGTfja87RkW', 1, NULL, 'ch_etsy_hyy1aO8e', '490573172', 'ETSY-TOY-009', 'https://www.etsy.com/listing/742987276/speedy-toys-item-9', 'Speedy Toys Item 9 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 163.30, 195.96, 'USD', 10, 2, 3, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-01 19:36:45', 'category_715', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\", \"artisan\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 8812856134, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_DKjPIeHF93Z1', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5089750381', 'SHOPIFY-ELE-002', 'https://my-store.myshopify.com/products/techgiant-electronics-item-2', 'TechGiant Electronics Item 2', NULL, NULL, NULL, 202.00, 242.40, 'USD', 24, 10, 1, 1, 'error', 'synced', '2026-01-22 18:12:44', NULL, 0, NULL, 'gid://shopify/Collection/772644', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 7390406486, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_dn3UbTlAUdDE', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2866579408', 'SHOPIFY-TOY-022', 'https://outlet.myshopify.com/products/techgiant-toys-item-22', 'TechGiant Toys Item 22', NULL, NULL, NULL, 282.00, 338.40, 'USD', 64, 4, 1, 1, 'active', 'synced', '2026-01-22 18:38:40', NULL, 1, '2026-01-21 19:36:40', 'gid://shopify/Collection/114153', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 1686068420, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_DP6OP3HB0u0s', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8673742793', 'SHOPIFY-CLO-025', 'https://my-store.myshopify.com/products/techgiant-clothing-item-25', 'TechGiant Clothing Item 25', NULL, NULL, NULL, 169.00, 202.80, 'USD', 79, 9, 1, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-17 19:36:44', 'gid://shopify/Collection/607442', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 6694279816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_DtLkwDqPPIvk', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/1993143403', 'SHOPIFY-HOM-002', 'https://my-store.myshopify.com/products/speedy-home-garden-item-2', 'Speedy Home & Garden Item 2', NULL, NULL, NULL, 171.00, 205.20, 'USD', 67, 2, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-05 19:36:43', 'gid://shopify/Collection/811347', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5736782992, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_DxaORodQWmIB', 1, NULL, 'CH_001', 'gid://shopify/Product/4390547256', 'SHOPIFY-TOY-013', '/products/premiumbrand-toys-item-13', 'PremiumBrand Toys Item 13', NULL, NULL, NULL, 293.00, 351.60, 'USD', 50, 1, 4, 1, 'active', 'synced', '2026-01-22 18:33:21', NULL, 1, '2026-01-11 19:29:21', 'gid://shopify/Collection/972073', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 9739817478, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_DXGnqDWeqxbZ', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2452257384', 'SHOPIFY-TOY-016', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-16', 'PremiumBrand Toys Item 16', NULL, NULL, NULL, 103.00, 123.60, 'USD', 68, 1, 1, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-19 19:36:43', 'gid://shopify/Collection/959437', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5083021107, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_e277822f1205c368', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:01:55', '2026-01-22 21:01:55', NULL),
('lst_e2gwx7IOtKqC', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9295072834', 'SHOPIFY-HOM-005', 'https://outlet.myshopify.com/products/premiumbrand-home-garden-item-5', 'PremiumBrand Home & Garden Item 5', NULL, NULL, NULL, 296.00, 355.20, 'USD', 76, 7, 3, 1, 'active', 'synced', '2026-01-22 19:26:40', NULL, 1, '2026-01-04 19:36:40', 'gid://shopify/Collection/449967', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 2110471872, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_e69hrSOZAZMc', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2804878439', 'SHOPIFY-HOM-012', 'https://outlet.myshopify.com/products/techgiant-home-garden-item-12', 'TechGiant Home & Garden Item 12', NULL, NULL, NULL, 292.00, 350.40, 'USD', 24, 6, 1, 1, 'active', 'synced', '2026-01-22 19:05:42', NULL, 1, '2025-12-26 19:36:42', 'gid://shopify/Collection/372942', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 3161539957, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_eCD0zHAOkG4r', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9110933233', 'SHOPIFY-TOY-019', 'https://outlet.myshopify.com/products/ecolife-toys-item-19', 'EcoLife Toys Item 19', NULL, NULL, NULL, 183.00, 219.60, 'USD', 68, 10, 0, 1, 'active', 'synced', '2026-01-22 19:02:40', NULL, 1, '2026-01-08 19:36:40', 'gid://shopify/Collection/757915', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 2035094708, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_EcSClgEtlpjN', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6152017103', 'SHOPIFY-SPO-003', 'https://my-store.myshopify.com/products/speedy-sports-item-3', 'Speedy Sports Item 3', NULL, NULL, NULL, 294.00, 352.80, 'USD', 16, 9, 0, 1, 'error', 'synced', '2026-01-22 19:12:44', NULL, 0, NULL, 'gid://shopify/Collection/635063', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 6458516504, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_edp2j3vuP9ig', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/7755932080', 'SHOPIFY-ELE-004', 'https://main-store.myshopify.com/products/generic-electronics-item-4', 'Generic Electronics Item 4', NULL, NULL, NULL, 121.00, 145.20, 'USD', 75, 10, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-21 19:36:43', 'gid://shopify/Collection/923793', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 5083470229, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_eeef10d992234d14', 1, 1, 'ch_shopify_3CAUi8Wv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 1040703478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 21:01:14', '2026-01-22 21:01:14', NULL),
('lst_EeJdz1sRmWJ0', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2274826569', 'SHOPIFY-SPO-021', 'https://outlet.myshopify.com/products/ecolife-sports-item-21', 'EcoLife Sports Item 21', NULL, NULL, NULL, 212.00, 254.40, 'USD', 48, 8, 2, 1, 'active', 'synced', '2026-01-22 19:10:42', NULL, 1, '2026-01-17 19:36:42', 'gid://shopify/Collection/524540', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4708892562, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_eEZ0BgtXLiQF', 1, NULL, 'CH_001', 'gid://shopify/Product/8107952976', 'SHOPIFY-CLO-025', 'https://wemonks-test.myshopify.com/products/techgiant-clothing-item-25', 'TechGiant Clothing Item 25', NULL, NULL, NULL, 169.00, 202.80, 'USD', 60, 1, 3, 1, 'pending', 'synced', '2026-01-22 19:08:44', NULL, 0, NULL, 'gid://shopify/Collection/715260', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6694279816, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:44', NULL),
('lst_ef2eeEVwqWAG', 1, NULL, 'CH_001', 'gid://shopify/Product/9909323343', 'SHOPIFY-SPO-008', 'https://wemonks-test.myshopify.com/products/ecolife-sports-item-8', 'EcoLife Sports Item 8', NULL, NULL, NULL, 101.00, 121.20, 'USD', 77, 0, 1, 1, 'active', 'synced', '2026-01-22 17:37:43', NULL, 1, '2025-12-25 19:36:43', 'gid://shopify/Collection/337896', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4985216591, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_egoawPbgRMf5', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/6642012332', 'SHOPIFY-ELE-014', 'https://my-store.myshopify.com/products/speedy-electronics-item-14', 'Speedy Electronics Item 14', NULL, NULL, NULL, 125.00, 150.00, 'USD', 72, 6, 2, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/980741', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 8622969261, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_EHfPoR9nAvt8', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/9303539222', 'SHOPIFY-TOY-022', 'https://my-store.myshopify.com/products/techgiant-toys-item-22', 'TechGiant Toys Item 22', NULL, NULL, NULL, 282.00, 338.40, 'USD', 57, 6, 0, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/244525', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 1686068420, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_EiolnogCtl71', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9917008359', 'SHOPIFY-ELE-024', 'https://main-store.myshopify.com/products/premiumbrand-electronics-item-24', 'PremiumBrand Electronics Item 24', NULL, NULL, NULL, 290.00, 348.00, 'USD', 61, 3, 3, 1, 'active', 'synced', '2026-01-22 18:29:39', NULL, 1, '2026-01-19 19:36:39', 'gid://shopify/Collection/266781', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 1328101457, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_eiwmJDjf3wJH', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1879570489', 'SHOPIFY-CLO-024', 'https://my-store.myshopify.com/products/speedy-clothing-item-24', 'Speedy Clothing Item 24', NULL, NULL, NULL, 175.00, 210.00, 'USD', 70, 7, 2, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-26 19:36:45', 'gid://shopify/Collection/164942', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 8441661960, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_Env20BKDRdJ8', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6076384566', 'SHOPIFY-ELE-018', 'https://main-store.myshopify.com/products/techgiant-electronics-item-18', 'TechGiant Electronics Item 18', NULL, NULL, NULL, 275.00, 330.00, 'USD', 22, 7, 4, 1, 'error', 'synced', '2026-01-22 17:54:41', NULL, 0, NULL, 'gid://shopify/Collection/201480', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 3010326362, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_enwOWA4cLcpD', 1, NULL, 'ch_amazon_T991rGxQ', 'BIZA6ZV8QK', 'AMAZON-TOY-016', 'https://www.amazon.com/dp/BINCSQ9ZH9', 'PremiumBrand Toys Item 16 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 97.85, 117.42, 'USD', 45, 5, 4, 1, 'paused', 'synced', '2026-01-22 19:09:43', NULL, 1, '2026-01-16 19:36:43', 'electronics_2421', NULL, '[\"new-arrival\", \"prime-eligible\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 5083021107, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_ePgkxCf5vgPI', 1, NULL, 'ch_amazon_T991rGxQ', 'BHIXJILRRI', 'AMAZON-HOM-015', 'https://www.amazon.com/dp/BOHDLPEAEA', 'Generic Home & Garden Item 15 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 217.55, 261.06, 'USD', 13, 2, 0, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'electronics_8242', NULL, '[\"new-arrival\", \"prime-eligible\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 6700392339, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_EpOQrTWhXIgI', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/8785582934', 'SHOPIFY-ELE-010', 'https://my-store.myshopify.com/products/generic-electronics-item-10', 'Generic Electronics Item 10', NULL, NULL, NULL, 210.00, 252.00, 'USD', 49, 3, 5, 1, 'active', 'synced', '2026-01-22 18:41:41', NULL, 1, '2026-01-02 19:36:41', 'gid://shopify/Collection/378708', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 3140801851, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_eqNRjpgu1nKP', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/7232172779', 'SHOPIFY-TOY-014', 'https://main-store.myshopify.com/products/premiumbrand-toys-item-14', 'PremiumBrand Toys Item 14', NULL, NULL, NULL, 249.00, 298.80, 'USD', 20, 5, 0, 1, 'active', 'error', NULL, NULL, 1, '2026-01-02 19:36:41', 'gid://shopify/Collection/804404', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 2530572154, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_ErpzvvxCA4Qd', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2559374220', 'SHOPIFY-TOY-014', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-14', 'PremiumBrand Toys Item 14', NULL, NULL, NULL, 249.00, 298.80, 'USD', 44, 0, 3, 1, 'draft', 'synced', '2026-01-22 17:53:41', NULL, 0, NULL, 'gid://shopify/Collection/869022', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 2530572154, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_es9jZPjPprHA', 1, NULL, 'ch_amazon_0BTA91gJ', 'BN1IOEPW5F', 'AMAZON-TOY-021', 'https://www.amazon.com/dp/BZ4SA8JRBA', 'EcoLife Toys Item 21 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 202.35, 242.82, 'USD', 79, 4, 4, 1, 'active', 'error', NULL, NULL, 1, '2025-12-23 19:29:21', 'electronics_5715', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 7590524661, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_evK1dvJnvwJ2', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6452402133', 'SHOPIFY-ELE-019', 'https://main-store.myshopify.com/products/speedy-electronics-item-19', 'Speedy Electronics Item 19', NULL, NULL, NULL, 134.00, 160.80, 'USD', 14, 5, 4, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-20 19:36:42', 'gid://shopify/Collection/443945', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 4740661352, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_eWVU7JrywKEd', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2835356880', 'SHOPIFY-TOY-019', 'https://my-store.myshopify.com/products/ecolife-toys-item-19', 'EcoLife Toys Item 19', NULL, NULL, NULL, 183.00, 219.60, 'USD', 27, 6, 3, 1, 'active', 'synced', '2026-01-22 18:52:40', NULL, 1, '2026-01-18 19:36:40', 'gid://shopify/Collection/298986', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 2035094708, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_Ey0PvxGk8iMi', 1, NULL, 'CH_002', 'B7YP0DOHON', 'AMAZON-CLO-015', 'https://www.amazon.com/dp/BUIVDN9XSO', 'TechGiant Clothing Item 15 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 97.85, 117.42, 'USD', 40, 9, 5, 1, 'error', 'synced', '2026-01-22 19:15:44', NULL, 0, NULL, 'electronics_8527', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 7391172006, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_EyRbXY5LWqYH', 1, NULL, 'ch_ebay_K0TmKNPW', '766707686804', 'EBAY-TOY-001', 'https://www.ebay.com/itm/173174438569', 'NEW Speedy Toys Item 1 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 194.25, 233.10, 'USD', 11, 0, 2, 1, 'pending', 'synced', '2026-01-22 18:58:20', NULL, 0, NULL, '18245', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 6405736263, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_fanbuchCzB3w', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5108721748', 'SHOPIFY-SPO-003', 'https://my-store.myshopify.com/products/speedy-sports-item-3', 'Speedy Sports Item 3', NULL, NULL, NULL, 294.00, 352.80, 'USD', 48, 7, 1, 1, 'active', 'synced', '2026-01-22 18:09:44', NULL, 1, '2025-12-27 19:36:44', 'gid://shopify/Collection/655645', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 6458516504, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_fdda0ba9ccd77773', 1, 1, 'CH_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'delisted', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:53:44', '2026-01-22 19:53:44', NULL),
('lst_FiHfdTRi0CsN', 1, NULL, 'CH_001', 'gid://shopify/Product/2415691365', 'SHOPIFY-CLO-004', 'https://wemonks-test.myshopify.com/products/speedy-clothing-item-4', 'Speedy Clothing Item 4', NULL, NULL, NULL, 174.00, 208.80, 'USD', 24, 2, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-14 19:36:43', 'gid://shopify/Collection/360827', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 5732917962, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_fjV3slZGznMX', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9245809487', 'SHOPIFY-ELE-019', 'https://my-store.myshopify.com/products/speedy-electronics-item-19', 'Speedy Electronics Item 19', NULL, NULL, NULL, 134.00, 160.80, 'USD', 39, 8, 5, 1, 'active', 'synced', '2026-01-22 17:39:42', NULL, 1, '2026-01-01 19:36:42', 'gid://shopify/Collection/702091', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4740661352, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_fn4mC2871YNp', 1, NULL, 'CH_001', 'gid://shopify/Product/4181260431', 'SHOPIFY-HOM-005', 'https://wemonks-test.myshopify.com/products/premiumbrand-home-garden-item-5', 'PremiumBrand Home & Garden Item 5', NULL, NULL, NULL, 296.00, 355.20, 'USD', 13, 9, 0, 1, 'active', 'synced', '2026-01-22 19:20:40', NULL, 1, '2025-12-27 19:36:40', 'gid://shopify/Collection/829046', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2110471872, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:40', NULL),
('lst_FqOGAyjubskV', 1, NULL, 'CH_001', 'gid://shopify/Product/3176887663', 'SHOPIFY-CLO-015', 'https://wemonks-test.myshopify.com/products/techgiant-clothing-item-15', 'TechGiant Clothing Item 15', NULL, NULL, NULL, 103.00, 123.60, 'USD', 100, 4, 1, 1, 'error', 'synced', '2026-01-22 17:57:44', NULL, 0, NULL, 'gid://shopify/Collection/968003', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 7391172006, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_FwSfYX20y1s3', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5763718684', 'SHOPIFY-HOM-006', 'https://my-store.myshopify.com/products/generic-home-garden-item-6', 'Generic Home & Garden Item 6', NULL, NULL, NULL, 143.00, 171.60, 'USD', 34, 7, 1, 1, 'active', 'synced', '2026-01-22 19:29:42', NULL, 1, '2026-01-04 19:36:42', 'gid://shopify/Collection/827320', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4161307707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_FXTYOWLzEFxr', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1671683202', 'SHOPIFY-ELE-014', 'https://my-store.myshopify.com/products/speedy-electronics-item-14', 'Speedy Electronics Item 14', NULL, NULL, NULL, 125.00, 150.00, 'USD', 93, 8, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/212224', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 8622969261, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_g4DZcs8VNuek', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1082700661', 'SHOPIFY-CLO-021', 'https://my-store.myshopify.com/products/speedy-clothing-item-21', 'Speedy Clothing Item 21', NULL, NULL, NULL, 104.00, 124.80, 'USD', 51, 1, 4, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/176493', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6776571785, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_g8D10esFSe1g', 1, NULL, 'CH_001', 'gid://shopify/Product/2815544819', 'SHOPIFY-SPO-010', 'https://wemonks-test.myshopify.com/products/techgiant-sports-item-10', 'TechGiant Sports Item 10', NULL, NULL, NULL, 178.00, 213.60, 'USD', 64, 7, 4, 1, 'active', 'synced', '2026-01-22 19:13:43', NULL, 1, '2025-12-27 19:36:43', 'gid://shopify/Collection/220482', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 5800114824, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_ga10pQs3rsJW', 1, NULL, 'CH_002', 'BYDNY7C2YK', 'AMAZON-SPO-011', 'https://www.amazon.com/dp/BXTX1GLY5S', 'TechGiant Sports Item 11 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 234.65, 281.58, 'USD', 59, 1, 5, 1, 'active', 'synced', '2026-01-22 18:16:21', NULL, 1, '2025-12-27 19:29:21', 'electronics_5534', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 8712397485, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_GBgoh7ea3EEW', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2811847195', 'SHOPIFY-CLO-014', 'https://my-store.myshopify.com/products/ecolife-clothing-item-14', 'EcoLife Clothing Item 14', NULL, NULL, NULL, 208.00, 249.60, 'USD', 67, 7, 1, 1, 'draft', 'synced', '2026-01-22 19:18:45', NULL, 0, NULL, 'gid://shopify/Collection/420645', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 9251079947, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_gcGmA9CnKmo3', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/3695026114', 'SHOPIFY-TOY-010', 'https://main-store.myshopify.com/products/generic-toys-item-10', 'Generic Toys Item 10', NULL, NULL, NULL, 272.00, 326.40, 'USD', 34, 0, 0, 1, 'active', 'synced', '2026-01-22 18:21:44', NULL, 1, '2026-01-06 19:36:44', 'gid://shopify/Collection/278061', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 6991073921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_Ge9qQ4V8QsZr', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6825922316', 'SHOPIFY-TOY-019', 'https://my-store.myshopify.com/products/ecolife-toys-item-19', 'EcoLife Toys Item 19', NULL, NULL, NULL, 183.00, 219.60, 'USD', 19, 10, 0, 1, 'draft', 'synced', '2026-01-22 18:01:40', NULL, 0, NULL, 'gid://shopify/Collection/821073', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 2035094708, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_GKIVXY8DZrfl', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/7129136140', 'SHOPIFY-HOM-009', 'https://my-store.myshopify.com/products/premiumbrand-home-garden-item-9', 'PremiumBrand Home & Garden Item 9', NULL, NULL, NULL, 101.00, 121.20, 'USD', 53, 9, 5, 1, 'active', 'synced', '2026-01-22 18:33:45', NULL, 1, '2026-01-11 19:36:45', 'gid://shopify/Collection/837708', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7721435113, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_glwL6N2Zc9XJ', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6379372948', 'SHOPIFY-SPO-025', 'https://main-store.myshopify.com/products/generic-sports-item-25', 'Generic Sports Item 25', NULL, NULL, NULL, 245.00, 294.00, 'USD', 49, 3, 4, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-23 19:36:42', 'gid://shopify/Collection/295256', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4153094542, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_GmNoASy2S9Zw', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5111979131', 'SHOPIFY-SPO-023', 'https://my-store.myshopify.com/products/generic-sports-item-23', 'Generic Sports Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 76, 2, 3, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/472041', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 8337904751, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_gn13ftqEwqR4', 1, NULL, 'CH_002', 'BHCJEZFG0J', 'AMAZON-CLO-020', 'https://www.amazon.com/dp/BCOSR9AD40', 'Generic Clothing Item 20 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 171.95, 206.34, 'USD', 96, 9, 3, 1, 'active', 'synced', '2026-01-22 18:38:44', NULL, 1, '2026-01-07 19:36:44', 'electronics_2792', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 6950582016, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_gn4I02ZPqJi5', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2408787842', 'SHOPIFY-TOY-019', 'https://main-store.myshopify.com/products/ecolife-toys-item-19', 'EcoLife Toys Item 19', NULL, NULL, NULL, 183.00, 219.60, 'USD', 70, 1, 3, 1, 'error', 'synced', '2026-01-22 19:08:40', NULL, 0, NULL, 'gid://shopify/Collection/718207', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 2035094708, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_gorvnwkEzVA7', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3281037066', 'SHOPIFY-TOY-001', 'https://outlet.myshopify.com/products/ecolife-toys-item-1', 'EcoLife Toys Item 1', NULL, NULL, NULL, 239.00, 286.80, 'USD', 95, 7, 4, 1, 'pending', 'synced', '2026-01-22 18:40:44', NULL, 0, NULL, 'gid://shopify/Collection/115047', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 6405736263, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_gPyktJpuuOPA', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6265231739', 'SHOPIFY-HOM-002', 'https://main-store.myshopify.com/products/speedy-home-garden-item-2', 'Speedy Home & Garden Item 2', NULL, NULL, NULL, 171.00, 205.20, 'USD', 86, 5, 1, 1, 'paused', 'synced', '2026-01-22 18:08:43', NULL, 1, '2026-01-11 19:36:43', 'gid://shopify/Collection/561577', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5736782992, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_GqmvKcuJ0LYx', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5397812243', 'SHOPIFY-ELE-018', 'https://my-store.myshopify.com/products/techgiant-electronics-item-18', 'TechGiant Electronics Item 18', NULL, NULL, NULL, 275.00, 330.00, 'USD', 30, 3, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-21 19:36:41', 'gid://shopify/Collection/448626', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 3010326362, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_gTNInw8NqhLK', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/6926960474', 'SHOPIFY-HOM-001', 'https://outlet.myshopify.com/products/techgiant-home-garden-item-1', 'TechGiant Home & Garden Item 1', NULL, NULL, NULL, 147.00, 176.40, 'USD', 14, 3, 2, 1, 'error', 'synced', '2026-01-22 18:26:41', NULL, 0, NULL, 'gid://shopify/Collection/723993', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 3066199103, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_GueD2qcfRN5F', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9718236365', 'SHOPIFY-HOM-016', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-16', 'TechGiant Home & Garden Item 16', NULL, NULL, NULL, 153.00, 183.60, 'USD', 10, 8, 2, 1, 'active', 'synced', '2026-01-22 18:05:45', NULL, 1, '2026-01-11 19:36:45', 'gid://shopify/Collection/392365', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 9152769640, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_gzZ6Nz25Y2XW', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8312212006', 'SHOPIFY-CLO-021', 'https://outlet.myshopify.com/products/speedy-clothing-item-21', 'Speedy Clothing Item 21', NULL, NULL, NULL, 104.00, 124.80, 'USD', 68, 6, 2, 1, 'active', 'synced', '2026-01-22 18:09:44', NULL, 1, '2025-12-31 19:36:44', 'gid://shopify/Collection/505791', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 6776571785, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_h0RKprczjng0', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/9167569233', 'SHOPIFY-TOY-021', 'https://my-store.myshopify.com/products/ecolife-toys-item-21', 'EcoLife Toys Item 21', NULL, NULL, NULL, 213.00, 255.60, 'USD', 31, 10, 5, 1, 'active', 'error', NULL, NULL, 1, '2026-01-06 19:36:44', 'gid://shopify/Collection/254147', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 7590524661, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_hengC6TWYjvd', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7436467056', 'SHOPIFY-SPO-010', 'https://my-store.myshopify.com/products/techgiant-sports-item-10', 'TechGiant Sports Item 10', NULL, NULL, NULL, 178.00, 213.60, 'USD', 68, 6, 1, 1, 'active', 'synced', '2026-01-22 19:27:43', NULL, 1, '2026-01-01 19:36:43', 'gid://shopify/Collection/656324', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5800114824, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_hEQ35OYm5YYK', 1, NULL, 'CH_001', 'gid://shopify/Product/4582639180', 'SHOPIFY-SPO-013', 'https://wemonks-test.myshopify.com/products/ecolife-sports-item-13', 'EcoLife Sports Item 13', NULL, NULL, NULL, 204.00, 244.80, 'USD', 75, 3, 2, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/232840', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 5383015778, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL);
INSERT INTO `listings` (`listing_id`, `company_id`, `created_by_id`, `channel_id`, `marketplace_id`, `marketplace_sku`, `listing_url`, `title_override`, `description_override`, `short_description_override`, `features_override`, `price_override`, `compare_at_price`, `currency`, `quantity_allocated`, `quantity_reserved`, `buffer_quantity`, `sync_quantity`, `status`, `sync_status`, `last_synced_at`, `sync_error`, `is_published`, `published_at`, `category_id`, `product_type`, `tags`, `inventory_policy`, `is_taxable`, `shipping_template_id`, `return_policy_id`, `custom_attributes`, `stock_item_id`, `variant_id`, `mapped_attributes`, `is_linked`, `created_by`, `updated_by`, `version`, `created_at`, `updated_at`, `deleted_at`) VALUES
('lst_HeT6OzbpyrsH', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1898123647', 'SHOPIFY-HOM-001', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-1', 'TechGiant Home & Garden Item 1', NULL, NULL, NULL, 147.00, 176.40, 'USD', 44, 3, 0, 1, 'paused', 'synced', '2026-01-22 19:08:41', NULL, 1, '2026-01-13 19:36:41', 'gid://shopify/Collection/146062', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 3066199103, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_hFaUV0o41Lsk', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1881699397', 'SHOPIFY-CLO-012', 'https://my-store.myshopify.com/products/speedy-clothing-item-12', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 38, 3, 0, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/344706', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 6817690120, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_HgO4syqcgmXM', 1, NULL, 'ch_etsy_2VfpXJ8Z', '842759714', 'ETSY-SPO-005', 'https://www.etsy.com/listing/113063906/techgiant-sports-item-5', 'TechGiant Sports Item 5 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 303.60, 364.32, 'USD', 77, 8, 5, 1, 'active', 'synced', '2026-01-22 18:49:42', NULL, 1, '2026-01-06 19:36:42', 'category_113', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 4857039105, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_HIcjEJo1jlAk', 1, NULL, 'ch_walmart_OsHsPEmp', 'WM139531390', 'WALMART-NIKE-AM-001', 'https://www.walmart.com/ip/nike-air-max/838205815', 'Nike Air Max - Best Value', NULL, NULL, NULL, 120.00, 144.00, 'USD', 80, 2, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-12 19:29:20', 'cat_28903', NULL, '[\"new-arrival\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 4080001762, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:19:04', '2026-01-22 19:29:20', NULL),
('lst_hiDjlhtxvDRt', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8591207837', 'SHOPIFY-ELE-002', 'https://outlet.myshopify.com/products/techgiant-electronics-item-2', 'TechGiant Electronics Item 2', NULL, NULL, NULL, 202.00, 242.40, 'USD', 34, 3, 0, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/483714', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 7390406486, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_hIH0ekj83dXe', 1, NULL, 'ch_amazon_0BTA91gJ', 'B9WMK7JKBI', 'AMAZON-ELE-019', 'https://www.amazon.com/dp/BEZWOTHRZY', 'Speedy Electronics Item 19 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 127.30, 152.76, 'USD', 89, 5, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-21 19:36:42', 'electronics_2208', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 4740661352, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_hQrJZfHXGbwk', 1, NULL, 'CH_001', 'gid://shopify/Product/8234595035', 'SHOPIFY-CLO-014', 'https://wemonks-test.myshopify.com/products/ecolife-clothing-item-14', 'EcoLife Clothing Item 14', NULL, NULL, NULL, 208.00, 249.60, 'USD', 22, 4, 4, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/743679', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 9251079947, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_hsL3wZxPd1Jn', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5234628201', 'SHOPIFY-CLO-021', 'https://my-store.myshopify.com/products/speedy-clothing-item-21', 'Speedy Clothing Item 21', NULL, NULL, NULL, 104.00, 124.80, 'USD', 63, 7, 4, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-19 19:36:44', 'gid://shopify/Collection/462654', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 6776571785, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_hxOi5XK3bWfz', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1300136166', 'SHOPIFY-SPO-025', 'https://my-store.myshopify.com/products/generic-sports-item-25', 'Generic Sports Item 25', NULL, NULL, NULL, 245.00, 294.00, 'USD', 27, 1, 4, 1, 'active', 'synced', '2026-01-22 19:19:42', NULL, 1, '2026-01-14 19:36:42', 'gid://shopify/Collection/449300', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 4153094542, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_hz1MCBg6VonP', 1, NULL, 'CH_001', 'gid://shopify/Product/2211005407', 'SHOPIFY-ELE-019', 'https://wemonks-test.myshopify.com/products/speedy-electronics-item-19', 'Speedy Electronics Item 19', NULL, NULL, NULL, 134.00, 160.80, 'USD', 50, 5, 3, 1, 'error', 'synced', '2026-01-22 17:53:42', NULL, 0, NULL, 'gid://shopify/Collection/235944', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 4740661352, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_hZtaPUUfciI5', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7628278664', 'SHOPIFY-TOY-007', 'https://my-store.myshopify.com/products/ecolife-toys-item-7', 'EcoLife Toys Item 7', NULL, NULL, NULL, 290.00, 348.00, 'USD', 23, 10, 1, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/106018', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 3149329870, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_I0dWox8RavTy', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/4010036822', 'SHOPIFY-TOY-007', 'https://outlet.myshopify.com/products/ecolife-toys-item-7', 'EcoLife Toys Item 7', NULL, NULL, NULL, 290.00, 348.00, 'USD', 46, 5, 0, 1, 'active', 'synced', '2026-01-22 18:25:41', NULL, 1, '2026-01-06 19:36:41', 'gid://shopify/Collection/286522', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 3149329870, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_i1zcR3bg9URg', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9030675176', 'SHOPIFY-ELE-010', 'https://outlet.myshopify.com/products/generic-electronics-item-10', 'Generic Electronics Item 10', NULL, NULL, NULL, 210.00, 252.00, 'USD', 56, 0, 3, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/332956', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 3140801851, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_i47Tqb0zHZko', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1800304602', 'SHOPIFY-ELE-019', 'https://my-store.myshopify.com/products/speedy-electronics-item-19', 'Speedy Electronics Item 19', NULL, NULL, NULL, 134.00, 160.80, 'USD', 13, 6, 2, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-12 19:36:42', 'gid://shopify/Collection/651550', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4740661352, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_iBu6izGv2nqY', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/7217032794', 'SHOPIFY-ELE-014', 'https://main-store.myshopify.com/products/speedy-electronics-item-14', 'Speedy Electronics Item 14', NULL, NULL, NULL, 125.00, 150.00, 'USD', 62, 3, 2, 1, 'pending', 'synced', '2026-01-22 17:45:45', NULL, 0, NULL, 'gid://shopify/Collection/368322', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 8622969261, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_icbPzLemKhhk', 1, NULL, 'ch_ebay_3DDjxBNa', '737528378536', 'EBAY-ELE-006', 'https://www.ebay.com/itm/410454360252', 'NEW Speedy Electronics Item 6 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 193.20, 231.84, 'USD', 36, 10, 5, 1, 'draft', 'error', NULL, NULL, 0, NULL, '94789', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 5819467921, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_IFGCSodU2NgC', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/3060611262', 'SHOPIFY-TOY-022', 'https://my-store.myshopify.com/products/techgiant-toys-item-22', 'TechGiant Toys Item 22', NULL, NULL, NULL, 282.00, 338.40, 'USD', 67, 5, 5, 1, 'paused', 'synced', '2026-01-22 19:01:40', NULL, 1, '2025-12-27 19:36:40', 'gid://shopify/Collection/315038', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 1686068420, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_iFZpyEy0Ovfn', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/4932244040', 'SHOPIFY-HOM-003', 'https://outlet.myshopify.com/products/generic-home-garden-item-3', 'Generic Home & Garden Item 3', NULL, NULL, NULL, 179.00, 214.80, 'USD', 99, 1, 5, 1, 'active', 'synced', '2026-01-22 19:01:40', NULL, 1, '2026-01-05 19:36:40', 'gid://shopify/Collection/689865', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 1820119014, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_ig5zQRDWnuss', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4689975175', 'SHOPIFY-SPO-021', 'https://main-store.myshopify.com/products/ecolife-sports-item-21', 'EcoLife Sports Item 21', NULL, NULL, NULL, 212.00, 254.40, 'USD', 18, 1, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-17 19:36:42', 'gid://shopify/Collection/515921', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 4708892562, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_IJfegBcqHDvw', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6385207295', 'SHOPIFY-ELE-019', 'https://my-store.myshopify.com/products/speedy-electronics-item-19', 'Speedy Electronics Item 19', NULL, NULL, NULL, 134.00, 160.80, 'USD', 19, 0, 2, 1, 'active', 'error', NULL, NULL, 1, '2025-12-29 19:36:42', 'gid://shopify/Collection/507727', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4740661352, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_iJLiNKoADSDu', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8187844540', 'SHOPIFY-ELE-019', 'https://outlet.myshopify.com/products/speedy-electronics-item-19', 'Speedy Electronics Item 19', NULL, NULL, NULL, 134.00, 160.80, 'USD', 57, 7, 5, 1, 'active', 'synced', '2026-01-22 19:29:42', NULL, 1, '2026-01-07 19:36:42', 'gid://shopify/Collection/143378', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 4740661352, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_Ik5Ld6tUwu7F', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4759774379', 'SHOPIFY-ELE-020', 'https://main-store.myshopify.com/products/techgiant-electronics-item-20', 'TechGiant Electronics Item 20', NULL, NULL, NULL, 183.00, 219.60, 'USD', 11, 10, 1, 1, 'paused', 'synced', '2026-01-22 17:45:40', NULL, 1, '2026-01-05 19:36:40', 'gid://shopify/Collection/876573', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 2074962829, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_iKoauJKcpPDb', 1, NULL, 'CH_001', 'gid://shopify/Product/1950963543', 'SHOPIFY-ELE-020', 'https://wemonks-test.myshopify.com/products/techgiant-electronics-item-20', 'TechGiant Electronics Item 20', NULL, NULL, NULL, 183.00, 219.60, 'USD', 91, 3, 1, 1, 'active', 'error', NULL, NULL, 1, '2026-01-19 19:36:40', 'gid://shopify/Collection/481058', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 2074962829, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_iQhkdSrHJAIy', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3907427201', 'SHOPIFY-SPO-005', 'https://my-store.myshopify.com/products/techgiant-sports-item-5', 'TechGiant Sports Item 5', NULL, NULL, NULL, 264.00, 316.80, 'USD', 78, 10, 4, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/819172', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4857039105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_iSeDnfGPQaQD', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/7432800005', 'SHOPIFY-ELE-023', 'https://outlet.myshopify.com/products/ecolife-electronics-item-23', 'EcoLife Electronics Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 80, 5, 2, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-30 19:36:40', 'gid://shopify/Collection/921643', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 1450261977, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_iTE8gaWvO0sA', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/1334130368', 'SHOPIFY-TOY-013', 'https://my-store.myshopify.com/products/speedy-toys-item-13', 'Speedy Toys Item 13', NULL, NULL, NULL, 277.00, 332.40, 'USD', 56, 9, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/239153', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 9739817478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_IwqFJh239VJv', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2571807695', 'SHOPIFY-SPO-005', 'https://main-store.myshopify.com/products/techgiant-sports-item-5', 'TechGiant Sports Item 5', NULL, NULL, NULL, 264.00, 316.80, 'USD', 30, 3, 1, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-14 19:36:42', 'gid://shopify/Collection/321013', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4857039105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_ixIkbt1R9Au6', 1, NULL, 'ch_ebay_Ce8BlzeT', '907382068109', 'EBAY-TOY-021', 'https://www.ebay.com/itm/919565258007', 'NEW EcoLife Toys Item 21 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 223.65, 268.38, 'USD', 10, 9, 5, 1, 'active', 'synced', '2026-01-22 18:45:44', NULL, 1, '2026-01-01 19:36:44', '87604', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 7590524661, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_iYBbdCWVuUQD', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4682319184', 'SHOPIFY-NIKE-AM-001', 'https://my-store.myshopify.com/products/nike-air-max', 'Nike Air Max', NULL, NULL, NULL, 120.00, 144.00, 'USD', 54, 0, 0, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/227083', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_J2RS7qzBXNCX', 1, NULL, 'ch_amazon_KJ2mzh6e', 'BIHUI5AGW6', 'AMAZON-TSHIRT-001', 'https://www.amazon.com/dp/BWOVIGH0W9', 'Classic White T-Shirt - Premium Quality | Fast Shipping', NULL, NULL, NULL, 14.25, 17.10, 'USD', 62, 9, 0, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-06 19:36:43', 'electronics_6143', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 5580469046, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_j4YIxqypUGFt', 1, NULL, 'CH_001', 'gid://shopify/Product/7298222370', 'SHOPIFY-TOY-009', 'https://wemonks-test.myshopify.com/products/speedy-toys-item-9', 'Speedy Toys Item 9', NULL, NULL, NULL, 142.00, 170.40, 'USD', 20, 1, 1, 1, 'paused', 'synced', '2026-01-22 18:01:45', NULL, 1, '2026-01-04 19:36:45', 'gid://shopify/Collection/973832', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 8812856134, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_j8HaYQ7QAsX4', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5842085932', 'SHOPIFY-ELE-024', 'https://my-store.myshopify.com/products/premiumbrand-electronics-item-24', 'PremiumBrand Electronics Item 24', NULL, NULL, NULL, 290.00, 348.00, 'USD', 10, 2, 1, 1, 'draft', 'synced', '2026-01-22 18:42:39', NULL, 0, NULL, 'gid://shopify/Collection/314203', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 1328101457, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_JbjdeQh4Ah1y', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7048592167', 'SHOPIFY-TOY-007', 'https://my-store.myshopify.com/products/ecolife-toys-item-7', 'EcoLife Toys Item 7', NULL, NULL, NULL, 290.00, 348.00, 'USD', 41, 7, 1, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/651187', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 3149329870, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_JCoV0B2LvN8p', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4484895457', 'SHOPIFY-HOM-002', 'https://my-store.myshopify.com/products/speedy-home-garden-item-2', 'Speedy Home & Garden Item 2', NULL, NULL, NULL, 171.00, 205.20, 'USD', 86, 4, 3, 1, 'pending', 'synced', '2026-01-22 18:20:43', NULL, 0, NULL, 'gid://shopify/Collection/768102', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 5736782992, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_jCWHZpTRH8Z7', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6219675613', 'SHOPIFY-TOY-017', 'https://my-store.myshopify.com/products/techgiant-toys-item-17', 'TechGiant Toys Item 17', NULL, NULL, NULL, 268.00, 321.60, 'USD', 94, 5, 4, 1, 'paused', 'pending', NULL, NULL, 1, '2025-12-27 19:36:42', 'gid://shopify/Collection/474250', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 4278376300, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_jDHGYMDgN8rN', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/3542487314', 'SHOPIFY-SPO-003', 'https://main-store.myshopify.com/products/speedy-sports-item-3', 'Speedy Sports Item 3', NULL, NULL, NULL, 294.00, 352.80, 'USD', 71, 2, 2, 1, 'active', 'synced', '2026-01-22 17:45:44', NULL, 1, '2025-12-24 19:36:44', 'gid://shopify/Collection/229595', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 6458516504, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_JG1DE08CyvhT', 1, NULL, 'CH_001', 'gid://shopify/Product/5987594859', 'SHOPIFY-ELE-004', 'https://wemonks-test.myshopify.com/products/generic-electronics-item-4', 'Generic Electronics Item 4', NULL, NULL, NULL, 121.00, 145.20, 'USD', 55, 2, 2, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/428245', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 5083470229, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_JmCcaU9JepZo', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2528004805', 'SHOPIFY-HOM-009', 'https://my-store.myshopify.com/products/premiumbrand-home-garden-item-9', 'PremiumBrand Home & Garden Item 9', NULL, NULL, NULL, 101.00, 121.20, 'USD', 92, 7, 3, 1, 'draft', 'synced', '2026-01-22 18:01:45', NULL, 0, NULL, 'gid://shopify/Collection/781548', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 7721435113, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_jNxAf8MwHWBI', 1, NULL, 'ch_etsy_2VfpXJ8Z', '514273448', 'ETSY-ELE-023', 'https://www.etsy.com/listing/241817585/ecolife-electronics-item-23', 'EcoLife Electronics Item 23 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 336.95, 404.34, 'USD', 38, 4, 0, 1, 'paused', 'synced', '2026-01-22 18:54:40', NULL, 1, '2026-01-10 19:36:40', 'category_170', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\", \"artisan\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 1450261977, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_JoifJ3p93PPB', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/1374150368', 'SHOPIFY-SPO-011', 'https://outlet.myshopify.com/products/generic-sports-item-11', 'Generic Sports Item 11', NULL, NULL, NULL, 262.00, 314.40, 'USD', 75, 1, 1, 1, 'draft', 'synced', '2026-01-22 18:22:45', NULL, 0, NULL, 'gid://shopify/Collection/883389', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 8712397485, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_jpBaRRWGRHtM', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2930014051', 'SHOPIFY-SPO-008', 'https://main-store.myshopify.com/products/ecolife-sports-item-8', 'EcoLife Sports Item 8', NULL, NULL, NULL, 101.00, 121.20, 'USD', 21, 3, 4, 1, 'paused', 'synced', '2026-01-22 19:05:43', NULL, 1, '2026-01-06 19:36:43', 'gid://shopify/Collection/365781', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4985216591, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_jPNF1Fg4d9oT', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5572279704', 'SHOPIFY-HOM-012', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-12', 'TechGiant Home & Garden Item 12', NULL, NULL, NULL, 292.00, 350.40, 'USD', 37, 2, 2, 1, 'active', 'synced', '2026-01-22 18:36:41', NULL, 1, '2025-12-25 19:36:41', 'gid://shopify/Collection/870126', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 3161539957, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_JQo5bGrNia5e', 1, NULL, 'ch_ebay_K0TmKNPW', '135570266000', 'EBAY-ELE-014', 'https://www.ebay.com/itm/656774833940', 'NEW Speedy Electronics Item 14 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 131.25, 157.50, 'USD', 97, 2, 4, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-14 19:36:45', '22234', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 8622969261, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_jURCxLy1Khl0', 1, NULL, 'ch_amazon_0BTA91gJ', 'BONIFYBHKG', 'AMAZON-NIKE-AM-001', 'https://www.amazon.com/dp/BQAQFCLVER', 'Nike Air Max - Premium Quality | Fast Shipping', NULL, NULL, NULL, 114.00, 136.80, 'USD', 56, 3, 3, 1, 'error', 'synced', '2026-01-22 19:10:42', NULL, 0, NULL, 'electronics_4809', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_juUJ5b6hkQuY', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/1698319008', 'SHOPIFY-ELE-022', 'https://outlet.myshopify.com/products/ecolife-electronics-item-22', 'EcoLife Electronics Item 22', NULL, NULL, NULL, 247.00, 296.40, 'USD', 46, 10, 5, 1, 'active', 'synced', '2026-01-22 18:59:40', NULL, 1, '2025-12-23 19:36:40', 'gid://shopify/Collection/331830', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 1649019816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_Juy6EOyvMAlD', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/3950830744', 'SHOPIFY-CLO-015', 'https://my-store.myshopify.com/products/techgiant-clothing-item-15', 'TechGiant Clothing Item 15', NULL, NULL, NULL, 103.00, 123.60, 'USD', 26, 4, 0, 1, 'active', 'synced', '2026-01-22 18:51:44', NULL, 1, '2025-12-27 19:36:44', 'gid://shopify/Collection/639976', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7391172006, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_K2WYbZGDDY5S', 1, NULL, 'ch_walmart_dDEBQW2h', 'WM970574867', 'WALMART-HOM-016', 'https://www.walmart.com/ip/techgiant-home-garden-item-16/335708874', 'TechGiant Home & Garden Item 16 - Best Value', NULL, NULL, NULL, 153.00, 183.60, 'USD', 56, 7, 0, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'cat_88030', NULL, '[\"new-arrival\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 9152769640, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_k7nlh9CQPe5X', 1, NULL, 'ch_amazon_gosPffoi', 'BFKQULG5IA', 'AMAZON-HOM-008', 'https://www.amazon.com/dp/BUG5F9DMST', 'Generic Home & Garden Item 8 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 193.80, 232.56, 'USD', 11, 4, 2, 1, 'error', 'synced', '2026-01-22 18:16:42', NULL, 0, NULL, 'electronics_1001', NULL, '[\"new-arrival\", \"prime-eligible\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 4913319380, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_kdmHLtN3pAVD', 1, NULL, 'CH_001', 'gid://shopify/Product/9388695147', 'SHOPIFY-TOY-022', 'https://wemonks-test.myshopify.com/products/techgiant-toys-item-22', 'TechGiant Toys Item 22', NULL, NULL, NULL, 282.00, 338.40, 'USD', 57, 6, 0, 1, 'paused', 'synced', '2026-01-22 19:24:40', NULL, 1, '2026-01-15 19:36:40', 'gid://shopify/Collection/605198', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 1686068420, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:19', '2026-01-22 19:36:40', NULL),
('lst_kEicGnZDwJ0Z', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6760900482', 'SHOPIFY-HOM-008', 'https://my-store.myshopify.com/products/generic-home-garden-item-8', 'Generic Home & Garden Item 8', NULL, NULL, NULL, 204.00, 244.80, 'USD', 50, 6, 3, 1, 'active', 'synced', '2026-01-22 18:58:42', NULL, 1, '2026-01-17 19:36:42', 'gid://shopify/Collection/846505', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4913319380, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_KiYxon3TJc9b', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/7351106600', 'SHOPIFY-ELE-014', 'https://outlet.myshopify.com/products/speedy-electronics-item-14', 'Speedy Electronics Item 14', NULL, NULL, NULL, 125.00, 150.00, 'USD', 84, 0, 0, 1, 'draft', 'synced', '2026-01-22 18:39:45', NULL, 0, NULL, 'gid://shopify/Collection/464949', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 8622969261, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_KjIyjPNbTTlp', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6867048101', 'SHOPIFY-TOY-017', 'https://main-store.myshopify.com/products/techgiant-toys-item-17', 'TechGiant Toys Item 17', NULL, NULL, NULL, 268.00, 321.60, 'USD', 72, 6, 5, 1, 'pending', 'synced', '2026-01-22 18:49:42', NULL, 0, NULL, 'gid://shopify/Collection/561254', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4278376300, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_Kjq5s5F2rYaQ', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5846055954', 'SHOPIFY-SPO-009', 'https://outlet.myshopify.com/products/ecolife-sports-item-9', 'EcoLife Sports Item 9', NULL, NULL, NULL, 300.00, 360.00, 'USD', 19, 8, 1, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/376904', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 1040703478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_KlPBM1U1lgPh', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7007433587', 'SHOPIFY-HOM-008', 'https://my-store.myshopify.com/products/generic-home-garden-item-8', 'Generic Home & Garden Item 8', NULL, NULL, NULL, 204.00, 244.80, 'USD', 53, 6, 2, 1, 'active', 'synced', '2026-01-22 19:23:42', NULL, 1, '2026-01-08 19:36:42', 'gid://shopify/Collection/261689', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4913319380, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_kowYdPzAeHU0', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/1913584641', 'SHOPIFY-CLO-015', 'https://my-store.myshopify.com/products/techgiant-clothing-item-15', 'TechGiant Clothing Item 15', NULL, NULL, NULL, 103.00, 123.60, 'USD', 53, 0, 2, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/749865', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 7391172006, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_kP7EyRtvaar2', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4576945368', 'SHOPIFY-HOM-002', 'https://my-store.myshopify.com/products/speedy-home-garden-item-2', 'Speedy Home & Garden Item 2', NULL, NULL, NULL, 171.00, 205.20, 'USD', 10, 10, 4, 1, 'active', 'synced', '2026-01-22 17:57:43', NULL, 1, '2026-01-18 19:36:43', 'gid://shopify/Collection/292995', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 5736782992, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_Kr0AWRLCzNQy', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/6420837182', 'SHOPIFY-TOY-001', 'https://my-store.myshopify.com/products/ecolife-toys-item-1', 'EcoLife Toys Item 1', NULL, NULL, NULL, 239.00, 286.80, 'USD', 23, 4, 4, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-12 19:36:43', 'gid://shopify/Collection/716477', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 6405736263, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_Ks6AQBPtLIWR', 1, NULL, 'CH_001', 'gid://shopify/Product/4151431519', 'SHOPIFY-TSHIRT-001', 'https://wemonks-test.myshopify.com/products/classic-white-t-shirt', 'Classic White T-Shirt', NULL, NULL, NULL, 15.00, 18.00, 'USD', 96, 1, 4, 1, 'error', 'synced', '2026-01-22 18:27:43', NULL, 0, NULL, 'gid://shopify/Collection/855064', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5580469046, NULL, '{\"price\": \"15.00\", \"title\": \"Classic White T-Shirt\"}', 0, 1, 1, 3, '2026-01-22 19:19:04', '2026-01-22 19:36:43', NULL),
('lst_ktUXQcAU6IQF', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/4148836386', 'SHOPIFY-TOY-017', 'https://outlet.myshopify.com/products/techgiant-toys-item-17', 'TechGiant Toys Item 17', NULL, NULL, NULL, 268.00, 321.60, 'USD', 27, 9, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/941473', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 4278376300, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_l87bGV4Z2nQv', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9699049348', 'SHOPIFY-ELE-023', 'https://my-store.myshopify.com/products/ecolife-electronics-item-23', 'EcoLife Electronics Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 64, 2, 1, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-19 19:36:40', 'gid://shopify/Collection/897645', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 1450261977, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_l8TtuL3BYygt', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9806059123', 'SHOPIFY-SPO-010', 'https://my-store.myshopify.com/products/techgiant-sports-item-10', 'TechGiant Sports Item 10', NULL, NULL, NULL, 178.00, 213.60, 'USD', 71, 8, 3, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-26 19:36:43', 'gid://shopify/Collection/723489', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 5800114824, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_L8u3JBAybmj3', 1, NULL, 'ch_etsy_FZznEBGl', '905404684', 'ETSY-TOY-011', 'https://www.etsy.com/listing/188710406/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 292.10, 350.52, 'USD', 51, 4, 5, 1, 'pending', 'synced', '2026-01-22 17:31:20', NULL, 0, NULL, 'category_670', NULL, '[\"new-arrival\", \"handmade\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 5048836195, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_Ld0HoPgvJCAf', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/1355928676', 'SHOPIFY-TOY-017', 'https://my-store.myshopify.com/products/techgiant-toys-item-17', 'TechGiant Toys Item 17', NULL, NULL, NULL, 268.00, 321.60, 'USD', 15, 7, 3, 1, 'active', 'synced', '2026-01-22 18:17:42', NULL, 1, '2026-01-20 19:36:42', 'gid://shopify/Collection/589898', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4278376300, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_LJLbGs6uLTiA', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8852760357', 'SHOPIFY-HOM-015', 'https://main-store.myshopify.com/products/generic-home-garden-item-15', 'Generic Home & Garden Item 15', NULL, NULL, NULL, 229.00, 274.80, 'USD', 42, 7, 3, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/560227', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 6700392339, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_LLMmFdRnT1Xl', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/8364320608', 'SHOPIFY-ELE-004', 'https://my-store.myshopify.com/products/generic-electronics-item-4', 'Generic Electronics Item 4', NULL, NULL, NULL, 121.00, 145.20, 'USD', 15, 9, 0, 1, 'error', 'synced', '2026-01-22 17:59:43', NULL, 0, NULL, 'gid://shopify/Collection/602173', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 5083470229, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_lPtCWzVOywwA', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/7468885429', 'SHOPIFY-HOM-001', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-1', 'TechGiant Home & Garden Item 1', NULL, NULL, NULL, 147.00, 176.40, 'USD', 29, 0, 0, 1, 'paused', 'synced', '2026-01-22 19:08:41', NULL, 1, '2026-01-11 19:36:41', 'gid://shopify/Collection/361006', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 3066199103, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_lRRFdpXADVDp', 1, NULL, 'CH_001', 'gid://shopify/Product/5465172594', 'SHOPIFY-ELE-023', 'https://wemonks-test.myshopify.com/products/ecolife-electronics-item-23', 'EcoLife Electronics Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 79, 9, 4, 1, 'error', 'synced', '2026-01-22 19:14:39', NULL, 0, NULL, 'gid://shopify/Collection/744462', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 1450261977, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_lyvnes3wXJfK', 1, NULL, 'ch_amazon_0BTA91gJ', 'BQSVEROJFP', 'AMAZON-TOY-007', 'https://www.amazon.com/dp/BCZSBHKRAF', 'EcoLife Toys Item 7 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 275.50, 330.60, 'USD', 41, 7, 1, 1, 'paused', 'pending', NULL, NULL, 1, '2025-12-25 19:36:41', 'electronics_4628', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 3149329870, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_m1eSsTrKVbc5', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/3349741293', 'SHOPIFY-TOY-010', 'https://my-store.myshopify.com/products/generic-toys-item-10', 'Generic Toys Item 10', NULL, NULL, NULL, 272.00, 326.40, 'USD', 89, 1, 4, 1, 'active', 'synced', '2026-01-22 18:52:44', NULL, 1, '2025-12-30 19:36:44', 'gid://shopify/Collection/552714', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 6991073921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_M3hl0DWbO3xA', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1044903593', 'SHOPIFY-TOY-013', 'https://my-store.myshopify.com/products/speedy-toys-item-13', 'Speedy Toys Item 13', NULL, NULL, NULL, 277.00, 332.40, 'USD', 52, 5, 1, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/606700', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 9739817478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_M5OiODTU7AvJ', 1, NULL, 'CH_001', 'gid://shopify/Product/4063987273', 'SHOPIFY-SPO-024', 'https://wemonks-test.myshopify.com/products/premiumbrand-sports-item-24', 'PremiumBrand Sports Item 24', NULL, NULL, NULL, 182.00, 218.40, 'USD', 16, 0, 3, 1, 'pending', 'synced', '2026-01-22 18:04:42', NULL, 0, NULL, 'gid://shopify/Collection/893355', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 4927976650, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_m8g7zBeBQlQQ', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3376093819', 'SHOPIFY-SPO-008', 'https://outlet.myshopify.com/products/ecolife-sports-item-8', 'EcoLife Sports Item 8', NULL, NULL, NULL, 101.00, 121.20, 'USD', 41, 6, 1, 1, 'error', 'synced', '2026-01-22 17:52:43', NULL, 0, NULL, 'gid://shopify/Collection/769436', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4985216591, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_MBzUTfgaFbq7', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/6749867871', 'SHOPIFY-HOM-015', 'https://outlet.myshopify.com/products/generic-home-garden-item-15', 'Generic Home & Garden Item 15', NULL, NULL, NULL, 229.00, 274.80, 'USD', 100, 10, 3, 1, 'error', 'synced', '2026-01-22 18:44:44', NULL, 0, NULL, 'gid://shopify/Collection/563038', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 6700392339, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_mIg4zUJCHlGy', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/1667122288', 'SHOPIFY-HOM-003', 'https://my-store.myshopify.com/products/generic-home-garden-item-3', 'Generic Home & Garden Item 3', NULL, NULL, NULL, 179.00, 214.80, 'USD', 50, 10, 3, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/943365', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 1820119014, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_MJSMlD2xI8sU', 1, NULL, 'ch_amazon_KJ2mzh6e', 'BMBZRCL6H9', 'AMAZON-TOY-022', 'https://www.amazon.com/dp/BARGZ1KVBH', 'TechGiant Toys Item 22 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 267.90, 321.48, 'USD', 81, 6, 5, 1, 'active', 'error', NULL, NULL, 1, '2026-01-04 19:29:19', 'electronics_9117', NULL, '[\"new-arrival\", \"prime-eligible\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 1686068420, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_MldWCsV5u0ST', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8668596089', 'SHOPIFY-SPO-018', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-18', 'PremiumBrand Sports Item 18', NULL, NULL, NULL, 209.00, 250.80, 'USD', 52, 1, 3, 1, 'active', 'synced', '2026-01-22 19:01:41', NULL, 1, '2025-12-27 19:36:41', 'gid://shopify/Collection/935411', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 2259027665, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_MOdr9fm9biQl', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8624945731', 'SHOPIFY-HOM-005', 'https://my-store.myshopify.com/products/premiumbrand-home-garden-item-5', 'PremiumBrand Home & Garden Item 5', NULL, NULL, NULL, 296.00, 355.20, 'USD', 44, 4, 1, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-29 19:36:40', 'gid://shopify/Collection/727872', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 2110471872, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_mOpVJqRrENYe', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6810004803', 'SHOPIFY-HOM-003', 'https://my-store.myshopify.com/products/generic-home-garden-item-3', 'Generic Home & Garden Item 3', NULL, NULL, NULL, 179.00, 214.80, 'USD', 59, 7, 1, 1, 'active', 'synced', '2026-01-22 19:19:40', NULL, 1, '2026-01-04 19:36:40', 'gid://shopify/Collection/666461', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 1820119014, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_MQMcgwGpl1wL', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/6323095428', 'SHOPIFY-NIKE-AM-001', 'https://outlet.myshopify.com/products/nike-air-max', 'Nike Air Max', NULL, NULL, NULL, 120.00, 144.00, 'USD', 56, 9, 1, 1, 'pending', 'synced', '2026-01-22 18:05:42', NULL, 0, NULL, 'gid://shopify/Collection/795036', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_mrsi2cXGbBsf', 1, NULL, 'CH_001', 'gid://shopify/Product/5970686383', 'SHOPIFY-ELE-010', 'https://wemonks-test.myshopify.com/products/generic-electronics-item-10', 'Generic Electronics Item 10', NULL, NULL, NULL, 210.00, 252.00, 'USD', 77, 9, 0, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/113754', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 3140801851, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_MrxPnrjO34c8', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9923106318', 'SHOPIFY-HOM-001', 'https://main-store.myshopify.com/products/techgiant-home-garden-item-1', 'TechGiant Home & Garden Item 1', NULL, NULL, NULL, 147.00, 176.40, 'USD', 56, 6, 2, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/829585', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 3066199103, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_mxIafJlBuNIt', 1, NULL, 'CH_001', 'gid://shopify/Product/7820419629', 'SHOPIFY-TOY-016', 'https://wemonks-test.myshopify.com/products/premiumbrand-toys-item-16', 'PremiumBrand Toys Item 16', NULL, NULL, NULL, 103.00, 123.60, 'USD', 10, 3, 4, 1, 'pending', 'synced', '2026-01-22 19:21:43', NULL, 0, NULL, 'gid://shopify/Collection/320736', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 5083021107, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_MXzz3R5EqcvT', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8812725461', 'SHOPIFY-HOM-005', 'https://main-store.myshopify.com/products/premiumbrand-home-garden-item-5', 'PremiumBrand Home & Garden Item 5', NULL, NULL, NULL, 296.00, 355.20, 'USD', 77, 2, 5, 1, 'active', 'synced', '2026-01-22 18:27:40', NULL, 1, '2025-12-24 19:36:40', 'gid://shopify/Collection/429345', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2110471872, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_n0BxCPK9aS9r', 1, NULL, 'CH_001', 'gid://shopify/Product/6087463533', 'SHOPIFY-SPO-006', 'https://wemonks-test.myshopify.com/products/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6', NULL, NULL, NULL, 168.00, 201.60, 'USD', 58, 1, 4, 1, 'paused', 'synced', '2026-01-22 18:20:43', NULL, 1, '2025-12-28 19:36:43', 'gid://shopify/Collection/859284', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6400266186, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_n6AdUz3BSEzV', 1, NULL, 'ch_etsy_djY2iiTV', '234375836', 'ETSY-ELE-003', 'https://www.etsy.com/listing/475305825/generic-electronics-item-3', 'Generic Electronics Item 3 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 172.50, 207.00, 'USD', 21, 2, 0, 1, 'active', 'synced', '2026-01-22 18:47:41', NULL, 1, '2026-01-19 19:36:41', 'category_394', NULL, '[\"new-arrival\", \"handmade\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 2390461105, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_n8UCzoxOOnkY', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5326369398', 'SHOPIFY-CLO-022', 'https://outlet.myshopify.com/products/ecolife-clothing-item-22', 'EcoLife Clothing Item 22', NULL, NULL, NULL, 267.00, 320.40, 'USD', 24, 0, 4, 1, 'active', 'error', NULL, NULL, 1, '2025-12-24 19:36:41', 'gid://shopify/Collection/475455', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 2745553505, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_N9V51OcUOvbg', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/1478930181', 'SHOPIFY-HOM-003', 'https://main-store.myshopify.com/products/generic-home-garden-item-3', 'Generic Home & Garden Item 3', NULL, NULL, NULL, 179.00, 214.80, 'USD', 44, 0, 2, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/980427', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 1820119014, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_nd7ho5DMb7Hb', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4823947778', 'SHOPIFY-TOY-011', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11', NULL, NULL, NULL, 254.00, 304.80, 'USD', 39, 8, 1, 1, 'pending', 'synced', '2026-01-22 18:21:43', NULL, 0, NULL, 'gid://shopify/Collection/439839', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5048836195, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_Ng5C0pe7Za5o', 1, NULL, 'CH_001', 'gid://shopify/Product/1607876423', 'SHOPIFY-CLO-022', 'https://wemonks-test.myshopify.com/products/ecolife-clothing-item-22', 'EcoLife Clothing Item 22', NULL, NULL, NULL, 267.00, 320.40, 'USD', 59, 2, 4, 1, 'active', 'synced', '2026-01-22 19:29:41', NULL, 1, '2026-01-01 19:36:41', 'gid://shopify/Collection/327532', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 2745553505, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_nGHVZSvlSyYB', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/1236460008', 'SHOPIFY-ELE-012', 'https://my-store.myshopify.com/products/generic-electronics-item-12', 'Generic Electronics Item 12', NULL, NULL, NULL, 128.00, 153.60, 'USD', 72, 0, 1, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/187351', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 2431860707, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_nH8zeeyc58dj', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/9097605650', 'SHOPIFY-SPO-018', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-18', 'PremiumBrand Sports Item 18', NULL, NULL, NULL, 209.00, 250.80, 'USD', 50, 10, 0, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-15 19:36:41', 'gid://shopify/Collection/569865', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2259027665, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_nlK77vWFHZKC', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/9598954590', 'SHOPIFY-CLO-004', 'https://my-store.myshopify.com/products/speedy-clothing-item-4', 'Speedy Clothing Item 4', NULL, NULL, NULL, 174.00, 208.80, 'USD', 81, 8, 5, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/163905', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 5732917962, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_NOAnd1GD0lkk', 1, NULL, 'ch_etsy_FZznEBGl', '279464419', 'ETSY-TOY-022', 'https://www.etsy.com/listing/708259664/techgiant-toys-item-22', 'TechGiant Toys Item 22 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 324.30, 389.16, 'USD', 79, 8, 5, 1, 'active', 'synced', '2026-01-22 18:50:40', NULL, 1, '2026-01-04 19:36:40', 'category_848', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 1686068420, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL);
INSERT INTO `listings` (`listing_id`, `company_id`, `created_by_id`, `channel_id`, `marketplace_id`, `marketplace_sku`, `listing_url`, `title_override`, `description_override`, `short_description_override`, `features_override`, `price_override`, `compare_at_price`, `currency`, `quantity_allocated`, `quantity_reserved`, `buffer_quantity`, `sync_quantity`, `status`, `sync_status`, `last_synced_at`, `sync_error`, `is_published`, `published_at`, `category_id`, `product_type`, `tags`, `inventory_policy`, `is_taxable`, `shipping_template_id`, `return_policy_id`, `custom_attributes`, `stock_item_id`, `variant_id`, `mapped_attributes`, `is_linked`, `created_by`, `updated_by`, `version`, `created_at`, `updated_at`, `deleted_at`) VALUES
('lst_NoGtz9qE8fsn', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4057349355', 'SHOPIFY-ELE-023', 'https://main-store.myshopify.com/products/ecolife-electronics-item-23', 'EcoLife Electronics Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 11, 9, 4, 1, 'paused', 'synced', '2026-01-22 18:04:40', NULL, 1, '2026-01-18 19:36:40', 'gid://shopify/Collection/724675', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 1450261977, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_NpekXLTObCLR', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8404873004', 'SHOPIFY-SPO-009', 'https://main-store.myshopify.com/products/ecolife-sports-item-9', 'EcoLife Sports Item 9', NULL, NULL, NULL, 300.00, 360.00, 'USD', 79, 9, 5, 1, 'active', 'synced', '2026-01-22 18:33:39', NULL, 1, '2026-01-14 19:36:39', 'gid://shopify/Collection/981366', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 1040703478, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_NrlKdBDzrmx1', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/9288377204', 'SHOPIFY-HOM-012', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-12', 'TechGiant Home & Garden Item 12', NULL, NULL, NULL, 292.00, 350.40, 'USD', 98, 8, 1, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/341640', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 3161539957, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_NSqqpVJErYP1', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/4903461552', 'SHOPIFY-CLO-020', 'https://my-store.myshopify.com/products/generic-clothing-item-20', 'Generic Clothing Item 20', NULL, NULL, NULL, 181.00, 217.20, 'USD', 92, 7, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-15 19:36:44', 'gid://shopify/Collection/146197', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 6950582016, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_NUgJDjVP1IPO', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4037672473', 'SHOPIFY-CLO-004', 'https://my-store.myshopify.com/products/speedy-clothing-item-4', 'Speedy Clothing Item 4', NULL, NULL, NULL, 174.00, 208.80, 'USD', 92, 6, 1, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/706521', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 5732917962, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_nxGpgw4p48Tw', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7578872035', 'SHOPIFY-TOY-021', 'https://my-store.myshopify.com/products/ecolife-toys-item-21', 'EcoLife Toys Item 21', NULL, NULL, NULL, 213.00, 255.60, 'USD', 44, 7, 2, 1, 'active', 'synced', '2026-01-22 19:19:44', NULL, 1, '2025-12-27 19:36:44', 'gid://shopify/Collection/829589', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 7590524661, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_NXZEI2wtDzbI', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/3081636008', 'SHOPIFY-ELE-006', 'https://main-store.myshopify.com/products/speedy-electronics-item-6', 'Speedy Electronics Item 6', NULL, NULL, NULL, 184.00, 220.80, 'USD', 61, 6, 2, 1, 'active', 'synced', '2026-01-22 17:47:43', NULL, 1, '2026-01-11 19:36:43', 'gid://shopify/Collection/102009', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 5819467921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_o0VMOuCZHyXe', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8461658295', 'SHOPIFY-TSHIRT-001', 'https://my-store.myshopify.com/products/classic-white-t-shirt', 'Classic White T-Shirt', NULL, NULL, NULL, 15.00, 18.00, 'USD', 14, 0, 0, 1, 'active', 'synced', '2026-01-22 18:09:43', NULL, 1, '2026-01-18 19:36:43', 'gid://shopify/Collection/855393', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 5580469046, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_o2ebzueg1npL', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2540812219', 'SHOPIFY-HOM-016', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-16', 'TechGiant Home & Garden Item 16', NULL, NULL, NULL, 153.00, 183.60, 'USD', 19, 5, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-06 19:36:45', 'gid://shopify/Collection/395816', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 9152769640, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_Ob91cFMcmOSO', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8769341342', 'SHOPIFY-SPO-011', 'https://my-store.myshopify.com/products/generic-sports-item-11', 'Generic Sports Item 11', NULL, NULL, NULL, 262.00, 314.40, 'USD', 61, 0, 5, 1, 'draft', 'synced', '2026-01-22 18:36:45', NULL, 0, NULL, 'gid://shopify/Collection/981137', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 8712397485, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_ObsmBhwXY8nT', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3255208817', 'SHOPIFY-TOY-002', 'https://my-store.myshopify.com/products/generic-toys-item-2', 'Generic Toys Item 2', NULL, NULL, NULL, 277.00, 332.40, 'USD', 14, 4, 3, 1, 'error', 'synced', '2026-01-22 18:39:45', NULL, 0, NULL, 'gid://shopify/Collection/527811', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 8239632713, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_oF8fjru00YeD', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/4781460678', 'SHOPIFY-SPO-006', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6', NULL, NULL, NULL, 168.00, 201.60, 'USD', 27, 7, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-03 19:36:43', 'gid://shopify/Collection/127313', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 6400266186, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_OfEhyYn4EtoS', 1, NULL, 'CH_001', 'gid://shopify/Product/4087484680', 'SHOPIFY-HOM-008', 'https://wemonks-test.myshopify.com/products/generic-home-garden-item-8', 'Generic Home & Garden Item 8', NULL, NULL, NULL, 204.00, 244.80, 'USD', 98, 5, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-01 19:36:42', 'gid://shopify/Collection/113325', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 4913319380, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:42', NULL),
('lst_OHC8nCMBaaaj', 1, NULL, 'ch_walmart_OsHsPEmp', 'WM253005540', 'WALMART-TOY-023', 'https://www.walmart.com/ip/premiumbrand-toys-item-23/989728126', 'PremiumBrand Toys Item 23 - Best Value', NULL, NULL, NULL, 282.00, 338.40, 'USD', 47, 2, 5, 1, 'active', 'synced', '2026-01-22 18:13:44', NULL, 1, '2025-12-26 19:36:44', 'cat_88952', NULL, '[\"new-arrival\", \"bestseller\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 7443455361, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_ojZkC5HvWJiy', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6319363210', 'SHOPIFY-TOY-021', 'https://my-store.myshopify.com/products/ecolife-toys-item-21', 'EcoLife Toys Item 21', NULL, NULL, NULL, 213.00, 255.60, 'USD', 54, 9, 2, 1, 'pending', 'synced', '2026-01-22 19:11:44', NULL, 0, NULL, 'gid://shopify/Collection/813374', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 7590524661, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_OMFjzlKbmhYB', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2895940918', 'SHOPIFY-SPO-010', 'https://main-store.myshopify.com/products/techgiant-sports-item-10', 'TechGiant Sports Item 10', NULL, NULL, NULL, 178.00, 213.60, 'USD', 37, 2, 4, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-08 19:36:43', 'gid://shopify/Collection/251885', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 5800114824, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_OPlQyKSHLnrB', 1, NULL, 'CH_001', 'gid://shopify/Product/5346037149', 'SHOPIFY-HOM-016', 'https://wemonks-test.myshopify.com/products/techgiant-home-garden-item-16', 'TechGiant Home & Garden Item 16', NULL, NULL, NULL, 153.00, 183.60, 'USD', 73, 0, 5, 1, 'pending', 'synced', '2026-01-22 17:45:45', NULL, 0, NULL, 'gid://shopify/Collection/650614', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 9152769640, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_OqARvlzpRPAW', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/9599539128', 'SHOPIFY-ELE-020', 'https://my-store.myshopify.com/products/techgiant-electronics-item-20', 'TechGiant Electronics Item 20', NULL, NULL, NULL, 183.00, 219.60, 'USD', 96, 10, 3, 1, 'paused', 'error', NULL, NULL, 1, '2025-12-30 19:36:40', 'gid://shopify/Collection/922909', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 2074962829, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_OrpuWl2NTqjQ', 1, NULL, 'ch_etsy_hyy1aO8e', '380192001', 'ETSY-CLO-021', 'https://www.etsy.com/listing/891261244/speedy-clothing-item-21', 'Speedy Clothing Item 21 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 119.60, 143.52, 'USD', 76, 9, 3, 1, 'paused', 'synced', '2026-01-22 19:20:44', NULL, 1, '2026-01-18 19:36:44', 'category_661', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 6776571785, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_OtvoY1aMn0MX', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9842678845', 'SHOPIFY-TOY-003', 'https://main-store.myshopify.com/products/premiumbrand-toys-item-3', 'PremiumBrand Toys Item 3', NULL, NULL, NULL, 202.00, 242.40, 'USD', 70, 7, 4, 1, 'active', 'synced', '2026-01-22 18:49:41', NULL, 1, '2026-01-09 19:36:41', 'gid://shopify/Collection/407697', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 2946391230, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_OVjZGTryqmBV', 1, NULL, 'CH_003', '1fb50948-2f56-4c3f-914a-1277985de12a', 'OTHER-CLO-012', '#', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 86, 1, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-10 19:29:21', 'general', NULL, '[\"new-arrival\", \"bestseller\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6817690120, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_OvQR5MgBVCCS', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5391481340', 'SHOPIFY-TOY-002', 'https://outlet.myshopify.com/products/generic-toys-item-2', 'Generic Toys Item 2', NULL, NULL, NULL, 277.00, 332.40, 'USD', 96, 5, 5, 1, 'active', 'synced', '2026-01-22 17:44:45', NULL, 1, '2026-01-06 19:36:45', 'gid://shopify/Collection/956896', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 8239632713, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_oW31zN82dA1V', 1, NULL, 'ch_etsy_FZznEBGl', '826442688', 'ETSY-TSHIRT-001', 'https://www.etsy.com/listing/294317246/classic-white-t-shirt', 'Classic White T-Shirt | Handcrafted | Ready to Ship', NULL, NULL, NULL, 17.25, 20.70, 'USD', 94, 9, 0, 1, 'paused', 'error', NULL, 'Sample sync error: API rate limit exceeded', 1, '2026-01-19 19:19:04', 'category_132', NULL, '[\"new-arrival\", \"handmade\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5580469046, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('lst_Ox9iLRqfCu6E', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5045445674', 'SHOPIFY-ELE-003', 'https://my-store.myshopify.com/products/generic-electronics-item-3', 'Generic Electronics Item 3', NULL, NULL, NULL, 150.00, 180.00, 'USD', 98, 5, 5, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/935795', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 2390461105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_OZvuF6WfNPHn', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/6062537894', 'SHOPIFY-TOY-010', 'https://outlet.myshopify.com/products/generic-toys-item-10', 'Generic Toys Item 10', NULL, NULL, NULL, 272.00, 326.40, 'USD', 27, 8, 0, 1, 'error', 'synced', '2026-01-22 18:36:44', NULL, 0, NULL, 'gid://shopify/Collection/561381', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 6991073921, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_p17VgihE4Mne', 1, NULL, 'CH_001', 'gid://shopify/Product/4760213243', 'SHOPIFY-TOY-003', 'https://wemonks-test.myshopify.com/products/premiumbrand-toys-item-3', 'PremiumBrand Toys Item 3', NULL, NULL, NULL, 202.00, 242.40, 'USD', 89, 6, 1, 1, 'active', 'synced', '2026-01-22 17:43:41', NULL, 1, '2026-01-21 19:36:41', 'gid://shopify/Collection/228528', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 2946391230, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_P1gFdxAndT0K', 1, 1, 'CH_001', 'gid://shopify/Product/2977399570', 'SHOPIFY-TOY-013', 'https://wemonks-test.myshopify.com/products/speedy-toys-item-13', 'Speedy Toys Item 13', NULL, NULL, NULL, 277.00, 332.40, 'USD', 80, 7, 0, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-07 19:36:45', 'gid://shopify/Collection/358720', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 9739817478, NULL, NULL, 1, 1, 1, 4, '2026-01-22 19:31:58', '2026-01-22 19:36:45', NULL),
('lst_PBYeD0k5jdlt', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7185644434', 'SHOPIFY-CLO-022', 'https://my-store.myshopify.com/products/ecolife-clothing-item-22', 'EcoLife Clothing Item 22', NULL, NULL, NULL, 267.00, 320.40, 'USD', 66, 7, 2, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/563569', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 2745553505, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_PG4IZ9f38Iwl', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/7458674750', 'SHOPIFY-HOM-006', 'https://my-store.myshopify.com/products/generic-home-garden-item-6', 'Generic Home & Garden Item 6', NULL, NULL, NULL, 143.00, 171.60, 'USD', 54, 0, 1, 1, 'paused', 'synced', '2026-01-22 18:11:42', NULL, 1, '2026-01-01 19:36:42', 'gid://shopify/Collection/509038', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 4161307707, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_PMUD3nctImiz', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9735424371', 'SHOPIFY-TOY-023', 'https://outlet.myshopify.com/products/premiumbrand-toys-item-23', 'PremiumBrand Toys Item 23', NULL, NULL, NULL, 282.00, 338.40, 'USD', 88, 6, 5, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-12 19:36:44', 'gid://shopify/Collection/620329', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 7443455361, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_PuJuFJ3d0Tsk', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2405307304', 'SHOPIFY-TOY-016', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-16', 'PremiumBrand Toys Item 16', NULL, NULL, NULL, 103.00, 123.60, 'USD', 98, 8, 2, 1, 'paused', 'synced', '2026-01-22 19:12:43', NULL, 1, '2026-01-01 19:36:43', 'gid://shopify/Collection/306166', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5083021107, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_PwHRq87kZN99', 1, NULL, 'CH_001', 'gid://shopify/Product/1096992885', 'SHOPIFY-ELE-012', 'https://wemonks-test.myshopify.com/products/generic-electronics-item-12', 'Generic Electronics Item 12', NULL, NULL, NULL, 128.00, 153.60, 'USD', 89, 5, 5, 1, 'paused', 'synced', '2026-01-22 17:43:41', NULL, 1, '2026-01-21 19:36:41', 'gid://shopify/Collection/859074', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 2431860707, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_pWqaoDoS1vEP', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9520211234', 'SHOPIFY-CLO-024', 'https://outlet.myshopify.com/products/speedy-clothing-item-24', 'Speedy Clothing Item 24', NULL, NULL, NULL, 175.00, 210.00, 'USD', 97, 4, 1, 1, 'draft', 'synced', '2026-01-22 18:55:45', NULL, 0, NULL, 'gid://shopify/Collection/238658', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 8441661960, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_PXQPQ1e3ISUz', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7079565488', 'SHOPIFY-ELE-024', 'https://my-store.myshopify.com/products/premiumbrand-electronics-item-24', 'PremiumBrand Electronics Item 24', NULL, NULL, NULL, 290.00, 348.00, 'USD', 64, 3, 3, 1, 'draft', 'synced', '2026-01-22 18:04:39', NULL, 0, NULL, 'gid://shopify/Collection/198128', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 1328101457, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_q2Ce02j3ya8o', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2666874345', 'SHOPIFY-TOY-003', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-3', 'PremiumBrand Toys Item 3', NULL, NULL, NULL, 202.00, 242.40, 'USD', 57, 10, 0, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-08 19:36:41', 'gid://shopify/Collection/757331', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 2946391230, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_Q5KGYboScPEY', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5783105182', 'SHOPIFY-ELE-006', 'https://outlet.myshopify.com/products/speedy-electronics-item-6', 'Speedy Electronics Item 6', NULL, NULL, NULL, 184.00, 220.80, 'USD', 38, 8, 4, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-04 19:36:43', 'gid://shopify/Collection/289417', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 5819467921, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_Q6bkV0wTUVLF', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4237521043', 'SHOPIFY-CLO-025', 'https://my-store.myshopify.com/products/techgiant-clothing-item-25', 'TechGiant Clothing Item 25', NULL, NULL, NULL, 169.00, 202.80, 'USD', 88, 0, 4, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-03 19:36:44', 'gid://shopify/Collection/460907', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 6694279816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_qabkE1LkVfnd', 1, NULL, 'ch_ebay_3DDjxBNa', '720165981534', 'EBAY-SPO-023', 'https://www.ebay.com/itm/167322454934', 'NEW Generic Sports Item 23 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 307.65, 369.18, 'USD', 38, 4, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-20 19:29:21', '36202', NULL, '[\"new-arrival\", \"fast-n-free\", \"top-rated\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 8337904751, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_qBsmDdXbIasb', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7918761614', 'SHOPIFY-SPO-015', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-15', 'PremiumBrand Sports Item 15', NULL, NULL, NULL, 111.00, 133.20, 'USD', 84, 2, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/865092', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 5845138823, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_qdvqmT6g4XPo', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4343491962', 'SHOPIFY-CLO-012', 'https://my-store.myshopify.com/products/speedy-clothing-item-12', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 66, 4, 1, 1, 'error', 'synced', '2026-01-22 19:07:44', NULL, 0, NULL, 'gid://shopify/Collection/377937', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 6817690120, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_qhtEAnbRHUWz', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4907499009', 'SHOPIFY-HOM-008', 'https://main-store.myshopify.com/products/generic-home-garden-item-8', 'Generic Home & Garden Item 8', NULL, NULL, NULL, 204.00, 244.80, 'USD', 53, 5, 0, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/915151', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4913319380, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_QQHPTOIZjGmW', 1, NULL, 'ch_ebay_Ce8BlzeT', '723634703841', 'EBAY-ELE-010', 'https://www.ebay.com/itm/476036952710', 'NEW Generic Electronics Item 10 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 220.50, 264.60, 'USD', 74, 5, 1, 1, 'active', 'synced', '2026-01-22 19:19:41', NULL, 1, '2026-01-11 19:36:41', '23935', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\", \"top-rated\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 3140801851, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_QqJnXm84kxk6', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9366091561', 'SHOPIFY-SPO-006', 'https://outlet.myshopify.com/products/premiumbrand-sports-item-6', 'PremiumBrand Sports Item 6', NULL, NULL, NULL, 168.00, 201.60, 'USD', 57, 0, 2, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/939496', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6400266186, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_qSQQAKl7Ch9I', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5157646489', 'SHOPIFY-SPO-013', 'https://outlet.myshopify.com/products/ecolife-sports-item-13', 'EcoLife Sports Item 13', NULL, NULL, NULL, 204.00, 244.80, 'USD', 76, 0, 4, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-05 19:36:43', 'gid://shopify/Collection/547499', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 5383015778, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_QyFuWbbtPyuj', 1, NULL, 'ch_ebay_K0TmKNPW', '513035438209', 'EBAY-HOM-006', 'https://www.ebay.com/itm/721945994181', 'NEW Generic Home & Garden Item 6 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 150.15, 180.18, 'USD', 12, 2, 2, 1, 'paused', 'synced', '2026-01-22 19:12:42', NULL, 1, '2026-01-08 19:36:42', '39298', NULL, '[\"new-arrival\", \"fast-n-free\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4161307707, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_qzifGaUNoat6', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/4090923807', 'SHOPIFY-ELE-004', 'https://outlet.myshopify.com/products/generic-electronics-item-4', 'Generic Electronics Item 4', NULL, NULL, NULL, 121.00, 145.20, 'USD', 12, 1, 0, 1, 'active', 'error', NULL, NULL, 1, '2026-01-18 19:36:43', 'gid://shopify/Collection/237425', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 5083470229, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_QzVHJ4L7KCxa', 1, NULL, 'CH_001', 'gid://shopify/Product/5231520837', 'SHOPIFY-TOY-011', 'https://wemonks-test.myshopify.com/products/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11', NULL, NULL, NULL, 254.00, 304.80, 'USD', 90, 1, 3, 1, 'pending', 'synced', '2026-01-22 19:22:43', NULL, 0, NULL, 'gid://shopify/Collection/730283', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 5048836195, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_r4BYpUyvec7x', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2088089157', 'SHOPIFY-ELE-022', 'https://main-store.myshopify.com/products/ecolife-electronics-item-22', 'EcoLife Electronics Item 22', NULL, NULL, NULL, 247.00, 296.40, 'USD', 16, 10, 0, 1, 'active', 'synced', '2026-01-22 18:08:40', NULL, 1, '2025-12-26 19:36:40', 'gid://shopify/Collection/245100', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 1649019816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_R4NOli33ZWSY', 1, NULL, 'CH_001', 'gid://shopify/Product/5442600601', 'SHOPIFY-SPO-011', 'https://wemonks-test.myshopify.com/products/generic-sports-item-11', 'Generic Sports Item 11', NULL, NULL, NULL, 262.00, 314.40, 'USD', 82, 1, 2, 1, 'active', 'synced', '2026-01-22 18:49:45', NULL, 1, '2026-01-13 19:36:45', 'gid://shopify/Collection/529790', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 8712397485, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_r96bdaYnTCDQ', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7424221001', 'SHOPIFY-CLO-015', 'https://my-store.myshopify.com/products/techgiant-clothing-item-15', 'TechGiant Clothing Item 15', NULL, NULL, NULL, 103.00, 123.60, 'USD', 66, 8, 2, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/905731', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 7391172006, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_rCR5cvBVLmzC', 1, NULL, 'ch_walmart_d4N9NvUW', 'WM805585464', 'WALMART-TOY-017', 'https://www.walmart.com/ip/techgiant-toys-item-17/958174545', 'TechGiant Toys Item 17 - Best Value', NULL, NULL, NULL, 268.00, 321.60, 'USD', 76, 2, 1, 1, 'active', 'synced', '2026-01-22 19:13:42', NULL, 1, '2025-12-28 19:36:42', 'cat_46791', NULL, '[\"new-arrival\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4278376300, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_RCXvoosksRdd', 1, NULL, 'ch_walmart_OsHsPEmp', 'WM184189950', 'WALMART-HOM-019', 'https://www.walmart.com/ip/speedy-home-garden-item-19/185433917', 'Speedy Home & Garden Item 19 - Best Value', NULL, NULL, NULL, 241.00, 289.20, 'USD', 16, 0, 0, 1, 'active', 'synced', '2026-01-22 17:48:21', NULL, 1, '2026-01-09 19:29:21', 'cat_85948', NULL, '[\"new-arrival\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7675501002, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_rJ6d68DHtRZv', 1, NULL, 'CH_001', 'gid://shopify/Product/7717558124', 'SHOPIFY-CLO-020', 'https://wemonks-test.myshopify.com/products/generic-clothing-item-20', 'Generic Clothing Item 20', NULL, NULL, NULL, 181.00, 217.20, 'USD', 36, 9, 5, 1, 'paused', 'synced', '2026-01-22 18:57:44', NULL, 1, '2025-12-28 19:36:44', 'gid://shopify/Collection/908896', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 6950582016, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:44', NULL),
('lst_rJCmGpkr992n', 1, NULL, 'CH_001', 'gid://shopify/Product/8182349101', 'SHOPIFY-SPO-015', 'https://wemonks-test.myshopify.com/products/premiumbrand-sports-item-15', 'PremiumBrand Sports Item 15', NULL, NULL, NULL, 111.00, 133.20, 'USD', 67, 3, 4, 1, 'draft', 'synced', '2026-01-22 18:45:43', NULL, 0, NULL, 'gid://shopify/Collection/676493', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5845138823, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_rjR0LIYDxTiA', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6211136866', 'SHOPIFY-SPO-013', 'https://main-store.myshopify.com/products/ecolife-sports-item-13', 'EcoLife Sports Item 13', NULL, NULL, NULL, 204.00, 244.80, 'USD', 35, 9, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-12 19:36:43', 'gid://shopify/Collection/308898', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5383015778, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_rrJStxYnHfAO', 1, NULL, 'CH_001', 'gid://shopify/Product/5141894524', 'SHOPIFY-SPO-023', 'https://wemonks-test.myshopify.com/products/generic-sports-item-23', 'Generic Sports Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 88, 8, 1, 1, 'error', 'synced', '2026-01-22 18:14:45', NULL, 0, NULL, 'gid://shopify/Collection/536608', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 8337904751, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_rwCZcxv0dzvQ', 1, NULL, 'CH_001', 'gid://shopify/Product/3119918336', 'SHOPIFY-SPO-025', 'https://wemonks-test.myshopify.com/products/generic-sports-item-25', 'Generic Sports Item 25', NULL, NULL, NULL, 245.00, 294.00, 'USD', 23, 7, 5, 1, 'active', 'synced', '2026-01-22 19:00:42', NULL, 1, '2026-01-04 19:36:42', 'gid://shopify/Collection/178626', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4153094542, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:42', NULL),
('lst_rxCFh3WwFTxY', 1, NULL, 'ch_amazon_gosPffoi', 'BWKEIOV3SV', 'AMAZON-SPO-024', 'https://www.amazon.com/dp/BVLKHQPBMV', 'PremiumBrand Sports Item 24 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 172.90, 207.48, 'USD', 88, 6, 0, 1, 'active', 'error', NULL, NULL, 1, '2026-01-21 19:36:43', 'electronics_4092', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 4927976650, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_ryl2QbVIwRis', 1, NULL, 'CH_001', 'gid://shopify/Product/2105226903', 'SHOPIFY-CLO-012', 'https://wemonks-test.myshopify.com/products/speedy-clothing-item-12', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 33, 2, 2, 1, 'draft', 'synced', '2026-01-22 17:42:44', NULL, 0, NULL, 'gid://shopify/Collection/669362', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 6817690120, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:44', NULL),
('lst_S2m3AHynfWAN', 1, NULL, 'ch_amazon_T991rGxQ', 'BZKVEG8XVQ', 'AMAZON-ELE-022', 'https://www.amazon.com/dp/BK2SJHRZUM', 'EcoLife Electronics Item 22 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 234.65, 281.58, 'USD', 72, 10, 5, 1, 'active', 'synced', '2026-01-22 18:16:40', NULL, 1, '2025-12-23 19:36:40', 'electronics_2909', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 1649019816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_s4zttVAlwfnl', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5141977875', 'SHOPIFY-TOY-013', 'https://outlet.myshopify.com/products/speedy-toys-item-13', 'Speedy Toys Item 13', NULL, NULL, NULL, 277.00, 332.40, 'USD', 12, 5, 3, 1, 'draft', 'synced', '2026-01-22 19:04:45', NULL, 0, NULL, 'gid://shopify/Collection/505740', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 9739817478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_S7viZBzMSSIF', 1, NULL, 'CH_001', 'gid://shopify/Product/6413454947', 'SHOPIFY-HOM-002', 'https://wemonks-test.myshopify.com/products/speedy-home-garden-item-2', 'Speedy Home & Garden Item 2', NULL, NULL, NULL, 171.00, 205.20, 'USD', 62, 5, 1, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-28 19:36:43', 'gid://shopify/Collection/246876', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5736782992, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_SCsDn9DcxzcM', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/6961599546', 'SHOPIFY-ELE-020', 'https://my-store.myshopify.com/products/techgiant-electronics-item-20', 'TechGiant Electronics Item 20', NULL, NULL, NULL, 183.00, 219.60, 'USD', 84, 10, 4, 1, 'pending', 'synced', '2026-01-22 18:41:40', NULL, 0, NULL, 'gid://shopify/Collection/243235', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 2074962829, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_sEG1ZL0UgaAU', 1, NULL, 'CH_001', 'gid://shopify/Product/3008993409', 'SHOPIFY-HOM-019', 'https://wemonks-test.myshopify.com/products/speedy-home-garden-item-19', 'Speedy Home & Garden Item 19', NULL, NULL, NULL, 241.00, 289.20, 'USD', 82, 1, 0, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/550144', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 7675501002, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:44', NULL),
('lst_SF1PeWj9fyVs', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/4852069996', 'SHOPIFY-ELE-008', 'https://my-store.myshopify.com/products/premiumbrand-electronics-item-8', 'PremiumBrand Electronics Item 8', NULL, NULL, NULL, 232.00, 278.40, 'USD', 59, 10, 5, 1, 'active', 'synced', '2026-01-22 18:55:43', NULL, 1, '2025-12-27 19:36:43', 'gid://shopify/Collection/862729', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4928798305, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_sKIgx3GwKpSW', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9525160595', 'SHOPIFY-HOM-008', 'https://outlet.myshopify.com/products/generic-home-garden-item-8', 'Generic Home & Garden Item 8', NULL, NULL, NULL, 204.00, 244.80, 'USD', 84, 2, 1, 1, 'active', 'error', NULL, NULL, 1, '2026-01-09 19:36:42', 'gid://shopify/Collection/733428', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4913319380, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_skYZrgyaMbT8', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/4406139614', 'SHOPIFY-CLO-004', 'https://my-store.myshopify.com/products/speedy-clothing-item-4', 'Speedy Clothing Item 4', NULL, NULL, NULL, 174.00, 208.80, 'USD', 27, 7, 3, 1, 'draft', 'synced', '2026-01-22 17:45:43', NULL, 0, NULL, 'gid://shopify/Collection/600929', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 5732917962, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_smpfmtgCriEA', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/2243108779', 'SHOPIFY-TSHIRT-001', 'https://main-store.myshopify.com/products/classic-white-t-shirt', 'Classic White T-Shirt', NULL, NULL, NULL, 15.00, 18.00, 'USD', 94, 8, 4, 1, 'active', 'synced', '2026-01-22 18:53:43', NULL, 1, '2026-01-14 19:36:43', 'gid://shopify/Collection/633132', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 5580469046, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_soN9PFB0tlIJ', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/7321002940', 'SHOPIFY-SPO-023', 'https://main-store.myshopify.com/products/generic-sports-item-23', 'Generic Sports Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 48, 0, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-04 19:36:45', 'gid://shopify/Collection/196305', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 8337904751, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_SPdajNJdAci6', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/1718892449', 'SHOPIFY-ELE-010', 'https://main-store.myshopify.com/products/generic-electronics-item-10', 'Generic Electronics Item 10', NULL, NULL, NULL, 210.00, 252.00, 'USD', 32, 1, 0, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-09 19:36:41', 'gid://shopify/Collection/688614', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 3140801851, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_SstugZrVQB1Y', 1, NULL, 'CH_001', 'gid://shopify/Product/8094864321', 'SHOPIFY-ELE-006', 'https://wemonks-test.myshopify.com/products/speedy-electronics-item-6', 'Speedy Electronics Item 6', NULL, NULL, NULL, 184.00, 220.80, 'USD', 91, 3, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/310420', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5819467921, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_styvW4CPpDnB', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/7941786631', 'SHOPIFY-ELE-024', 'https://outlet.myshopify.com/products/premiumbrand-electronics-item-24', 'PremiumBrand Electronics Item 24', NULL, NULL, NULL, 290.00, 348.00, 'USD', 39, 4, 1, 1, 'draft', 'synced', '2026-01-22 18:14:39', NULL, 0, NULL, 'gid://shopify/Collection/566720', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 1328101457, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_SU4KSIgpVB0a', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6852274343', 'SHOPIFY-HOM-019', 'https://main-store.myshopify.com/products/speedy-home-garden-item-19', 'Speedy Home & Garden Item 19', NULL, NULL, NULL, 241.00, 289.20, 'USD', 44, 8, 2, 1, 'active', 'synced', '2026-01-22 19:04:44', NULL, 1, '2026-01-16 19:36:44', 'gid://shopify/Collection/771688', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 7675501002, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_SuL6eh0SS5zI', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2508037691', 'SHOPIFY-SPO-003', 'https://outlet.myshopify.com/products/speedy-sports-item-3', 'Speedy Sports Item 3', NULL, NULL, NULL, 294.00, 352.80, 'USD', 47, 7, 3, 1, 'active', 'error', NULL, NULL, 1, '2025-12-28 19:36:44', 'gid://shopify/Collection/815457', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6458516504, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_sVcAgnRTlBL7', 1, NULL, 'ch_ebay_3DDjxBNa', '640358574893', 'EBAY-ELE-012', 'https://www.ebay.com/itm/931515407064', 'NEW Generic Electronics Item 12 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 134.40, 161.28, 'USD', 36, 9, 5, 1, 'active', 'synced', '2026-01-22 18:46:41', NULL, 1, '2025-12-28 19:36:41', '26803', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 2431860707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_SVmcb7nyHeQ4', 1, NULL, 'CH_001', 'gid://shopify/Product/1381487759', 'SHOPIFY-TOY-021', 'https://wemonks-test.myshopify.com/products/ecolife-toys-item-21', 'EcoLife Toys Item 21', NULL, NULL, NULL, 213.00, 255.60, 'USD', 97, 6, 4, 1, 'active', 'synced', '2026-01-22 17:58:44', NULL, 1, '2025-12-30 19:36:44', 'gid://shopify/Collection/697441', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7590524661, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:44', NULL),
('lst_SvVhsQZLVcEF', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4193339044', 'SHOPIFY-HOM-009', 'https://main-store.myshopify.com/products/premiumbrand-home-garden-item-9', 'PremiumBrand Home & Garden Item 9', NULL, NULL, NULL, 101.00, 121.20, 'USD', 67, 7, 4, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/447402', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 7721435113, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_t06woXcWKjhj', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/7493959205', 'SHOPIFY-TOY-002', 'https://my-store.myshopify.com/products/generic-toys-item-2', 'Generic Toys Item 2', NULL, NULL, NULL, 277.00, 332.40, 'USD', 56, 8, 0, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/168143', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 8239632713, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_t4xsZR6q706s', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5582467182', 'SHOPIFY-HOM-005', 'https://my-store.myshopify.com/products/premiumbrand-home-garden-item-5', 'PremiumBrand Home & Garden Item 5', NULL, NULL, NULL, 296.00, 355.20, 'USD', 91, 2, 2, 1, 'error', 'synced', '2026-01-22 18:20:40', NULL, 0, NULL, 'gid://shopify/Collection/366455', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 2110471872, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_t5VmUO8cj6lu', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5272608919', 'SHOPIFY-HOM-003', 'https://my-store.myshopify.com/products/generic-home-garden-item-3', 'Generic Home & Garden Item 3', NULL, NULL, NULL, 179.00, 214.80, 'USD', 33, 6, 3, 1, 'error', 'synced', '2026-01-22 18:40:40', NULL, 0, NULL, 'gid://shopify/Collection/859738', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 1820119014, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_T6NNYLTPcAC2', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5989160770', 'SHOPIFY-HOM-019', 'https://my-store.myshopify.com/products/speedy-home-garden-item-19', 'Speedy Home & Garden Item 19', NULL, NULL, NULL, 241.00, 289.20, 'USD', 99, 8, 1, 1, 'paused', 'synced', '2026-01-22 18:48:44', NULL, 1, '2026-01-08 19:36:44', 'gid://shopify/Collection/646334', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7675501002, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_T9cocToe3Bap', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7126772292', 'SHOPIFY-ELE-012', 'https://my-store.myshopify.com/products/generic-electronics-item-12', 'Generic Electronics Item 12', NULL, NULL, NULL, 128.00, 153.60, 'USD', 74, 4, 2, 1, 'active', 'synced', '2026-01-22 17:59:41', NULL, 1, '2025-12-23 19:36:41', 'gid://shopify/Collection/834201', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 2431860707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_TarcR2iLBZwe', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2146694832', 'SHOPIFY-SPO-005', 'https://outlet.myshopify.com/products/techgiant-sports-item-5', 'TechGiant Sports Item 5', NULL, NULL, NULL, 264.00, 316.80, 'USD', 55, 8, 0, 1, 'pending', 'synced', '2026-01-22 19:17:42', NULL, 0, NULL, 'gid://shopify/Collection/419759', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4857039105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_tAsI4nyXz8do', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3231762697', 'SHOPIFY-CLO-024', 'https://my-store.myshopify.com/products/speedy-clothing-item-24', 'Speedy Clothing Item 24', NULL, NULL, NULL, 175.00, 210.00, 'USD', 64, 1, 0, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/663324', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 8441661960, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_tCmf4cFCC3dz', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8770451957', 'SHOPIFY-SPO-015', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-15', 'PremiumBrand Sports Item 15', NULL, NULL, NULL, 111.00, 133.20, 'USD', 63, 6, 5, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-28 19:36:43', 'gid://shopify/Collection/489356', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 5845138823, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_tHUEauDtGYBN', 1, NULL, 'CH_001', 'gid://shopify/Product/8957490513', 'SHOPIFY-SPO-005', 'https://wemonks-test.myshopify.com/products/techgiant-sports-item-5', 'TechGiant Sports Item 5', NULL, NULL, NULL, 264.00, 316.80, 'USD', 33, 5, 2, 1, 'draft', 'synced', '2026-01-22 18:11:42', NULL, 0, NULL, 'gid://shopify/Collection/584209', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 4857039105, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:42', NULL),
('lst_tJzL4WFlckSC', 1, NULL, 'CH_002', 'BYK9F8VJHH', 'AMAZON-HOM-012', 'https://www.amazon.com/dp/BVGV2ZTKR2', 'TechGiant Home & Garden Item 12 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 277.40, 332.88, 'USD', 50, 5, 1, 1, 'error', 'synced', '2026-01-22 17:44:20', NULL, 0, NULL, 'electronics_9668', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 3161539957, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_tmSFCFAWyUOC', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/7031523220', 'SHOPIFY-TOY-009', 'https://main-store.myshopify.com/products/speedy-toys-item-9', 'Speedy Toys Item 9', NULL, NULL, NULL, 142.00, 170.40, 'USD', 76, 4, 0, 1, 'active', 'error', NULL, NULL, 1, '2026-01-15 19:36:45', 'gid://shopify/Collection/968402', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 8812856134, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_tNGmVpLnZxFJ', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2708500249', 'SHOPIFY-TOY-023', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-23', 'PremiumBrand Toys Item 23', NULL, NULL, NULL, 282.00, 338.40, 'USD', 57, 5, 3, 1, 'paused', 'synced', '2026-01-22 19:02:44', NULL, 1, '2026-01-11 19:36:44', 'gid://shopify/Collection/325224', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 7443455361, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_TnpZ8D8IKEgs', 1, NULL, 'ch_ebay_Ce8BlzeT', '118215004783', 'EBAY-SPO-003', 'https://www.ebay.com/itm/282355010521', 'NEW Speedy Sports Item 3 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 308.70, 370.44, 'USD', 23, 8, 0, 1, 'active', 'synced', '2026-01-22 18:45:20', NULL, 1, '2026-01-06 19:29:20', '50689', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6458516504, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_to0fjtbyAi8E', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3280967354', 'SHOPIFY-CLO-012', 'https://outlet.myshopify.com/products/speedy-clothing-item-12', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 44, 3, 0, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/147612', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 6817690120, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_tpRxttpHsROw', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4106993745', 'SHOPIFY-TOY-022', 'https://main-store.myshopify.com/products/techgiant-toys-item-22', 'TechGiant Toys Item 22', NULL, NULL, NULL, 282.00, 338.40, 'USD', 86, 10, 5, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-18 19:36:40', 'gid://shopify/Collection/869681', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 1686068420, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_tr46ZHBGYb5W', 1, NULL, 'CH_001', 'gid://shopify/Product/7600089827', 'SHOPIFY-ELE-003', 'https://wemonks-test.myshopify.com/products/generic-electronics-item-3', 'Generic Electronics Item 3', NULL, NULL, NULL, 150.00, 180.00, 'USD', 71, 10, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-16 19:36:41', 'gid://shopify/Collection/847623', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 2390461105, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL);
INSERT INTO `listings` (`listing_id`, `company_id`, `created_by_id`, `channel_id`, `marketplace_id`, `marketplace_sku`, `listing_url`, `title_override`, `description_override`, `short_description_override`, `features_override`, `price_override`, `compare_at_price`, `currency`, `quantity_allocated`, `quantity_reserved`, `buffer_quantity`, `sync_quantity`, `status`, `sync_status`, `last_synced_at`, `sync_error`, `is_published`, `published_at`, `category_id`, `product_type`, `tags`, `inventory_policy`, `is_taxable`, `shipping_template_id`, `return_policy_id`, `custom_attributes`, `stock_item_id`, `variant_id`, `mapped_attributes`, `is_linked`, `created_by`, `updated_by`, `version`, `created_at`, `updated_at`, `deleted_at`) VALUES
('lst_tTuBOrWUq12r', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2010254056', 'SHOPIFY-TOY-009', 'https://my-store.myshopify.com/products/speedy-toys-item-9', 'Speedy Toys Item 9', NULL, NULL, NULL, 142.00, 170.40, 'USD', 16, 2, 5, 1, 'active', 'synced', '2026-01-22 19:06:45', NULL, 1, '2025-12-24 19:36:45', 'gid://shopify/Collection/470070', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 8812856134, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_tuuy9IYGOsO4', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8028732508', 'SHOPIFY-TOY-011', 'https://main-store.myshopify.com/products/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11', NULL, NULL, NULL, 254.00, 304.80, 'USD', 89, 1, 4, 1, 'active', 'synced', '2026-01-22 18:16:43', NULL, 1, '2026-01-16 19:36:43', 'gid://shopify/Collection/398340', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 5048836195, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_u31QkElSn7pg', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7576615365', 'SHOPIFY-SPO-021', 'https://my-store.myshopify.com/products/ecolife-sports-item-21', 'EcoLife Sports Item 21', NULL, NULL, NULL, 212.00, 254.40, 'USD', 30, 1, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-19 19:36:42', 'gid://shopify/Collection/756190', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 4708892562, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_U4chlUgz4Man', 1, NULL, 'ch_etsy_djY2iiTV', '245775868', 'ETSY-ELE-002', 'https://www.etsy.com/listing/794842905/techgiant-electronics-item-2', 'TechGiant Electronics Item 2 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 232.30, 278.76, 'USD', 69, 8, 4, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-23 19:29:21', 'category_134', NULL, '[\"new-arrival\", \"handmade\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 7390406486, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('lst_U62E611gEZc6', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9394519830', 'SHOPIFY-TOY-013', 'https://main-store.myshopify.com/products/speedy-toys-item-13', 'Speedy Toys Item 13', NULL, NULL, NULL, 277.00, 332.40, 'USD', 47, 7, 3, 1, 'active', 'synced', '2026-01-22 19:04:45', NULL, 1, '2026-01-08 19:36:45', 'gid://shopify/Collection/732749', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 9739817478, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_ua6FPsJQcSoA', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2830367965', 'SHOPIFY-HOM-006', 'https://outlet.myshopify.com/products/generic-home-garden-item-6', 'Generic Home & Garden Item 6', NULL, NULL, NULL, 143.00, 171.60, 'USD', 99, 0, 5, 1, 'error', 'synced', '2026-01-22 18:33:42', NULL, 0, NULL, 'gid://shopify/Collection/430653', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4161307707, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_UAGwhnu3RBR2', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8042198023', 'SHOPIFY-SPO-025', 'https://my-store.myshopify.com/products/generic-sports-item-25', 'Generic Sports Item 25', NULL, NULL, NULL, 245.00, 294.00, 'USD', 67, 4, 3, 1, 'paused', 'pending', NULL, NULL, 1, '2025-12-25 19:36:42', 'gid://shopify/Collection/391829', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4153094542, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_UbmG7wUOCoLU', 1, NULL, 'ch_amazon_0BTA91gJ', 'BSWQAWGF0L', 'AMAZON-CLO-014', 'https://www.amazon.com/dp/BPA6H2VN3L', 'EcoLife Clothing Item 14 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 197.60, 237.12, 'USD', 16, 10, 5, 1, 'active', 'synced', '2026-01-22 18:13:45', NULL, 1, '2026-01-20 19:36:45', 'electronics_3488', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 9251079947, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_uIkQKrUYsn4o', 1, NULL, 'ch_amazon_KJ2mzh6e', 'BNJ6BMABSN', 'AMAZON-HOM-005', 'https://www.amazon.com/dp/BDLIIEBBMP', 'PremiumBrand Home & Garden Item 5 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 281.20, 337.44, 'USD', 55, 5, 3, 1, 'active', 'synced', '2026-01-22 18:29:20', NULL, 1, '2026-01-11 19:29:20', 'electronics_5595', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 2110471872, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_UKfcz695IT6I', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9902596603', 'SHOPIFY-TOY-019', 'https://my-store.myshopify.com/products/ecolife-toys-item-19', 'EcoLife Toys Item 19', NULL, NULL, NULL, 183.00, 219.60, 'USD', 21, 1, 0, 1, 'error', 'synced', '2026-01-22 18:25:40', NULL, 0, NULL, 'gid://shopify/Collection/844935', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 2035094708, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_ulFqmC9KcxRe', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6997591981', 'SHOPIFY-CLO-017', 'https://my-store.myshopify.com/products/ecolife-clothing-item-17', 'EcoLife Clothing Item 17', NULL, NULL, NULL, 192.00, 230.40, 'USD', 38, 2, 0, 1, 'error', 'synced', '2026-01-22 17:54:45', NULL, 0, NULL, 'gid://shopify/Collection/874317', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 7710154815, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_UncTJJvAH2Lt', 1, NULL, 'ch_walmart_OsHsPEmp', 'WM811841925', 'WALMART-SPO-025', 'https://www.walmart.com/ip/generic-sports-item-25/141235974', 'Generic Sports Item 25 - Best Value', NULL, NULL, NULL, 245.00, 294.00, 'USD', 66, 6, 2, 1, 'paused', 'synced', '2026-01-22 17:41:20', NULL, 1, '2026-01-07 19:29:20', 'cat_36310', NULL, '[\"new-arrival\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 4153094542, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_UOJK0gQvScOB', 1, NULL, 'CH_001', 'gid://shopify/Product/3875974784', 'SHOPIFY-HOM-006', 'https://wemonks-test.myshopify.com/products/generic-home-garden-item-6', 'Generic Home & Garden Item 6', NULL, NULL, NULL, 143.00, 171.60, 'USD', 17, 2, 0, 1, 'error', 'synced', '2026-01-22 18:52:42', NULL, 0, NULL, 'gid://shopify/Collection/118417', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4161307707, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:42', NULL),
('lst_uQs1E3OnHjiB', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5477822255', 'SHOPIFY-ELE-010', 'https://my-store.myshopify.com/products/generic-electronics-item-10', 'Generic Electronics Item 10', NULL, NULL, NULL, 210.00, 252.00, 'USD', 73, 1, 4, 1, 'active', 'synced', '2026-01-22 19:06:41', NULL, 1, '2025-12-27 19:36:41', 'gid://shopify/Collection/243286', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 3140801851, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_utDA3seL44Rw', 1, NULL, 'CH_002', 'B3W97NBLHS', 'AMAZON-CLO-025', 'https://www.amazon.com/dp/BXFFWQMZCH', 'Speedy Clothing Item 25 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 257.45, 308.94, 'USD', 32, 6, 2, 1, 'active', 'synced', '2026-01-22 17:53:20', NULL, 1, '2026-01-01 19:29:20', 'electronics_8043', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 6694279816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_UThHDo4GKpp9', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9408247023', 'SHOPIFY-CLO-004', 'https://main-store.myshopify.com/products/speedy-clothing-item-4', 'Speedy Clothing Item 4', NULL, NULL, NULL, 174.00, 208.80, 'USD', 29, 2, 2, 1, 'draft', 'synced', '2026-01-22 18:46:43', NULL, 0, NULL, 'gid://shopify/Collection/326279', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 5732917962, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_uVMSZ6ZpjQhq', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/7971698235', 'SHOPIFY-CLO-025', 'https://outlet.myshopify.com/products/techgiant-clothing-item-25', 'TechGiant Clothing Item 25', NULL, NULL, NULL, 169.00, 202.80, 'USD', 12, 3, 2, 1, 'active', 'synced', '2026-01-22 18:15:44', NULL, 1, '2025-12-26 19:36:44', 'gid://shopify/Collection/820960', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6694279816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_uzjTEAYANcAm', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8958318261', 'SHOPIFY-ELE-002', 'https://main-store.myshopify.com/products/techgiant-electronics-item-2', 'TechGiant Electronics Item 2', NULL, NULL, NULL, 202.00, 242.40, 'USD', 45, 5, 4, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-02 19:36:44', 'gid://shopify/Collection/304898', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 7390406486, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_uZXRwWdg0Tn3', 1, NULL, 'ch_amazon_gosPffoi', 'BMJ73ZFMQL', 'AMAZON-TSHIRT-001', 'https://www.amazon.com/dp/BX91BKDCHG', 'Classic White T-Shirt - Premium Quality | Fast Shipping', NULL, NULL, NULL, 14.25, 17.10, 'USD', 96, 0, 2, 1, 'active', 'error', NULL, 'Sample sync error: API rate limit exceeded', 1, '2026-01-20 19:19:04', 'electronics_5399', NULL, '[\"new-arrival\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 5580469046, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('lst_v5acZWW6DKdm', 1, NULL, 'CH_001', 'gid://shopify/Product/5667822845', 'SHOPIFY-HOM-003', 'https://wemonks-test.myshopify.com/products/generic-home-garden-item-3', 'Generic Home & Garden Item 3', NULL, NULL, NULL, 179.00, 214.80, 'USD', 72, 7, 3, 1, 'active', 'synced', '2026-01-22 17:47:40', NULL, 1, '2026-01-19 19:36:40', 'gid://shopify/Collection/829324', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 1820119014, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:40', NULL),
('lst_V7VsyC7pwYYy', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7802083681', 'SHOPIFY-TOY-013', 'https://my-store.myshopify.com/products/speedy-toys-item-13', 'Speedy Toys Item 13', NULL, NULL, NULL, 277.00, 332.40, 'USD', 34, 9, 1, 1, 'paused', 'synced', '2026-01-22 19:19:45', NULL, 1, '2026-01-19 19:36:45', 'gid://shopify/Collection/335028', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 9739817478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_v8FZi1F4GOHL', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6076618751', 'SHOPIFY-ELE-022', 'https://my-store.myshopify.com/products/ecolife-electronics-item-22', 'EcoLife Electronics Item 22', NULL, NULL, NULL, 247.00, 296.40, 'USD', 71, 4, 2, 1, 'active', 'synced', '2026-01-22 17:40:40', NULL, 1, '2025-12-28 19:36:40', 'gid://shopify/Collection/730256', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 1649019816, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:40', '2026-01-22 19:36:40', NULL),
('lst_VcMhsxlP4u9H', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4266651057', 'SHOPIFY-TOY-003', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-3', 'PremiumBrand Toys Item 3', NULL, NULL, NULL, 202.00, 242.40, 'USD', 19, 2, 4, 1, 'active', 'error', NULL, NULL, 1, '2026-01-17 19:36:41', 'gid://shopify/Collection/385721', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 2946391230, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_vDWHh4Kgqbaf', 1, NULL, 'ch_amazon_gosPffoi', 'BMS4OPH6NI', 'AMAZON-TOY-003', 'https://www.amazon.com/dp/BBIAJLLTMF', 'PremiumBrand Toys Item 3 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 191.90, 230.28, 'USD', 46, 2, 3, 1, 'active', 'synced', '2026-01-22 19:10:20', NULL, 1, '2025-12-27 19:29:20', 'electronics_4395', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2946391230, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_vfstFBDdeIv8', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2045329289', 'SHOPIFY-NIKE-AM-001', 'https://my-store.myshopify.com/products/nike-air-max', 'Nike Air Max', NULL, NULL, NULL, 120.00, 144.00, 'USD', 33, 5, 3, 1, 'active', 'error', NULL, NULL, 1, '2026-01-06 19:36:42', 'gid://shopify/Collection/449512', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 4080001762, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_VI8ivK87tiHl', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/3569857823', 'SHOPIFY-CLO-017', 'https://my-store.myshopify.com/products/ecolife-clothing-item-17', 'EcoLife Clothing Item 17', NULL, NULL, NULL, 192.00, 230.40, 'USD', 83, 0, 1, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-29 19:36:45', 'gid://shopify/Collection/952393', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 7710154815, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_vmsHgxBQ1TYV', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4232307095', 'SHOPIFY-CLO-014', 'https://my-store.myshopify.com/products/ecolife-clothing-item-14', 'EcoLife Clothing Item 14', NULL, NULL, NULL, 208.00, 249.60, 'USD', 92, 2, 0, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/185783', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 9251079947, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_VO6WYbaTSLbf', 1, NULL, 'CH_001', 'gid://shopify/Product/1033757687', 'SHOPIFY-ELE-008', 'https://wemonks-test.myshopify.com/products/premiumbrand-electronics-item-8', 'PremiumBrand Electronics Item 8', NULL, NULL, NULL, 232.00, 278.40, 'USD', 42, 1, 4, 1, 'active', 'synced', '2026-01-22 18:41:43', NULL, 1, '2026-01-03 19:36:43', 'gid://shopify/Collection/776249', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 4928798305, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_VOmNOP387UCZ', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5359828415', 'SHOPIFY-SPO-021', 'https://my-store.myshopify.com/products/ecolife-sports-item-21', 'EcoLife Sports Item 21', NULL, NULL, NULL, 212.00, 254.40, 'USD', 74, 8, 1, 1, 'error', 'synced', '2026-01-22 18:07:42', NULL, 0, NULL, 'gid://shopify/Collection/882970', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 4708892562, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_VOsQGw7IVYVO', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/3300944328', 'SHOPIFY-TOY-011', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11', NULL, NULL, NULL, 254.00, 304.80, 'USD', 43, 8, 1, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/583352', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 5048836195, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_VR6ERKRlcWqc', 1, NULL, 'CH_001', 'gid://shopify/Product/9252600105', 'SHOPIFY-NIKE-AM-001', 'https://wemonks-test.myshopify.com/products/nike-air-max', 'Nike Air Max', NULL, NULL, NULL, 120.00, 144.00, 'USD', 44, 7, 1, 1, 'pending', 'synced', '2026-01-22 19:28:42', NULL, 0, NULL, 'gid://shopify/Collection/420961', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4080001762, NULL, '{\"title\": \"Nike Air Max\"}', 0, 1, 1, 3, '2026-01-22 19:19:04', '2026-01-22 19:36:42', NULL),
('lst_VRTdlo7DX4xL', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5633376828', 'SHOPIFY-HOM-019', 'https://my-store.myshopify.com/products/speedy-home-garden-item-19', 'Speedy Home & Garden Item 19', NULL, NULL, NULL, 241.00, 289.20, 'USD', 43, 4, 4, 1, 'active', 'synced', '2026-01-22 17:39:44', NULL, 1, '2026-01-12 19:36:44', 'gid://shopify/Collection/526016', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7675501002, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_vtEmtwtcP70x', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2245911461', 'SHOPIFY-SPO-023', 'https://my-store.myshopify.com/products/generic-sports-item-23', 'Generic Sports Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 52, 5, 4, 1, 'draft', 'synced', '2026-01-22 17:47:45', NULL, 0, NULL, 'gid://shopify/Collection/291124', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 8337904751, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_vUGvKBar8pUg', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/4820021854', 'SHOPIFY-SPO-024', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-24', 'PremiumBrand Sports Item 24', NULL, NULL, NULL, 182.00, 218.40, 'USD', 97, 4, 0, 1, 'paused', 'synced', '2026-01-22 17:56:42', NULL, 1, '2026-01-13 19:36:42', 'gid://shopify/Collection/756113', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 4927976650, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_W0uy9bekjyM8', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/6371195294', 'SHOPIFY-CLO-015', 'https://main-store.myshopify.com/products/techgiant-clothing-item-15', 'TechGiant Clothing Item 15', NULL, NULL, NULL, 103.00, 123.60, 'USD', 56, 3, 0, 1, 'draft', 'synced', '2026-01-22 18:11:44', NULL, 0, NULL, 'gid://shopify/Collection/713081', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 7391172006, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_W4KeSExmaP3j', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/9330185310', 'SHOPIFY-TOY-021', 'https://main-store.myshopify.com/products/ecolife-toys-item-21', 'EcoLife Toys Item 21', NULL, NULL, NULL, 213.00, 255.60, 'USD', 63, 5, 0, 1, 'draft', 'synced', '2026-01-22 17:46:44', NULL, 0, NULL, 'gid://shopify/Collection/673843', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 7590524661, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_w69lgqpz4QqV', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3237295214', 'SHOPIFY-SPO-015', 'https://outlet.myshopify.com/products/premiumbrand-sports-item-15', 'PremiumBrand Sports Item 15', NULL, NULL, NULL, 111.00, 133.20, 'USD', 59, 0, 1, 1, 'paused', 'pending', NULL, NULL, 1, '2025-12-31 19:36:43', 'gid://shopify/Collection/292414', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 5845138823, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_w6LMDpAX16BX', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/1928414064', 'SHOPIFY-TOY-011', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11', NULL, NULL, NULL, 254.00, 304.80, 'USD', 30, 7, 0, 1, 'active', 'synced', '2026-01-22 17:52:43', NULL, 1, '2025-12-25 19:36:43', 'gid://shopify/Collection/892787', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 5048836195, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_w8uDd1SOEvyU', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/6318034197', 'SHOPIFY-TOY-014', 'https://my-store.myshopify.com/products/premiumbrand-toys-item-14', 'PremiumBrand Toys Item 14', NULL, NULL, NULL, 249.00, 298.80, 'USD', 18, 3, 0, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-12 19:36:41', 'gid://shopify/Collection/746242', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 2530572154, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_wA3PiOwOYndI', 1, NULL, 'CH_001', 'gid://shopify/Product/8839670063', 'SHOPIFY-TOY-017', 'https://wemonks-test.myshopify.com/products/techgiant-toys-item-17', 'TechGiant Toys Item 17', NULL, NULL, NULL, 268.00, 321.60, 'USD', 45, 4, 3, 1, 'pending', 'synced', '2026-01-22 19:26:42', NULL, 0, NULL, 'gid://shopify/Collection/589637', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 4278376300, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:42', NULL),
('lst_WCKTG0maXcvJ', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/3407303247', 'SHOPIFY-CLO-022', 'https://my-store.myshopify.com/products/ecolife-clothing-item-22', 'EcoLife Clothing Item 22', NULL, NULL, NULL, 267.00, 320.40, 'USD', 11, 7, 1, 1, 'error', 'synced', '2026-01-22 19:14:41', NULL, 0, NULL, 'gid://shopify/Collection/685532', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 2745553505, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_wKBhdzeZVHAX', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9179740464', 'SHOPIFY-SPO-011', 'https://my-store.myshopify.com/products/generic-sports-item-11', 'Generic Sports Item 11', NULL, NULL, NULL, 262.00, 314.40, 'USD', 14, 0, 3, 1, 'active', 'synced', '2026-01-22 18:25:45', NULL, 1, '2026-01-16 19:36:45', 'gid://shopify/Collection/299533', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 8712397485, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_wm8V5oMzncyT', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5130557477', 'SHOPIFY-TOY-003', 'https://outlet.myshopify.com/products/premiumbrand-toys-item-3', 'PremiumBrand Toys Item 3', NULL, NULL, NULL, 202.00, 242.40, 'USD', 72, 3, 5, 1, 'paused', 'synced', '2026-01-22 18:05:41', NULL, 1, '2025-12-23 19:36:41', 'gid://shopify/Collection/364454', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 2946391230, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_wMDuwn8ayx7h', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9875518374', 'SHOPIFY-ELE-018', 'https://my-store.myshopify.com/products/techgiant-electronics-item-18', 'TechGiant Electronics Item 18', NULL, NULL, NULL, 275.00, 330.00, 'USD', 55, 8, 3, 1, 'active', 'synced', '2026-01-22 18:17:41', NULL, 1, '2026-01-14 19:36:41', 'gid://shopify/Collection/730382', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 3010326362, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_wQYuuAW85rdi', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5743911521', 'SHOPIFY-ELE-010', 'https://my-store.myshopify.com/products/generic-electronics-item-10', 'Generic Electronics Item 10', NULL, NULL, NULL, 210.00, 252.00, 'USD', 60, 6, 2, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-15 19:36:41', 'gid://shopify/Collection/273668', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 3140801851, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_wrPvV8X38S8N', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8766073606', 'SHOPIFY-CLO-014', 'https://outlet.myshopify.com/products/ecolife-clothing-item-14', 'EcoLife Clothing Item 14', NULL, NULL, NULL, 208.00, 249.60, 'USD', 87, 0, 0, 1, 'active', 'synced', '2026-01-22 17:44:45', NULL, 1, '2025-12-26 19:36:45', 'gid://shopify/Collection/195034', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 9251079947, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_Wu3xw0AANt7P', 1, NULL, 'CH_001', 'gid://shopify/Product/8657824360', 'SHOPIFY-HOM-012', 'https://wemonks-test.myshopify.com/products/techgiant-home-garden-item-12', 'TechGiant Home & Garden Item 12', NULL, NULL, NULL, 292.00, 350.40, 'USD', 57, 2, 5, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-07 19:36:41', 'gid://shopify/Collection/875350', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 3161539957, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_wUhRCLbIWpuH', 1, NULL, 'CH_001', 'gid://shopify/Product/6490530421', 'SHOPIFY-TOY-002', 'https://wemonks-test.myshopify.com/products/generic-toys-item-2', 'Generic Toys Item 2', NULL, NULL, NULL, 277.00, 332.40, 'USD', 91, 9, 3, 1, 'active', 'error', NULL, NULL, 1, '2025-12-25 19:36:45', 'gid://shopify/Collection/556483', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 8239632713, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:45', NULL),
('lst_WvYPpTrXGcSL', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/8865660974', 'SHOPIFY-ELE-003', 'https://main-store.myshopify.com/products/generic-electronics-item-3', 'Generic Electronics Item 3', NULL, NULL, NULL, 150.00, 180.00, 'USD', 54, 6, 3, 1, 'draft', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/708412', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 2390461105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_WXja4Ng3r7wV', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/6755574654', 'SHOPIFY-ELE-006', 'https://my-store.myshopify.com/products/speedy-electronics-item-6', 'Speedy Electronics Item 6', NULL, NULL, NULL, 184.00, 220.80, 'USD', 72, 10, 5, 1, 'active', 'error', NULL, NULL, 1, '2025-12-31 19:36:43', 'gid://shopify/Collection/238394', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 5819467921, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_X0TbLP8ymjPw', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2943679095', 'SHOPIFY-TSHIRT-001', 'https://outlet.myshopify.com/products/classic-white-t-shirt', 'Classic White T-Shirt', NULL, NULL, NULL, 15.00, 18.00, 'USD', 50, 2, 1, 1, 'error', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/629082', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 5580469046, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_x3lUFfHzta2s', 1, NULL, 'CH_001', 'gid://shopify/Product/7045558966', 'SHOPIFY-ELE-002', 'https://wemonks-test.myshopify.com/products/techgiant-electronics-item-2', 'TechGiant Electronics Item 2', NULL, NULL, NULL, 202.00, 242.40, 'USD', 49, 3, 4, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/145588', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 7390406486, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:21', '2026-01-22 19:36:44', NULL),
('lst_x5bP05gPuiZH', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8192544704', 'SHOPIFY-SPO-023', 'https://my-store.myshopify.com/products/generic-sports-item-23', 'Generic Sports Item 23', NULL, NULL, NULL, 293.00, 351.60, 'USD', 96, 6, 4, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'gid://shopify/Collection/143488', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 8337904751, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_xBfqEaWeFB3R', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9822691024', 'SHOPIFY-ELE-012', 'https://my-store.myshopify.com/products/generic-electronics-item-12', 'Generic Electronics Item 12', NULL, NULL, NULL, 128.00, 153.60, 'USD', 53, 5, 4, 1, 'active', 'synced', '2026-01-22 19:00:41', NULL, 1, '2026-01-01 19:36:41', 'gid://shopify/Collection/323638', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 2431860707, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_XcVV5IOK7C7z', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2648118929', 'SHOPIFY-TOY-010', 'https://my-store.myshopify.com/products/generic-toys-item-10', 'Generic Toys Item 10', NULL, NULL, NULL, 272.00, 326.40, 'USD', 18, 0, 0, 1, 'draft', 'synced', '2026-01-22 19:28:44', NULL, 0, NULL, 'gid://shopify/Collection/461015', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 6991073921, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_xeHKMpxgibwe', 1, NULL, 'ch_ebay_iLk9oXAS', '797169369907', 'EBAY-HOM-005', 'https://www.ebay.com/itm/644087219198', 'NEW PremiumBrand Home & Garden Item 5 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 310.80, 372.96, 'USD', 100, 4, 4, 1, 'paused', 'synced', '2026-01-22 19:18:41', NULL, 1, '2026-01-05 19:36:41', '93955', NULL, '[\"new-arrival\", \"fast-n-free\", \"top-rated\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 2110471872, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_xeknmruG3O79', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/1853056917', 'SHOPIFY-HOM-012', 'https://main-store.myshopify.com/products/techgiant-home-garden-item-12', 'TechGiant Home & Garden Item 12', NULL, NULL, NULL, 292.00, 350.40, 'USD', 42, 10, 3, 1, 'active', 'synced', '2026-01-22 18:07:41', NULL, 1, '2025-12-23 19:36:41', 'gid://shopify/Collection/342632', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 3161539957, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_XfgZkRyCXFLy', 1, NULL, 'CH_001', 'gid://shopify/Product/3393087199', 'SHOPIFY-TOY-001', 'https://wemonks-test.myshopify.com/products/ecolife-toys-item-1', 'EcoLife Toys Item 1', NULL, NULL, NULL, 239.00, 286.80, 'USD', 30, 1, 2, 1, 'draft', 'synced', '2026-01-22 18:34:43', NULL, 0, NULL, 'gid://shopify/Collection/856894', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 6405736263, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_XfijNU6U95hR', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2345149206', 'SHOPIFY-TOY-009', 'https://outlet.myshopify.com/products/speedy-toys-item-9', 'Speedy Toys Item 9', NULL, NULL, NULL, 142.00, 170.40, 'USD', 62, 8, 1, 1, 'error', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/699382', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 8812856134, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_XfSp0Qrp32bo', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5180243222', 'SHOPIFY-SPO-024', 'https://my-store.myshopify.com/products/premiumbrand-sports-item-24', 'PremiumBrand Sports Item 24', NULL, NULL, NULL, 182.00, 218.40, 'USD', 56, 9, 0, 1, 'pending', 'synced', '2026-01-22 18:00:42', NULL, 0, NULL, 'gid://shopify/Collection/678383', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 4927976650, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_XgmpbCIqIYDo', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6815951165', 'SHOPIFY-HOM-008', 'https://my-store.myshopify.com/products/generic-home-garden-item-8', 'Generic Home & Garden Item 8', NULL, NULL, NULL, 204.00, 244.80, 'USD', 16, 0, 5, 1, 'draft', 'synced', '2026-01-22 18:40:42', NULL, 0, NULL, 'gid://shopify/Collection/242599', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 4913319380, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_XGRevJErrE96', 1, NULL, 'ch_etsy_FZznEBGl', '837075579', 'ETSY-CLO-021', 'https://www.etsy.com/listing/719729578/speedy-clothing-item-21', 'Speedy Clothing Item 21 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 119.60, 143.52, 'USD', 42, 4, 5, 1, 'pending', 'synced', '2026-01-22 17:39:20', NULL, 0, NULL, 'category_398', NULL, '[\"new-arrival\", \"handmade\", \"artisan\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6776571785, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:29:20', '2026-01-22 19:29:20', NULL),
('lst_xJbE1m4zjSsd', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4472516118', 'SHOPIFY-SPO-018', 'https://main-store.myshopify.com/products/premiumbrand-sports-item-18', 'PremiumBrand Sports Item 18', NULL, NULL, NULL, 209.00, 250.80, 'USD', 48, 8, 2, 1, 'pending', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/645980', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2259027665, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_xJFcYly5sH67', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/7830246998', 'SHOPIFY-CLO-021', 'https://my-store.myshopify.com/products/speedy-clothing-item-21', 'Speedy Clothing Item 21', NULL, NULL, NULL, 104.00, 124.80, 'USD', 49, 9, 1, 1, 'error', 'synced', '2026-01-22 18:49:44', NULL, 0, NULL, 'gid://shopify/Collection/876080', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 6776571785, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_xKleLxNHO8b9', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/8031754477', 'SHOPIFY-ELE-018', 'https://outlet.myshopify.com/products/techgiant-electronics-item-18', 'TechGiant Electronics Item 18', NULL, NULL, NULL, 275.00, 330.00, 'USD', 37, 3, 3, 1, 'active', 'synced', '2026-01-22 19:15:41', NULL, 1, '2026-01-11 19:36:41', 'gid://shopify/Collection/430340', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 3010326362, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_XLEOeMbp9CBT', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/9503531155', 'SHOPIFY-TOY-014', 'https://outlet.myshopify.com/products/premiumbrand-toys-item-14', 'PremiumBrand Toys Item 14', NULL, NULL, NULL, 249.00, 298.80, 'USD', 60, 5, 4, 1, 'draft', 'synced', '2026-01-22 19:10:41', NULL, 0, NULL, 'gid://shopify/Collection/416425', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 2530572154, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_XLMKNmGtoLNi', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/1186840452', 'SHOPIFY-HOM-009', 'https://outlet.myshopify.com/products/premiumbrand-home-garden-item-9', 'PremiumBrand Home & Garden Item 9', NULL, NULL, NULL, 101.00, 121.20, 'USD', 44, 7, 0, 1, 'draft', 'synced', '2026-01-22 19:09:45', NULL, 0, NULL, 'gid://shopify/Collection/924351', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 7721435113, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_xqOGe2XBBnJt', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/5803699992', 'SHOPIFY-SPO-025', 'https://outlet.myshopify.com/products/generic-sports-item-25', 'Generic Sports Item 25', NULL, NULL, NULL, 245.00, 294.00, 'USD', 89, 2, 2, 1, 'active', 'synced', '2026-01-22 18:10:42', NULL, 1, '2026-01-19 19:36:42', 'gid://shopify/Collection/810998', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 4153094542, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_xRWBRHSC4iJB', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5347868024', 'SHOPIFY-ELE-002', 'https://my-store.myshopify.com/products/techgiant-electronics-item-2', 'TechGiant Electronics Item 2', NULL, NULL, NULL, 202.00, 242.40, 'USD', 87, 0, 1, 1, 'active', 'synced', '2026-01-22 19:19:44', NULL, 1, '2025-12-29 19:36:44', 'gid://shopify/Collection/259376', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 7390406486, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_xteuV5qLQnjX', 1, NULL, 'ch_amazon_KJ2mzh6e', 'BN2TYBOUO1', 'AMAZON-CLO-024', 'https://www.amazon.com/dp/BAE9SUE3SD', 'Speedy Clothing Item 24 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 166.25, 199.50, 'USD', 22, 3, 0, 1, 'pending', 'error', NULL, NULL, 0, NULL, 'electronics_5699', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 8441661960, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_Xvcz4mV494Cs', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/8519355357', 'SHOPIFY-ELE-003', 'https://my-store.myshopify.com/products/generic-electronics-item-3', 'Generic Electronics Item 3', NULL, NULL, NULL, 150.00, 180.00, 'USD', 29, 7, 3, 1, 'active', 'synced', '2026-01-22 17:46:41', NULL, 1, '2025-12-26 19:36:41', 'gid://shopify/Collection/153708', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 2390461105, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_xX5lQLouc7En', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/3677770988', 'SHOPIFY-HOM-016', 'https://my-store.myshopify.com/products/techgiant-home-garden-item-16', 'TechGiant Home & Garden Item 16', NULL, NULL, NULL, 153.00, 183.60, 'USD', 70, 2, 0, 1, 'active', 'synced', '2026-01-22 18:55:45', NULL, 1, '2026-01-06 19:36:45', 'gid://shopify/Collection/737253', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 9152769640, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_y20awOmUinvt', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/5491528155', 'SHOPIFY-SPO-010', 'https://my-store.myshopify.com/products/techgiant-sports-item-10', 'TechGiant Sports Item 10', NULL, NULL, NULL, 178.00, 213.60, 'USD', 40, 9, 5, 1, 'paused', 'synced', '2026-01-22 18:22:43', NULL, 1, '2025-12-26 19:36:43', 'gid://shopify/Collection/559341', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_3', NULL, 5800114824, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_y7cRuoTeBTKE', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/5953168393', 'SHOPIFY-SPO-011', 'https://main-store.myshopify.com/products/generic-sports-item-11', 'Generic Sports Item 11', NULL, NULL, NULL, 262.00, 314.40, 'USD', 29, 1, 1, 1, 'paused', 'error', NULL, NULL, 1, '2026-01-10 19:36:45', 'gid://shopify/Collection/955823', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 8712397485, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_YazE6mDIABDZ', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/4729243783', 'SHOPIFY-SPO-009', 'https://my-store.myshopify.com/products/ecolife-sports-item-9', 'EcoLife Sports Item 9', NULL, NULL, NULL, 300.00, 360.00, 'USD', 51, 3, 5, 1, 'pending', 'synced', '2026-01-22 17:57:39', NULL, 0, NULL, 'gid://shopify/Collection/218010', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 1040703478, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:39', '2026-01-22 19:36:39', NULL),
('lst_yCFuC4Dzs3wT', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5314399658', 'SHOPIFY-SPO-008', 'https://my-store.myshopify.com/products/ecolife-sports-item-8', 'EcoLife Sports Item 8', NULL, NULL, NULL, 101.00, 121.20, 'USD', 18, 6, 2, 1, 'active', 'synced', '2026-01-22 18:06:43', NULL, 1, '2026-01-04 19:36:43', 'gid://shopify/Collection/839715', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 4985216591, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_yDOiohzk7qBk', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/5506921592', 'SHOPIFY-CLO-024', 'https://main-store.myshopify.com/products/speedy-clothing-item-24', 'Speedy Clothing Item 24', NULL, NULL, NULL, 175.00, 210.00, 'USD', 81, 3, 1, 1, 'active', 'synced', '2026-01-22 18:13:45', NULL, 1, '2026-01-10 19:36:45', 'gid://shopify/Collection/932294', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 8441661960, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_YEptjpOWrL8J', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5164422430', 'SHOPIFY-ELE-004', 'https://my-store.myshopify.com/products/generic-electronics-item-4', 'Generic Electronics Item 4', NULL, NULL, NULL, 121.00, 145.20, 'USD', 93, 5, 0, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/249552', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 5083470229, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_yNwa1TOVZoP8', 1, NULL, 'CH_001', 'gid://shopify/Product/2720014577', 'SHOPIFY-HOM-001', 'https://wemonks-test.myshopify.com/products/techgiant-home-garden-item-1', 'TechGiant Home & Garden Item 1', NULL, NULL, NULL, 147.00, 176.40, 'USD', 54, 9, 3, 1, 'active', 'synced', '2026-01-22 17:42:41', NULL, 1, '2025-12-31 19:36:41', 'gid://shopify/Collection/460493', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 3066199103, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:41', NULL),
('lst_yo5zIE90cS8u', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/5476006371', 'SHOPIFY-HOM-019', 'https://my-store.myshopify.com/products/speedy-home-garden-item-19', 'Speedy Home & Garden Item 19', NULL, NULL, NULL, 241.00, 289.20, 'USD', 10, 4, 5, 1, 'active', 'synced', '2026-01-22 19:16:45', NULL, 1, '2026-01-02 19:36:45', 'gid://shopify/Collection/426976', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 7675501002, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_yOf7bsgegLuB', 1, NULL, 'ch_shopify_main', 'gid://shopify/Product/4845051876', 'SHOPIFY-TOY-016', 'https://main-store.myshopify.com/products/premiumbrand-toys-item-16', 'PremiumBrand Toys Item 16', NULL, NULL, NULL, 103.00, 123.60, 'USD', 33, 3, 2, 1, 'error', 'synced', '2026-01-22 19:03:43', NULL, 0, NULL, 'gid://shopify/Collection/564677', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_3', NULL, 5083021107, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_yoZhQoV3tYDL', 1, NULL, 'CH_001', 'gid://shopify/Product/9763724995', 'SHOPIFY-TOY-014', 'https://wemonks-test.myshopify.com/products/premiumbrand-toys-item-14', 'PremiumBrand Toys Item 14', NULL, NULL, NULL, 249.00, 298.80, 'USD', 35, 1, 3, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-10 19:36:41', 'gid://shopify/Collection/451967', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 2530572154, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_ypaamzH8k4Fh', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/8433803393', 'SHOPIFY-TOY-007', 'https://my-store.myshopify.com/products/ecolife-toys-item-7', 'EcoLife Toys Item 7', NULL, NULL, NULL, 290.00, 348.00, 'USD', 52, 3, 1, 1, 'active', 'synced', '2026-01-22 18:47:41', NULL, 1, '2026-01-21 19:36:41', 'gid://shopify/Collection/423557', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 3149329870, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_yrSmaoqcFRXx', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/4899604798', 'SHOPIFY-SPO-005', 'https://my-store.myshopify.com/products/techgiant-sports-item-5', 'TechGiant Sports Item 5', NULL, NULL, NULL, 264.00, 316.80, 'USD', 53, 1, 0, 1, 'paused', 'pending', NULL, NULL, 1, '2026-01-12 19:36:42', 'gid://shopify/Collection/903131', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_2', NULL, 4857039105, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_Ys4u4m9MJZg1', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3164454103', 'SHOPIFY-SPO-018', 'https://outlet.myshopify.com/products/premiumbrand-sports-item-18', 'PremiumBrand Sports Item 18', NULL, NULL, NULL, 209.00, 250.80, 'USD', 19, 10, 0, 1, 'draft', 'synced', '2026-01-22 19:18:41', NULL, 0, NULL, 'gid://shopify/Collection/931001', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_1', NULL, 2259027665, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_YZ2POLSrmqrn', 1, NULL, 'ch_ebay_3DDjxBNa', '674130040117', 'EBAY-HOM-012', 'https://www.ebay.com/itm/867484750853', 'NEW TechGiant Home & Garden Item 12 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 306.60, 367.92, 'USD', 93, 6, 4, 1, 'draft', 'pending', NULL, NULL, 0, NULL, '83741', NULL, '[\"new-arrival\", \"bestseller\", \"fast-n-free\", \"top-rated\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 3161539957, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_z5gyPrfJwQ2O', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2424747119', 'SHOPIFY-HOM-009', 'https://my-store.myshopify.com/products/premiumbrand-home-garden-item-9', 'PremiumBrand Home & Garden Item 9', NULL, NULL, NULL, 101.00, 121.20, 'USD', 99, 7, 1, 1, 'active', 'synced', '2026-01-22 18:07:45', NULL, 1, '2025-12-31 19:36:45', 'gid://shopify/Collection/284943', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_4', 'return_3', NULL, 7721435113, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:45', '2026-01-22 19:36:45', NULL),
('lst_Z9RiZ986rI3E', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/6809120597', 'SHOPIFY-SPO-005', 'https://my-store.myshopify.com/products/techgiant-sports-item-5', 'TechGiant Sports Item 5', NULL, NULL, NULL, 264.00, 316.80, 'USD', 60, 0, 2, 1, 'active', 'synced', '2026-01-22 19:24:42', NULL, 1, '2026-01-07 19:36:42', 'gid://shopify/Collection/136466', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 4857039105, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_ZGEou9YYL6tE', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/2534678692', 'SHOPIFY-HOM-019', 'https://outlet.myshopify.com/products/speedy-home-garden-item-19', 'Speedy Home & Garden Item 19', NULL, NULL, NULL, 241.00, 289.20, 'USD', 72, 7, 2, 1, 'active', 'error', NULL, NULL, 1, '2026-01-12 19:36:44', 'gid://shopify/Collection/253944', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_4', 'return_2', NULL, 7675501002, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_ZgPpdMcu9QC2', 1, NULL, 'ch_shopify_XhRjzH0g', 'gid://shopify/Product/2980735795', 'SHOPIFY-CLO-020', 'https://my-store.myshopify.com/products/generic-clothing-item-20', 'Generic Clothing Item 20', NULL, NULL, NULL, 181.00, 217.20, 'USD', 60, 4, 0, 1, 'active', 'synced', '2026-01-22 17:55:44', NULL, 1, '2025-12-24 19:36:44', 'gid://shopify/Collection/301297', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 6950582016, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_zhKKxvfHvYP7', 1, NULL, 'ch_amazon_gosPffoi', 'BDQQOCQR2Y', 'AMAZON-NIKE-AM-001', 'https://www.amazon.com/dp/BDTZJNUJ3L', 'Nike Air Max - Premium Quality | Fast Shipping', NULL, NULL, NULL, 114.00, 136.80, 'USD', 84, 8, 3, 1, 'draft', 'error', NULL, 'Sample sync error: API rate limit exceeded', 0, NULL, 'electronics_1130', NULL, '[\"new-arrival\", \"bestseller\", \"prime-eligible\", \"amazon-choice\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('lst_zHvTU2b1obMY', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/5540163709', 'SHOPIFY-TOY-001', 'https://my-store.myshopify.com/products/ecolife-toys-item-1', 'EcoLife Toys Item 1', NULL, NULL, NULL, 239.00, 286.80, 'USD', 21, 1, 2, 1, 'pending', 'synced', '2026-01-22 19:09:43', NULL, 0, NULL, 'gid://shopify/Collection/716253', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 6405736263, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL);
INSERT INTO `listings` (`listing_id`, `company_id`, `created_by_id`, `channel_id`, `marketplace_id`, `marketplace_sku`, `listing_url`, `title_override`, `description_override`, `short_description_override`, `features_override`, `price_override`, `compare_at_price`, `currency`, `quantity_allocated`, `quantity_reserved`, `buffer_quantity`, `sync_quantity`, `status`, `sync_status`, `last_synced_at`, `sync_error`, `is_published`, `published_at`, `category_id`, `product_type`, `tags`, `inventory_policy`, `is_taxable`, `shipping_template_id`, `return_policy_id`, `custom_attributes`, `stock_item_id`, `variant_id`, `mapped_attributes`, `is_linked`, `created_by`, `updated_by`, `version`, `created_at`, `updated_at`, `deleted_at`) VALUES
('lst_ZLZZj3NjcWfF', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/3921382142', 'SHOPIFY-TOY-011', 'https://outlet.myshopify.com/products/premiumbrand-toys-item-11', 'PremiumBrand Toys Item 11', NULL, NULL, NULL, 254.00, 304.80, 'USD', 84, 1, 4, 1, 'draft', 'pending', NULL, NULL, 0, NULL, 'gid://shopify/Collection/893648', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 5048836195, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_zMmf78FAJwpj', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/9141013092', 'SHOPIFY-HOM-015', 'https://my-store.myshopify.com/products/generic-home-garden-item-15', 'Generic Home & Garden Item 15', NULL, NULL, NULL, 229.00, 274.80, 'USD', 89, 7, 4, 1, 'error', 'synced', '2026-01-22 18:09:44', NULL, 0, NULL, 'gid://shopify/Collection/543462', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 6700392339, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_zMuZzazDQTyO', 1, NULL, 'CH_001', 'gid://shopify/Product/1332051692', 'SHOPIFY-ELE-024', 'https://wemonks-test.myshopify.com/products/premiumbrand-electronics-item-24', 'PremiumBrand Electronics Item 24', NULL, NULL, NULL, 290.00, 348.00, 'USD', 33, 10, 4, 1, 'active', 'synced', '2026-01-22 18:39:39', NULL, 1, '2026-01-20 19:36:39', 'gid://shopify/Collection/665802', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_1', 'return_2', NULL, 1328101457, NULL, NULL, 1, 1, 1, 2, '2026-01-22 19:29:19', '2026-01-22 19:36:39', NULL),
('lst_Znb6KDRCA4cZ', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2877519826', 'SHOPIFY-SPO-021', 'https://my-store.myshopify.com/products/ecolife-sports-item-21', 'EcoLife Sports Item 21', NULL, NULL, NULL, 212.00, 254.40, 'USD', 68, 10, 1, 1, 'active', 'pending', NULL, NULL, 1, '2026-01-01 19:36:42', 'gid://shopify/Collection/848215', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_2', 'return_1', NULL, 4708892562, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_zQjYRtWzquj1', 1, NULL, 'ch_shopify_outlet', 'gid://shopify/Product/4792037470', 'SHOPIFY-HOM-002', 'https://outlet.myshopify.com/products/speedy-home-garden-item-2', 'Speedy Home & Garden Item 2', NULL, NULL, NULL, 171.00, 205.20, 'USD', 65, 9, 3, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-24 19:36:43', 'gid://shopify/Collection/429261', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_3', 'return_2', NULL, 5736782992, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_zQvflmlpqHzk', 1, NULL, 'ch_ebay_3DDjxBNa', '532846362556', 'EBAY-TOY-014', 'https://www.ebay.com/itm/790574123005', 'NEW PremiumBrand Toys Item 14 - FREE SHIPPING - Fast Dispatch', NULL, NULL, NULL, 261.45, 313.74, 'USD', 26, 8, 4, 1, 'paused', 'synced', '2026-01-22 18:11:41', NULL, 1, '2026-01-03 19:36:41', '57561', NULL, '[\"new-arrival\", \"fast-n-free\"]', 'deny', 1, 'ship_5', 'return_1', NULL, 2530572154, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_ZsbW7FAwS3iR', 1, NULL, 'ch_etsy_hyy1aO8e', '806492766', 'ETSY-CLO-004', 'https://www.etsy.com/listing/166396642/speedy-clothing-item-4', 'Speedy Clothing Item 4 | Handcrafted | Ready to Ship', NULL, NULL, NULL, 200.10, 240.12, 'USD', 27, 3, 5, 1, 'error', 'synced', '2026-01-22 18:27:43', NULL, 0, NULL, 'category_124', NULL, '[\"new-arrival\", \"bestseller\", \"handmade\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 5732917962, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:43', NULL),
('lst_ZUcwLaVtJDeI', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/7444479313', 'SHOPIFY-NIKE-AM-001', 'https://my-store.myshopify.com/products/nike-air-max', 'Nike Air Max', NULL, NULL, NULL, 120.00, 144.00, 'USD', 56, 3, 3, 1, 'error', 'synced', '2026-01-22 18:57:42', NULL, 0, NULL, 'gid://shopify/Collection/538781', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_2', 'return_2', NULL, 4080001762, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:42', '2026-01-22 19:36:42', NULL),
('lst_zuhYgz4coDva', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/2900539507', 'SHOPIFY-CLO-012', 'https://my-store.myshopify.com/products/speedy-clothing-item-12', 'Speedy Clothing Item 12', NULL, NULL, NULL, 281.00, 337.20, 'USD', 55, 10, 5, 1, 'active', 'error', NULL, NULL, 1, '2025-12-23 19:36:44', 'gid://shopify/Collection/419521', NULL, '[\"new-arrival\", \"featured\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 6817690120, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:44', '2026-01-22 19:36:44', NULL),
('lst_ZvvkFAbWOhQp', 1, NULL, 'CH_001', 'gid://shopify/Product/7543903610', 'SHOPIFY-CLO-021', 'https://wemonks-test.myshopify.com/products/speedy-clothing-item-21', 'Speedy Clothing Item 21', NULL, NULL, NULL, 104.00, 124.80, 'USD', 78, 10, 0, 1, 'error', 'synced', '2026-01-22 17:42:44', NULL, 0, NULL, 'gid://shopify/Collection/708880', NULL, '[\"new-arrival\", \"bestseller\", \"featured\"]', 'deny', 1, 'ship_1', 'return_1', NULL, 6776571785, NULL, NULL, 0, 1, 1, 2, '2026-01-22 19:29:20', '2026-01-22 19:36:44', NULL),
('lst_ZwD8mE49WUen', 1, NULL, 'ch_shopify_3CAUi8Wv', 'gid://shopify/Product/6440190965', 'SHOPIFY-SPO-008', 'https://my-store.myshopify.com/products/ecolife-sports-item-8', 'EcoLife Sports Item 8', NULL, NULL, NULL, 101.00, 121.20, 'USD', 18, 3, 3, 1, 'draft', 'synced', '2026-01-22 19:13:43', NULL, 0, NULL, 'gid://shopify/Collection/679661', NULL, '[\"new-arrival\", \"bestseller\", \"featured\", \"sale\"]', 'deny', 1, 'ship_3', 'return_1', NULL, 4985216591, NULL, NULL, 0, 1, 1, 1, '2026-01-22 19:36:43', '2026-01-22 19:36:43', NULL),
('lst_ZWXa9QFOK83X', 1, NULL, 'ch_shopify_ne7Z3sHX', 'gid://shopify/Product/2190103503', 'SHOPIFY-ELE-018', 'https://my-store.myshopify.com/products/techgiant-electronics-item-18', 'TechGiant Electronics Item 18', NULL, NULL, NULL, 275.00, 330.00, 'USD', 44, 0, 0, 1, 'active', 'synced', '2026-01-22 19:27:41', NULL, 1, '2026-01-16 19:36:41', 'gid://shopify/Collection/542928', NULL, '[\"new-arrival\", \"featured\", \"sale\"]', 'deny', 1, 'ship_5', 'return_3', NULL, 3010326362, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:36:41', '2026-01-22 19:36:41', NULL),
('lst_ZXSPIUUUivtI', 1, NULL, 'CH_002', 'BDFP1PBVNV', 'AMAZON-CLO-024', 'https://www.amazon.com/dp/BYU9JBPFR4', 'Speedy Clothing Item 24 - Premium Quality | Fast Shipping', NULL, NULL, NULL, 166.25, 199.50, 'USD', 98, 3, 2, 1, 'active', 'pending', NULL, NULL, 1, '2025-12-23 19:29:21', 'electronics_9649', NULL, '[\"new-arrival\", \"prime-eligible\"]', 'deny', 1, 'ship_3', 'return_3', NULL, 8441661960, NULL, NULL, 1, 1, 1, 1, '2026-01-22 19:29:21', '2026-01-22 19:29:21', NULL),
('LST-NIKE-AM-001-Amazon', NULL, NULL, 'CH_002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'active', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4080001762, NULL, '{\"title\": \"Nike Air Max\"}', 1, NULL, NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL),
('LST-NIKE-AM-001-POS', NULL, NULL, 'CH_003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 0, 0, 0, 1, 'active', 'pending', NULL, NULL, 0, NULL, NULL, NULL, NULL, 'deny', 1, NULL, NULL, NULL, 4080001762, NULL, '{\"title\": \"Nike Air Max\"}', 1, NULL, NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_19_170252_create_personal_access_tokens_table', 1),
(5, '2026_01_19_171655_create_products_table', 1),
(6, '2026_01_19_171656_create_product_variants_table', 1),
(7, '2026_01_19_171921_add_google_fields_to_users_table', 1),
(8, '2026_01_19_172018_create_permission_tables', 1),
(9, '2026_01_20_012304_create_companies_table', 1),
(10, '2026_01_20_012305_add_company_columns_to_users_table', 1),
(11, '2026_01_20_014446_create_packages_table', 1),
(12, '2026_01_20_014447_create_coupons_table', 1),
(13, '2026_01_20_014448_add_otp_to_users_table', 1),
(14, '2026_01_20_014450_add_subscription_to_companies_table', 1),
(15, '2026_01_20_022212_add_company_id_to_products_table', 1),
(16, '2026_01_20_034229_align_products_table_with_pippa_spec', 1),
(17, '2026_01_20_034230_create_pippa_related_tables', 1),
(18, '2026_01_20_042239_add_business_name_to_products_table', 1),
(19, '2026_01_20_170445_add_price_to_stock_levels_table', 1),
(20, '2026_01_20_195538_create_attributes_table', 1),
(21, '2026_01_20_200701_create_shopify_products_table', 1),
(22, '2026_01_20_200703_create_shopify_product_variants_table', 1),
(23, '2026_01_20_200706_create_shopify_inventory_items_table', 1),
(24, '2026_01_20_200713_create_shopify_inventory_levels_table', 1),
(25, '2026_01_20_201241_create_shopify_stores_table', 1),
(26, '2026_01_20_201242_create_shopify_logs_table', 1),
(27, '2026_01_20_201250_create_shopify_product_mappings_table', 1),
(28, '2026_01_20_202258_add_webhook_secret_to_shopify_stores_table', 1),
(29, '2026_01_20_202919_modify_attributes_table', 1),
(30, '2026_01_20_203247_add_business_and_user_to_core_tables', 1),
(31, '2026_01_20_204242_create_company_user_table', 1),
(32, '2026_01_20_204249_create_invitations_table', 1),
(33, '2026_01_20_205018_add_licensing_to_teams_and_companies_table', 1),
(34, '2026_01_21_215500_create_channels_and_listings_tables', 1),
(35, '2026_01_22_000001_normalize_channels_and_listings_tables', 1),
(36, '2026_01_22_064800_enhance_channels_listings_blueprint_v2', 1),
(37, '2026_01_22_082000_add_shopify_fields_to_products_listings', 1),
(38, '2026_01_22_105528_add_stock_type_to_products_table', 1),
(39, '2026_01_22_155436_add_details_to_product_variants_table', 1),
(40, '2026_01_22_163430_add_extra_columns_to_product_variants_table', 1),
(41, '2026_01_22_233000_modify_image_column_in_product_variants_table', 1),
(42, '2026_01_22_235000_modify_images_column_in_products_table', 1),
(43, '2026_01_23_005234_change_listing_status_to_string_on_listings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(2, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(4, 'App\\Models\\User', 3),
(1, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `features` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `name`, `price`, `features`, `created_at`, `updated_at`) VALUES
(1, 'Starter', 0.00, '[\"1 User\", \"Basic Inventory\", \"500 Products\", \"Email Support\"]', '2026-01-22 19:19:05', '2026-01-22 19:36:46'),
(2, 'Pro', 29.00, '[\"5 Users\", \"Advanced Inventory\", \"Unlimited Products\", \"Priority Support\", \"Analytics\"]', '2026-01-22 19:19:05', '2026-01-22 19:36:46'),
(3, 'Business', 99.00, '[\"Unlimited Users\", \"Multi-Warehouse\", \"API Access\", \"Dedicated Manager\", \"Custom Reports\"]', '2026-01-22 19:19:05', '2026-01-22 19:36:46');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'company.manage', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(2, 'team.manage', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(3, 'team.invite', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(4, 'team.activate', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(5, 'team.deactivate', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(6, 'product.create', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(7, 'product.update', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(8, 'inventory.view', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(9, 'inventory.adjust', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(10, 'order.create', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(11, 'order.approve', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'd17f77739278a22c6a94254ce409772b9ca4999a4b8de891ab73c0b9b2a46db0', '[\"*\"]', '2026-01-23 06:55:57', NULL, '2026-01-22 19:31:06', '2026-01-23 06:55:57'),
(2, 'App\\Models\\User', 1, 'auth_token', 'b0b2b9d147b96ba67a0343bc57bd8b3746656ab81fb30ffff8a7f5383e4061a3', '[\"*\"]', '2026-01-23 07:04:02', NULL, '2026-01-23 06:56:08', '2026-01-23 07:04:02');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED NOT NULL,
  `business_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Simple','Variant') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Simple',
  `stock_type` enum('basic','parent','variant','kit') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'basic',
  `item_type` enum('physical','digital','service') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'physical',
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_country_code` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `options` json DEFAULT NULL,
  `uom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `track_inventory` tinyint(1) NOT NULL DEFAULT '1',
  `initial_quantity` int NOT NULL DEFAULT '0',
  `reorder_level` int NOT NULL DEFAULT '0',
  `safety_stock` int NOT NULL DEFAULT '0',
  `allow_backorder` tinyint(1) NOT NULL DEFAULT '0',
  `warehouse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `selling_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_value` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tax_class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` longtext COLLATE utf8mb4_unicode_ci,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draft',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `visibility` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Public',
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `internal_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `version` int NOT NULL DEFAULT '1',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `company_id`, `business_name`, `name`, `type`, `stock_type`, `item_type`, `sku`, `barcode`, `category`, `brand`, `manufacturer_name`, `manufacturer_country_code`, `manufacturer_state`, `manufacturer_postal_code`, `description`, `options`, `uom`, `track_inventory`, `initial_quantity`, `reorder_level`, `safety_stock`, `allow_backorder`, `warehouse`, `bin`, `location_note`, `cost_price`, `selling_price`, `discount_type`, `discount_value`, `tax_class`, `images`, `thumbnail`, `video_url`, `status`, `is_published`, `published_at`, `visibility`, `created_by_id`, `updated_by`, `internal_notes`, `created_at`, `updated_at`, `version`, `deleted_at`) VALUES
(1040703478, 1, NULL, 'EcoLife Sports Item 9', 'Simple', 'basic', 'physical', 'SPO-009', NULL, 'Sports', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Sports item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 402, 12, 6, 0, NULL, NULL, NULL, 29.00, 300.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(1328101457, 1, NULL, 'PremiumBrand Electronics Item 24', 'Variant', 'basic', 'physical', 'ELE-024', NULL, 'Electronics', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 129, 12, 5, 0, NULL, NULL, NULL, 96.00, 290.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(1450261977, 1, NULL, 'EcoLife Electronics Item 23', 'Simple', 'basic', 'physical', 'ELE-023', NULL, 'Electronics', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 159, 20, 3, 0, NULL, NULL, NULL, 43.00, 293.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(1649019816, 1, NULL, 'EcoLife Electronics Item 22', 'Simple', 'basic', 'physical', 'ELE-022', NULL, 'Electronics', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 492, 13, 2, 0, NULL, NULL, NULL, 68.00, 247.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(1686068420, 1, NULL, 'TechGiant Toys Item 22', 'Simple', 'basic', 'physical', 'TOY-022', NULL, 'Toys', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Toys item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 266, 11, 8, 0, NULL, NULL, NULL, 58.00, 282.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(1820119014, 1, NULL, 'Generic Home & Garden Item 3', 'Simple', 'basic', 'physical', 'HOM-003', NULL, 'Home & Garden', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 491, 5, 7, 0, NULL, NULL, NULL, 43.00, 179.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(2035094708, 1, NULL, 'EcoLife Toys Item 19', 'Simple', 'basic', 'physical', 'TOY-019', NULL, 'Toys', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Toys item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 82, 8, 10, 0, NULL, NULL, NULL, 40.00, 183.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(2074962829, 1, NULL, 'TechGiant Electronics Item 20', 'Variant', 'basic', 'physical', 'ELE-020', NULL, 'Electronics', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 252, 15, 8, 0, NULL, NULL, NULL, 26.00, 183.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(2110471872, 1, NULL, 'PremiumBrand Home & Garden Item 5', 'Simple', 'basic', 'physical', 'HOM-005', NULL, 'Home & Garden', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 31, 14, 4, 0, NULL, NULL, NULL, 31.00, 296.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(2259027665, 1, NULL, 'PremiumBrand Sports Item 18', 'Simple', 'basic', 'physical', 'SPO-018', NULL, 'Sports', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Sports item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 399, 15, 9, 0, NULL, NULL, NULL, 79.00, 209.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:36:39', 1, NULL),
(2390461105, 1, NULL, 'Generic Electronics Item 3', 'Simple', 'basic', 'physical', 'ELE-003', NULL, 'Electronics', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 276, 16, 10, 0, NULL, NULL, NULL, 28.00, 150.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(2431860707, 1, NULL, 'Generic Electronics Item 12', 'Variant', 'basic', 'physical', 'ELE-012', NULL, 'Electronics', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 207, 20, 5, 0, NULL, NULL, NULL, 66.00, 128.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(2530572154, 1, NULL, 'PremiumBrand Toys Item 14', 'Simple', 'basic', 'physical', 'TOY-014', NULL, 'Toys', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Toys item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 245, 11, 8, 0, NULL, NULL, NULL, 83.00, 249.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(2745553505, 1, NULL, 'EcoLife Clothing Item 22', 'Simple', 'basic', 'physical', 'CLO-022', NULL, 'Clothing', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 332, 11, 4, 0, NULL, NULL, NULL, 19.00, 267.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(2946391230, 1, NULL, 'PremiumBrand Toys Item 3', 'Simple', 'basic', 'physical', 'TOY-003', NULL, 'Toys', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Toys item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 156, 12, 8, 0, NULL, NULL, NULL, 58.00, 202.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:28:59', '2026-01-22 19:28:59', 1, NULL),
(3010326362, 1, NULL, 'TechGiant Electronics Item 18', 'Simple', 'basic', 'physical', 'ELE-018', NULL, 'Electronics', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 10, 12, 7, 0, NULL, NULL, NULL, 34.00, 275.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(3066199103, 1, NULL, 'TechGiant Home & Garden Item 1', 'Simple', 'basic', 'physical', 'HOM-001', NULL, 'Home & Garden', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 352, 5, 10, 0, NULL, NULL, NULL, 48.00, 147.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(3140801851, 1, NULL, 'Generic Electronics Item 10', 'Simple', 'basic', 'physical', 'ELE-010', NULL, 'Electronics', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 250, 14, 3, 0, NULL, NULL, NULL, 88.00, 210.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(3149329870, 1, NULL, 'EcoLife Toys Item 7', 'Simple', 'basic', 'physical', 'TOY-007', NULL, 'Toys', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Toys item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 400, 5, 5, 0, NULL, NULL, NULL, 84.00, 290.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:36:38', 1, NULL),
(3161539957, 1, NULL, 'TechGiant Home & Garden Item 12', 'Variant', 'basic', 'physical', 'HOM-012', NULL, 'Home & Garden', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 305, 5, 5, 0, NULL, NULL, NULL, 17.00, 292.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(4080001762, 1, NULL, 'Nike Air Max', 'Variant', 'basic', 'physical', 'NIKE-AM-001', NULL, 'Footwear', 'Nike', NULL, NULL, NULL, NULL, 'Running shoes with air cushioning.', NULL, 'pair', 1, 0, 0, 0, 0, NULL, NULL, NULL, 60.00, 120.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', 1, NULL),
(4153094542, 1, NULL, 'Generic Sports Item 25', 'Simple', 'basic', 'physical', 'SPO-025', NULL, 'Sports', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Sports item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 124, 6, 10, 0, NULL, NULL, NULL, 60.00, 245.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(4161307707, 1, NULL, 'Generic Home & Garden Item 6', 'Simple', 'basic', 'physical', 'HOM-006', NULL, 'Home & Garden', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 166, 14, 8, 0, NULL, NULL, NULL, 73.00, 143.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(4278376300, 1, NULL, 'TechGiant Toys Item 17', 'Simple', 'basic', 'physical', 'TOY-017', NULL, 'Toys', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Toys item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 269, 13, 3, 0, NULL, NULL, NULL, 33.00, 268.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(4708892562, 1, NULL, 'EcoLife Sports Item 21', 'Simple', 'basic', 'physical', 'SPO-021', NULL, 'Sports', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Sports item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 350, 19, 9, 0, NULL, NULL, NULL, 55.00, 212.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(4740661352, 1, NULL, 'Speedy Electronics Item 19', 'Simple', 'basic', 'physical', 'ELE-019', NULL, 'Electronics', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 260, 20, 5, 0, NULL, NULL, NULL, 38.00, 134.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(4857039105, 1, NULL, 'TechGiant Sports Item 5', 'Simple', 'basic', 'physical', 'SPO-005', NULL, 'Sports', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Sports item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 241, 14, 10, 0, NULL, NULL, NULL, 50.00, 264.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:36:38', 1, NULL),
(4913319380, 1, NULL, 'Generic Home & Garden Item 8', 'Variant', 'basic', 'physical', 'HOM-008', NULL, 'Home & Garden', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 125, 16, 2, 0, NULL, NULL, NULL, 57.00, 204.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(4927976650, 1, NULL, 'PremiumBrand Sports Item 24', 'Variant', 'basic', 'physical', 'SPO-024', NULL, 'Sports', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Sports item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 466, 14, 5, 0, NULL, NULL, NULL, 30.00, 182.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(4928798305, 1, NULL, 'PremiumBrand Electronics Item 8', 'Variant', 'basic', 'physical', 'ELE-008', NULL, 'Electronics', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 317, 13, 10, 0, NULL, NULL, NULL, 36.00, 232.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(4985216591, 1, NULL, 'EcoLife Sports Item 8', 'Variant', 'basic', 'physical', 'SPO-008', NULL, 'Sports', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Sports item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 133, 15, 2, 0, NULL, NULL, NULL, 50.00, 101.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(5048836195, 1, NULL, 'PremiumBrand Toys Item 11', 'Simple', 'basic', 'physical', 'TOY-011', NULL, 'Toys', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Toys item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 141, 18, 8, 0, NULL, NULL, NULL, 96.00, 254.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(5083021107, 1, NULL, 'PremiumBrand Toys Item 16', 'Variant', 'basic', 'physical', 'TOY-016', NULL, 'Toys', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Toys item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 363, 11, 10, 0, NULL, NULL, NULL, 44.00, 103.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:29:19', 1, NULL),
(5083470229, 1, NULL, 'Generic Electronics Item 4', 'Variant', 'basic', 'physical', 'ELE-004', NULL, 'Electronics', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 303, 19, 8, 0, NULL, NULL, NULL, 95.00, 121.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:36:38', 1, NULL),
(5383015778, 1, NULL, 'EcoLife Sports Item 13', 'Simple', 'basic', 'physical', 'SPO-013', NULL, 'Sports', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Sports item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 208, 17, 9, 0, NULL, NULL, NULL, 82.00, 204.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(5580469046, 1, NULL, 'Classic White T-Shirt', 'Simple', 'basic', 'physical', 'TSHIRT-001', NULL, 'Clothing', 'Essentials', NULL, NULL, NULL, NULL, 'A high-quality cotton white t-shirt.', NULL, 'pcs', 1, 100, 20, 10, 0, NULL, NULL, NULL, 5.00, 15.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', 1, NULL),
(5732917962, 1, NULL, 'Speedy Clothing Item 4', 'Variant', 'basic', 'physical', 'CLO-004', NULL, 'Clothing', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 83, 17, 9, 0, NULL, NULL, NULL, 15.00, 174.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(5736782992, 1, NULL, 'Speedy Home & Garden Item 2', 'Simple', 'basic', 'physical', 'HOM-002', NULL, 'Home & Garden', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 104, 11, 9, 0, NULL, NULL, NULL, 77.00, 171.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(5800114824, 1, NULL, 'TechGiant Sports Item 10', 'Simple', 'basic', 'physical', 'SPO-010', NULL, 'Sports', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Sports item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 309, 12, 4, 0, NULL, NULL, NULL, 59.00, 178.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(5819467921, 1, NULL, 'Speedy Electronics Item 6', 'Simple', 'basic', 'physical', 'ELE-006', NULL, 'Electronics', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 416, 20, 6, 0, NULL, NULL, NULL, 68.00, 184.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(5845138823, 1, NULL, 'PremiumBrand Sports Item 15', 'Simple', 'basic', 'physical', 'SPO-015', NULL, 'Sports', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Sports item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 182, 14, 10, 0, NULL, NULL, NULL, 34.00, 111.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(6400266186, 1, NULL, 'PremiumBrand Sports Item 6', 'Simple', 'basic', 'physical', 'SPO-006', NULL, 'Sports', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Sports item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 131, 5, 6, 0, NULL, NULL, NULL, 22.00, 168.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(6405736263, 1, NULL, 'EcoLife Toys Item 1', 'Simple', 'basic', 'physical', 'TOY-001', NULL, 'Toys', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Toys item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 236, 6, 10, 0, NULL, NULL, NULL, 69.00, 239.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:36:38', 1, NULL),
(6458516504, 1, NULL, 'Speedy Sports Item 3', 'Simple', 'basic', 'physical', 'SPO-003', NULL, 'Sports', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Sports item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 293, 6, 2, 0, NULL, NULL, NULL, 95.00, 294.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(6694279816, 1, NULL, 'TechGiant Clothing Item 25', 'Simple', 'basic', 'physical', 'CLO-025', NULL, 'Clothing', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 79, 5, 5, 0, NULL, NULL, NULL, 30.00, 169.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:36:39', 1, NULL),
(6700392339, 1, NULL, 'Generic Home & Garden Item 15', 'Simple', 'basic', 'physical', 'HOM-015', NULL, 'Home & Garden', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 312, 16, 2, 0, NULL, NULL, NULL, 53.00, 229.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(6776571785, 1, NULL, 'Speedy Clothing Item 21', 'Simple', 'basic', 'physical', 'CLO-021', NULL, 'Clothing', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 138, 8, 2, 0, NULL, NULL, NULL, 39.00, 104.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(6817690120, 1, NULL, 'Speedy Clothing Item 12', 'Variant', 'basic', 'physical', 'CLO-012', NULL, 'Clothing', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 149, 6, 8, 0, NULL, NULL, NULL, 41.00, 281.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(6950582016, 1, NULL, 'Generic Clothing Item 20', 'Variant', 'basic', 'physical', 'CLO-020', NULL, 'Clothing', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 17, 14, 10, 0, NULL, NULL, NULL, 17.00, 181.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:29:19', 1, NULL),
(6991073921, 1, NULL, 'Generic Toys Item 10', 'Simple', 'basic', 'physical', 'TOY-010', NULL, 'Toys', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Toys item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 454, 15, 7, 0, NULL, NULL, NULL, 27.00, 272.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(7390406486, 1, NULL, 'TechGiant Electronics Item 2', 'Simple', 'basic', 'physical', 'ELE-002', NULL, 'Electronics', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 149, 18, 7, 0, NULL, NULL, NULL, 31.00, 202.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:29:19', 1, NULL),
(7391172006, 1, NULL, 'TechGiant Clothing Item 15', 'Simple', 'basic', 'physical', 'CLO-015', NULL, 'Clothing', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 382, 10, 3, 0, NULL, NULL, NULL, 44.00, 103.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:38', '2026-01-22 19:36:38', 1, NULL),
(7443455361, 1, NULL, 'PremiumBrand Toys Item 23', 'Simple', 'basic', 'physical', 'TOY-023', NULL, 'Toys', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Toys item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 210, 14, 6, 0, NULL, NULL, NULL, 20.00, 282.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(7590524661, 1, NULL, 'EcoLife Toys Item 21', 'Simple', 'basic', 'physical', 'TOY-021', NULL, 'Toys', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Toys item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 234, 9, 3, 0, NULL, NULL, NULL, 21.00, 213.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(7675501002, 1, NULL, 'Speedy Home & Garden Item 19', 'Simple', 'basic', 'physical', 'HOM-019', NULL, 'Home & Garden', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 110, 17, 9, 0, NULL, NULL, NULL, 97.00, 241.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(7710154815, 1, NULL, 'EcoLife Clothing Item 17', 'Simple', 'basic', 'physical', 'CLO-017', NULL, 'Clothing', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 230, 19, 5, 0, NULL, NULL, NULL, 82.00, 192.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:36:39', 1, NULL),
(7721435113, 1, NULL, 'PremiumBrand Home & Garden Item 9', 'Simple', 'basic', 'physical', 'HOM-009', NULL, 'Home & Garden', 'PremiumBrand', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from PremiumBrand. Perfect for daily use.', NULL, 'pcs', 1, 29, 19, 10, 0, NULL, NULL, NULL, 23.00, 101.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(8239632713, 1, NULL, 'Generic Toys Item 2', 'Simple', 'basic', 'physical', 'TOY-002', NULL, 'Toys', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Toys item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 12, 9, 9, 0, NULL, NULL, NULL, 38.00, 277.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:28:59', '2026-01-22 19:28:59', 1, NULL),
(8337904751, 1, NULL, 'Generic Sports Item 23', 'Simple', 'basic', 'physical', 'SPO-023', NULL, 'Sports', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Sports item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 453, 16, 10, 0, NULL, NULL, NULL, 49.00, 293.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(8441661960, 1, NULL, 'Speedy Clothing Item 24', 'Variant', 'basic', 'physical', 'CLO-024', NULL, 'Clothing', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 477, 14, 6, 0, NULL, NULL, NULL, 10.00, 175.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(8622969261, 1, NULL, 'Speedy Electronics Item 14', 'Simple', 'basic', 'physical', 'ELE-014', NULL, 'Electronics', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Electronics item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 442, 6, 7, 0, NULL, NULL, NULL, 13.00, 125.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:26:35', 1, NULL),
(8712397485, 1, NULL, 'Generic Sports Item 11', 'Simple', 'basic', 'physical', 'SPO-011', NULL, 'Sports', 'Generic', NULL, NULL, NULL, NULL, 'A high-quality Sports item from Generic. Perfect for daily use.', NULL, 'pcs', 1, 450, 8, 5, 0, NULL, NULL, NULL, 53.00, 262.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:26:35', '2026-01-22 19:36:38', 1, NULL),
(8812856134, 1, NULL, 'Speedy Toys Item 9', 'Simple', 'basic', 'physical', 'TOY-009', NULL, 'Toys', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Toys item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 167, 5, 10, 0, NULL, NULL, NULL, 12.00, 142.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(9152769640, 1, NULL, 'TechGiant Home & Garden Item 16', 'Variant', 'basic', 'physical', 'HOM-016', NULL, 'Home & Garden', 'TechGiant', NULL, NULL, NULL, NULL, 'A high-quality Home & Garden item from TechGiant. Perfect for daily use.', NULL, 'pcs', 1, 372, 20, 6, 0, NULL, NULL, NULL, 92.00, 153.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:36:39', '2026-01-22 19:36:39', 1, NULL),
(9251079947, 1, NULL, 'EcoLife Clothing Item 14', 'Simple', 'basic', 'physical', 'CLO-014', NULL, 'Clothing', 'EcoLife', NULL, NULL, NULL, NULL, 'A high-quality Clothing item from EcoLife. Perfect for daily use.', NULL, 'pcs', 1, 108, 11, 9, 0, NULL, NULL, NULL, 43.00, 208.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:29:19', 1, NULL),
(9739817478, 1, NULL, 'Speedy Toys Item 13', 'Simple', 'basic', 'physical', 'TOY-013', NULL, 'Toys', 'Speedy', NULL, NULL, NULL, NULL, 'A high-quality Toys item from Speedy. Perfect for daily use.', NULL, 'pcs', 1, 117, 10, 4, 0, NULL, NULL, NULL, 56.00, 277.00, NULL, 0.00, NULL, NULL, NULL, NULL, 'Active', 0, NULL, 'Public', 1, NULL, NULL, '2026-01-22 19:29:19', '2026-01-22 19:36:38', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `selling_price` decimal(10,2) DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplier_data` json DEFAULT NULL,
  `specifications` json DEFAULT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci,
  `attributes` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `inventory_quantity` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `name`, `sku`, `barcode`, `cost_price`, `selling_price`, `brand`, `category`, `supplier_data`, `specifications`, `image`, `attributes`, `status`, `inventory_quantity`, `created_at`, `updated_at`) VALUES
(1, 4080001762, 'Nike Air Max - Red / 42', 'NIKE-AM-RED-42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\",\"Size\":\"42\"}', 'active', 0, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(2, 4080001762, 'Nike Air Max - Blue / 44', 'NIKE-AM-BLUE-44', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\",\"Size\":\"44\"}', 'active', 0, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(3, 5083470229, 'Generic Electronics Item 4 - Red', 'ELE-004-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:36:38'),
(4, 5083470229, 'Generic Electronics Item 4 - Blue', 'ELE-004-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:36:38'),
(5, 5083470229, 'Generic Electronics Item 4 - Black', 'ELE-004-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:36:38'),
(6, 4985216591, 'EcoLife Sports Item 8 - Red', 'SPO-008-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(7, 4985216591, 'EcoLife Sports Item 8 - Blue', 'SPO-008-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(8, 4985216591, 'EcoLife Sports Item 8 - Green', 'SPO-008-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(9, 6817690120, 'Speedy Clothing Item 12 - Red', 'CLO-012-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(10, 6817690120, 'Speedy Clothing Item 12 - Blue', 'CLO-012-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(11, 6817690120, 'Speedy Clothing Item 12 - Green', 'CLO-012-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(12, 5083021107, 'Generic Toys Item 16 - Red', 'TOY-016-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(13, 5083021107, 'PremiumBrand Toys Item 16 - Blue', 'TOY-016-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:29:19'),
(14, 5083021107, 'PremiumBrand Toys Item 16 - Green', 'TOY-016-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:29:19'),
(15, 6950582016, 'Speedy Clothing Item 20 - Red', 'CLO-020-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(16, 6950582016, 'Generic Clothing Item 20 - Green', 'CLO-020-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:29:19'),
(17, 6950582016, 'Generic Clothing Item 20 - Black', 'CLO-020-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:29:19'),
(18, 1328101457, 'PremiumBrand Electronics Item 24 - Red', 'ELE-024-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(19, 1328101457, 'PremiumBrand Electronics Item 24 - Green', 'ELE-024-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(20, 1328101457, 'PremiumBrand Electronics Item 24 - Black', 'ELE-024-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:26:35', '2026-01-22 19:26:35'),
(22, 5732917962, 'Speedy Clothing Item 4 - Blue', 'CLO-004-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(23, 5732917962, 'Speedy Clothing Item 4 - Green', 'CLO-004-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(24, 5732917962, 'Speedy Clothing Item 4 - Black', 'CLO-004-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(25, 4913319380, 'Generic Home & Garden Item 8 - Red', 'HOM-008-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(26, 4913319380, 'Generic Home & Garden Item 8 - Blue', 'HOM-008-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(27, 4913319380, 'Generic Home & Garden Item 8 - Green', 'HOM-008-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(28, 3161539957, 'TechGiant Home & Garden Item 12 - Blue', 'HOM-012-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(29, 3161539957, 'TechGiant Home & Garden Item 12 - Green', 'HOM-012-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(30, 3161539957, 'TechGiant Home & Garden Item 12 - Black', 'HOM-012-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(31, 5083021107, 'PremiumBrand Toys Item 16 - Black', 'TOY-016-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(32, 6950582016, 'Generic Clothing Item 20 - Blue', 'CLO-020-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(33, 8441661960, 'Speedy Clothing Item 24 - Red', 'CLO-024-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(34, 8441661960, 'Speedy Clothing Item 24 - Blue', 'CLO-024-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(35, 8441661960, 'Speedy Clothing Item 24 - Black', 'CLO-024-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:29:19', '2026-01-22 19:29:19'),
(36, 4928798305, 'PremiumBrand Electronics Item 8 - Red', 'ELE-008-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:36:38', '2026-01-22 19:36:38'),
(37, 4928798305, 'PremiumBrand Electronics Item 8 - Blue', 'ELE-008-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:36:38', '2026-01-22 19:36:38'),
(38, 4928798305, 'PremiumBrand Electronics Item 8 - Green', 'ELE-008-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:36:38', '2026-01-22 19:36:38'),
(39, 2431860707, 'Generic Electronics Item 12 - Red', 'ELE-012-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:36:38', '2026-01-22 19:36:38'),
(40, 2431860707, 'Generic Electronics Item 12 - Blue', 'ELE-012-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:36:38', '2026-01-22 19:36:38'),
(41, 2431860707, 'Generic Electronics Item 12 - Black', 'ELE-012-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:36:38', '2026-01-22 19:36:38'),
(42, 9152769640, 'TechGiant Home & Garden Item 16 - Red', 'HOM-016-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(43, 9152769640, 'TechGiant Home & Garden Item 16 - Blue', 'HOM-016-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(44, 9152769640, 'TechGiant Home & Garden Item 16 - Green', 'HOM-016-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(45, 2074962829, 'TechGiant Electronics Item 20 - Red', 'ELE-020-RED', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Red\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(46, 2074962829, 'TechGiant Electronics Item 20 - Blue', 'ELE-020-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(47, 2074962829, 'TechGiant Electronics Item 20 - Black', 'ELE-020-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(48, 4927976650, 'PremiumBrand Sports Item 24 - Blue', 'SPO-024-BLUE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Blue\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(49, 4927976650, 'PremiumBrand Sports Item 24 - Green', 'SPO-024-GREEN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Green\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39'),
(50, 4927976650, 'PremiumBrand Sports Item 24 - Black', 'SPO-024-BLACK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"Color\":\"Black\"}', 'active', 0, '2026-01-22 19:36:39', '2026-01-22 19:36:39');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(2, 'Business Admin', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(3, 'Team Manager', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(4, 'Team Member', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03'),
(5, 'Viewer', 'web', '2026-01-22 19:19:03', '2026-01-22 19:19:03');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(8, 3),
(9, 3),
(10, 3),
(11, 3),
(6, 4),
(7, 4),
(8, 4),
(9, 4),
(10, 4),
(8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_inventory_items`
--

CREATE TABLE `shopify_inventory_items` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_inventory_levels`
--

CREATE TABLE `shopify_inventory_levels` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_item_id` bigint UNSIGNED NOT NULL,
  `location_id` bigint UNSIGNED NOT NULL,
  `available` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `admin_graphql_api_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_logs`
--

CREATE TABLE `shopify_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `store_id` bigint UNSIGNED NOT NULL,
  `resource_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resource_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_products`
--

CREATE TABLE `shopify_products` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_product_mappings`
--

CREATE TABLE `shopify_product_mappings` (
  `id` bigint UNSIGNED NOT NULL,
  `store_id` bigint UNSIGNED NOT NULL,
  `cims_product_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopify_product_id` bigint UNSIGNED DEFAULT NULL,
  `shopify_variant_id` bigint UNSIGNED DEFAULT NULL,
  `sync_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `sync_status` enum('synced','pending','error','conflict') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `last_synced_at` timestamp NULL DEFAULT NULL,
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `override_price` decimal(10,2) DEFAULT NULL,
  `override_stock_buffer` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_product_variants`
--

CREATE TABLE `shopify_product_variants` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_stores`
--

CREATE TABLE `shopify_stores` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `store_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `webhook_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_version` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2024-01',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sync_inventory` tinyint(1) NOT NULL DEFAULT '1',
  `sync_price` tinyint(1) NOT NULL DEFAULT '1',
  `sync_status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_categories`
--

CREATE TABLE `stock_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `category_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock_categories`
--

INSERT INTO `stock_categories` (`id`, `company_id`, `category_name`, `created_by_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'Electronics', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(2, 1, 'Fashion', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(3, 1, 'Home & Garden', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(4, 1, 'Toys', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(5, 1, 'Sports', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(6, 1, 'Automotive', 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04');

-- --------------------------------------------------------

--
-- Table structure for table `stock_item_dimensions`
--

CREATE TABLE `stock_item_dimensions` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `length` decimal(10,2) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `weight_unit` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pounds',
  `dimension_unit` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inches',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_item_identifiers`
--

CREATE TABLE `stock_item_identifiers` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `product_identifier` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_identifier_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_levels`
--

CREATE TABLE `stock_levels` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `warehouse_id` bigint UNSIGNED NOT NULL,
  `available_quantity` int NOT NULL DEFAULT '0',
  `price` decimal(15,2) DEFAULT NULL,
  `minimum_level` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `supplier_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `google_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'email',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `otp_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otp_expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `google_id`, `avatar`, `email_verified_at`, `password`, `provider`, `remember_token`, `created_at`, `updated_at`, `company_id`, `status`, `otp_code`, `otp_expires_at`) VALUES
(1, 'Raihan Khan', 'admin@demo.com', NULL, NULL, NULL, '$2y$12$uR/N4Pv6EMd6IQI07Xo9VOQpo.F9CsCJqpFJvczOXV78dVQJbphx.', 'email', NULL, '2026-01-22 19:19:03', '2026-01-22 19:19:03', 1, 'active', NULL, NULL),
(2, 'Jane Doe', 'manager@demo.com', NULL, NULL, NULL, '$2y$12$Ym2oKJumjAiu.x.Q9zpjwu3pe3HCtjcgik5t4jwU1Zp1ER0Odk7ji', 'email', NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', 1, 'active', NULL, NULL),
(3, 'John Smith', 'member@demo.com', NULL, NULL, NULL, '$2y$12$9t4ChSSjNS1vKmeR65WmGe1D8h48/MJuw4nwV30NV5n62MGde0Nl.', 'email', NULL, '2026-01-22 19:19:04', '2026-01-22 19:19:04', 1, 'active', NULL, NULL),
(4, 'Super Admin', 'superadmin@wemonks.org', NULL, NULL, NULL, '$2y$12$XmtFe1qYIyoRgEgKHq2Y5O5cGlOjFIsHlCcelks36EdS5UsyMDY.i', 'email', NULL, '2026-01-22 19:19:05', '2026-01-22 19:19:05', NULL, 'active', NULL, NULL),
(5, 'System Admin', 'admin@nexus.com', NULL, NULL, NULL, '$2y$12$FohnYYVHxWJ7iG.moayOXOzcrT3facTPvcYCVzN6ZQhOxlyqtP6IC', 'email', NULL, '2026-01-22 19:19:43', '2026-01-22 19:19:43', 2, 'active', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `created_by_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `warehouses`
--

INSERT INTO `warehouses` (`id`, `company_id`, `created_by_id`, `name`, `address`, `country`, `state`, `city`, `zip_code`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Main Warehouse (NY)', 'New York, USA', NULL, NULL, NULL, NULL, 1, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(2, 1, 1, 'West Coast Hub (LA)', 'Los Angeles, USA', NULL, NULL, NULL, NULL, 0, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(3, 1, 1, 'European Distribution (Berlin)', 'Berlin, Germany', NULL, NULL, NULL, NULL, 0, '2026-01-22 19:19:04', '2026-01-22 19:19:04'),
(4, 2, NULL, 'Main Distribution Hub', '123 Supply Chain Ave', 'USA', 'TX', 'Austin', '78701', 1, '2026-01-22 19:19:43', '2026-01-22 19:19:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attributes_company_id_foreign` (`company_id`),
  ADD KEY `attributes_created_by_id_foreign` (`created_by_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `audit_logs_company_id_index` (`company_id`),
  ADD KEY `audit_logs_user_id_index` (`user_id`),
  ADD KEY `audit_logs_entity_type_entity_id_index` (`entity_type`,`entity_id`),
  ADD KEY `audit_logs_action_index` (`action`),
  ADD KEY `audit_logs_created_at_index` (`created_at`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `brands_brand_code_unique` (`brand_code`),
  ADD KEY `brands_company_id_foreign` (`company_id`),
  ADD KEY `brands_created_by_id_foreign` (`created_by_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`channel_id`),
  ADD KEY `channels_created_by_id_foreign` (`created_by_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companies_package_id_foreign` (`package_id`);

--
-- Indexes for table `company_user`
--
ALTER TABLE `company_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_user_company_id_user_id_unique` (`company_id`,`user_id`),
  ADD KEY `company_user_user_id_foreign` (`user_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invitations_token_unique` (`token`),
  ADD KEY `invitations_company_id_foreign` (`company_id`),
  ADD KEY `invitations_invited_by_foreign` (`invited_by`);

--
-- Indexes for table `item_bullet_points`
--
ALTER TABLE `item_bullet_points`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`listing_id`),
  ADD KEY `listings_channel_id_foreign` (`channel_id`),
  ADD KEY `listings_stock_item_id_foreign` (`stock_item_id`),
  ADD KEY `listings_company_id_foreign` (`company_id`),
  ADD KEY `listings_created_by_id_foreign` (`created_by_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD KEY `products_company_id_foreign` (`company_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variants_sku_unique` (`sku`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shopify_inventory_items`
--
ALTER TABLE `shopify_inventory_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopify_inventory_levels`
--
ALTER TABLE `shopify_inventory_levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shopify_inventory_levels_inventory_item_id_location_id_unique` (`inventory_item_id`,`location_id`);

--
-- Indexes for table `shopify_logs`
--
ALTER TABLE `shopify_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shopify_logs_store_id_foreign` (`store_id`);

--
-- Indexes for table `shopify_products`
--
ALTER TABLE `shopify_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopify_product_mappings`
--
ALTER TABLE `shopify_product_mappings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shopify_product_mappings_store_id_shopify_product_id_index` (`store_id`,`shopify_product_id`),
  ADD KEY `shopify_product_mappings_store_id_cims_product_id_index` (`store_id`,`cims_product_id`);

--
-- Indexes for table `shopify_product_variants`
--
ALTER TABLE `shopify_product_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopify_stores`
--
ALTER TABLE `shopify_stores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shopify_stores_store_name_unique` (`store_name`),
  ADD KEY `shopify_stores_company_id_foreign` (`company_id`),
  ADD KEY `shopify_stores_created_by_id_foreign` (`created_by_id`);

--
-- Indexes for table `stock_categories`
--
ALTER TABLE `stock_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_categories_company_id_foreign` (`company_id`);

--
-- Indexes for table `stock_item_dimensions`
--
ALTER TABLE `stock_item_dimensions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_item_identifiers`
--
ALTER TABLE `stock_item_identifiers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_levels`
--
ALTER TABLE `stock_levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `suppliers_supplier_code_unique` (`supplier_code`),
  ADD KEY `suppliers_company_id_foreign` (`company_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_company_id_foreign` (`company_id`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehouses_company_id_foreign` (`company_id`),
  ADD KEY `warehouses_created_by_id_foreign` (`created_by_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `company_user`
--
ALTER TABLE `company_user`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_bullet_points`
--
ALTER TABLE `item_bullet_points`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9739817479;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shopify_inventory_items`
--
ALTER TABLE `shopify_inventory_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopify_logs`
--
ALTER TABLE `shopify_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopify_products`
--
ALTER TABLE `shopify_products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopify_product_mappings`
--
ALTER TABLE `shopify_product_mappings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopify_product_variants`
--
ALTER TABLE `shopify_product_variants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopify_stores`
--
ALTER TABLE `shopify_stores`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_categories`
--
ALTER TABLE `stock_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stock_item_dimensions`
--
ALTER TABLE `stock_item_dimensions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_item_identifiers`
--
ALTER TABLE `stock_item_identifiers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_levels`
--
ALTER TABLE `stock_levels`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attributes_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `brands_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `channels`
--
ALTER TABLE `channels`
  ADD CONSTRAINT `channels_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_package_id_foreign` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `company_user`
--
ALTER TABLE `company_user`
  ADD CONSTRAINT `company_user_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `company_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitations_invited_by_foreign` FOREIGN KEY (`invited_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_channel_id_foreign` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`channel_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `listings_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `listings_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `listings_stock_item_id_foreign` FOREIGN KEY (`stock_item_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shopify_logs`
--
ALTER TABLE `shopify_logs`
  ADD CONSTRAINT `shopify_logs_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `shopify_stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shopify_product_mappings`
--
ALTER TABLE `shopify_product_mappings`
  ADD CONSTRAINT `shopify_product_mappings_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `shopify_stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shopify_stores`
--
ALTER TABLE `shopify_stores`
  ADD CONSTRAINT `shopify_stores_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopify_stores_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `stock_categories`
--
ALTER TABLE `stock_categories`
  ADD CONSTRAINT `stock_categories_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD CONSTRAINT `suppliers_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD CONSTRAINT `warehouses_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `warehouses_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
