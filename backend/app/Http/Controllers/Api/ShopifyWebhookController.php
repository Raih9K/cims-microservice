<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShopifyStore;
use App\Jobs\Shopify\ProcessShopifyWebhook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShopifyWebhookController extends Controller
{
    /**
     * Handle incoming Shopify webhooks
     */
    public function handle(Request $request)
    {
        $hmacHeader = $request->header('X-Shopify-Hmac-Sha256');
        $topic = $request->header('X-Shopify-Topic');
        $shopDomain = $request->header('X-Shopify-Shop-Domain');
        $data = $request->getContent();

        $store = ShopifyStore::where('store_name', $shopDomain)->first();

        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        if (!$this->verifyHmac($data, $hmacHeader, $store->webhook_secret)) {
            Log::warning("Invalid Shopify Webhook Signature for store: {$shopDomain}");
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        // Dispatch job for async processing
        ProcessShopifyWebhook::dispatch($store, $topic, json_decode($data, true));

        return response()->json(['message' => 'Webhook received'], 200);
    }

    /**
     * Verify HMAC signature
     */
    private function verifyHmac($data, $hmac, $secret)
    {
        $calculatedHmac = base64_encode(hash_hmac('sha256', $data, $secret, true));
        return hash_equals($hmac, $calculatedHmac);
    }
}
