<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockLevel extends Model
{
    protected $fillable = ['product_id', 'warehouse_id', 'available_quantity', 'minimum_level', 'price'];

    /**
     * Get the warehouse that the stock level belongs to.
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the product that the stock level belongs to.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
