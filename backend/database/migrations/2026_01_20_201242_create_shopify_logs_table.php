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
        Schema::create('shopify_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('shopify_stores')->onDelete('cascade');
            $table->string('resource_type')->nullable(); // 'product', 'order', 'app'
            $table->string('resource_id')->nullable();
            $table->string('action'); // 'push', 'pull', 'webhook', 'error'
            $table->string('status'); // 'success', 'failed'
            $table->json('details')->nullable(); // context, diff, or error message
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopify_logs');
    }
};
