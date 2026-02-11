<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\SubscriptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Auth - Public
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);

// Shopify Webhooks (Public - HMAC verified in controller)
Route::post('/webhooks/shopify', [\App\Http\Controllers\Api\ShopifyWebhookController::class, 'handle']);

// Shopify OAuth (Public - for OAuth flow)
Route::prefix('shopify/oauth')->group(function () {
    Route::get('/install', [\App\Http\Controllers\Api\ShopifyOAuthController::class, 'install']);
    Route::get('/callback', [\App\Http\Controllers\Api\ShopifyOAuthController::class, 'callback']);
});

Route::post('/team/accept-invitation', [\App\Http\Controllers\Api\TeamController::class, 'acceptInvitation']);
Route::post('/team/verify-invitation', [\App\Http\Controllers\Api\TeamController::class, 'verifyInvitation']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth - User
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me/profile', [AuthController::class, 'updateProfile']);
    Route::put('/me/password', [AuthController::class, 'updatePassword']);

    // Company / Business Management
    Route::get('/company', [\App\Http\Controllers\Api\CompanyController::class, 'show']);
    Route::put('/company', [\App\Http\Controllers\Api\CompanyController::class, 'update']);

    // Team Management
    Route::post('team/switch-company', [TeamController::class, 'switchCompany']);
    Route::post('team/invite', [TeamController::class, 'store']);
    Route::post('team/{id}/force-email', [TeamController::class, 'forceEmailChange']);
    Route::post('team/{id}/force-password', [TeamController::class, 'forcePasswordReset']);
    Route::apiResource('team', TeamController::class);

    // Subscriptions
    Route::get('/packages', [SubscriptionController::class, 'packages']);
    Route::post('/apply-coupon', [SubscriptionController::class, 'applyCoupon']);
    Route::post('/subscribe', [SubscriptionController::class, 'subscribe']);

    // Products
    Route::put('products/{product}/variants/{variant}', [\App\Http\Controllers\Api\ProductController::class, 'updateVariant']);
    Route::apiResource('products', \App\Http\Controllers\Api\ProductController::class);

    // Settings Resources
    Route::apiResource('warehouses', \App\Http\Controllers\Api\WarehouseController::class);
    Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);
    Route::apiResource('suppliers', \App\Http\Controllers\Api\SupplierController::class);
    Route::apiResource('attributes', \App\Http\Controllers\Api\AttributeController::class);
    Route::apiResource('brands', \App\Http\Controllers\Api\BrandController::class);
    Route::apiResource('stock-levels', \App\Http\Controllers\Api\StockLevelController::class);
    Route::apiResource('images', \App\Http\Controllers\Api\ImageController::class);

    // Channels - Marketplace Connections
    Route::prefix('channels')->group(function () {
        Route::get('/stats', [\App\Http\Controllers\Api\ChannelController::class, 'stats']);
        Route::post('/{id}/activate', [\App\Http\Controllers\Api\ChannelController::class, 'activate']);
        Route::post('/{id}/deactivate', [\App\Http\Controllers\Api\ChannelController::class, 'deactivate']);
        Route::post('/{id}/test', [\App\Http\Controllers\Api\ChannelController::class, 'testConnection']);
    });
    Route::apiResource('channels', \App\Http\Controllers\Api\ChannelController::class);

    // Listings - Marketplace Published Inventory
    Route::prefix('listings')->group(function () {
        Route::get('/stats', [\App\Http\Controllers\Api\ListingController::class, 'stats']);
        Route::post('/{id}/publish', [\App\Http\Controllers\Api\ListingController::class, 'publish']);
        Route::post('/{id}/pause', [\App\Http\Controllers\Api\ListingController::class, 'pause']);
    });
    Route::apiResource('listings', \App\Http\Controllers\Api\ListingController::class);

    // Shopify Integration Routes
    // Shopify Integration Routes (Manual & Webhooks)
    Route::prefix('shopify')->group(function () {
        // Manual Connection (Store & Sync)
        Route::post('/connect', [\App\Http\Controllers\Api\ShopifyChannelController::class, 'store']); // Connect new store
        Route::post('/channels/{id}/sync', [\App\Http\Controllers\Api\ShopifyChannelController::class, 'sync']); // Manual Sync Trigger
        Route::get('/channels', [\App\Http\Controllers\Api\ShopifyChannelController::class, 'index']); // List Shopify Channels

        // Inventory Actions
        Route::get('/inventory-levels', [\App\Http\Controllers\Api\ShopifyChannelController::class, 'getInventoryLevels']);
    });
});
