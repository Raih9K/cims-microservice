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
        Schema::table('companies', function (Blueprint $table) {
            $table->integer('max_seats')->default(5)->after('subscription_status');
        });

        Schema::table('company_user', function (Blueprint $table) {
            $table->boolean('is_locked')->default(false)->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('max_seats');
        });

        Schema::table('company_user', function (Blueprint $table) {
            $table->dropColumn('is_locked');
        });
    }
};
