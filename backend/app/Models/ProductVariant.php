<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id', 'name', 'sku', 'attributes', 'status', 'cost_price', 'selling_price', 'image', 'barcode', 'inventory_quantity',
        'brand', 'category', 'supplier_data', 'specifications'
    ];

    protected $casts = [
        'attributes' => 'array',
        'supplier_data' => 'array',
        'specifications' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
