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
        Schema::create('channels', function (Blueprint $table) {
            $table->string('channel_id')->primary();
            $table->string('name');
            $table->string('marketplace');
            $table->json('marketplace_data')->nullable();
            $table->unsignedBigInteger('belongs_to'); // company_id
            $table->timestamps();
        });

        Schema::create('listings', function (Blueprint $table) {
            $table->string('listing_id')->primary();
            $table->string('channel_id');
            $table->unsignedBigInteger('stock_item_id'); // Match products.id type (BIGINT UNSIGNED)
            $table->string('status')->default('active');
            $table->json('mapped_attributes')->nullable();
            $table->boolean('is_linked')->default(false);
            $table->timestamps();

            $table->foreign('channel_id')->references('channel_id')->on('channels')->onDelete('cascade');
            // Assuming products table id is string. If it was bigInteger, this would fail.
            // Product model says keyType = string.
            $table->foreign('stock_item_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
        Schema::dropIfExists('channels');
    }
};
