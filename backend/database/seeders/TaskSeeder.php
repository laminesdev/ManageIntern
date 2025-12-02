<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $managers = User::where('role', 'manager')->get();
        $interns = User::where('role', 'intern')->get();

        foreach ($managers as $manager) {
            // Get interns in this manager's department
            $departmentInterns = $interns->where('manager_id', $manager->id);

            foreach ($departmentInterns as $intern) {
                // Create 3 tasks per intern
                Task::create([
                    'title' => 'Complete Onboarding Documentation',
                    'description' => 'Read and sign all onboarding documents',
                    'status' => 'completed',
                    'priority' => 'high',
                    'assigned_by' => $manager->id,
                    'assigned_to' => $intern->id,
                    'deadline' => now()->addDays(7),
                ]);

                Task::create([
                    'title' => 'Learn Company Workflow',
                    'description' => 'Study the company workflow and processes',
                    'status' => 'in_progress',
                    'priority' => 'medium',
                    'assigned_by' => $manager->id,
                    'assigned_to' => $intern->id,
                    'deadline' => now()->addDays(14),
                ]);

                Task::create([
                    'title' => 'First Project Assignment',
                    'description' => 'Work on your first assigned project',
                    'status' => 'pending',
                    'priority' => 'urgent',
                    'assigned_by' => $manager->id,
                    'assigned_to' => $intern->id,
                    'deadline' => now()->addDays(21),
                ]);
            }
        }
    }
}