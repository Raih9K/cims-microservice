<?php

namespace App\Jobs\Shopify;

use App\Models\ShopifyStore;
use App\Models\ShopifyProductMapping;
use App\Models\ShopifyLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessShopifyWebhook implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $store;
    protected $topic;
    protected $payload;

    public function __construct(ShopifyStore $store, $topic, $payload)
    {
        $this->store = $store;
        $this->topic = $topic;
        $this->payload = $payload;
    }

    public function handle()
    {
        Log::info("Processing Shopify Webhook: {$this->topic} for store: {$this->store->store_name}");

        try {
            switch ($this->topic) {
                case 'orders/create':
                    $this->handleOrderCreated();
                    break;

                case 'products/update':
                    $this->handleProductUpdated();
                    break;

                case 'inventory_levels/update':
                    $this->handleInventoryUpdated();
                    break;

                default:
                    Log::info("Unhandled Shopify Webhook Topic: {$this->topic}");
                    break;
            }
        } catch (\Exception $e) {
            Log::error("Failed to process webhook {$this->topic}: " . $e->getMessage());
        }
    }

    private function handleOrderCreated()
    {
        foreach ($this->payload['line_items'] as $item) {
            $variantId = $item['variant_id'];

            $mapping = ShopifyProductMapping::where('store_id', $this->store->id)
                ->where('shopify_variant_id', $variantId)
                ->first();

            if ($mapping) {
                $qtyToDeduct = $item['quantity'];

                // CIMS Master Inventory Deduction Logic
                // We find the 'main' or 'default' warehouse to deduct from for this product.
                // Or handle multi-location mapping if available.
                $stockItem = DB::table('stock_level')->where('stock_item_id', $mapping->cims_product_id)->first();

                if ($stockItem) {
                    DB::table('stock_level')
                        ->where('stock_level_id', $stockItem->stock_level_id)
                        ->decrement('available_quantity', $qtyToDeduct);

                    ShopifyLog::create([
                        'store_id' => $this->store->id,
                        'resource_type' => 'order',
                        'resource_id' => $this->payload['id'],
                        'action' => 'webhook_order_create',
                        'status' => 'success',
                        'details' => [
                            'sku' => $item['sku'],
                            'deducted' => $qtyToDeduct,
                            'message' => 'Inventory deducted in CIMS'
                        ]
                    ]);
                }
            }
        }
    }

    private function handleProductUpdated()
    {
        // Check if sync is enabled. If CIMS is master, we might ignore updates from Shopify to preserve CIMS data.
        // But we should track if a variant was deleted or SKU changed on Shopify.

        $shopifyId = $this->payload['id'];
        $mappings = ShopifyProductMapping::where('store_id', $this->store->id)
            ->where('shopify_product_id', $shopifyId)
            ->get();

        foreach ($mappings as $mapping) {
            if ($mapping->sync_enabled) {
                // Ignore general field updates (e.g. title/description) to keep CIMS as master.
                // However, we might want to check for errors or conflicts.
                Log::info("Ignoring Shopify-side product update for mapped product: {$shopifyId}");
            }
        }
    }

    private function handleInventoryUpdated()
    {
        // Optionally sync back or just log. Generally CIMS -> Shopify push is the primary flow.
        Log::info("Inventory updated on Shopify for item: " . ($this->payload['inventory_item_id'] ?? 'unknown'));
    }
}
