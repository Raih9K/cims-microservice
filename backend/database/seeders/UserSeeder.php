<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Company;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Default Company
        $company = Company::firstOrCreate(
            ['name' => 'Demo Company'],
            [
                'business_type' => 'Retail',
                'management_type' => 'single',
                'subscription_status' => 'active'
            ]
        );

        // 2. Create Admin User
        $user = User::firstOrCreate(
            ['email' => 'admin@demo.com'],
            [
                'name' => 'Demo Admin',
                'password' => Hash::make('password123'),
                'company_id' => $company->id,
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 3. Assign Role (Business Admin)
        $user->assignRole('Business Admin');
    }
}
