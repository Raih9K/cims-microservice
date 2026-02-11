<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToCompany;

/**
 * Listing Model - Marketplace Published Inventory
 *
 * This is the SECOND inventory table.
 * Each listing represents a product published to a marketplace channel
 * with channel-specific overrides (price, title, description, etc.)
 */
class Listing extends Model
{
    use SoftDeletes, BelongsToCompany;

    protected $primaryKey = 'listing_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'listing_id',
        'company_id',
        'channel_id',
        'stock_item_id',
        'variant_id',

        // Marketplace identifiers
        'marketplace_id',
        'marketplace_sku',
        'listing_url',

        // Content overrides
        'title_override',
        'description_override',
        'short_description_override',
        'features_override',
        'mapped_attributes',

        // Pricing overrides
        'price_override',
        'compare_at_price',
        'currency',

        // Inventory allocation
        'quantity_allocated',
        'quantity_reserved',
        'buffer_quantity',
        'sync_quantity',

        // Status
        'status',
        'sync_status',
        'last_synced_at',
        'sync_error',
        'is_published',
        'published_at',
        'is_linked',

        // Marketplace-specific
        'category_id',
        'tags',
        'shipping_template_id',
        'return_policy_id',
        'custom_attributes',

        // Audit
        'created_by',
        'updated_by',
        'version',
    ];

    protected $casts = [
        'mapped_attributes' => 'array',
        'features_override' => 'array',
        'tags' => 'array',
        'custom_attributes' => 'array',
        'price_override' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
        'is_linked' => 'boolean',
        'sync_quantity' => 'boolean',
        'is_published' => 'boolean',
        'last_synced_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    // ============================================================
    // BOOT - Auto-generate ID and track version
    // ============================================================

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->listing_id)) {
                $model->listing_id = 'lst_' . bin2hex(random_bytes(8));
            }
            $model->version = 1;
        });

        static::updating(function ($model) {
            $model->version = ($model->version ?? 0) + 1;
        });
    }

    // ============================================================
    // RELATIONSHIPS
    // ============================================================

    public function channel()
    {
        return $this->belongsTo(Channel::class, 'channel_id', 'channel_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'stock_item_id', 'id');
    }

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // ============================================================
    // SCOPES
    // ============================================================

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeWithErrors($query)
    {
        return $query->where('status', 'error')
            ->orWhere('sync_status', 'error');
    }

    public function scopeNeedingSync($query)
    {
        return $query->where('sync_status', 'pending');
    }

    public function scopeForChannel($query, $channelId)
    {
        return $query->where('channel_id', $channelId);
    }

    public function scopeForProduct($query, $productId)
    {
        return $query->where('stock_item_id', $productId);
    }

    // ============================================================
    // ACCESSORS - Get effective values (override or central)
    // ============================================================

    public function getEffectiveTitleAttribute()
    {
        return $this->title_override ?? $this->product?->name;
    }

    public function getEffectiveDescriptionAttribute()
    {
        return $this->description_override ?? $this->product?->description;
    }

    public function getEffectivePriceAttribute()
    {
        return $this->price_override ?? $this->product?->selling_price;
    }

    public function getAvailableQuantityAttribute()
    {
        return max(0, $this->quantity_allocated - $this->quantity_reserved - $this->buffer_quantity);
    }

    public function getChannelPlatformAttribute()
    {
        return $this->channel?->platform;
    }

    public function getChannelNameAttribute()
    {
        return $this->channel?->name;
    }

    // ============================================================
    // HELPERS
    // ============================================================

    public function markAsSynced()
    {
        $this->update([
            'sync_status' => 'synced',
            'last_synced_at' => now(),
            'sync_error' => null,
        ]);
    }

    public function markSyncError($error)
    {
        $this->update([
            'sync_status' => 'error',
            'sync_error' => $error,
        ]);
    }

    public function publish()
    {
        $this->update([
            'status' => 'active',
            'is_published' => true,
            'published_at' => $this->published_at ?? now(),
        ]);
    }

    public function pause()
    {
        $this->update([
            'status' => 'paused',
        ]);
    }
}
