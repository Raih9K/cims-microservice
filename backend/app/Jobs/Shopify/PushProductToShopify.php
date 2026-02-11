<?php

namespace App\Jobs\Shopify;

use App\Models\ShopifyProductMapping;
use App\Models\ShopifyStore;
use App\Models\ShopifyLog;
use App\Services\Shopify\ShopifyService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Exception;

class PushProductToShopify implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mapping;

    public function __construct(ShopifyProductMapping $mapping)
    {
        $this->mapping = $mapping;
    }

    public function handle(ShopifyService $shopifyService)
    {
        $store = $this->mapping->store;

        if (!$this->mapping->sync_enabled || !$store->is_active) {
            return;
        }

        try {
            $internalProduct = DB::table('stock_item')->where('stock_item_id', $this->mapping->cims_product_id)->first();

            if (!$internalProduct) {
                throw new Exception("Internal product not found: {$this->mapping->cims_product_id}");
            }

            // 1. Sync Price
            if ($store->sync_price) {
                $price = $this->mapping->override_price ?? $this->calculateInternalPrice($this->mapping->cims_product_id);

                if ($price) {
                    $shopifyService->updateVariant($store->store_name, $store->access_token, $this->mapping->shopify_variant_id, [
                        'price' => $price
                    ]);
                }
            }

            // 2. Sync Inventory
            if ($store->sync_inventory) {
                $quantity = $this->calculateInternalQuantity($this->mapping->cims_product_id);
                $buffer = $this->mapping->override_stock_buffer ?? 0;
                $finalQty = max(0, $quantity - $buffer);

                // For inventory update, we need inventory_item_id.
                // We might need to store it or fetch it. Let's assume the variant ID call returns it or we fetch once.
                // In a real-world scenario, you'd store shopify_inventory_item_id in the mapping table.
                // I'll add logic to fetch it if missing (simplified).

                $variant = $shopifyService->getProducts($store->store_name, $store->access_token, ['ids' => $this->mapping->shopify_product_id]);
                $shopifyVariant = collect($variant['products'][0]['variants'])->firstWhere('id', $this->mapping->shopify_variant_id);

                if ($shopifyVariant && isset($shopifyVariant['inventory_item_id'])) {
                    // Need a location ID too. In a multi-location setup, you'd map CIMS Warehouse -> Shopify Location.
                    // For now, I'll assume we use the first available location for the store.
                    $locationResponse = Http::withHeaders(['X-Shopify-Access-Token' => $store->access_token])
                        ->get("https://{$store->store_name}/admin/api/2024-01/locations.json");

                    $locationId = $locationResponse->json()['locations'][0]['id'] ?? null;

                    if ($locationId) {
                        $shopifyService->updateInventory($store->store_name, $store->access_token, [
                            'location_id' => $locationId,
                            'inventory_item_id' => $shopifyVariant['inventory_item_id'],
                            'available' => $finalQty
                        ]);
                    }
                }
            }

            $this->mapping->update([
                'sync_status' => 'synced',
                'last_synced_at' => now(),
                'error_message' => null
            ]);

            ShopifyLog::create([
                'store_id' => $store->id,
                'resource_type' => 'product',
                'resource_id' => $this->mapping->shopify_product_id,
                'action' => 'push',
                'status' => 'success',
                'details' => ['message' => 'Product pushed successfully']
            ]);

        } catch (Exception $e) {
            $this->mapping->update([
                'sync_status' => 'error',
                'error_message' => $e->getMessage()
            ]);

            ShopifyLog::create([
                'store_id' => $store->id,
                'resource_type' => 'product',
                'resource_id' => $this->mapping->shopify_product_id,
                'action' => 'push',
                'status' => 'failed',
                'details' => ['error' => $e->getMessage()]
            ]);
        }
    }

    private function calculateInternalPrice($productId)
    {
        // Placeholder: Logic to get price from CIMS DB
        return DB::table('stock_level')->where('stock_item_id', $productId)->value('price');
    }

    private function calculateInternalQuantity($productId)
    {
        // Placeholder: Sum available_quantity across all warehouses in CIMS
        return DB::table('stock_level')->where('stock_item_id', $productId)->sum('available_quantity');
    }
}
