<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductDimension extends Model
{
    protected $table = 'stock_item_dimensions';
    protected $fillable = ['product_id', 'length', 'width', 'height', 'weight', 'weight_unit', 'dimension_unit'];
}
