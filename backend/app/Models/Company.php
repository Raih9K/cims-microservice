<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['name', 'business_type', 'management_type', 'package_id', 'subscription_status', 'trial_ends_at', 'max_seats'];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('role', 'status', 'is_locked')->withTimestamps();
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }
}
