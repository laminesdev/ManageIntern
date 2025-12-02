<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'title',
        'message',
    ];

    // Relationships
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipients()
    {
        return $this->hasMany(NotificationRecipient::class);
    }

    // Helper methods
    public function sendToMultiple(array $recipientIds)
    {
        foreach ($recipientIds as $recipientId) {
            $this->recipients()->create([
                'recipient_id' => $recipientId,
            ]);
        }
    }

    public function getReadCount()
    {
        return $this->recipients()->where('is_read', true)->count();
    }

    public function getUnreadCount()
    {
        return $this->recipients()->where('is_read', false)->count();
    }
}