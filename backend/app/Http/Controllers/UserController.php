<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\AssignInternRequest;
use App\Models\User;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of users with filters
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['department', 'manager']);

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Filter by department
        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->paginate(10);

        return response()->json($users);
    }

    /**
     * Store a newly created user
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Hash password if provided
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user = User::create($validated);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->load(['department', 'manager'])
        ], 201);
    }

    /**
     * Display the specified user
     */
    public function show(User $user): JsonResponse
    {
        $user->load(['department', 'manager', 'interns']);

        // Add role-specific relationships
        if ($user->isIntern()) {
            $user->load(['tasksReceived', 'evaluationsReceived', 'attendances']);
        } elseif ($user->isManager()) {
            $user->load(['tasksAssigned', 'interns.department']);
        }

        return response()->json($user);
    }

    /**
     * Update the specified user
     */
    public function update(StoreUserRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();

        // Hash password if provided
        if (isset($validated['password']) && $validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->fresh()->load(['department', 'manager'])
        ]);
    }

    /**
     * Remove the specified user (soft delete)
     */
    public function destroy(User $user): JsonResponse
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Assign intern to department and manager
     */
    public function assignIntern(AssignInternRequest $request, User $user): JsonResponse
    {
        // Validate user is an intern
        if (!$user->isIntern()) {
            return response()->json([
                'message' => 'Only interns can be assigned'
            ], 422);
        }

        // Check if already assigned
        if ($user->isAlreadyAssigned()) {
            return response()->json([
                'message' => 'Intern is already assigned to a department and manager'
            ], 422);
        }

        $validated = $request->validated();
        $user->update($validated);

        return response()->json([
            'message' => 'Intern assigned successfully',
            'user' => $user->fresh()->load(['department', 'manager'])
        ]);
    }

    /**
     * Soft delete a user
     */
    public function softDelete(User $user): JsonResponse
    {
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User soft deleted successfully'
        ]);
    }

    /**
     * Restore a soft-deleted user
     */
    public function restore($id): JsonResponse
    {
        $user = User::withTrashed()->findOrFail($id);

        if (!$user->trashed()) {
            return response()->json([
                'message' => 'User is not deleted'
            ], 422);
        }

        $user->restore();

        return response()->json([
            'message' => 'User restored successfully',
            'user' => $user->load(['department', 'manager'])
        ]);
    }

    /**
     * Get all managers for dropdown
     */
    public function getManagers(): JsonResponse
    {
        $managers = User::where('role', 'manager')
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id']);

        return response()->json($managers);
    }

    /**
     * Get all interns (unassigned or filtered)
     */
    public function getInterns(Request $request): JsonResponse
    {
        $query = User::where('role', 'intern')->with(['department', 'manager']);

        // Filter unassigned interns
        if ($request->has('unassigned') && $request->boolean('unassigned')) {
            $query->whereNull('department_id')->whereNull('manager_id');
        }

        // Filter by department
        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        $interns = $query->get(['id', 'name', 'email', 'department_id', 'manager_id']);

        return response()->json($interns);
    }

    public function getUnassignedInterns(Request $request): JsonResponse
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'message' => 'Only admins can view unassigned interns'
            ], 403);
        }

        $interns = User::where('role', 'intern')
            ->whereNull('department_id')
            ->whereNull('manager_id')
            ->with('department')
            ->get(['id', 'name', 'email', 'department_id', 'manager_id']);

        return response()->json($interns);
    }
}