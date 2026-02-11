<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopifyLog extends Model
{
    protected $fillable = [
        'store_id',
        'resource_type',
        'resource_id',
        'action',
        'status',
        'details'
    ];

    protected $casts = [
        'details' => 'array'
    ];

    public function store()
    {
        return $this->belongsTo(ShopifyStore::class, 'store_id');
    }
}
