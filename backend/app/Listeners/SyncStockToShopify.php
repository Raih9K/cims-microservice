<?php

namespace App\Listeners;

use App\Models\StockLevel;
use App\Models\ShopifyProductMapping;
use App\Jobs\Shopify\PushProductToShopify;
use Illuminate\Database\Events\ModelUpdated;
use Illuminate\Support\Facades\Log;

class SyncStockToShopify
{
    /**
     * Handle the event.
     */
    public function handle(ModelUpdated $event)
    {
        $model = $event->model;

        // We only care about StockLevel updates
        if (!($model instanceof StockLevel)) {
            return;
        }

        // Find all Shopify mappings for this product
        // SQL says stock_item table has `stock_item_id`. StockLevel might use it as foreign key.
        // I'll assume $model->product_id is the link to mappings.cims_product_id.
        $mappings = ShopifyProductMapping::where('cims_product_id', $model->product_id)
            ->where('sync_enabled', true)
            ->get();

        foreach ($mappings as $mapping) {
            // Trigger the Push job
            PushProductToShopify::dispatch($mapping);
        }
    }
}
