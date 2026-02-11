<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class Product extends Model
{
    use BelongsToCompany;

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = static::generateUnique10DigitId();
            }
        });
    }

    private static function generateUnique10DigitId()
    {
        do {
            $id = mt_rand(1000000000, 9999999999);
        } while (static::where('id', $id)->exists());
        return (string)$id;
    }

    protected $fillable = [
        'company_id', 'business_name', 'name', 'type', 'stock_type', 'sku', 'barcode', 'category', 'brand', 'description', 'uom', 'item_type',
        'track_inventory', 'initial_quantity', 'reorder_level', 'safety_stock', 'allow_backorder',
        'warehouse', 'bin', 'location_note',
        'manufacturer_name', 'manufacturer_country_code', 'manufacturer_state', 'manufacturer_postal_code',
        'cost_price', 'selling_price', 'discount_type', 'discount_value', 'tax_class',
        'images', 'thumbnail', 'video_url',
        'status', 'visibility', 'created_by_id', 'internal_notes'
    ];

    public function identifiers()
    {
        return $this->hasMany(ProductIdentifier::class, 'product_id');
    }

    public function bulletPoints()
    {
        return $this->hasMany(ProductBulletPoint::class, 'product_id');
    }

    public function dimensions()
    {
        return $this->hasOne(ProductDimension::class, 'product_id');
    }

    public function stockLevels()
    {
        return $this->hasMany(StockLevel::class, 'product_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    protected $casts = [
        'track_inventory' => 'boolean',
        'allow_backorder' => 'boolean',
        'images' => 'array',
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'discount_value' => 'decimal:2',
    ];

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
