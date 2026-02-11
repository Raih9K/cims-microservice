<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToCompany;

class Supplier extends Model
{
    use BelongsToCompany;

    protected $fillable = [
        'supplier_code', 'supplier_name', 'contact_person_name',
        'email_address', 'phone_number', 'address', 'country',
        'state', 'city', 'zip_code', 'company_id', 'created_by_id'
    ];
}
