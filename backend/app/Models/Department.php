<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'manager_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function interns(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'intern');
    }

    public function managers(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'manager');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}