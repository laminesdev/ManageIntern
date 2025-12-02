<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'manager_id', // ← ADDED THIS
    ];

    // Relationships
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function interns()
    {
        return $this->hasMany(User::class)->where('role', 'intern');
    }

    public function managers()
    {
        return $this->hasMany(User::class)->where('role', 'manager');
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    // NEW: Get the department manager
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id')->where('role', 'manager');
    }

    // NEW: Validate intern assignment
    public function validateInternAssignment($intern)
    {
        // Check if intern already belongs to any department
        return !$intern->department_id;
    }

    // NEW: Get all tasks in this department
    public function tasks()
    {
        return Task::whereHas('assignedTo', function ($query) {
            $query->where('department_id', $this->id);
        })->get();
    }
}