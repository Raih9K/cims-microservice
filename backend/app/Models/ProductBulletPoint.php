<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductBulletPoint extends Model
{
    protected $table = 'item_bullet_points';
    protected $fillable = ['product_id', 'bullet_text', 'display_order'];
}
