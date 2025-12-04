<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of attendance records
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isManager()) {
            // Manager views attendance of their interns
            $query = Attendance::with(['intern', 'recordedBy'])
                ->whereHas('intern', function ($q) use ($user) {
                    $q->where('manager_id', $user->id);
                });
        } else {
            // Intern views their own attendance
            $query = Attendance::with(['intern', 'recordedBy'])
                ->where('intern_id', $user->id);
        }

        // Filter by date range
        if ($request->has('start_date')) {
            $query->whereDate('attendance_date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->whereDate('attendance_date', '<=', $request->end_date);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sort by date (most recent first)
        $query->orderBy('attendance_date', 'desc');

        $attendance = $query->paginate(30);

        return response()->json($attendance);
    }

    /**
     * Store a newly created attendance record
     */
    public function store(StoreAttendanceRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['recorded_by'] = $request->user()->id;
        $validated['recorded_at'] = now();

        $attendance = Attendance::create($validated);

        return response()->json([
            'message' => 'Attendance recorded successfully',
            'attendance' => $attendance->load(['intern', 'recordedBy'])
        ], 201);
    }

    /**
     * Display the specified attendance record
     */
    public function show(Attendance $attendance): JsonResponse
    {
        $user = request()->user();

        // Authorization check
        if ($user->isIntern() && $attendance->intern_id !== $user->id) {
            return response()->json([
                'message' => 'You can only view your own attendance records'
            ], 403);
        }

        if ($user->isManager()) {
            $intern = $attendance->intern;
            // Check if the manager is either:
            // 1. The intern's manager, OR
            // 2. The one who recorded the attendance
            if ($intern->manager_id !== $user->id && $attendance->recorded_by !== $user->id) {
                return response()->json([
                    'message' => 'You can only view attendance records of your interns or records you created'
                ], 403);
            }
        }

        $attendance->load(['intern', 'recordedBy']);

        return response()->json($attendance);
    }

    /**
     * Update the specified attendance record
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance): JsonResponse
    {
        $user = $request->user();

        // Only the manager who recorded it can update
        if ($attendance->recorded_by !== $user->id) {
            return response()->json([
                'message' => 'Only the manager who recorded this attendance can update it'
            ], 403);
        }

        $validated = $request->validated();
        $attendance->update($validated);

        return response()->json([
            'message' => 'Attendance updated successfully',
            'attendance' => $attendance->fresh()->load(['intern', 'recordedBy'])
        ]);
    }

    /**
     * Remove the specified attendance record
     */
    public function destroy(Attendance $attendance): JsonResponse
    {
        $user = request()->user();

        // Only the manager who recorded it can delete
        if ($attendance->recorded_by !== $user->id) {
            return response()->json([
                'message' => 'Only the manager who recorded this attendance can delete it'
            ], 403);
        }

        $attendance->delete();

        return response()->json([
            'message' => 'Attendance record deleted successfully'
        ]);
    }

    /**
     * Get attendance statistics for dashboard
     */
    public function getStatistics(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isManager()) {
            $internIds = $user->interns()->pluck('id');

            $stats = Attendance::selectRaw('
                COUNT(*) as total_records,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = "absent" THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = "excused" THEN 1 ELSE 0 END) as excused,
                DATE(attendance_date) as date
            ')
                ->whereIn('intern_id', $internIds)
                ->whereDate('attendance_date', '>=', now()->subDays(30))
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();

            // Get attendance by intern
            $byIntern = Attendance::selectRaw('
                intern_id,
                COUNT(*) as total,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present_count
            ')
                ->whereIn('intern_id', $internIds)
                ->whereDate('attendance_date', '>=', now()->subDays(30))
                ->groupBy('intern_id')
                ->with('intern')
                ->get();

            return response()->json([
                'overall_stats' => $stats,
                'by_intern' => $byIntern
            ]);
        } elseif ($user->isIntern()) {
            $stats = Attendance::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "present" THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = "absent" THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = "late" THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = "excused" THEN 1 ELSE 0 END) as excused
            ')
                ->where('intern_id', $user->id)
                ->whereDate('attendance_date', '>=', now()->subDays(30))
                ->first();

            return response()->json($stats);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Get interns for attendance tracking
     */
    public function getInternsForAttendance(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->isManager()) {
            return response()->json([
                'message' => 'Only managers can track attendance'
            ], 403);
        }

        $interns = User::where('role', 'intern')
            ->where('manager_id', $user->id)
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);

        return response()->json($interns);
    }
}