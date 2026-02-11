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
        Schema::create('shopify_stores', function (Blueprint $table) {
            $table->id();
            $table->string('store_name')->unique(); // e.g., my-store.myshopify.com
            $table->text('access_token'); // Will be encrypted in model
            $table->string('api_version')->default('2024-01');
            $table->boolean('is_active')->default(true);

            // Global Sync Configuration
            $table->boolean('sync_inventory')->default(true);
            $table->boolean('sync_price')->default(true);
            $table->boolean('sync_status')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopify_stores');
    }
};
