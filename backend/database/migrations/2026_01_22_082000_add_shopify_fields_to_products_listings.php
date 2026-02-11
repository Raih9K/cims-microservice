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
            if (!Schema::hasColumn('products', 'options')) {
                $table->json('options')->nullable()->after('description');
            }
        });

        Schema::table('listings', function (Blueprint $table) {
            if (!Schema::hasColumn('listings', 'product_type')) {
                $table->string('product_type', 255)->nullable()->after('category_id');
            }
            if (!Schema::hasColumn('listings', 'inventory_policy')) {
                $table->enum('inventory_policy', ['deny', 'continue'])->default('deny')->after('tags');
            }
            if (!Schema::hasColumn('listings', 'is_taxable')) {
                $table->boolean('is_taxable')->default(true)->after('inventory_policy');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['options']);
        });

        Schema::table('listings', function (Blueprint $table) {
            $table->dropColumn(['product_type', 'inventory_policy', 'is_taxable']);
        });
    }
};
