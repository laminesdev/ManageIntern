<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\NotificationRecipient;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $managers = User::where('role', 'manager')->get();
        $interns = User::where('role', 'intern')->get();

        foreach ($managers as $manager) {
            $departmentInterns = $interns->where('manager_id', $manager->id);

            // Create notification
            $notification = Notification::create([
                'sender_id' => $manager->id,
                'title' => 'Weekly Team Meeting',
                'message' => 'Don\'t forget our weekly team meeting tomorrow at 10:00 AM.',
            ]);

            // Send to all interns in department
            foreach ($departmentInterns as $intern) {
                NotificationRecipient::create([
                    'notification_id' => $notification->id,
                    'recipient_id' => $intern->id,
                    'is_read' => rand(0, 1) ? true : false,
                    'read_at' => rand(0, 1) ? now() : null,
                ]);
            }

            // Another notification
            $notification2 = Notification::create([
                'sender_id' => $manager->id,
                'title' => 'Project Deadline Reminder',
                'message' => 'Reminder: All projects are due by the end of this week.',
            ]);

            foreach ($departmentInterns as $intern) {
                NotificationRecipient::create([
                    'notification_id' => $notification2->id,
                    'recipient_id' => $intern->id,
                    'is_read' => false,
                ]);
            }
        }
    }
}