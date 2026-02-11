<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Company;
use App\Models\Product;
use App\Models\Channel;
use App\Models\Listing;
use App\Models\Warehouse;

class MasterDataSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Ensure Company exists
        $company = Company::firstOrCreate(
            ['name' => 'Nexus Global Corp'],
            [
                'business_type' => 'Retail',
                'management_type' => 'team'
            ]
        );

        // 2. Ensure Admin User exists
        $user = User::where('email', 'admin@nexus.com')->first();
        if (!$user) {
            $user = User::create([
                'name' => 'System Admin',
                'email' => 'admin@nexus.com',
                'password' => Hash::make('password'),
                'company_id' => $company->id,
                'status' => 'active'
            ]);
        }

        // 3. Ensure a Warehouse exists
        $warehouse = Warehouse::firstOrCreate(
            ['name' => 'Main Distribution Hub', 'company_id' => $company->id],
            [
                'address' => '123 Supply Chain Ave',
                'country' => 'USA',
                'state' => 'TX',
                'city' => 'Austin',
                'zip_code' => '78701',
                'is_default' => true
            ]
        );

        // 4. Create 20 Products in Inventory
        $productsData = [
            ['name' => 'HyperX Alloy Core Keyboard', 'sku' => 'HX-KB4-RGB', 'price' => 49.99],
            ['name' => 'Logitech G502 Hero', 'sku' => 'LOGI-G502', 'price' => 59.99],
            ['name' => 'Sony WH-1000XM5', 'sku' => 'SONY-XM5', 'price' => 399.99],
            ['name' => 'Dell UltraSharp 27', 'sku' => 'DELL-U27', 'price' => 450.00],
            ['name' => 'MacBook Pro M3 Max', 'sku' => 'APPLE-MBP-M3', 'price' => 3499.00],
            ['name' => 'Samsung 990 Pro 2TB', 'sku' => 'SAM-990-2TB', 'price' => 189.99],
            ['name' => 'Keychron K2 Wireless', 'sku' => 'KEY-K2-V2', 'price' => 79.99],
            ['name' => 'Secretlab Titan Evo', 'sku' => 'SEC-TITAN-EVO', 'price' => 549.00],
            ['name' => 'ASUS ROG Swift 360Hz', 'sku' => 'ASUS-ROG-360', 'price' => 699.00],
            ['name' => 'NVIDIA RTX 4090 FE', 'sku' => 'NV-4090-FE', 'price' => 1599.00],
            ['name' => 'Blue Yeti Microphone', 'sku' => 'BLUE-YETI-SILV', 'price' => 129.99],
            ['name' => 'Elgato Stream Deck MK.2', 'sku' => 'ELG-SD-MK2', 'price' => 149.99],
            ['name' => 'Razer DeathAdder V3', 'sku' => 'RAZ-DV3-PRO', 'price' => 149.99],
            ['name' => 'SteelSeries Arctis Nova', 'sku' => 'SS-ARCTIS-N7', 'price' => 179.99],
            ['name' => 'Kindle Paperwhite 16GB', 'sku' => 'AMZ-KINDLE-PW', 'price' => 149.00],
            ['name' => 'Philips Hue Bridge', 'sku' => 'PHIL-HUE-BRD', 'price' => 59.99],
            ['name' => 'Epson EcoTank Pro', 'sku' => 'EPS-ECO-PRO', 'price' => 899.00],
            ['name' => 'TP-Link Archer AXE75', 'sku' => 'TPL-AXE75', 'price' => 199.99],
            ['name' => 'WD Black 8TB HDD', 'sku' => 'WD-BLK-8TB', 'price' => 220.00],
            ['name' => 'SanDisk 1TB microSD', 'sku' => 'SD-EXT-1TB', 'price' => 109.99],
        ];

        $products = [];
        foreach ($productsData as $data) {
            $products[] = Product::updateOrCreate(
                ['sku' => $data['sku'], 'company_id' => $company->id],
                [
                    'name' => $data['name'],
                    'type' => 'Simple',
                    'selling_price' => $data['price'],
                    'cost_price' => $data['price'] * 0.7,
                    'initial_quantity' => rand(50, 200),
                    'status' => 'Active',
                    'category' => 'Electronics',
                    'brand' => explode(' ', $data['name'])[0],
                    'created_by' => $user->id
                ]
            );
        }

        $this->command->info('Inventory synced: 20 products established.');

        // 5. Ensure Shopify Channel is connected
        $shopifyChannel = Channel::updateOrCreate(
            ['channel_id' => 'shopify'],
            [
                'name' => 'Official Shopify Store',
                'platform' => 'shopify',
                'marketplace' => 'shopify',
                'company_id' => $company->id,
                'status' => 'active',
                'connected_by' => $user->id,
                'marketplace_data' => [
                    'shop_url' => 'nexus-global.myshopify.com',
                    'api_version' => '2024-01'
                ]
            ]
        );

        $this->command->info('Marketplace synced: Shopify channel connected.');

        // 6. Create 12 Listings for Shopify (at least 10 required)
        for ($i = 0; $i < 12; $i++) {
            $product = $products[$i];

            // Distribute statuses across listings
            $statuses = ['active', 'delisted', 'warning', 'error', 'pending'];
            $status = $statuses[$i % count($statuses)];

            Listing::updateOrCreate(
                [
                    'channel_id' => $shopifyChannel->channel_id,
                    'stock_item_id' => $product->id,
                    'company_id' => $company->id
                ],
                [
                    'listing_id' => 'fake_lst_' . Str::random(10),
                    'status' => $status,
                    'is_linked' => true,
                    'quantity_allocated' => rand(10, 50),
                    'price_override' => $product->selling_price + rand(-5, 5),
                    'created_by' => $user->id,
                    'mapped_attributes' => [
                        'title' => $product->name . ' (Standard Edition)',
                        'price' => $product->selling_price,
                        'sku' => $product->sku
                    ]
                ]
            );
        }

        $this->command->info('Marketplace synced: 12 Shopify listings established.');
    }
}
