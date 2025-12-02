<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            DepartmentSeeder::class,
            UserSeeder::class,
            TaskSeeder::class,
            EvaluationSeeder::class,
            AttendanceSeeder::class,
            ReclamationSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}