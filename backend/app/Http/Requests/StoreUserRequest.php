<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        $rules = [
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => $userId ? 'sometimes|nullable|min:8' : 'required|min:8',
            'role' => 'sometimes|required|in:admin,manager,intern',
            'department_id' => 'nullable|exists:departments,id',
            'manager_id' => [
                'nullable',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if ($value && !\App\Models\User::find($value)->isManager()) {
                        $fail('The selected manager must have a manager role.');
                    }
                }
            ],
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'role.in' => 'Role must be one of: admin, manager, intern',
            'department_id.exists' => 'Selected department does not exist',
            'manager_id.exists' => 'Selected manager does not exist',
        ];
    }
}