<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Channel;
use App\Models\Listing;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the Admin User created by UserSeeder
        $user = \App\Models\User::where('email', 'admin@demo.com')->first();

        // If no admin found, fallback to creating one (failsafe)
        if (!$user) {
             $company = \App\Models\Company::firstOrCreate(['name' => 'Fallback Company']);
             $user = \App\Models\User::create([
                 'name' => 'Fallback Admin',
                 'email' => 'admin@demo.com',
                 'password' => \Illuminate\Support\Facades\Hash::make('password'),
                 'company_id' => $company->id
             ]);
        }

        $companyId = $user->company_id;
        $userId = $user->id;

        $categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Toys'];
        $brands = ['Generic', 'PremiumBrand', 'EcoLife', 'TechGiant', 'Speedy'];

        // Generate 25 products
        for ($i = 1; $i <= 25; $i++) {
            $isVariant = $i % 4 === 0; // Every 4th product has variants
            $category = $categories[array_rand($categories)];
            $brand = $brands[array_rand($brands)];

            $product = \App\Models\Product::updateOrCreate(
                ['sku' => strtoupper(substr($category, 0, 3)) . '-' . str_pad($i, 3, '0', STR_PAD_LEFT)],
                [
                    'name' => "$brand $category Item $i",
                    'type' => $isVariant ? 'Variant' : 'Simple',
                    'category' => $category,
                    'brand' => $brand,
                    'description' => "A high-quality $category item from $brand. Perfect for daily use.",
                    'uom' => 'pcs',
                    'track_inventory' => true,
                    'initial_quantity' => rand(10, 500),
                    'reorder_level' => rand(5, 20),
                    'safety_stock' => rand(2, 10),
                    'cost_price' => rand(10, 100),
                    'selling_price' => rand(100, 300), // Ensures profit margin
                    'status' => 'Active',
                    'visibility' => 'Public',
                    'company_id' => $companyId,
                    'created_by_id' => $userId,
                ]
            );

            if ($isVariant) {
                // Create 3 variants for this product
                $colors = ['Red', 'Blue', 'Green', 'Black'];
                foreach (array_rand($colors, 3) as $key) {
                    $color = $colors[$key];
                    $product->variants()->updateOrCreate(
                        ['sku' => $product->sku . '-' . strtoupper($color)],
                        [
                            'name' => $product->name . " - $color",
                            'attributes' => ['Color' => $color],
                            'status' => 'active'
                        ]
                    );
                }
            }
        }
    }
}
