<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            [
                'name' => 'IT Department',
                'description' => 'Information Technology and Software Development',
            ],
            [
                'name' => 'HR Department',
                'description' => 'Human Resources and Recruitment',
            ],
            [
                'name' => 'Marketing Department',
                'description' => 'Marketing and Social Media',
            ],
            [
                'name' => 'Finance Department',
                'description' => 'Accounting and Financial Management',
            ],
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}