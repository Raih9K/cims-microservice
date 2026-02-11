<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Roles and Permissions
        $this->call([
            RolesAndPermissionsSeeder::class,
            SaaSSeeder::class, // Create Admin/Company (Demo Tech Solutions)
            CommerceSeeder::class,
            ProductSeeder::class,
            MarketplaceSeeder::class, // Channels and Listings
        ]);

        // 2. Packages and Coupons
        $this->call(PackageSeeder::class);

        // 3. Create Super Admin (Global Access)
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@wemonks.org'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'status' => 'active',
            ]
        );
        $superAdmin->assignRole('Super Admin');

        // 4. SaaS Demo Company & Users
        // SaaSSeeder moved to step 1 to ensure admin exists for other seeders.

        // 5. Connect SaaS users to the pivot table (if not already done by Seeder)
        $demoCompany = Company::where('name', 'Demo Tech Solutions')->first();
        if ($demoCompany) {
            $users = User::where('company_id', $demoCompany->id)->get();
            foreach ($users as $user) {
                $roleName = $user->getRoleNames()->first() ?? 'Team Member';
                $user->companies()->syncWithoutDetaching([
                    $demoCompany->id => [
                        'role' => $roleName,
                        'status' => 'active',
                        'is_locked' => false
                    ]
                ]);
            }
        }

        // 6. ProductSeeder is already called in step 1.
        // It handles user assignment internally now.
    }
}
