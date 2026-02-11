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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['Simple', 'Variant'])->default('Simple');
            $table->string('sku')->unique()->nullable();
            $table->string('category')->nullable();
            $table->string('brand')->nullable();
            $table->text('description')->nullable();
            $table->string('uom')->nullable(); // Unit of Measure

            // Inventory
            $table->boolean('track_inventory')->default(true);
            $table->integer('initial_quantity')->default(0);
            $table->integer('reorder_level')->default(0);
            $table->integer('safety_stock')->default(0);
            $table->boolean('allow_backorder')->default(false);

            // Warehouse
            $table->string('warehouse')->nullable();
            $table->string('bin')->nullable();
            $table->string('location_note')->nullable();

            // Pricing
            $table->decimal('cost_price', 15, 2)->default(0);
            $table->decimal('selling_price', 15, 2)->default(0);
            $table->string('discount_type')->nullable(); // flat, percentage
            $table->decimal('discount_value', 15, 2)->default(0);
            $table->string('tax_class')->nullable();

            // Media
            $table->text('images')->nullable(); // JSON or serialized
            $table->string('thumbnail')->nullable();
            $table->string('video_url')->nullable();

            // Meta
            $table->string('status')->default('Draft'); // Draft, Active, Archived
            $table->string('visibility')->default('Public');
            $table->foreignId('created_by')->nullable();
            $table->text('internal_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
