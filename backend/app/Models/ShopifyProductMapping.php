<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopifyProductMapping extends Model
{
    protected $fillable = [
        'store_id',
        'cims_product_id',
        'shopify_product_id',
        'shopify_variant_id',
        'sync_enabled',
        'sync_status',
        'last_synced_at',
        'error_message',
        'override_price',
        'override_stock_buffer'
    ];

    protected $casts = [
        'sync_enabled' => 'boolean',
        'last_synced_at' => 'datetime',
        'shopify_product_id' => 'integer',
        'shopify_variant_id' => 'integer',
        'override_price' => 'decimal:2',
    ];

    public function store()
    {
        return $this->belongsTo(ShopifyStore::class, 'store_id');
    }

    public function product()
    {
        // Assuming your main product model is Product and identifies by stock_item_id or similar
        return $this->belongsTo(Product::class, 'cims_product_id', 'stock_item_id');
    }
}
