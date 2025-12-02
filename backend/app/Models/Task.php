<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority', // ← ADDED THIS
        'assigned_by',
        'assigned_to',
        'deadline',
    ];

    protected $casts = [
        'deadline' => 'datetime',
        'priority' => 'string', // ← ADDED THIS
    ];

    // Relationships
    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Helper methods
    public function isOverdue()
    {
        return $this->deadline->isPast() && $this->status !== 'completed';
    }

    public function markAsCompleted()
    {
        $this->update(['status' => 'completed']);
    }

    public function markAsInProgress()
    {
        $this->update(['status' => 'in_progress']);
    }

    // NEW: Validate deadline (not in past)
    public function validateDeadline()
    {
        return $this->deadline && $this->deadline->isFuture();
    }

    // NEW: Check if task belongs to manager's department
    public function belongsToManagerDepartment($manager)
    {
        if (!$manager || !$this->assignedTo) {
            return false;
        }
        
        return $this->assignedTo->department_id === $manager->department_id;
    }

    // NEW: Get priority color for UI
    public function getPriorityColor()
    {
        return match($this->priority) {
            'high' => 'danger',
            'medium' => 'warning',
            'low' => 'info',
            default => 'secondary',
        };
    }

    // NEW: Scope for priority
    public function scopePriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    // NEW: Scope for overdue tasks
    public function scopeOverdue($query)
    {
        return $query->where('deadline', '<', now())
            ->where('status', '!=', 'completed');
    }
}