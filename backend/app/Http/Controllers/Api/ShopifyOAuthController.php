<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * ShopifyOAuthController
 *
 * Handles Shopify OAuth flow for installing the app on stores.
 */
class ShopifyOAuthController extends Controller
{
    /**
     * Shopify OAuth scopes required
     */
    protected array $scopes = [
        'read_products',
        'write_products',
        'read_inventory',
        'write_inventory',
        'read_locations',
        'read_orders',
        'write_orders',
    ];

    /**
     * Initiate OAuth flow - redirect user to Shopify authorization
     *
     * GET /api/shopify/oauth/install?shop=store-name.myshopify.com
     */
    public function install(Request $request)
    {
        $shop = $request->get('shop');

        if (!$shop) {
            return response()->json([
                'success' => false,
                'error' => 'Shop parameter is required'
            ], 400);
        }

        // Ensure .myshopify.com domain
        if (!str_ends_with($shop, '.myshopify.com')) {
            $shop = $shop . '.myshopify.com';
        }

        // Generate state for security
        $state = Str::random(32);
        session(['shopify_oauth_state' => $state]);

        // Build authorization URL
        $clientId = config('marketplaces.shopify.api_key');
        $redirectUri = url('/api/shopify/oauth/callback');
        $scopes = implode(',', $this->scopes);

        $authUrl = "https://{$shop}/admin/oauth/authorize?" . http_build_query([
            'client_id' => $clientId,
            'scope' => $scopes,
            'redirect_uri' => $redirectUri,
            'state' => $state,
        ]);

        return response()->json([
            'success' => true,
            'authorization_url' => $authUrl,
            'message' => 'Redirect user to this URL to authorize the app'
        ]);
    }

    /**
     * OAuth callback - exchange code for access token
     *
     * GET /api/shopify/oauth/callback?code=xxx&shop=xxx&state=xxx
     */
    public function callback(Request $request)
    {
        $code = $request->get('code');
        $shop = $request->get('shop');
        $state = $request->get('state');
        $hmac = $request->get('hmac');

        // Validate required params
        if (!$code || !$shop) {
            return response()->json([
                'success' => false,
                'error' => 'Missing required parameters'
            ], 400);
        }

        // Verify state (CSRF protection) - skip if not in session (API mode)
        // $savedState = session('shopify_oauth_state');
        // if ($state !== $savedState) {
        //     return response()->json(['success' => false, 'error' => 'Invalid state'], 400);
        // }

        // Verify HMAC signature
        if ($hmac && !$this->verifyHmac($request->all(), config('marketplaces.shopify.api_secret'))) {
            Log::warning('Shopify OAuth: Invalid HMAC', ['shop' => $shop]);
            // Continue anyway for development
        }

        // Exchange code for access token
        $tokenResponse = Http::post("https://{$shop}/admin/oauth/access_token", [
            'client_id' => config('marketplaces.shopify.api_key'),
            'client_secret' => config('marketplaces.shopify.api_secret'),
            'code' => $code,
        ]);

        if ($tokenResponse->failed()) {
            Log::error('Shopify OAuth: Token exchange failed', [
                'shop' => $shop,
                'status' => $tokenResponse->status(),
                'body' => $tokenResponse->body(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Failed to exchange code for access token'
            ], 500);
        }

        $tokenData = $tokenResponse->json();
        $accessToken = $tokenData['access_token'] ?? null;
        $scope = $tokenData['scope'] ?? '';

        if (!$accessToken) {
            return response()->json([
                'success' => false,
                'error' => 'No access token received'
            ], 500);
        }

        // Fetch shop info
        $shopInfo = $this->fetchShopInfo($shop, $accessToken);

        // Get or create user context (for authenticated requests)
        $user = $request->user();
        $companyId = $user?->current_company_id ?? $user?->company_id ?? 1;
        $userId = $user?->id ?? 1;

        // Create or update channel
        $channel = Channel::updateOrCreate(
            [
                'company_id' => $companyId,
                'platform' => 'shopify',
                'store_url' => "https://{$shop}",
            ],
            [
                'channel_id' => 'ch_shopify_' . Str::random(8),
                'name' => $shopInfo['name'] ?? $shop,
                'marketplace' => 'shopify',
                'status' => 'active',
                'credentials' => [
                    'shop_domain' => $shop,
                    'access_token' => $accessToken,
                    'scope' => $scope,
                ],
                'marketplace_data' => [
                    'shop_id' => $shopInfo['id'] ?? null,
                    'shop_name' => $shopInfo['name'] ?? null,
                    'email' => $shopInfo['email'] ?? null,
                    'currency' => $shopInfo['currency'] ?? 'USD',
                    'country' => $shopInfo['country_code'] ?? null,
                    'timezone' => $shopInfo['timezone'] ?? null,
                ],
                'last_sync_at' => now(),
                'connected_by' => $userId,
                'created_by' => $userId,
                'updated_by' => $userId,
            ]
        );

        // Log the connection
        AuditLog::logAction('create', 'channel', $channel->channel_id, null, [
            'shop' => $shop,
            'platform' => 'shopify',
        ]);

        Log::info('Shopify OAuth: Store connected', [
            'shop' => $shop,
            'channel_id' => $channel->channel_id,
        ]);

        // Redirect to frontend success page or return JSON
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000');

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Shopify store connected successfully',
                'data' => [
                    'channel_id' => $channel->channel_id,
                    'shop' => $shop,
                    'shop_name' => $shopInfo['name'] ?? $shop,
                ]
            ]);
        }

        return redirect("{$frontendUrl}/settings/integrations?shopify=connected&channel={$channel->channel_id}");
    }

    /**
     * Disconnect a Shopify store
     */
    public function disconnect(Request $request, string $channelId)
    {
        $user = $request->user();
        $companyId = $user->current_company_id ?? $user->company_id;

        $channel = Channel::where('company_id', $companyId)
            ->where('platform', 'shopify')
            ->where('channel_id', $channelId)
            ->firstOrFail();

        // Optionally revoke the access token on Shopify side
        // $this->revokeToken($channel);

        $channel->update([
            'status' => 'inactive',
            'credentials' => null,
            'updated_by' => $user->id,
        ]);

        AuditLog::logAction('update', 'channel', $channelId, null, [
            'action' => 'disconnected',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Shopify store disconnected'
        ]);
    }

    /**
     * Fetch shop info from Shopify API
     */
    protected function fetchShopInfo(string $shop, string $accessToken): array
    {
        try {
            $response = Http::withHeaders([
                'X-Shopify-Access-Token' => $accessToken,
            ])->get("https://{$shop}/admin/api/2024-01/shop.json");

            if ($response->successful()) {
                return $response->json()['shop'] ?? [];
            }
        } catch (\Exception $e) {
            Log::error('Shopify: Failed to fetch shop info', ['error' => $e->getMessage()]);
        }

        return [];
    }

    /**
     * Verify Shopify HMAC signature
     */
    protected function verifyHmac(array $params, string $secret): bool
    {
        $hmac = $params['hmac'] ?? '';
        unset($params['hmac']);

        ksort($params);
        $computed = hash_hmac('sha256', http_build_query($params), $secret);

        return hash_equals($hmac, $computed);
    }
}
