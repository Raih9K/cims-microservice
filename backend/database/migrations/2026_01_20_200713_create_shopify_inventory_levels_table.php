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
        Schema::create('shopify_inventory_levels', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary(); // Shopify Level ID (if applicable, but composite key is common: item_id + location_id)
            $table->unsignedBigInteger('inventory_item_id');
            $table->unsignedBigInteger('location_id');
            $table->integer('available')->default(0);
            $table->timestamps();
            $table->string('admin_graphql_api_id')->nullable();

            // Unique constraint usually applies to item+location
            $table->unique(['inventory_item_id', 'location_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopify_inventory_levels');
    }
};
