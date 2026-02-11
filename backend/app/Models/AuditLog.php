<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * AuditLog Model - Complete Audit Trail
 *
 * Tracks all user actions for compliance and security.
 * Every create/update/delete is logged with old/new values.
 */
class AuditLog extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    const UPDATED_AT = null; // Only created_at, never updated

    protected $fillable = [
        'id',
        'company_id',
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
        'request_id',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString();
            }
        });
    }

    // ============================================================
    // RELATIONSHIPS
    // ============================================================

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ============================================================
    // SCOPES
    // ============================================================

    public function scopeForEntity($query, $type, $id = null)
    {
        $query->where('entity_type', $type);
        if ($id) {
            $query->where('entity_id', $id);
        }
        return $query;
    }

    public function scopeByAction($query, $action)
    {
        return $query->where('action', $action);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeRecent($query, $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    // ============================================================
    // STATIC HELPER - Log Action
    // ============================================================

    public static function logAction(
        string $action,
        string $entityType,
        ?string $entityId = null,
        ?array $oldValues = null,
        ?array $newValues = null
    ): self {
        $user = auth()->user();
        $request = request();

        return self::create([
            'company_id' => $user?->company_id ?? $user?->current_company_id,
            'user_id' => $user?->id,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'user_agent' => substr($request->userAgent() ?? '', 0, 500),
            'request_id' => $request->header('X-Request-ID'),
        ]);
    }

    // ============================================================
    // STATIC HELPERS - Specific Actions
    // ============================================================

    public static function logCreate($entityType, $entityId, array $values): self
    {
        return self::logAction('create', $entityType, $entityId, null, $values);
    }

    public static function logUpdate($entityType, $entityId, array $oldValues, array $newValues): self
    {
        return self::logAction('update', $entityType, $entityId, $oldValues, $newValues);
    }

    public static function logDelete($entityType, $entityId, array $oldValues): self
    {
        return self::logAction('delete', $entityType, $entityId, $oldValues, null);
    }

    public static function logLogin(): self
    {
        return self::logAction('login', 'user', auth()->id());
    }

    public static function logLogout(): self
    {
        return self::logAction('logout', 'user', auth()->id());
    }

    public static function logSync($entityType, $entityId, $result): self
    {
        return self::logAction('sync', $entityType, $entityId, null, ['result' => $result]);
    }
}
