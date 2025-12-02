<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department_id',
        'manager_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function interns(): HasMany
    {
        return $this->hasMany(User::class, 'manager_id')->where('role', 'intern');
    }

    public function tasksAssigned(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_by');
    }

    public function tasksReceived(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'intern_id');
    }

    public function evaluationsReceived(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'intern_id');
    }

    public function evaluationsGiven(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'manager_id');
    }

    public function reclamationsSent(): HasMany
    {
        return $this->hasMany(Reclamation::class, 'intern_id');
    }

    public function reclamationsReceived(): HasMany
    {
        return $this->hasMany(Reclamation::class, 'manager_id');
    }

    public function notificationsSent(): HasMany
    {
        return $this->hasMany(Notification::class, 'sender_id');
    }

    public function notificationRecipients(): HasMany
    {
        return $this->hasMany(NotificationRecipient::class, 'recipient_id');
    }

    public function reportsGenerated(): HasMany
    {
        return $this->hasMany(Report::class, 'generated_by');
    }

    // Helper methods from your class diagram
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isManager(): bool
    {
        return $this->role === 'manager';
    }

    public function isIntern(): bool
    {
        return $this->role === 'intern';
    }

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function isAlreadyAssigned(): bool
    {
        return $this->isIntern() && 
               !is_null($this->department_id) && 
               !is_null($this->manager_id);
    }

    public function validateDepartmentMembership(User $manager): bool
    {
        return $this->department_id === $manager->department_id;
    }
}