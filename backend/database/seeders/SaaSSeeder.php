<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SaaSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create a Demo Company
        $company = \App\Models\Company::firstOrCreate(
            ['name' => 'Demo Tech Solutions'],
            [
                'business_type' => 'Technology',
                'management_type' => 'team',
            ]
        );

        // 2. Create Business Admin (Boss)
        $admin = \App\Models\User::firstOrCreate(
            ['email' => 'admin@demo.com'],
            [
                'name' => 'Raihan Khan',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'company_id' => $company->id,
                'status' => 'active',
            ]
        );
        $admin->assignRole('Business Admin');

        // 3. Create Team Manager
        $manager = \App\Models\User::firstOrCreate(
            ['email' => 'manager@demo.com'],
            [
                'name' => 'Jane Doe',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'company_id' => $company->id,
                'status' => 'active',
            ]
        );
        $manager->assignRole('Team Manager');

        // 4. Create Team Member
        $member = \App\Models\User::firstOrCreate(
            ['email' => 'member@demo.com'],
            [
                'name' => 'John Smith',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'company_id' => $company->id,
                'status' => 'active',
            ]
        );
        $member->assignRole('Team Member');

        $this->command->info('SaaS Demo Data Seeded Successfully!');
        $this->command->info('Admin: admin@demo.com / password');
        $this->command->info('Manager: manager@demo.com / password');
        $this->command->info('Member: member@demo.com / password');
    }
}
