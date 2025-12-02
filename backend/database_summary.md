# Project: database

## File: database.sqlite
```sqlite

```

## File: factories/UserFactory.php
```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

```

## File: migrations/0001_01_01_000001_create_cache_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }
};

```

## File: migrations/0001_01_01_000002_create_jobs_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');
            $table->integer('pending_jobs');
            $table->integer('failed_jobs');
            $table->longText('failed_job_ids');
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });

        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};

```

## File: migrations/2025_11_30_222711_create_personal_access_tokens_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->text('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
    }
};

```

## File: migrations/2025_12_02_092211_create_departments_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
```

## File: migrations/2025_12_02_092212_create_users_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'manager', 'intern'])->default('intern');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('role');
            $table->index('department_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

## File: migrations/2025_12_02_092213_create_tasks_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->unsignedBigInteger('assigned_by');
            $table->unsignedBigInteger('assigned_to');
            $table->timestamp('deadline');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('status');
            $table->index('priority');
            $table->index('deadline');
            $table->index('assigned_to');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
```

## File: migrations/2025_12_02_092214_create_attendances_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('recorded_by');
            $table->date('attendance_date');
            $table->enum('status', ['present', 'absent', 'late', 'excused'])->default('present');
            $table->timestamp('recorded_at')->useCurrent();
            $table->timestamps();
            
            // Unique constraint: No duplicate attendance for same intern on same day
            $table->unique(['intern_id', 'attendance_date']);
            
            $table->index('intern_id');
            $table->index('attendance_date');
            $table->index(['intern_id', 'attendance_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
```

## File: migrations/2025_12_02_092215_create_evaluations_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('manager_id');
            $table->decimal('score', 5, 2); // 0.00 to 100.00
            $table->text('comments')->nullable();
            $table->enum('evaluation_type', ['mid_term', 'final', 'monthly', 'quarterly', 'project'])->default('monthly');
            $table->timestamp('evaluated_at')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('intern_id');
            $table->index('manager_id');
            $table->index('evaluation_type');
            $table->index('evaluated_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
```

## File: migrations/2025_12_02_092216_create_notifications_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');
            $table->string('title');
            $table->text('message');
            $table->timestamps();
            
            $table->index('sender_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
```

## File: migrations/2025_12_02_092217_create_notification_recipients_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_recipients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('notification_id');
            $table->unsignedBigInteger('recipient_id');
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->boolean('is_archived')->default(false);
            $table->timestamps();
            
            // Unique: Each recipient gets notification only once
            $table->unique(['notification_id', 'recipient_id']);
            
            $table->index('recipient_id');
            $table->index('is_read');
            $table->index('is_archived');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_recipients');
    }
};
```

## File: migrations/2025_12_02_092218_create_reclamations_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('manager_id');
            $table->string('subject');
            $table->text('description');
            $table->enum('status', ['pending', 'in_review', 'solved', 'archived'])->default('pending');
            $table->text('response')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('intern_id');
            $table->index('manager_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamations');
    }
};
```

## File: migrations/2025_12_02_092218_create_reports_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['attendance', 'performance', 'department', 'general'])->default('attendance');
            $table->date('period_start');
            $table->date('period_end');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->json('data');
            $table->unsignedBigInteger('generated_by');
            $table->boolean('sent_to_admin')->default(false);
            $table->timestamps();
            
            $table->index('type');
            $table->index('department_id');
            $table->index('period_start');
            $table->index('period_end');
            $table->index('sent_to_admin');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
```

## File: migrations/2025_12_02_092501_add_foreign_keys_to_departments_and_users.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Departments table - ONLY add foreign key, NOT the column
        Schema::table('departments', function (Blueprint $table) {
            if (Schema::hasColumn('departments', 'manager_id')) {
                $table->foreign('manager_id')->references('id')->on('users')->onDelete('set null');
            }
        });

        // Users table - add foreign keys for existing columns
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'department_id')) {
                $table->foreign('department_id')->references('id')->on('departments')->onDelete('set null');
            }
            if (Schema::hasColumn('users', 'manager_id')) {
                $table->foreign('manager_id')->references('id')->on('users')->onDelete('set null');
            }
        });

        // Tasks table
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreign('assigned_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('cascade');
        });

        // Attendances table
        Schema::table('attendances', function (Blueprint $table) {
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recorded_by')->references('id')->on('users')->onDelete('cascade');
        });

        // Evaluations table
        Schema::table('evaluations', function (Blueprint $table) {
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Notifications table
        Schema::table('notifications', function (Blueprint $table) {
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Notification recipients table
        Schema::table('notification_recipients', function (Blueprint $table) {
            $table->foreign('notification_id')->references('id')->on('notifications')->onDelete('cascade');
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Reclamations table
        Schema::table('reclamations', function (Blueprint $table) {
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Reports table
        Schema::table('reports', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('generated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // Drop foreign keys (same as before)
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['generated_by']);
        });

        Schema::table('reclamations', function (Blueprint $table) {
            $table->dropForeign(['intern_id']);
            $table->dropForeign(['manager_id']);
        });

        Schema::table('notification_recipients', function (Blueprint $table) {
            $table->dropForeign(['notification_id']);
            $table->dropForeign(['recipient_id']);
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign(['sender_id']);
        });

        Schema::table('evaluations', function (Blueprint $table) {
            $table->dropForeign(['intern_id']);
            $table->dropForeign(['manager_id']);
        });

        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign(['intern_id']);
            $table->dropForeign(['recorded_by']);
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['assigned_by']);
            $table->dropForeign(['assigned_to']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['manager_id']);
        });

        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign(['manager_id']);
        });
    }
};
```

## File: seeders/AttendanceSeeder.php
```php
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
```

## File: seeders/DatabaseSeeder.php
```php
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
```

## File: seeders/DepartmentSeeder.php
```php
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
```

## File: seeders/EvaluationSeeder.php
```php
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
```

## File: seeders/NotificationSeeder.php
```php
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
```

## File: seeders/ReclamationSeeder.php
```php
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
```

## File: seeders/TaskSeeder.php
```php
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
```

## File: seeders/UserSeeder.php
```php
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
```

