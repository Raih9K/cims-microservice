<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Changing image column to LONGTEXT to support Base64 strings
        DB::statement('ALTER TABLE product_variants MODIFY image LONGTEXT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverting back to VARCHAR(255) - Warning: Data truncation may occur
        DB::statement('ALTER TABLE product_variants MODIFY image VARCHAR(255) NULL');
    }
};
