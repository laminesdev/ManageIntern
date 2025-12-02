<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reclamation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'intern_id',
        'manager_id',
        'subject',
        'description',
        'status',
        'response',
        'resolved_at',
        'responded_at',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
        'responded_at' => 'datetime',
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
    public function markAsSolved()
    {
        $this->update([
            'status' => 'solved',
            'resolved_at' => now(),
        ]);
    }

    public function markAsArchived()
    {
        $this->update(['status' => 'archived']);
    }

    public function respond($response)
    {
        $this->update([
            'response' => $response,
            'responded_at' => now(),
        ]);
    }

    public function isResolved()
    {
        return $this->status === 'solved';
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeSolved($query)
    {
        return $query->where('status', 'solved');
    }
}