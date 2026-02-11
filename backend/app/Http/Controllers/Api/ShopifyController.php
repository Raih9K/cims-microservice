<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShopifyInventoryLevel;
use App\Models\ShopifyProduct;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ShopifyController extends Controller
{
    /**
     * Sync Inventory from Shopify
     */
    public function syncInventory(Request $request)
    {
        // This would typically involve:
        // 1. Fetching inventory levels from Shopify API
        // 2. Updating local ShopifyInventoryLevel models
        // 3. Optionally syncing to master StockLevel if mapped

        // For now, we'll return a stub response or implement a basic fetch if credentials were available

        return response()->json([
            'success' => true,
            'message' => 'Inventory sync initiated (stub)',
        ]);
    }

    /**
     * Get Local Shopify Inventory Levels
     */
    public function getInventoryLevels()
    {
        return response()->json([
             'success' => true,
             'data' => ShopifyInventoryLevel::all()
        ]);
    }

    /**
     * Update Inventory Level on Shopify
     */
    public function updateInventoryLevel(Request $request, $inventoryItemId)
    {
        $validated = $request->validate([
            'location_id' => 'required',
            'available' => 'required|integer'
        ]);

        // Logic to push update to Shopify API would go here
        // Http::post("https://{shop}.myshopify.com/admin/api/2024-01/inventory_levels/set.json", ...);

        // Update local record
        $level = ShopifyInventoryLevel::updateOrCreate(
            [
                'inventory_item_id' => $inventoryItemId,
                'location_id' => $validated['location_id']
            ],
            ['available' => $validated['available']]
        );

        return response()->json([
            'success' => true,
            'message' => 'Inventory level updated',
            'data' => $level
        ]);
    }
}
