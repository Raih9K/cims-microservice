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
        Schema::table('product_variants', function (Blueprint $table) {
            $table->string('brand')->nullable()->after('selling_price');
            $table->string('category')->nullable()->after('brand');
            $table->json('supplier_data')->nullable()->after('category');
            // We use a generic 'specifications' JSON for other attributes
            $table->json('specifications')->nullable()->after('supplier_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn(['brand', 'category', 'supplier_data', 'specifications']);
        });
    }
};
