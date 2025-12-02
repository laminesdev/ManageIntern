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
        'evaluation_type',
        'evaluated_at',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'evaluated_at' => 'datetime',
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
}