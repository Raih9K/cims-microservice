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
        Schema::table('listings', function (Blueprint $table) {
            $table->string('status')->nullable()->change();
        });
        Schema::table('channels', function (Blueprint $table) {
            $table->string('status')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->enum('status', ['draft', 'pending', 'active', 'paused', 'error', 'ended'])->default('draft')->change();
        });
        Schema::table('channels', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive', 'error', 'pending'])->default('pending')->change();
        });
    }
};
