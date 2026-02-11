<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class Attribute extends Model
{
    use BelongsToCompany;

    protected $fillable = ['name', 'type', 'is_variant', 'company_id', 'created_by_id'];

    protected $casts = [
        'is_variant' => 'boolean'
    ];
}
