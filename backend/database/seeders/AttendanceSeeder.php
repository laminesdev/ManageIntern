<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $managers = User::where('role', 'manager')->get();
        $interns = User::where('role', 'intern')->get();

        foreach ($managers as $manager) {
            $departmentInterns = $interns->where('manager_id', $manager->id);

            foreach ($departmentInterns as $intern) {
                // Create attendance for last 10 days
                for ($i = 10; $i >= 1; $i--) {
                    $statuses = ['present', 'present', 'present', 'present', 'late', 'absent'];
                    
                    Attendance::create([
                        'intern_id' => $intern->id,
                        'recorded_by' => $manager->id,
                        'attendance_date' => now()->subDays($i),
                        'status' => $statuses[array_rand($statuses)],
                        'recorded_at' => now()->subDays($i)->setTime(9, 0),
                    ]);
                }
            }
        }
    }
}