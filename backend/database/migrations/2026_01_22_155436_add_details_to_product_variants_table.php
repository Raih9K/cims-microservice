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
            $table->decimal('cost_price', 10, 2)->nullable()->after('sku');
            $table->decimal('selling_price', 10, 2)->nullable()->after('cost_price');
            $table->string('image')->nullable()->after('selling_price');
            $table->string('barcode')->nullable()->after('sku');
            $table->integer('inventory_quantity')->default(0)->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn(['cost_price', 'selling_price', 'image', 'barcode', 'inventory_quantity']);
        });
    }
};
