<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class ShopifyStore extends Model
{
    use BelongsToCompany;

    protected $fillable = [
        'store_name',
        'access_token',
        'webhook_secret',
        'api_version',
        'is_active',
        'sync_inventory',
        'sync_price',
        'sync_status',
        'company_id',
        'created_by_id'
    ];

    protected $casts = [
        'access_token' => 'encrypted',
        'webhook_secret' => 'encrypted',
        'is_active' => 'boolean',
        'sync_inventory' => 'boolean',
        'sync_price' => 'boolean',
        'sync_status' => 'boolean',
    ];

    public function mappings()
    {
        return $this->hasMany(ShopifyProductMapping::class, 'store_id');
    }

    public function logs()
    {
        return $this->hasMany(ShopifyLog::class, 'store_id');
    }
}
