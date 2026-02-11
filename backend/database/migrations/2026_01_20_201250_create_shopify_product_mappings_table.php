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
        Schema::create('shopify_product_mappings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('shopify_stores')->onDelete('cascade');
            $table->uuid('cims_product_id'); // Assuming CIMS uses UUIDs for `stock_item` or `products`
            $table->unsignedBigInteger('shopify_product_id')->nullable();
            $table->unsignedBigInteger('shopify_variant_id')->nullable();

            // Sync State
            $table->boolean('sync_enabled')->default(true);
            $table->enum('sync_status', ['synced', 'pending', 'error', 'conflict'])->default('pending');
            $table->timestamp('last_synced_at')->nullable();
            $table->text('error_message')->nullable();

            // Product-Level Overrides
            $table->decimal('override_price', 10, 2)->nullable();
            $table->integer('override_stock_buffer')->nullable();

            $table->timestamps();

            // Indexes for fast lookup
            $table->index(['store_id', 'shopify_product_id']);
            $table->index(['store_id', 'cims_product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopify_product_mappings');
    }
};
