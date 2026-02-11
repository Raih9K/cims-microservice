<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Attributes
        Schema::table('attributes', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->after('id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
        });

        // Brands
        Schema::table('brands', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->after('brand_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
        });

        // Categories (stock_categories)
        Schema::table('stock_categories', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->after('id')->constrained('companies')->onDelete('cascade');
            // Rename or add created_by_id
            if (Schema::hasColumn('stock_categories', 'created_by')) {
                $table->renameColumn('created_by', 'created_by_id');
            } else {
                $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
            }
        });

        // Suppliers
        Schema::table('suppliers', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->after('id')->constrained('companies')->onDelete('cascade');
            if (Schema::hasColumn('suppliers', 'created_by')) {
                $table->renameColumn('created_by', 'created_by_id');
            } else {
                $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
            }
        });

        // Warehouses
        Schema::table('warehouses', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->after('id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
            // 'belongs_to' was in the schema but let's check if it exists and maybe remove if redundant
            if (Schema::hasColumn('warehouses', 'belongs_to')) {
                $table->dropColumn('belongs_to');
            }
        });

        // Shopify Stores
        Schema::table('shopify_stores', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->after('id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
        });

        // Products (ensure created_by_id exists)
        Schema::table('products', function (Blueprint $table) {
             if (Schema::hasColumn('products', 'created_by') && !Schema::hasColumn('products', 'created_by_id')) {
                 $table->renameColumn('created_by', 'created_by_id');
             }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('core_tables', function (Blueprint $table) {
            //
        });
    }
};
