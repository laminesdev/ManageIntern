<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    /**
     * Display a listing of departments
     */
    public function index(): JsonResponse
    {
        $departments = Department::with(['manager:id,name,email'])
            ->withCount('interns')
            ->get();
        
        return response()->json($departments);
    }

    /**
     * Store a newly created department
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'description' => 'nullable|string',
            'manager_id' => 'required|exists:users,id',
        ]);

        // Verify the manager is actually a manager
        $manager = User::find($validated['manager_id']);
        if (!$manager || !$manager->isManager()) {
            return response()->json([
                'message' => 'The selected user must be a manager.'
            ], 422);
        }

        // Check if manager is already assigned to another department
        $existingDepartment = Department::where('manager_id', $validated['manager_id'])->first();
        if ($existingDepartment) {
            return response()->json([
                'message' => 'This manager is already assigned to another department.'
            ], 422);
        }

        $department = Department::create($validated);

        // Update the manager's department_id to link them to this department
        $manager->update(['department_id' => $department->id]);

        return response()->json([
            'message' => 'Department created successfully',
            'department' => $department->load('manager')
        ], 201);
    }

    /**
     * Display the specified department
     */
    public function show(Department $department): JsonResponse
    {
        $department->load(['manager', 'users.department', 'interns', 'managers']);

        return response()->json($department);
    }

    /**
     * Update the specified department
     */
    public function update(Request $request, Department $department): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:departments,name,' . $department->id,
            'description' => 'nullable|string',
            'manager_id' => 'sometimes|required|exists:users,id',
        ]);

        // If manager_id is being updated, verify the user is actually a manager
        if (isset($validated['manager_id'])) {
            $newManager = User::find($validated['manager_id']);
            if (!$newManager || !$newManager->isManager()) {
                return response()->json([
                    'message' => 'The selected user must be a manager.'
                ], 422);
            }

            // Check if manager is already assigned to another department (and it's not this one)
            $existingDepartment = Department::where('manager_id', $validated['manager_id'])
                ->where('id', '!=', $department->id)
                ->first();
            if ($existingDepartment) {
                return response()->json([
                    'message' => 'This manager is already assigned to another department.'
                ], 422);
            }

            // If manager is changing, update the old manager's department_id to null
            if ($department->manager_id && $department->manager_id !== $validated['manager_id']) {
                $oldManager = User::find($department->manager_id);
                if ($oldManager) {
                    $oldManager->update(['department_id' => null]);
                }
            }

            // Update the new manager's department_id
            $newManager->update(['department_id' => $department->id]);
        }

        $department->update($validated);

        return response()->json([
            'message' => 'Department updated successfully',
            'department' => $department->fresh()->load('manager')
        ]);
    }

    /**
     * Remove the specified department
     */
    public function destroy(Department $department): JsonResponse
    {
        // Check if department has users assigned
        if ($department->users()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete department with assigned users. Please reassign users first.'
            ], 422);
        }

        $department->delete();

        return response()->json([
            'message' => 'Department deleted successfully'
        ]);
    }

    /**
     * Get all managers for department assignment
     */
    public function getManagers(): JsonResponse
    {
        $managers = User::where('role', 'manager')
            ->get(['id', 'name', 'email']);

        return response()->json($managers);
    }
}
