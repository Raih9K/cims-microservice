<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;
use App\Models\Coupon;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Packages
        Package::updateOrCreate(['name' => 'Starter'], [
            'price' => 0.00,
            'features' => json_encode(['1 User', 'Basic Inventory', '500 Products', 'Email Support']),
        ]);

        Package::updateOrCreate(['name' => 'Pro'], [
            'price' => 29.00,
            'features' => json_encode(['5 Users', 'Advanced Inventory', 'Unlimited Products', 'Priority Support', 'Analytics']),
        ]);

        Package::updateOrCreate(['name' => 'Business'], [
            'price' => 99.00,
            'features' => json_encode(['Unlimited Users', 'Multi-Warehouse', 'API Access', 'Dedicated Manager', 'Custom Reports']),
        ]);

        // Seed a Demo Coupon
        Coupon::updateOrCreate(['code' => 'WELCOME20'], [
            'discount_percent' => 20.00,
            'valid_until' => now()->addMonths(1),
            'usage_limit' => 100,
        ]);
    }
}
