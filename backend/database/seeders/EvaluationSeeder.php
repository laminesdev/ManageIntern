<?php

namespace Database\Seeders;

use App\Models\Evaluation;
use App\Models\User;
use Illuminate\Database\Seeder;

class EvaluationSeeder extends Seeder
{
    public function run(): void
    {
        $managers = User::where('role', 'manager')->get();
        $interns = User::where('role', 'intern')->get();

        foreach ($managers as $manager) {
            $departmentInterns = $interns->where('manager_id', $manager->id);

            foreach ($departmentInterns as $intern) {
                // Weekly evaluation
                Evaluation::create([
                    'intern_id' => $intern->id,
                    'manager_id' => $manager->id,
                    'score' => rand(70, 100),
                    'comments' => 'Good progress this week. Keep up the good work!',
                    'evaluation_type' => 'weekly',
                    'evaluated_at' => now()->subWeek(),
                ]);

                // Monthly evaluation
                Evaluation::create([
                    'intern_id' => $intern->id,
                    'manager_id' => $manager->id,
                    'score' => rand(75, 95),
                    'comments' => 'Excellent performance this month. Shows great potential.',
                    'evaluation_type' => 'monthly',
                    'evaluated_at' => now()->subMonth(),
                ]);
            }
        }
    }
}