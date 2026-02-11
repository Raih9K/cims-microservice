<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'company.manage',
            'team.manage', 'team.invite', 'team.activate', 'team.deactivate',
            'product.create', 'product.update',
            'inventory.view', 'inventory.adjust',
            'order.create', 'order.approve'
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and Assign Permissions

        // Super Admin
        $superAdmin = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Admin']);
        // Super admin gets all permissions
        $superAdmin->givePermissionTo(\Spatie\Permission\Models\Permission::all());

        // Business Admin
        $businessAdmin = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Business Admin']);
        $businessAdmin->syncPermissions([
            'company.manage',
            'team.manage', 'team.invite', 'team.activate', 'team.deactivate',
            'product.create', 'product.update',
            'inventory.view', 'inventory.adjust',
            'order.create', 'order.approve'
        ]);

        // Team Manager
        $teamManager = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Team Manager']);
        $teamManager->syncPermissions([
            'team.manage', 'team.invite', 'team.activate', 'team.deactivate',
            'inventory.view', 'inventory.adjust',
            'order.create', 'order.approve'
        ]);

        // Team Member
        $teamMember = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Team Member']);
        $teamMember->syncPermissions([
            'product.create', 'product.update',
            'inventory.view', 'inventory.adjust',
            'order.create'
        ]);

        // Viewer
        $viewer = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Viewer']);
        $viewer->syncPermissions([
            'inventory.view'
        ]);
    }
}
