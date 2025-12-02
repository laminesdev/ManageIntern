<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'intern_id',
        'recorded_by',
        'attendance_date',
        'status',
        'recorded_at',
    ];

    protected $casts = [
        'attendance_date' => 'date',
        'recorded_at' => 'datetime',
    ];

    // Relationships
    public function intern()
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    // Helper methods
    public static function checkDuplicate($internId, $date)
    {
        return self::where('intern_id', $internId)
            ->where('attendance_date', $date)
            ->exists();
    }

    public static function calculateAttendanceRate($internId, $startDate = null, $endDate = null)
    {
        $query = self::where('intern_id', $internId);

        if ($startDate) {
            $query->where('attendance_date', '>=', $startDate);
        }

        if ($endDate) {
            $query->where('attendance_date', '<=', $endDate);
        }

        $total = $query->count();
        $present = $query->where('status', 'present')->count();

        return $total > 0 ? ($present / $total) * 100 : 0;
    }
}