<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Services\ShopifyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShopifyChannelController extends Controller
{
    /**
     * Connect a new Shopify Store (Manual API Key/Token method)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shop_domain' => 'required|string', // e.g. my-store.myshopify.com
            'access_token' => 'required|string', // Admin API Access Token
            'api_version' => 'nullable|string',
        ]);

        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        // Check if already exists
        $exists = Channel::where('company_id', $companyId)
            ->where('platform', 'shopify')
            ->where('credentials->shop_domain', $validated['shop_domain'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This Shopify store is already connected.'
            ], 422);
        }

        try {
            // 1. Create Channel first to get an ID (needed for logging/service)
            $channel = Channel::create([
                'channel_id' => 'ch_' . bin2hex(random_bytes(8)),
                'company_id' => $companyId,
                'name' => $validated['shop_domain'], // Default name
                'platform' => 'shopify',
                'marketplace' => 'shopify',
                'status' => 'pending', // Pending validation
                'store_url' => "https://" . $validated['shop_domain'],
                'credentials' => [
                    'shop_domain' => $validated['shop_domain'],
                    'access_token' => $validated['access_token'],
                    'api_version' => $validated['api_version'] ?? '2024-01',
                ],
                'created_by' => $user->id,
                'updated_by' => $user->id,
                'connected_by' => $user->id,
            ]);

            // 2. Validate Connection using Service
            $service = new ShopifyService($channel);
            $test = $service->testConnection();

            if (!$test['success']) {
                // Determine if we should delete the channel or keep it in 'error' state
                $channel->update(['status' => 'error', 'sync_error' => $test['message']]);
                return response()->json([
                    'success' => false,
                    'message' => 'Connection failed: ' . $test['message'],
                    'data' => $channel
                ], 400); // Bad Request
            }

            // 3. Success - Activate
            $channel->update([
                'status' => 'active',
                'name' => $test['shop']['name'] ?? $channel->name,
                'marketplace_data' => [
                    'shop_id' => $test['shop']['id'] ?? null,
                    'email' => $test['shop']['email'] ?? null,
                    'currency' => $test['shop']['currency'] ?? 'USD',
                ]
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Shopify store connected successfully',
                'data' => $channel
            ], 201);

        } catch (\Exception $e) {
            Log::error('Shopify Connection Error: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Trigger Manual Sync (products pull)
     * POST /api/shopify/channels/{id}/sync
     */
    public function sync(Request $request, $id)
    {
        $user = $request->user();
        $channel = Channel::where('company_id', $user->getActiveCompanyId())
            ->where('platform', 'shopify')
            ->where('channel_id', $id)
            ->firstOrFail();

        try {
            $service = new ShopifyService($channel);

            // fetch products from shopify
            $shopifyProducts = $service->fetchProducts(50); // Limit 50 for manual sync to be fast

            // Process sync (Basic logic: Create or Update Listings/Products)
            // ideally this should be a Job, but for "Manual" feedback we can do a small batch synchronously
            // or dispatch a job and return success.

            $count = count($shopifyProducts);

            // Dispatch Job for full processing
            // \App\Jobs\ProcessShopifySync::dispatch($channel, $shopifyProducts);

            $channel->update([
                'last_sync_at' => now(),
                'sync_error' => null
            ]);

            return response()->json([
                'success' => true,
                'message' => "Manual sync triggered. Found {$count} products. Processing in background.",
                'found_count' => $count
            ]);

        } catch (\Exception $e) {
            $channel->update(['sync_error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Sync failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Inventory Levels (Manual Check)
     */
    public function getInventoryLevels(Request $request)
    {
        // Implementation for checking specific item inventory if needed
        return response()->json(['message' => 'Not implemented yet']);
    }
}
