<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Channel;
use App\Models\Listing;
use App\Models\Product;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Str;

/**
 * MarketplaceSeeder
 *
 * Seeds fake marketplace channels and listings for development/testing.
 * Creates channels for Shopify, Amazon, eBay, and Etsy with sample listings.
 */
class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏪 Seeding Marketplace Channels and Listings...');

        // Get first company and user for seeding
        $company = Company::first();
        $user = User::first();

        if (!$company || !$user) {
            $this->command->warn('⚠️  No company or user found. Run UserSeeder first.');
            return;
        }

        // Get products for listings
        $products = Product::where('company_id', $company->id)->get();

        if ($products->isEmpty()) {
            $this->command->warn('⚠️  No products found. Run ProductSeeder first.');
            return;
        }

        // ============================================================
        // CREATE MARKETPLACE CHANNELS
        // ============================================================

        $channels = [
            [
                'channel_id' => 'ch_shopify_main',
                'name' => 'Main Shopify Store',
                'platform' => 'shopify',
                'marketplace' => 'shopify',
                'status' => 'active',
                'store_url' => 'https://main-store.myshopify.com',
                'marketplace_data' => [
                    'shop_name' => 'Main Store',
                    'shop_id' => '12345678901',
                    'currency' => 'USD',
                    'country' => 'US',
                ],
                'last_sync_at' => now()->subHours(2),
            ],
            [
                'channel_id' => 'ch_shopify_outlet',
                'name' => 'Fashion Outlet',
                'platform' => 'shopify',
                'marketplace' => 'shopify',
                'status' => 'active',
                'store_url' => 'https://outlet.myshopify.com',
                'marketplace_data' => [
                    'shop_name' => 'Fashion Outlet',
                    'shop_id' => '98765432101',
                    'currency' => 'USD',
                    'country' => 'US',
                ],
                'last_sync_at' => now()->subHours(5),
            ],
            [
                'channel_id' => 'ch_amazon_' . Str::random(8),
                'name' => 'Amazon US Seller',
                'platform' => 'amazon',
                'marketplace' => 'amazon',
                'status' => 'active',
                'store_url' => 'https://sellercentral.amazon.com',
                'marketplace_data' => [
                    'seller_id' => 'A1B2C3D4E5F6G7',
                    'marketplace_id' => 'ATVPDKIKX0DER',
                    'region' => 'NA',
                    'country' => 'US',
                ],
                'last_sync_at' => now()->subHours(1),
            ],
            [
                'channel_id' => 'ch_ebay_' . Str::random(8),
                'name' => 'eBay Store',
                'platform' => 'ebay',
                'marketplace' => 'ebay',
                'status' => 'active',
                'store_url' => 'https://www.ebay.com/usr/mystore',
                'marketplace_data' => [
                    'user_id' => 'mystore_ebay',
                    'site_id' => '0', // US
                    'payment_policy_id' => 'policy_123',
                    'return_policy_id' => 'return_123',
                    'shipping_policy_id' => 'ship_123',
                ],
                'last_sync_at' => now()->subMinutes(30),
            ],
            [
                'channel_id' => 'ch_etsy_' . Str::random(8),
                'name' => 'Etsy Shop',
                'platform' => 'etsy',
                'marketplace' => 'etsy',
                'status' => 'pending',
                'store_url' => 'https://www.etsy.com/shop/myshop',
                'marketplace_data' => [
                    'shop_id' => '98765432',
                    'shop_name' => 'MyEtsyShop',
                    'currency' => 'USD',
                ],
                'last_sync_at' => null,
            ],
            [
                'channel_id' => 'ch_walmart_' . Str::random(8),
                'name' => 'Walmart Marketplace',
                'platform' => 'walmart',
                'marketplace' => 'walmart',
                'status' => 'inactive',
                'store_url' => 'https://seller.walmart.com',
                'marketplace_data' => [
                    'partner_id' => 'WM_PARTNER_123',
                    'feed_id' => null,
                ],
                'last_sync_at' => null,
            ],
        ];

        foreach ($channels as $channelData) {
            $channelData['company_id'] = $company->id;
            $channelData['connected_by'] = $user->id;
            $channelData['created_by'] = $user->id;
            $channelData['updated_by'] = $user->id;

            Channel::updateOrCreate(
                ['channel_id' => $channelData['channel_id']],
                $channelData
            );

            $this->command->info("  ✅ Created channel: {$channelData['name']} ({$channelData['platform']})");
        }

        // ============================================================
        // CREATE SAMPLE LISTINGS
        // ============================================================

        $createdChannels = Channel::where('company_id', $company->id)->get();
        $listingStatuses = ['draft', 'pending', 'active', 'active', 'active', 'paused', 'error'];
        $syncStatuses = ['synced', 'synced', 'synced', 'pending', 'error'];

        $listingsCount = 0;

        // Generate bindings for ALL products, prioritizing Shopify
        foreach ($products as $product) {
             // 1. ALWAYS create a listing on ALL Shopify channels
             $shopifyChannels = $createdChannels->where('platform', 'shopify');

             foreach ($shopifyChannels as $shopifyChannel) {
                 $this->createListingForChannel($shopifyChannel, $product, $company, $user);
                 $listingsCount++;
             }

             // 2. Randomly add to other channels (Amazon, eBay, etc.)
             $otherChannels = $createdChannels->where('platform', '!=', 'shopify');
             if ($otherChannels->count() > 0 && rand(0, 1) === 1) { // 50% chance to be on another channel too
                  $randomChannel = $otherChannels->random();
                  $this->createListingForChannel($randomChannel, $product, $company, $user);
                  $listingsCount++;
             }
        }

        $this->command->info("  ✅ Created {$listingsCount} listings across channels");

        // ============================================================
        // SUMMARY
        // ============================================================

        $this->command->newLine();
        $this->command->info('📊 Marketplace Seeding Summary:');
        $this->command->table(
            ['Channel', 'Platform', 'Status', 'Listings'],
            $createdChannels->map(function ($ch) {
                return [
                    $ch->name,
                    $ch->platform,
                    $ch->status,
                    $ch->listings()->count(),
                ];
            })->toArray()
        );
    }

    /**
     * Generate marketplace-specific product ID
     */
    private function generateMarketplaceId(string $platform): string
    {
        return match($platform) {
            'shopify' => 'gid://shopify/Product/' . rand(1000000000, 9999999999),
            'amazon' => 'B' . strtoupper(Str::random(9)),
            'ebay' => (string) rand(100000000000, 999999999999),
            'etsy' => (string) rand(100000000, 999999999),
            'walmart' => 'WM' . rand(100000000, 999999999),
            default => Str::uuid()->toString(),
        };
    }

    /**
     * Generate listing URL
     */
    private function generateListingUrl(Channel $channel, Product $product): string
    {
        $slug = Str::slug($product->name);

        return match($channel->platform) {
            'shopify' => "{$channel->store_url}/products/{$slug}",
            'amazon' => "https://www.amazon.com/dp/" . $this->generateMarketplaceId('amazon'),
            'ebay' => "https://www.ebay.com/itm/" . rand(100000000000, 999999999999),
            'etsy' => "https://www.etsy.com/listing/" . rand(100000000, 999999999) . "/{$slug}",
            'walmart' => "https://www.walmart.com/ip/{$slug}/" . rand(100000000, 999999999),
            default => '#',
        };
    }

    /**
     * Generate platform-optimized title
     */
    private function generateOptimizedTitle(string $platform, string $title): string
    {
        return match($platform) {
            'amazon' => "{$title} - Premium Quality | Fast Shipping",
            'ebay' => "NEW {$title} - FREE SHIPPING - Fast Dispatch",
            'etsy' => "{$title} | Handcrafted | Ready to Ship",
            'walmart' => "{$title} - Best Value",
            default => $title,
        };
    }

    /**
     * Generate category ID
     */
    private function generateCategoryId(string $platform): string
    {
        return match($platform) {
            'shopify' => 'gid://shopify/Collection/' . rand(100000, 999999),
            'amazon' => 'electronics_' . rand(1000, 9999),
            'ebay' => (string) rand(10000, 99999),
            'etsy' => 'category_' . rand(100, 999),
            'walmart' => 'cat_' . rand(10000, 99999),
            default => 'general',
        };
    }

    /**
     * Generate tags
     */
    private function generateTags(string $platform): array
    {
        $commonTags = ['new-arrival', 'bestseller', 'trending'];

        $platformTags = match($platform) {
            'amazon' => ['prime-eligible', 'amazon-choice'],
            'ebay' => ['fast-n-free', 'top-rated'],
            'etsy' => ['handmade', 'artisan', 'gift-idea'],
            'shopify' => ['featured', 'sale', 'limited'],
            default => [],
        };

        return array_merge(
            array_slice($commonTags, 0, rand(1, 2)),
            array_slice($platformTags, 0, rand(1, 2))
        );
    }


    private function createListingForChannel($channel, $product, $company, $user)
    {
        $listingStatuses = ['draft', 'pending', 'active', 'active', 'active', 'paused', 'error'];
        $syncStatuses = ['synced', 'synced', 'synced', 'pending', 'error'];

        $status = $listingStatuses[array_rand($listingStatuses)];
        $syncStatus = $syncStatuses[array_rand($syncStatuses)];
        $isPublished = in_array($status, ['active', 'paused']);

        $priceMultiplier = match($channel->platform) {
            'amazon' => 0.95,
            'ebay' => 1.05,
            'etsy' => 1.15,
            default => 1.0,
        };

        $basePrice = floatval($product->selling_price ?? 50);
        $overridePrice = round($basePrice * $priceMultiplier, 2);

        Listing::updateOrCreate(
            [
                'channel_id' => $channel->channel_id,
                'stock_item_id' => $product->id,
            ],
            [
                'listing_id' => 'lst_' . Str::random(12),
                'company_id' => $company->id,
                'variant_id' => null,

                // Marketplace identifiers
                'marketplace_id' => $this->generateMarketplaceId($channel->platform),
                'marketplace_sku' => strtoupper($channel->platform) . '-' . $product->sku,
                'listing_url' => $this->generateListingUrl($channel, $product),

                // Content overrides
                'title_override' => $this->generateOptimizedTitle($channel->platform, $product->name),

                // Pricing
                'price_override' => $overridePrice,
                'compare_at_price' => $overridePrice * 1.2,
                'currency' => 'USD',

                // Inventory allocation
                'quantity_allocated' => rand(10, 100),
                'quantity_reserved' => rand(0, 10),
                'buffer_quantity' => rand(0, 5),
                'sync_quantity' => true,

                // Status
                'status' => $status,
                'sync_status' => $syncStatus,
                'last_synced_at' => $syncStatus === 'synced' ? now()->subMinutes(rand(5, 120)) : null,
                'sync_error' => null,
                'is_published' => $isPublished,
                'published_at' => $isPublished ? now()->subDays(rand(1, 30)) : null,
                'is_linked' => $status === 'active',

                // Marketplace-specific
                'category_id' => $this->generateCategoryId($channel->platform),
                'tags' => $this->generateTags($channel->platform),
                'shipping_template_id' => 'ship_' . rand(1, 5),
                'return_policy_id' => 'return_' . rand(1, 3),

                // Audit
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]
        );
    }
}
