<?php

namespace App\Traits;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

trait BelongsToCompany
{
    protected static function bootBelongsToCompany()
    {
        static::creating(function ($model) {
            if (Auth::check()) {
                if (!$model->company_id) {
                    $model->company_id = Auth::user()->getActiveCompanyId();
                }
                if (!$model->created_by_id) {
                    $model->created_by_id = Auth::id();
                }
            }
        });

        static::addGlobalScope('company', function (Builder $builder) {
            if (Auth::check()) {
                $builder->where($builder->getQuery()->from . '.company_id', Auth::user()->getActiveCompanyId());
            }
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}
