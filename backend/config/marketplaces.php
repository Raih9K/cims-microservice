<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Marketplace API Configurations
    |--------------------------------------------------------------------------
    |
    | This file contains all marketplace integration settings.
    | Each marketplace has its own section with API credentials and options.
    |
    */

    // ============================================================
    // SHOPIFY CONFIGURATION
    // ============================================================
    'shopify' => [
        // API Version (use latest stable)
        'api_version' => env('SHOPIFY_API_VERSION', '2024-01'),

        // App credentials (for OAuth)
        'api_key' => env('SHOPIFY_API_KEY', ''),
        'api_secret' => env('SHOPIFY_API_SECRET', ''),

        // Default store (for testing)
        'default_shop' => env('SHOPIFY_DEFAULT_SHOP', 'wemonks-test.myshopify.com'),

        // OAuth scopes required
        'scopes' => [
            'read_products',
            'write_products',
            'read_inventory',
            'write_inventory',
            'read_locations',
            'read_orders',
            'write_orders',
        ],

        // Webhook configuration
        'webhook_secret' => env('SHOPIFY_WEBHOOK_SECRET'),
        'webhook_topics' => [
            'products/create',
            'products/update',
            'products/delete',
            'inventory_levels/update',
            'orders/create',
        ],

        // Rate limiting (Shopify allows 2 calls/second for REST)
        'rate_limit' => [
            'calls_per_second' => 2,
            'retry_after' => 1000, // ms
        ],

        // Sync settings
        'sync' => [
            'batch_size' => 50,
            'auto_sync_interval' => 15, // minutes
        ],
    ],

    // ============================================================
    // AMAZON CONFIGURATION
    // ============================================================
    'amazon' => [
        // SP-API credentials
        'client_id' => env('AMAZON_SP_CLIENT_ID'),
        'client_secret' => env('AMAZON_SP_CLIENT_SECRET'),
        'refresh_token' => env('AMAZON_SP_REFRESH_TOKEN'),

        // AWS credentials for SP-API
        'aws_access_key' => env('AMAZON_AWS_ACCESS_KEY'),
        'aws_secret_key' => env('AMAZON_AWS_SECRET_KEY'),
        'aws_region' => env('AMAZON_AWS_REGION', 'us-east-1'),

        // Marketplace IDs
        'marketplace_ids' => [
            'US' => 'ATVPDKIKX0DER',
            'CA' => 'A2EUQ1WTGCTBG2',
            'MX' => 'A1AM78C64UM0Y8',
            'UK' => 'A1F83G8C2ARO7P',
            'DE' => 'A1PA6795UKMFR9',
        ],

        // Rate limiting
        'rate_limit' => [
            'calls_per_second' => 1,
        ],
    ],

    // ============================================================
    // EBAY CONFIGURATION
    // ============================================================
    'ebay' => [
        // OAuth credentials
        'client_id' => env('EBAY_CLIENT_ID'),
        'client_secret' => env('EBAY_CLIENT_SECRET'),
        'dev_id' => env('EBAY_DEV_ID'),
        'ru_name' => env('EBAY_RU_NAME'),

        // API environment
        'sandbox' => env('EBAY_SANDBOX', false),

        // Site IDs
        'site_ids' => [
            'US' => 0,
            'UK' => 3,
            'DE' => 77,
            'AU' => 15,
            'CA' => 2,
        ],

        // OAuth scopes
        'scopes' => [
            'https://api.ebay.com/oauth/api_scope',
            'https://api.ebay.com/oauth/api_scope/sell.inventory',
            'https://api.ebay.com/oauth/api_scope/sell.marketing',
            'https://api.ebay.com/oauth/api_scope/sell.account',
        ],
    ],

    // ============================================================
    // ETSY CONFIGURATION
    // ============================================================
    'etsy' => [
        'api_key' => env('ETSY_API_KEY'),
        'shared_secret' => env('ETSY_SHARED_SECRET'),

        // OAuth 2.0
        'client_id' => env('ETSY_CLIENT_ID'),
        'client_secret' => env('ETSY_CLIENT_SECRET'),

        // Scopes
        'scopes' => [
            'listings_r',
            'listings_w',
            'transactions_r',
            'shops_r',
            'shops_w',
        ],
    ],

    // ============================================================
    // WALMART CONFIGURATION
    // ============================================================
    'walmart' => [
        'client_id' => env('WALMART_CLIENT_ID'),
        'client_secret' => env('WALMART_CLIENT_SECRET'),

        // Partner ID
        'partner_id' => env('WALMART_PARTNER_ID'),

        // Environment
        'sandbox' => env('WALMART_SANDBOX', false),
    ],

    // ============================================================
    // GLOBAL SETTINGS
    // ============================================================
    'global' => [
        // Default currency
        'default_currency' => 'USD',

        // Sync settings
        'sync_interval' => 15, // minutes
        'retry_attempts' => 3,
        'retry_delay' => 5000, // ms

        // Logging
        'log_api_calls' => env('MARKETPLACE_LOG_API_CALLS', true),

        // Feature flags
        'features' => [
            'auto_sync_inventory' => true,
            'auto_sync_orders' => true,
            'auto_publish_products' => false,
        ],
    ],

];
