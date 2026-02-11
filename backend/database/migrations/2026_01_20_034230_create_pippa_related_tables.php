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
        // Category Table
        if (!Schema::hasTable('stock_categories')) {
            Schema::create('stock_categories', function (Blueprint $table) {
                $table->id();
                $table->string('category_name', 100);
                $table->unsignedBigInteger('created_by');
                $table->timestamps();
            });
        }

        // Brand Table
        if (!Schema::hasTable('brands')) {
            Schema::create('brands', function (Blueprint $table) {
                $table->id('brand_id');
                $table->string('brand_name', 200);
                $table->string('brand_code', 50)->unique()->nullable();
                $table->string('website', 500)->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Product Identifiers
        if (!Schema::hasTable('stock_item_identifiers')) {
            Schema::create('stock_item_identifiers', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('product_id');
                $table->string('product_identifier', 100);
                $table->text('product_identifier_value');
                $table->timestamps();
            });
        }

        // Bullet Points
        if (!Schema::hasTable('item_bullet_points')) {
            Schema::create('item_bullet_points', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('product_id');
                $table->string('bullet_text', 500);
                $table->integer('display_order')->default(0);
                $table->timestamps();
            });
        }

        // Dimensions
        if (!Schema::hasTable('stock_item_dimensions')) {
            Schema::create('stock_item_dimensions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('product_id');
                $table->decimal('length', 10, 2)->nullable();
                $table->decimal('width', 10, 2)->nullable();
                $table->decimal('height', 10, 2)->nullable();
                $table->decimal('weight', 10, 2)->nullable();
                $table->string('weight_unit', 10)->default('pounds');
                $table->string('dimension_unit', 10)->default('inches');
                $table->timestamps();
            });
        }

        // Warehouse Table
        if (!Schema::hasTable('warehouses')) {
            Schema::create('warehouses', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('address')->nullable();
                $table->string('country')->nullable();
                $table->string('state')->nullable();
                $table->string('city')->nullable();
                $table->string('zip_code', 20)->nullable();
                $table->boolean('is_default')->default(false);
                $table->unsignedBigInteger('belongs_to');
                $table->timestamps();
            });
        }

        // Suppliers Table
        if (!Schema::hasTable('suppliers')) {
            Schema::create('suppliers', function (Blueprint $table) {
                $table->id();
                $table->string('supplier_code')->unique();
                $table->string('supplier_name');
                $table->string('contact_person_name')->nullable();
                $table->string('email_address')->nullable();
                $table->string('phone_number', 50)->nullable();
                $table->string('address')->nullable();
                $table->string('country')->nullable();
                $table->string('state')->nullable();
                $table->string('city')->nullable();
                $table->string('zip_code', 20)->nullable();
                $table->unsignedBigInteger('created_by');
                $table->timestamps();
            });
        }

        // Stock Levels
        if (!Schema::hasTable('stock_levels')) {
            Schema::create('stock_levels', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('product_id');
                $table->unsignedBigInteger('warehouse_id');
                $table->integer('available_quantity')->default(0);
                $table->integer('minimum_level')->default(0);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_levels');
        Schema::dropIfExists('suppliers');
        Schema::dropIfExists('warehouses');
        Schema::dropIfExists('stock_item_dimensions');
        Schema::dropIfExists('item_bullet_points');
        Schema::dropIfExists('stock_item_identifiers');
        Schema::dropIfExists('brands');
        Schema::dropIfExists('stock_categories');
    }
};
