<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendNotificationRequest;
use App\Models\Notification;
use App\Models\NotificationRecipient;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of notifications
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isManager()) {
            // Manager views notifications they've sent
            $query = Notification::with(['sender', 'recipients.recipient'])
                ->where('sender_id', $user->id);

            // Filter by archived status
            if ($request->has('is_archived')) {
                $query->where('is_archived', $request->boolean('is_archived'));
            }

            // Search by title/message
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            }

            $notifications = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'data' => $notifications
            ]);

        } else {
            // Intern views notifications received
            $query = NotificationRecipient::with(['notification.sender', 'recipient'])
                ->where('recipient_id', $user->id);

            // Filter by read status
            if ($request->has('is_read')) {
                $query->where('is_read', $request->boolean('is_read'));
            }

            // Filter by archived status
            if ($request->has('is_archived')) {
                $query->where('is_archived', $request->boolean('is_archived'));
            }

            // Search by title/message
            if ($request->has('search')) {
                $search = $request->search;
                $query->whereHas('notification', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            }

            $notificationRecipients = $query->orderBy('created_at', 'desc')->get();

            // Transform the data to flatten the structure
            $notifications = $notificationRecipients->map(function ($recipient) {
                return [
                    'id' => $recipient->id,
                    'notification_id' => $recipient->notification_id,
                    'title' => $recipient->notification->title,
                    'message' => $recipient->notification->message,
                    'created_at' => $recipient->notification->created_at,
                    'updated_at' => $recipient->notification->updated_at,
                    'is_read' => $recipient->is_read,
                    'is_archived' => $recipient->is_archived,
                    'read_at' => $recipient->read_at,
                    'sender' => $recipient->notification->sender,
                ];
            });

            return response()->json([
                'data' => $notifications,
                'unread_count' => NotificationRecipient::where('recipient_id', $user->id)
                    ->where('is_read', false)
                    ->where('is_archived', false)
                    ->count()
            ]);
        }
    }

    /**
     * Store a newly created notification (send notification)
     */
    public function store(SendNotificationRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['sender_id'] = $request->user()->id;

        // Create notification
        $notification = Notification::create([
            'sender_id' => $validated['sender_id'],
            'title' => $validated['title'],
            'message' => $validated['message']
        ]);

        // Create recipient records
        $recipientsData = [];
        foreach ($validated['recipient_ids'] as $recipientId) {
            $recipientsData[] = [
                'notification_id' => $notification->id,
                'recipient_id' => $recipientId,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        NotificationRecipient::insert($recipientsData);

        return response()->json([
            'message' => 'Notification sent successfully',
            'notification' => $notification->load(['sender', 'recipients.recipient'])
        ], 201);
    }

    /**
     * Display the specified notification
     */
    public function show($id): JsonResponse
    {
        $user = request()->user();

        if ($user->isManager()) {
            // Manager views notification they sent
            $notification = Notification::with(['sender', 'recipients.recipient'])
                ->findOrFail($id);

            if ($notification->sender_id !== $user->id) {
                return response()->json([
                    'message' => 'You can only view notifications you sent'
                ], 403);
            }

            return response()->json([
                'notification' => $notification
            ]);
        } else {
            // Intern views notification they received
            $notificationRecipient = NotificationRecipient::with(['notification.sender', 'recipient'])
                ->where('id', $id)
                ->where('recipient_id', $user->id)
                ->firstOrFail();

            // Mark as read if not already read
            if (!$notificationRecipient->is_read) {
                $notificationRecipient->update([
                    'is_read' => true,
                    'read_at' => now()
                ]);
            }

            $notification = [
                'id' => $notificationRecipient->id,
                'notification_id' => $notificationRecipient->notification_id,
                'title' => $notificationRecipient->notification->title,
                'message' => $notificationRecipient->notification->message,
                'created_at' => $notificationRecipient->notification->created_at,
                'updated_at' => $notificationRecipient->notification->updated_at,
                'is_read' => $notificationRecipient->is_read,
                'is_archived' => $notificationRecipient->is_archived,
                'read_at' => $notificationRecipient->read_at,
                'sender' => $notificationRecipient->notification->sender,
            ];

            return response()->json([
                'notification' => $notification
            ]);
        }
    }

    /**
     * Update notification recipient (mark as read/archived)
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = request()->user();

        // Only interns can update their notification status
        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can update notification status'
            ], 403);
        }

        $notificationRecipient = NotificationRecipient::where('id', $id)
            ->where('recipient_id', $user->id)
            ->firstOrFail();

        $validated = $request->validate([
            'is_read' => 'sometimes|boolean',
            'is_archived' => 'sometimes|boolean'
        ]);

        if (isset($validated['is_read']) && $validated['is_read'] === true) {
            $validated['read_at'] = now();
        }

        $notificationRecipient->update($validated);

        $notification = [
            'id' => $notificationRecipient->id,
            'notification_id' => $notificationRecipient->notification_id,
            'title' => $notificationRecipient->notification->title,
            'message' => $notificationRecipient->notification->message,
            'created_at' => $notificationRecipient->notification->created_at,
            'updated_at' => $notificationRecipient->notification->updated_at,
            'is_read' => $notificationRecipient->is_read,
            'is_archived' => $notificationRecipient->is_archived,
            'read_at' => $notificationRecipient->read_at,
            'sender' => $notificationRecipient->notification->sender,
        ];

        return response()->json([
            'message' => 'Notification updated successfully',
            'notification' => $notification
        ]);
    }

    /**
     * Remove the specified notification (for manager) or notification recipient (for intern)
     */
    public function destroy($id): JsonResponse
    {
        $user = request()->user();

        if ($user->isManager()) {
            // Manager deletes notification they sent
            $notification = Notification::findOrFail($id);

            if ($notification->sender_id !== $user->id) {
                return response()->json([
                    'message' => 'You can only delete notifications you sent'
                ], 403);
            }

            // Delete recipients first (due to foreign key)
            NotificationRecipient::where('notification_id', $notification->id)->delete();
            $notification->delete();
        } else {
            // Intern deletes their notification recipient record
            $notificationRecipient = NotificationRecipient::where('id', $id)
                ->where('recipient_id', $user->id)
                ->firstOrFail();

            $notificationRecipient->delete();
        }

        return response()->json([
            'message' => 'Notification deleted successfully'
        ]);
    }

    /**
     * Get interns for notification sending
     */
    public function getInternsForNotification(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->isManager()) {
            return response()->json([
                'message' => 'Only managers can send notifications'
            ], 403);
        }

        $interns = User::where('role', 'intern')
            ->where('manager_id', $user->id)
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);

        return response()->json($interns);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can mark notifications as read'
            ], 403);
        }

        NotificationRecipient::where('recipient_id', $user->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now()
            ]);

        return response()->json([
            'message' => 'All notifications marked as read'
        ]);
    }
}