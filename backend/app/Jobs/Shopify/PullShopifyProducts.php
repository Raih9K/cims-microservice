<?php

namespace App\Jobs\Shopify;

use App\Models\ShopifyProductMapping;
use App\Models\ShopifyStore;
use App\Models\Product; // Assuming this model maps to stock_item
use App\Services\Shopify\ShopifyService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class PullShopifyProducts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $store;
    protected $pageInfo;

    public function __construct(ShopifyStore $store, $pageInfo = null)
    {
        $this->store = $store;
        $this->pageInfo = $pageInfo;
    }

    public function handle(ShopifyService $shopifyService)
    {
        try {
            $params = ['limit' => 50];
            if ($this->pageInfo) {
                $params['page_info'] = $this->pageInfo;
            }

            $result = $shopifyService->getProducts(
                $this->store->store_name,
                $this->store->access_token,
                $params
            );

            foreach ($result['products'] as $shopifyProduct) {
                foreach ($shopifyProduct['variants'] as $variant) {
                    $this->mapVariant($shopifyProduct, $variant);
                }
            }

            // Handle Pagination
            if (isset($result['link']['next'])) {
                self::dispatch($this->store, $result['link']['next'])->delay(now()->addSeconds(1));
            }

        } catch (Exception $e) {
            Log::error("Shopify Pull Failed for Store {$this->store->id}: " . $e->getMessage());
        }
    }

    private function mapVariant($shopifyProduct, $variant)
    {
        $sku = $variant['sku'];
        if (!$sku) return;

        // Find internal product by SKU (checking stock_item table assuming Product model handles it)
        // Adjust query based on your actual column names. SQL says 'sku' in `stock_item`.
        $internalProduct = DB::table('stock_item')->where('sku', $sku)->first();

        if ($internalProduct) {
            ShopifyProductMapping::updateOrCreate(
                [
                    'store_id' => $this->store->id,
                    'shopify_variant_id' => $variant['id'],
                ],
                [
                    'cims_product_id' => $internalProduct->stock_item_id,
                    'shopify_product_id' => $shopifyProduct['id'],
                    'sync_status' => 'synced',
                    'last_synced_at' => now(),
                ]
            );
        } else {
            // Log Unmapped or Create mapping with null internal ID if you want to track them
            Log::info("Unmapped Shopify Variant: {$sku} (ID: {$variant['id']})");
        }
    }
}
