<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Attribute;
use App\Models\Warehouse;
use App\Models\Channel;

class CommerceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user (Business Admin) to assign ownership
        $user = \App\Models\User::first();
        $companyId = $user ? $user->company_id : 1; // Fallback to 1 if no user
        $userId = $user ? $user->id : 1;

        // 1. Categories (Model: Category, Column: category_name)
        $categories = ['Electronics', 'Fashion', 'Home & Garden', 'Toys', 'Sports', 'Automotive'];
        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['category_name' => $cat, 'company_id' => $companyId],
                ['created_by_id' => $userId]
            );
        }

        // 2. Brands (Model: Brand, Column: brand_name)
        $brands = ['Nike', 'Samsung', 'Apple', 'Adidas', 'Sony', 'Lego', 'Bosch'];
        foreach ($brands as $brand) {
            Brand::firstOrCreate(
                ['brand_name' => $brand, 'company_id' => $companyId],
                ['created_by_id' => $userId, 'brand_code' => strtoupper(substr($brand, 0, 3))]
            );
        }

        // 3. Attributes
        $attributes = [
            'Color' => ['type' => 'text'],
            'Size' => ['type' => 'select'],
            'Material' => ['type' => 'text'],
        ];

        foreach ($attributes as $name => $data) {
            Attribute::firstOrCreate(
                ['name' => $name, 'company_id' => $companyId],
                ['type' => $data['type'], 'is_variant' => true, 'created_by_id' => $userId]
            );
        }

        // 4. Warehouses
        $warehouses = [
            ['name' => 'Main Warehouse (NY)', 'address' => 'New York, USA', 'is_default' => true],
            ['name' => 'West Coast Hub (LA)', 'address' => 'Los Angeles, USA', 'is_default' => false],
            ['name' => 'European Distribution (Berlin)', 'address' => 'Berlin, Germany', 'is_default' => false],
        ];

        foreach ($warehouses as $wh) {
            Warehouse::firstOrCreate(
                ['name' => $wh['name'], 'company_id' => $companyId],
                ['address' => $wh['address'], 'is_default' => $wh['is_default'], 'created_by_id' => $userId]
            );
        }

        // 5. Channels
        $channels = [
            ['name' => 'Online Store (Shopify)', 'marketplace' => 'Shopify', 'id' => 'CH_001'],
            ['name' => 'Amazon US', 'marketplace' => 'Amazon', 'id' => 'CH_002'],
            ['name' => 'Retail POS', 'marketplace' => 'POS', 'id' => 'CH_003'],
        ];

        foreach ($channels as $ch) {
            $exists = DB::table('channels')->where('channel_id', $ch['id'])->exists();

            if (!$exists) {
                DB::table('channels')->insert([
                    'channel_id' => $ch['id'],
                    'name' => $ch['name'],
                    'marketplace' => $ch['marketplace'],
                    'company_id' => $companyId,
                    'platform' => strtolower($ch['marketplace']) === 'pos' ? 'other' : strtolower($ch['marketplace']),
                    'status' => 'active',
                    'marketplace_data' => json_encode([]),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'store_url' => null,
                    'last_sync_at' => null,
                    'sync_error' => null,
                    'connected_by' => $userId,
                    'created_by' => $userId,
                    'updated_by' => $userId,
                ]);
            }
        }

    }
}
