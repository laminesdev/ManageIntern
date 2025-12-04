# Project: routes

## File: api.php
```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'app' => config('app.name'),
        'env' => config('app.env')
    ]);
});

// Protected routes (require authentication)
Route::middleware(['auth:sanctum'])->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Common routes for all authenticated users
    Route::get('/user', [AuthController::class, 'getCurrentUser']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    // Dashboard data
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // ========== ADMIN ROUTES ==========
    Route::middleware(['role:admin'])->group(function () {
        // User management
        Route::apiResource('users', UserController::class);
        Route::post('/users/{user}/assign', [UserController::class, 'assignIntern']);
        Route::delete('/users/{user}/soft-delete', [UserController::class, 'softDelete']);
        Route::post('/users/{user}/restore', [UserController::class, 'restore']);

        // Get lists for dropdowns
        Route::get('/managers', [UserController::class, 'getManagers']);
        Route::get('/interns', [UserController::class, 'getInterns']);
        Route::get('/unassigned-interns', [UserController::class, 'getUnassignedInterns']);

        // Reports (admin view) - FIXED ORDER
        Route::get('/reports/statistics', [ReportController::class, 'getStatistics']); // FIRST
        Route::get('/reports', [ReportController::class, 'index']);
        Route::get('/reports/{report}', [ReportController::class, 'show']);
    });


    // ========== MANAGER ROUTES ==========
    Route::middleware(['role:manager'])->group(function () {
        // Tasks
        Route::get('/tasks/statistics', [TaskController::class, 'getStatistics']);
        Route::get('/interns-for-tasks', [TaskController::class, 'getInternsForAssignment']);
        Route::apiResource('tasks', TaskController::class);
        Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus']);

        // Attendance
        Route::get('/attendance/statistics', [AttendanceController::class, 'getStatistics']);
        Route::get('/interns-for-attendance', [AttendanceController::class, 'getInternsForAttendance']);
        Route::apiResource('attendances', AttendanceController::class);

        // Evaluations
        Route::get('/evaluations/statistics', [EvaluationController::class, 'getStatistics']);
        Route::get('/interns-for-evaluation', [EvaluationController::class, 'getInternsForEvaluation']);
        Route::apiResource('evaluations', EvaluationController::class);

        // Reclamations
        Route::get('/reclamations/statistics', [ReclamationController::class, 'getStatistics']);
        Route::apiResource('reclamations', ReclamationController::class)->except(['store']);
        Route::put('/reclamations/{reclamation}/respond', [ReclamationController::class, 'update']);
        Route::put('/reclamations/{reclamation}/status', [ReclamationController::class, 'updateStatus']);

        // Notifications
        Route::get('/notifications/interns', [NotificationController::class, 'getInternsForNotification']);
        Route::post('/notifications/send', [NotificationController::class, 'store']);
        Route::apiResource('notifications', NotificationController::class);

        // Reports - FIXED ORDER: Statistics MUST come before {report} routes
        Route::get('/reports/statistics', [ReportController::class, 'getStatistics']); // FIRST
        Route::get('/reports', [ReportController::class, 'index']);
        Route::post('/reports/generate', [ReportController::class, 'generate']);
        Route::get('/reports/{report}', [ReportController::class, 'show']);
        Route::post('/reports/{report}/send-to-admin', [ReportController::class, 'sendToAdmin']);
        Route::delete('/reports/{report}', [ReportController::class, 'destroy']);
    });

    // ========== INTERN ROUTES ==========
    Route::middleware(['role:intern'])->group(function () {
        // Tasks
        Route::get('/my-tasks', [TaskController::class, 'myTasks']);
        Route::get('/my-tasks/{task}', [TaskController::class, 'show']);
        Route::put('/my-tasks/{task}/status', [TaskController::class, 'updateStatus']);

        // Evaluations
        Route::get('/my-evaluations', [EvaluationController::class, 'index']);
        Route::get('/my-evaluations/{evaluation}', [EvaluationController::class, 'show']);
        Route::get('/my-evaluations/statistics', [EvaluationController::class, 'getStatistics']);

        // Reclamations
        Route::post('/reclamations', [ReclamationController::class, 'store']);
        Route::get('/my-reclamations', [ReclamationController::class, 'myReclamations']);
        Route::get('/my-reclamations/{reclamation}', [ReclamationController::class, 'show']);
        Route::delete('/my-reclamations/{reclamation}', [ReclamationController::class, 'destroy']);
        Route::get('/reclamations/statistics', [ReclamationController::class, 'getStatistics']);

        // Notifications
        Route::get('/my-notifications', [NotificationController::class, 'index']);
        Route::get('/my-notifications/{notification}', [NotificationController::class, 'show']);
        Route::put('/my-notifications/{notification}', [NotificationController::class, 'update']);
        Route::delete('/my-notifications/{notification}', [NotificationController::class, 'destroy']);
        Route::post('/my-notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);

        // Attendance
        Route::get('/my-attendance', [AttendanceController::class, 'index']);
        Route::get('/my-attendance/{attendance}', [AttendanceController::class, 'show']);
        Route::get('/my-attendance/statistics', [AttendanceController::class, 'getStatistics']);
    });
});
```

## File: console.php
```php
<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

```

## File: web.php
```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

```

