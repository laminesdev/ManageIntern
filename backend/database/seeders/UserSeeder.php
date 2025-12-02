<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'department_id' => null,
            'manager_id' => null,
        ]);

        // IT Department Manager
        $itManager = User::create([
            'name' => 'John Manager',
            'email' => 'john.manager@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'manager',
            'department_id' => 1, // IT Department
            'manager_id' => null,
        ]);

        // HR Department Manager
        $hrManager = User::create([
            'name' => 'Sarah Manager',
            'email' => 'sarah.manager@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'manager',
            'department_id' => 2, // HR Department
            'manager_id' => null,
        ]);

        // Marketing Department Manager
        $marketingManager = User::create([
            'name' => 'Mike Manager',
            'email' => 'mike.manager@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'manager',
            'department_id' => 3, // Marketing Department
            'manager_id' => null,
        ]);

        // IT Interns
        User::create([
            'name' => 'Ahmed Intern',
            'email' => 'ahmed.intern@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'intern',
            'department_id' => 1,
            'manager_id' => $itManager->id,
        ]);

        User::create([
            'name' => 'Fatima Intern',
            'email' => 'fatima.intern@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'intern',
            'department_id' => 1,
            'manager_id' => $itManager->id,
        ]);

        // HR Interns
        User::create([
            'name' => 'Omar Intern',
            'email' => 'omar.intern@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'intern',
            'department_id' => 2,
            'manager_id' => $hrManager->id,
        ]);

        User::create([
            'name' => 'Sara Intern',
            'email' => 'sara.intern@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'intern',
            'department_id' => 2,
            'manager_id' => $hrManager->id,
        ]);

        // Marketing Interns
        User::create([
            'name' => 'Youssef Intern',
            'email' => 'youssef.intern@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'intern',
            'department_id' => 3,
            'manager_id' => $marketingManager->id,
        ]);

        User::create([
            'name' => 'Amina Intern',
            'email' => 'amina.intern@manageintern.com',
            'password' => Hash::make('password123'),
            'role' => 'intern',
            'department_id' => 3,
            'manager_id' => $marketingManager->id,
        ]);
    }
}