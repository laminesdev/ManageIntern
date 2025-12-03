<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateReportRequest;
use App\Models\Report;
use App\Models\Attendance;
use App\Models\Evaluation;
use App\Models\Task;
use App\Models\User;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display a listing of reports
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            // Admin views all reports
            $query = Report::with(['department', 'generatedBy'])
                ->where('sent_to_admin', true);
        } else {
            // Manager views reports they generated
            $query = Report::with(['department', 'generatedBy'])
                ->where('generated_by', $user->id);
        }
        
        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        
        // Filter by date range
        if ($request->has('period_start')) {
            $query->whereDate('period_start', '>=', $request->period_start);
        }
        
        if ($request->has('period_end')) {
            $query->whereDate('period_end', '<=', $request->period_end);
        }
        
        // Filter by department (admin only)
        if ($user->isAdmin() && $request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }
        
        // Sort by creation date
        $query->orderBy('created_at', 'desc');
        
        $reports = $query->paginate(20);
        
        return response()->json($reports);
    }
    
    /**
     * Generate a new report
     */
    public function generate(GenerateReportRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        // Get department of the manager
        $department = $user->department;
        
        if (!$department) {
            return response()->json([
                'message' => 'You must be assigned to a department to generate reports'
            ], 422);
        }
        
        $validated['department_id'] = $department->id;
        $validated['generated_by'] = $user->id;
        
        // Generate report data based on type
        $reportData = $this->generateReportData(
            $validated['type'],
            $validated['period_start'],
            $validated['period_end'],
            $department->id,
            $user->id
        );
        
        $validated['data'] = $reportData;
        
        $report = Report::create($validated);
        
        return response()->json([
            'message' => 'Report generated successfully',
            'report' => $report->load(['department', 'generatedBy'])
        ], 201);
    }
    
    /**
     * Display the specified report
     */
    public function show(Report $report): JsonResponse
    {
        $user = request()->user();
        
        // Authorization check
        if ($user->isAdmin()) {
            // Admin can view any report sent to admin
            if (!$report->sent_to_admin) {
                return response()->json([
                    'message' => 'This report has not been sent to admin'
                ], 403);
            }
        } else {
            // Manager can only view reports they generated
            if ($report->generated_by !== $user->id) {
                return response()->json([
                    'message' => 'You can only view reports you generated'
                ], 403);
            }
        }
        
        $report->load(['department', 'generatedBy']);
        
        return response()->json($report);
    }
    
    /**
     * Send report to admin
     */
    public function sendToAdmin(Report $report): JsonResponse
    {
        $user = request()->user();
        
        // Only the manager who generated it can send to admin
        if ($report->generated_by !== $user->id) {
            return response()->json([
                'message' => 'You can only send reports you generated'
            ], 403);
        }
        
        if ($report->sent_to_admin) {
            return response()->json([
                'message' => 'This report has already been sent to admin'
            ], 422);
        }
        
        $report->update(['sent_to_admin' => true]);
        
        return response()->json([
            'message' => 'Report sent to admin successfully',
            'report' => $report->fresh()
        ]);
    }
    
    /**
     * Remove the specified report
     */
    public function destroy(Report $report): JsonResponse
    {
        $user = request()->user();
        
        // Only the manager who generated it can delete
        if ($report->generated_by !== $user->id) {
            return response()->json([
                'message' => 'You can only delete reports you generated'
            ], 403);
        }
        
        $report->delete();
        
        return response()->json([
            'message' => 'Report deleted successfully'
        ]);
    }
    
    /**
     * Generate report data based on type
     */
    private function generateReportData(string $type, string $startDate, string $endDate, int $departmentId, int $managerId): array
    {
        if ($type === 'attendance') {
            return $this->generateAttendanceReport($startDate, $endDate, $departmentId, $managerId);
        } else {
            return $this->generatePerformanceReport($startDate, $endDate, $departmentId, $managerId);
        }
    }
    
    /**
     * Generate attendance report data
     */
    private function generateAttendanceReport(string $startDate, string $endDate, int $departmentId, int $managerId): array
    {
        // Get interns in the department managed by this manager
        $interns = User::where('role', 'intern')
            ->where('department_id', $departmentId)
            ->where('manager_id', $managerId)
            ->get(['id', 'name', 'email']);
        
        $attendanceData = [];
        
        foreach ($interns as $intern) {
            $attendanceRecords = Attendance::where('intern_id', $intern->id)
                ->whereBetween('attendance_date', [$startDate, $endDate])
                ->get();
            
            $attendanceSummary = [
                'intern_id' => $intern->id,
                'intern_name' => $intern->name,
                'intern_email' => $intern->email,
                'total_days' => $attendanceRecords->count(),
                'present' => $attendanceRecords->where('status', 'present')->count(),
                'absent' => $attendanceRecords->where('status', 'absent')->count(),
                'late' => $attendanceRecords->where('status', 'late')->count(),
                'excused' => $attendanceRecords->where('status', 'excused')->count(),
                'attendance_rate' => $attendanceRecords->count() > 0 
                    ? round(($attendanceRecords->whereIn('status', ['present', 'excused'])->count() / $attendanceRecords->count()) * 100, 2)
                    : 0,
                'details' => $attendanceRecords->map(function ($record) {
                    return [
                        'date' => $record->attendance_date->format('Y-m-d'),
                        'status' => $record->status,
                        'recorded_at' => $record->recorded_at
                    ];
                })
            ];
            
            $attendanceData[] = $attendanceSummary;
        }
        
        // Overall statistics
        $allAttendances = Attendance::whereHas('intern', function ($query) use ($departmentId, $managerId) {
            $query->where('department_id', $departmentId)
                  ->where('manager_id', $managerId);
        })
        ->whereBetween('attendance_date', [$startDate, $endDate])
        ->get();
        
        $overallStats = [
            'total_records' => $allAttendances->count(),
            'present' => $allAttendances->where('status', 'present')->count(),
            'absent' => $allAttendances->where('status', 'absent')->count(),
            'late' => $allAttendances->where('status', 'late')->count(),
            'excused' => $allAttendances->where('status', 'excused')->count(),
            'overall_attendance_rate' => $allAttendances->count() > 0
                ? round(($allAttendances->whereIn('status', ['present', 'excused'])->count() / $allAttendances->count()) * 100, 2)
                : 0,
        ];
        
        return [
            'report_type' => 'attendance',
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ],
            'department_id' => $departmentId,
            'interns_count' => $interns->count(),
            'overall_statistics' => $overallStats,
            'intern_attendance' => $attendanceData,
            'generated_at' => now()->toDateTimeString()
        ];
    }
    
    /**
     * Generate performance report data
     */
    private function generatePerformanceReport(string $startDate, string $endDate, int $departmentId, int $managerId): array
    {
        // Get interns in the department managed by this manager
        $interns = User::where('role', 'intern')
            ->where('department_id', $departmentId)
            ->where('manager_id', $managerId)
            ->get(['id', 'name', 'email']);
        
        $performanceData = [];
        
        foreach ($interns as $intern) {
            // Task performance
            $tasks = Task::where('assigned_to', $intern->id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get();
            
            $taskStats = [
                'total' => $tasks->count(),
                'completed' => $tasks->where('status', 'completed')->count(),
                'in_progress' => $tasks->where('status', 'in_progress')->count(),
                'pending' => $tasks->where('status', 'pending')->count(),
                'cancelled' => $tasks->where('status', 'cancelled')->count(),
                'overdue' => $tasks->where('deadline', '<', now())
                    ->whereNotIn('status', ['completed', 'cancelled'])
                    ->count(),
                'completion_rate' => $tasks->count() > 0
                    ? round(($tasks->where('status', 'completed')->count() / $tasks->count()) * 100, 2)
                    : 0
            ];
            
            // Evaluation performance
            $evaluations = Evaluation::where('intern_id', $intern->id)
                ->whereBetween('evaluated_at', [$startDate, $endDate])
                ->get();
            
            $evaluationStats = [
                'total' => $evaluations->count(),
                'average_score' => $evaluations->avg('score'),
                'highest_score' => $evaluations->max('score'),
                'lowest_score' => $evaluations->min('score'),
                'by_type' => $evaluations->groupBy('evaluation_type')->map(function ($group) {
                    return [
                        'count' => $group->count(),
                        'average_score' => $group->avg('score')
                    ];
                })
            ];
            
            // Attendance for performance context
            $attendance = Attendance::where('intern_id', $intern->id)
                ->whereBetween('attendance_date', [$startDate, $endDate])
                ->get();
            
            $attendanceStats = [
                'total' => $attendance->count(),
                'present' => $attendance->where('status', 'present')->count(),
                'attendance_rate' => $attendance->count() > 0
                    ? round(($attendance->whereIn('status', ['present', 'excused'])->count() / $attendance->count()) * 100, 2)
                    : 0
            ];
            
            $performanceData[] = [
                'intern_id' => $intern->id,
                'intern_name' => $intern->name,
                'intern_email' => $intern->email,
                'tasks' => $taskStats,
                'evaluations' => $evaluationStats,
                'attendance' => $attendanceStats,
                'overall_performance_score' => $this->calculateOverallPerformance(
                    $taskStats['completion_rate'],
                    $evaluationStats['average_score'] ?? 0,
                    $attendanceStats['attendance_rate']
                )
            ];
        }
        
        // Overall department performance
        $overallStats = [
            'total_interns' => $interns->count(),
            'average_task_completion_rate' => collect($performanceData)->avg('tasks.completion_rate'),
            'average_evaluation_score' => collect($performanceData)->avg('evaluations.average_score'),
            'average_attendance_rate' => collect($performanceData)->avg('attendance.attendance_rate'),
            'average_overall_performance' => collect($performanceData)->avg('overall_performance_score'),
        ];
        
        return [
            'report_type' => 'performance',
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ],
            'department_id' => $departmentId,
            'overall_statistics' => $overallStats,
            'intern_performance' => $performanceData,
            'generated_at' => now()->toDateTimeString()
        ];
    }
    
    /**
     * Calculate overall performance score
     */
    private function calculateOverallPerformance(float $taskCompletionRate, float $evaluationScore, float $attendanceRate): float
    {
        // Weighted average: 40% tasks, 40% evaluations, 20% attendance
        $taskWeight = 0.4;
        $evalWeight = 0.4;
        $attendanceWeight = 0.2;
        
        return round(
            ($taskCompletionRate * $taskWeight) + 
            ($evaluationScore * $evalWeight) + 
            ($attendanceRate * $attendanceWeight),
            2
        );
    }
    
    /**
     * Get report statistics
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            $stats = Report::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN type = "attendance" THEN 1 ELSE 0 END) as attendance_reports,
                SUM(CASE WHEN type = "performance" THEN 1 ELSE 0 END) as performance_reports,
                SUM(CASE WHEN sent_to_admin = true THEN 1 ELSE 0 END) as sent_to_admin
            ')
            ->first();
        } else {
            $stats = Report::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN type = "attendance" THEN 1 ELSE 0 END) as attendance_reports,
                SUM(CASE WHEN type = "performance" THEN 1 ELSE 0 END) as performance_reports,
                SUM(CASE WHEN sent_to_admin = true THEN 1 ELSE 0 END) as sent_to_admin
            ')
            ->where('generated_by', $user->id)
            ->first();
        }
        
        return response()->json($stats);
    }
}