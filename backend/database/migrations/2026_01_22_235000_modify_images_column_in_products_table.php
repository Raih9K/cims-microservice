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
        // Changing images column to LONGTEXT to support Base64 strings in JSON
        DB::statement('ALTER TABLE products MODIFY images LONGTEXT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         // Reverting back to TEXT or JSON - Warning: Data truncation may occur
         // Assuming it was TEXT or similar before.
         DB::statement('ALTER TABLE products MODIFY images TEXT NULL');
    }
};
