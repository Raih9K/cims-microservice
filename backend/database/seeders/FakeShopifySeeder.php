<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Channel;
use App\Models\Company;
use App\Models\Product;
use App\Models\Listing;
use Illuminate\Support\Str;

class FakeShopifySeeder extends Seeder
{
    public function run()
    {
        $user = \App\Models\User::first();
        $company = $user ? \App\Models\Company::find($user->getActiveCompanyId()) : \App\Models\Company::first();

        if (!$company) {
            $this->command->error('No company found. Please run baseline seeders first.');
            return;
        }

        // Create a fake Shopify Channel
        $channel = Channel::updateOrCreate(
            ['channel_id' => 'shopify'],
            [
                'name' => 'Demo Shopify Store',
                'marketplace' => 'shopify',
                'company_id' => $company->id,
                'status' => 'active',
                'marketplace_data' => [
                    'shop_url' => 'demo-store.myshopify.com',
                    'api_version' => '2024-01'
                ]
            ]
        );

        $this->command->info('Fake Shopify channel created: ' . $channel->channel_id);

        // Create some listings for existing products
        $products = Product::where('company_id', $company->id)->limit(10)->get();
        if ($products->isEmpty()) {
            $this->command->warn('No products found to create listings for.');
            return;
        }

        foreach ($products as $index => $product) {
            // Distribute across statuses
            $statuses = ['active', 'delisted', 'warning', 'error'];
            $status = $statuses[$index % count($statuses)];

            Listing::updateOrCreate(
                [
                    'channel_id' => $channel->channel_id,
                    'stock_item_id' => $product->id,
                ],
                [
                    'listing_id' => 'fake_lst_' . Str::random(10),
                    'company_id' => $company->id,
                    'status' => $status,
                    'is_linked' => true,
                    'mapped_attributes' => [
                        'title' => $product->name,
                        'price' => $product->selling_price,
                        'sku' => $product->sku,
                        'stock' => $product->initial_quantity
                    ]
                ]
            );
            $this->command->info("Created $status listing for product: " . $product->name);
        }
    }
}
