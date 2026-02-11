<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = [
        'email',
        'company_id',
        'role',
        'token',
        'invited_by',
        'expires_at',
        'status'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function inviter()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }
}
