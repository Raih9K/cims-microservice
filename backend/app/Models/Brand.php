<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class Brand extends Model
{
    use BelongsToCompany;

    protected $primaryKey = 'brand_id';
    protected $fillable = ['brand_name', 'brand_code', 'website', 'is_active', 'company_id', 'created_by_id'];
}
