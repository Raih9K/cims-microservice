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
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'barcode')) $table->string('barcode')->nullable()->after('sku');
            if (!Schema::hasColumn('products', 'item_type')) $table->enum('item_type', ['physical', 'digital', 'service'])->default('physical')->after('type');
            if (!Schema::hasColumn('products', 'manufacturer_name')) $table->string('manufacturer_name', 200)->nullable()->after('brand');
            if (!Schema::hasColumn('products', 'manufacturer_country_code')) $table->char('manufacturer_country_code', 2)->nullable()->after('manufacturer_name');
            if (!Schema::hasColumn('products', 'manufacturer_state')) $table->string('manufacturer_state', 100)->nullable()->after('manufacturer_country_code');
            if (!Schema::hasColumn('products', 'manufacturer_postal_code')) $table->string('manufacturer_postal_code', 20)->nullable()->after('manufacturer_state');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            //
        });
    }
};
