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
        Schema::table('channels', function (Blueprint $table) {
            if (Schema::hasColumn('channels', 'belongs_to')) {
                $table->renameColumn('belongs_to', 'company_id');
            }
            if (!Schema::hasColumn('channels', 'created_by_id')) {
                $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
            }
        });

        Schema::table('listings', function (Blueprint $table) {
            if (!Schema::hasColumn('listings', 'company_id')) {
                $table->foreignId('company_id')->nullable()->after('listing_id')->constrained('companies')->onDelete('cascade');
            }
            if (!Schema::hasColumn('listings', 'created_by_id')) {
                $table->foreignId('created_by_id')->nullable()->after('company_id')->constrained('users')->onDelete('set null');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('channels', function (Blueprint $table) {
            //
        });
    }
};
