<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Evaluation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'intern_id',
        'manager_id',
        'score',
        'comments',
        'evaluation_type', // ← ADDED THIS
        'evaluated_at',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'evaluated_at' => 'datetime',
        'evaluation_type' => 'string', // ← ADDED THIS
    ];

    // Relationships
    public function intern()
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    // Helper methods
    public static function calculateAverage($internId)
    {
        return self::where('intern_id', $internId)->avg('score');
    }

    // NEW: Get evaluations by type
    public static function getByType($internId, $type)
    {
        return self::where('intern_id', $internId)
            ->where('evaluation_type', $type)
            ->get();
    }

    // NEW: Check if evaluation is valid (score between 0-100)
    public function isValid()
    {
        return $this->score >= 0 && $this->score <= 100;
    }
}