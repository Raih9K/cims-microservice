<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class Category extends Model
{
    use BelongsToCompany;

    protected $table = 'stock_categories';
    protected $fillable = ['category_name', 'company_id', 'created_by_id'];
}
