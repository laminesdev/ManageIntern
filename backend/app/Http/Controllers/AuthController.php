<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login user and create token
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        
        $user = User::where('email', $credentials['email'])->first();
        
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        
        // Revoke existing tokens (single session)
        $user->tokens()->delete();
        
        // Create new token with role-based abilities
        $abilities = $this->getAbilitiesForRole($user->role);
        $token = $user->createToken('auth_token', $abilities)->plainTextToken;
        
        return response()->json([
            'user' => $user->load('department'),
            'token' => $token,
            'redirect_to' => $this->getDashboardRoute($user->role),
            'abilities' => $abilities
        ]);
    }
    
    /**
     * Logout user (revoke token)
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
    
    /**
     * Get authenticated user data
     */
    public function getCurrentUser(Request $request): JsonResponse
    {
        $user = $request->user()->load(['department', 'manager']);
        
        // Add role-specific data
        $additionalData = [];
        if ($user->isManager()) {
            $additionalData['interns_count'] = $user->interns()->count();
            $additionalData['pending_tasks'] = $user->tasksAssigned()->where('status', 'pending')->count();
            $additionalData['pending_reclamations'] = $user->reclamationsReceived()->where('status', 'pending')->count();
        } elseif ($user->isIntern()) {
            $additionalData['pending_tasks'] = $user->tasksReceived()->where('status', 'pending')->count();
            $additionalData['unread_notifications'] = $user->notificationRecipients()->where('is_read', false)->count();
        }
        
        return response()->json(array_merge($user->toArray(), $additionalData));
    }
    
    /**
     * Update user profile
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        $user->update($validated);
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user->fresh()->load('department')
        ]);
    }
    
    /**
     * Change password
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        $user->update([
            'password' => Hash::make($validated['new_password'])
        ]);
        
        return response()->json([
            'message' => 'Password changed successfully'
        ]);
    }
    
    /**
     * Get token abilities based on user role
     */
    private function getAbilitiesForRole(string $role): array
    {
        return match($role) {
            'admin' => ['user:manage', 'report:view', 'intern:assign'],
            'manager' => ['task:create', 'attendance:track', 'evaluation:create', 'notification:send', 'report:generate', 'reclamation:handle'],
            'intern' => ['task:view', 'evaluation:view', 'notification:view', 'reclamation:create'],
            default => [],
        };
    }
    
    /**
     * Get dashboard route based on user role
     */
    private function getDashboardRoute(string $role): string
    {
        return match($role) {
            'admin' => '/admin/dashboard',
            'manager' => '/manager/dashboard', 
            'intern' => '/intern/dashboard',
            default => '/',
        };
    }
}