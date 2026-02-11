<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\Channel;
use App\Models\Listing;
use App\Models\Product;
use App\Models\AuditLog;

/**
 * ShopifyService
 *
 * Handles all Shopify API interactions including:
 * - Product sync (push/pull)
 * - Inventory level management
 * - Order syncing
 */
class ShopifyService
{
    protected Channel $channel;
    protected string $apiVersion;
    protected string $shopDomain;
    protected string $accessToken;

    /**
     * Initialize with a Shopify channel
     */
    public function __construct(Channel $channel)
    {
        $this->channel = $channel;
        $this->apiVersion = config('marketplaces.shopify.api_version', '2024-01');

        // Get credentials from channel
        $credentials = $channel->credentials ?? [];
        $this->shopDomain = $credentials['shop_domain'] ?? '';
        $this->accessToken = $credentials['access_token'] ?? '';
    }

    /**
     * Create instance from channel ID
     */
    public static function forChannel(string $channelId): self
    {
        $channel = Channel::where('channel_id', $channelId)
            ->where('platform', 'shopify')
            ->firstOrFail();

        return new self($channel);
    }

    /**
     * Get base API URL
     */
    protected function baseUrl(): string
    {
        return "https://{$this->shopDomain}/admin/api/{$this->apiVersion}";
    }

    /**
     * Make authenticated API request
     */
    protected function request(string $method, string $endpoint, array $data = []): array
    {
        $url = $this->baseUrl() . $endpoint;

        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $this->accessToken,
            'Content-Type' => 'application/json',
        ])->{$method}($url, $data);

        // Log API call
        if (config('marketplaces.global.log_api_calls')) {
            Log::channel('shopify')->info("Shopify API: {$method} {$endpoint}", [
                'status' => $response->status(),
                'channel_id' => $this->channel->channel_id,
            ]);
        }

        if ($response->failed()) {
            Log::error("Shopify API Error: {$endpoint}", [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            throw new \Exception("Shopify API Error: " . $response->body());
        }

        return $response->json();
    }

    /**
     * Test connection to Shopify store
     */
    public function testConnection(): array
    {
        try {
            $response = $this->request('get', '/shop.json');

            return [
                'success' => true,
                'shop' => $response['shop'] ?? null,
                'message' => 'Connection successful',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    // ============================================================
    // PRODUCT OPERATIONS
    // ============================================================

    /**
     * Fetch all products from Shopify
     */
    public function fetchProducts(int $limit = 50): array
    {
        $products = [];
        $params = ['limit' => $limit];

        do {
            $response = $this->request('get', '/products.json', $params);
            $products = array_merge($products, $response['products'] ?? []);

            // Check for pagination
            // Shopify uses Link header for cursor-based pagination
            $params = []; // Reset for next iteration
        } while (false); // Simplified for now

        return $products;
    }

    /**
     * Fetch single product by ID
     */
    public function fetchProduct(string $productId): ?array
    {
        try {
            $response = $this->request('get', "/products/{$productId}.json");
            return $response['product'] ?? null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Create product on Shopify
     */
    public function createProduct(Listing $listing): array
    {
        $product = $listing->product;

        $payload = [
            'product' => [
                'title' => $listing->effective_title,
                'body_html' => $listing->effective_description,
                'vendor' => $product->brand ?? '',
                'product_type' => $product->category ?? '',
                'tags' => implode(', ', $listing->tags ?? []),
                'status' => $listing->status === 'active' ? 'active' : 'draft',
                'variants' => [
                    [
                        'price' => (string) $listing->effective_price,
                        'sku' => $listing->marketplace_sku ?? $product->sku,
                        'inventory_management' => 'shopify',
                        'inventory_quantity' => $listing->available_quantity,
                    ],
                ],
            ],
        ];

        $response = $this->request('post', '/products.json', $payload);

        // Update listing with Shopify IDs
        if (isset($response['product'])) {
            $shopifyProduct = $response['product'];
            $listing->update([
                'marketplace_id' => 'gid://shopify/Product/' . $shopifyProduct['id'],
                'listing_url' => "https://{$this->shopDomain}/products/{$shopifyProduct['handle']}",
                'sync_status' => 'synced',
                'last_synced_at' => now(),
            ]);

            AuditLog::logSync('listing', $listing->listing_id, 'product_created');
        }

        return $response;
    }

    /**
     * Update product on Shopify
     */
    public function updateProduct(Listing $listing): array
    {
        // Extract numeric ID from gid
        $shopifyId = $this->extractNumericId($listing->marketplace_id);

        if (!$shopifyId) {
            throw new \Exception('No Shopify product ID found');
        }

        $payload = [
            'product' => [
                'id' => $shopifyId,
                'title' => $listing->effective_title,
                'body_html' => $listing->effective_description,
                'tags' => implode(', ', $listing->tags ?? []),
                'status' => $listing->status === 'active' ? 'active' : 'draft',
            ],
        ];

        $response = $this->request('put', "/products/{$shopifyId}.json", $payload);

        $listing->update([
            'sync_status' => 'synced',
            'last_synced_at' => now(),
        ]);

        AuditLog::logSync('listing', $listing->listing_id, 'product_updated');

        return $response;
    }

    /**
     * Delete product from Shopify
     */
    public function deleteProduct(Listing $listing): bool
    {
        $shopifyId = $this->extractNumericId($listing->marketplace_id);

        if (!$shopifyId) {
            return false;
        }

        try {
            $this->request('delete', "/products/{$shopifyId}.json");

            $listing->update([
                'marketplace_id' => null,
                'listing_url' => null,
                'status' => 'ended',
                'is_published' => false,
            ]);

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ============================================================
    // INVENTORY OPERATIONS
    // ============================================================

    /**
     * Fetch inventory levels
     */
    public function fetchInventoryLevels(array $inventoryItemIds = []): array
    {
        $params = [];
        if (!empty($inventoryItemIds)) {
            $params['inventory_item_ids'] = implode(',', $inventoryItemIds);
        }

        $response = $this->request('get', '/inventory_levels.json', $params);
        return $response['inventory_levels'] ?? [];
    }

    /**
     * Set inventory level for a variant
     */
    public function setInventoryLevel(string $inventoryItemId, string $locationId, int $available): array
    {
        $response = $this->request('post', '/inventory_levels/set.json', [
            'inventory_item_id' => $inventoryItemId,
            'location_id' => $locationId,
            'available' => $available,
        ]);

        return $response;
    }

    /**
     * Sync inventory for a listing
     */
    public function syncInventory(Listing $listing): bool
    {
        // This would fetch the inventory item ID from the variant
        // and update the quantity on Shopify

        try {
            // Get Shopify product to find inventory item ID
            $shopifyId = $this->extractNumericId($listing->marketplace_id);
            if (!$shopifyId) {
                return false;
            }

            $product = $this->fetchProduct($shopifyId);
            if (!$product || empty($product['variants'])) {
                return false;
            }

            $variant = $product['variants'][0];
            $inventoryItemId = $variant['inventory_item_id'];

            // Get locations
            $locations = $this->fetchLocations();
            if (empty($locations)) {
                return false;
            }

            // Update inventory at first location
            $this->setInventoryLevel(
                $inventoryItemId,
                $locations[0]['id'],
                $listing->available_quantity
            );

            $listing->markAsSynced();
            return true;

        } catch (\Exception $e) {
            $listing->markSyncError($e->getMessage());
            return false;
        }
    }

    /**
     * Fetch store locations
     */
    public function fetchLocations(): array
    {
        $cacheKey = "shopify_locations_{$this->channel->channel_id}";

        return Cache::remember($cacheKey, 3600, function () {
            $response = $this->request('get', '/locations.json');
            return $response['locations'] ?? [];
        });
    }

    // ============================================================
    // ORDER OPERATIONS
    // ============================================================

    /**
     * Fetch recent orders
     */
    public function fetchOrders(array $params = []): array
    {
        $defaults = [
            'status' => 'any',
            'limit' => 50,
        ];

        $response = $this->request('get', '/orders.json', array_merge($defaults, $params));
        return $response['orders'] ?? [];
    }

    // ============================================================
    // HELPERS
    // ============================================================

    /**
     * Extract numeric ID from Shopify GID
     */
    protected function extractNumericId(?string $gid): ?string
    {
        if (!$gid) {
            return null;
        }

        // Handle gid://shopify/Product/123456
        if (preg_match('/\/(\d+)$/', $gid, $matches)) {
            return $matches[1];
        }

        // Already numeric
        if (is_numeric($gid)) {
            return $gid;
        }

        return null;
    }

    /**
     * Get channel info
     */
    public function getChannel(): Channel
    {
        return $this->channel;
    }
}
