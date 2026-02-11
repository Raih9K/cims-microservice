<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductIdentifier extends Model
{
    protected $table = 'stock_item_identifiers';
    protected $fillable = ['product_id', 'product_identifier', 'product_identifier_value'];
}
