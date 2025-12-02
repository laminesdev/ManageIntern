<?php

namespace Database\Seeders;

use App\Models\Reclamation;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReclamationSeeder extends Seeder
{
    public function run(): void
    {
        $interns = User::where('role', 'intern')->take(3)->get();

        foreach ($interns as $intern) {
            // Pending reclamation
            Reclamation::create([
                'intern_id' => $intern->id,
                'manager_id' => $intern->manager_id,
                'subject' => 'Equipment Request',
                'description' => 'I need a new laptop for my work. The current one is very slow.',
                'status' => 'pending',
            ]);

            // Solved reclamation
            Reclamation::create([
                'intern_id' => $intern->id,
                'manager_id' => $intern->manager_id,
                'subject' => 'Schedule Conflict',
                'description' => 'There is a conflict with my university schedule on Tuesdays.',
                'status' => 'solved',
                'response' => 'We have adjusted your schedule. You can work from home on Tuesdays.',
                'resolved_at' => now()->subDays(2),
                'responded_at' => now()->subDays(2),
            ]);
        }
    }
}