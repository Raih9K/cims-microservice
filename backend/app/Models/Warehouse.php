<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class Warehouse extends Model
{
    use BelongsToCompany;

    protected $fillable = [
        'name', 'address', 'country', 'state', 'city', 'zip_code',
        'is_default', 'company_id', 'created_by_id'
    ];
}
