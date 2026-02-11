<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToCompany;

/**
 * Channel Model - Marketplace Connection
 *
 * Represents a connected marketplace (Shopify, Amazon, eBay, etc.)
 * Each company can have multiple channels.
 */
class Channel extends Model
{
    use SoftDeletes, BelongsToCompany;

    protected $primaryKey = 'channel_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'channel_id',
        'name',
        'platform',
        'marketplace',
        'marketplace_data',
        'status',
        'credentials',
        'store_url',
        'last_sync_at',
        'sync_error',
        'company_id',
        'connected_by',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'marketplace_data' => 'array',
        'credentials' => 'encrypted:array',
        'last_sync_at' => 'datetime',
    ];

    protected $hidden = [
        'credentials', // Never expose credentials in API responses
    ];

    // ============================================================
    // RELATIONSHIPS
    // ============================================================

    public function listings()
    {
        return $this->hasMany(Listing::class, 'channel_id', 'channel_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function connectedBy()
    {
        return $this->belongsTo(User::class, 'connected_by');
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

    public function scopePlatform($query, $platform)
    {
        return $query->where('platform', $platform);
    }

    // ============================================================
    // ACCESSORS
    // ============================================================

    public function getActiveListingsCountAttribute()
    {
        return $this->listings()->where('status', 'active')->count();
    }

    public function getTotalAllocatedStockAttribute()
    {
        return $this->listings()->sum('quantity_allocated');
    }
}
