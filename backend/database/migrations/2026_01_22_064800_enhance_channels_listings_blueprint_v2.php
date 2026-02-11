<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * CIMS Blueprint v2.0 Implementation
 *
 * This migration enhances the channels and listings tables to support:
 * - Full audit trail (created_by, updated_by)
 * - Company isolation (multi-tenancy)
 * - Marketplace-specific fields
 * - Price/Title/Description overrides
 * - Inventory allocation
 * - Sync status tracking
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // ============================================================
        // ENHANCE CHANNELS TABLE
        // ============================================================
        Schema::table('channels', function (Blueprint $table) {
            // Platform enum
            if (!Schema::hasColumn('channels', 'platform')) {
                $table->enum('platform', ['shopify', 'amazon', 'ebay', 'etsy', 'walmart', 'other'])
                    ->default('shopify')
                    ->after('name');
            }

            // Status
            if (!Schema::hasColumn('channels', 'status')) {
                $table->enum('status', ['active', 'inactive', 'error', 'pending'])
                    ->default('pending')
                    ->after('marketplace');
            }

            // Credentials (encrypted)
            if (!Schema::hasColumn('channels', 'credentials')) {
                $table->text('credentials')->nullable()->after('marketplace_data');
            }

            // Store URL
            if (!Schema::hasColumn('channels', 'store_url')) {
                $table->string('store_url', 500)->nullable()->after('credentials');
            }

            // Sync tracking
            if (!Schema::hasColumn('channels', 'last_sync_at')) {
                $table->timestamp('last_sync_at')->nullable()->after('store_url');
            }
            if (!Schema::hasColumn('channels', 'sync_error')) {
                $table->text('sync_error')->nullable()->after('last_sync_at');
            }

            // Audit fields
            if (Schema::hasColumn('channels', 'belongs_to')) {
                $table->renameColumn('belongs_to', 'company_id');
            }

            if (!Schema::hasColumn('channels', 'connected_by')) {
                $table->unsignedBigInteger('connected_by')->nullable()->after('company_id');
            }
            if (!Schema::hasColumn('channels', 'created_by')) {
                $table->unsignedBigInteger('created_by')->nullable()->after('connected_by');
            }
            if (!Schema::hasColumn('channels', 'updated_by')) {
                $table->unsignedBigInteger('updated_by')->nullable()->after('created_by');
            }
            if (!Schema::hasColumn('channels', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        // ============================================================
        // ENHANCE LISTINGS TABLE (MARKETPLACE INVENTORY)
        // ============================================================
        Schema::table('listings', function (Blueprint $table) {
            // Company isolation
            if (!Schema::hasColumn('listings', 'company_id')) {
                $table->unsignedBigInteger('company_id')->after('listing_id');
            }

            // Variant reference
            if (!Schema::hasColumn('listings', 'variant_id')) {
                $table->string('variant_id')->nullable()->after('stock_item_id');
            }

            // Marketplace identifiers
            if (!Schema::hasColumn('listings', 'marketplace_id')) {
                $table->string('marketplace_id', 100)->nullable()->after('channel_id');
            }
            if (!Schema::hasColumn('listings', 'marketplace_sku')) {
                $table->string('marketplace_sku', 100)->nullable()->after('marketplace_id');
            }
            if (!Schema::hasColumn('listings', 'listing_url')) {
                $table->string('listing_url', 2000)->nullable()->after('marketplace_sku');
            }

            // Content overrides (null = use Central)
            if (!Schema::hasColumn('listings', 'title_override')) {
                $table->string('title_override', 500)->nullable()->after('listing_url');
            }
            if (!Schema::hasColumn('listings', 'description_override')) {
                $table->text('description_override')->nullable()->after('title_override');
            }
            if (!Schema::hasColumn('listings', 'short_description_override')) {
                $table->text('short_description_override')->nullable()->after('description_override');
            }
            if (!Schema::hasColumn('listings', 'features_override')) {
                $table->json('features_override')->nullable()->after('short_description_override');
            }

            // Pricing overrides
            if (!Schema::hasColumn('listings', 'price_override')) {
                $table->decimal('price_override', 10, 2)->nullable()->after('features_override');
            }
            if (!Schema::hasColumn('listings', 'compare_at_price')) {
                $table->decimal('compare_at_price', 10, 2)->nullable()->after('price_override');
            }
            if (!Schema::hasColumn('listings', 'currency')) {
                $table->string('currency', 3)->default('USD')->after('compare_at_price');
            }

            // Inventory allocation
            if (!Schema::hasColumn('listings', 'quantity_allocated')) {
                $table->integer('quantity_allocated')->default(0)->after('currency');
            }
            if (!Schema::hasColumn('listings', 'quantity_reserved')) {
                $table->integer('quantity_reserved')->default(0)->after('quantity_allocated');
            }
            if (!Schema::hasColumn('listings', 'buffer_quantity')) {
                $table->integer('buffer_quantity')->default(0)->after('quantity_reserved');
            }
            if (!Schema::hasColumn('listings', 'sync_quantity')) {
                $table->boolean('sync_quantity')->default(true)->after('buffer_quantity');
            }

            // Enhanced status
            if (Schema::hasColumn('listings', 'status')) {
                 $table->dropColumn('status');
            }
        });

        Schema::table('listings', function (Blueprint $table) {
            if (!Schema::hasColumn('listings', 'status')) {
                $table->enum('status', ['draft', 'pending', 'active', 'paused', 'error', 'ended'])
                    ->default('draft')
                    ->after('sync_quantity');
            }

            // Sync tracking
            if (!Schema::hasColumn('listings', 'sync_status')) {
                $table->enum('sync_status', ['synced', 'pending', 'error'])
                    ->default('pending')
                    ->after('status');
            }
            if (!Schema::hasColumn('listings', 'last_synced_at')) {
                $table->timestamp('last_synced_at')->nullable()->after('sync_status');
            }
            if (!Schema::hasColumn('listings', 'sync_error')) {
                $table->text('sync_error')->nullable()->after('last_synced_at');
            }

            // Publish tracking
            if (!Schema::hasColumn('listings', 'is_published')) {
                $table->boolean('is_published')->default(false)->after('sync_error');
            }
            if (!Schema::hasColumn('listings', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('is_published');
            }

            // Marketplace-specific data
            if (!Schema::hasColumn('listings', 'category_id')) {
                $table->string('category_id', 100)->nullable()->after('published_at');
            }
            if (!Schema::hasColumn('listings', 'product_type')) {
                $table->string('product_type', 255)->nullable()->after('category_id'); // e.g. Apparel > T-Shirt
            }
            if (!Schema::hasColumn('listings', 'tags')) {
                $table->json('tags')->nullable()->after('product_type');
            }

            // Shopify Specific policies
            if (!Schema::hasColumn('listings', 'inventory_policy')) {
                $table->enum('inventory_policy', ['deny', 'continue'])->default('deny')->after('tags');
            }
            if (!Schema::hasColumn('listings', 'is_taxable')) {
                $table->boolean('is_taxable')->default(true)->after('inventory_policy');
            }

            if (!Schema::hasColumn('listings', 'shipping_template_id')) {
                $table->string('shipping_template_id', 100)->nullable()->after('is_taxable');
            }
            if (!Schema::hasColumn('listings', 'return_policy_id')) {
                $table->string('return_policy_id', 100)->nullable()->after('shipping_template_id');
            }
            if (!Schema::hasColumn('listings', 'custom_attributes')) {
                $table->json('custom_attributes')->nullable()->after('return_policy_id');
            }

            // Audit fields
            if (!Schema::hasColumn('listings', 'created_by')) {
                $table->unsignedBigInteger('created_by')->nullable()->after('is_linked');
            }
            if (!Schema::hasColumn('listings', 'updated_by')) {
                $table->unsignedBigInteger('updated_by')->nullable()->after('created_by');
            }
            if (!Schema::hasColumn('listings', 'version')) {
                $table->integer('version')->default(1)->after('updated_by');
            }
            if (!Schema::hasColumn('listings', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        // ============================================================
        // ADD AUDIT FIELDS TO PRODUCTS TABLE
        // ============================================================
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'options')) {
                $table->json('options')->nullable()->after('description'); // e.g. [{"name":"Size","values":["S","M"]}]
            }

            if (!Schema::hasColumn('products', 'version')) {
                $table->integer('version')->default(1)->after('updated_at');
            }


            if (!Schema::hasColumn('products', 'deleted_at')) {
                $table->softDeletes();
            }

            if (!Schema::hasColumn('products', 'is_published')) {
                $table->boolean('is_published')->default(false)->after('status');
            }
            if (!Schema::hasColumn('products', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('is_published');
            }

            if (!Schema::hasColumn('products', 'updated_by')) {
                $table->unsignedBigInteger('updated_by')->nullable()->after('created_by_id');
            }
        });

        // ============================================================
        // CREATE AUDIT_LOG TABLE
        // ============================================================
        if (!Schema::hasTable('audit_logs')) {
            Schema::create('audit_logs', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->unsignedBigInteger('company_id');
                $table->unsignedBigInteger('user_id');
                $table->enum('action', ['create', 'update', 'delete', 'view', 'export', 'login', 'logout', 'sync']);
                $table->string('entity_type', 50);
                $table->string('entity_id')->nullable();
                $table->json('old_values')->nullable();
                $table->json('new_values')->nullable();
                $table->string('ip_address', 45);
                $table->string('user_agent', 500)->nullable();
                $table->string('request_id', 100)->nullable();
                $table->timestamp('created_at');

                $table->index('company_id');
                $table->index('user_id');
                $table->index(['entity_type', 'entity_id']);
                $table->index('action');
                $table->index('created_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Keep simple for safe rollback
        Schema::dropIfExists('audit_logs');
    }
};
