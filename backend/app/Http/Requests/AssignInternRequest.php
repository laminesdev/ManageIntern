<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignInternRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'department_id' => 'required|exists:departments,id',
            'manager_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = \App\Models\User::find($value);
                    if (!$user || !$user->isManager()) {
                        $fail('The selected user must be a manager.');
                    }
                }
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'department_id.required' => 'Please select a department',
            'manager_id.required' => 'Please select a manager',
            'department_id.exists' => 'Selected department does not exist',
            'manager_id.exists' => 'Selected manager does not exist',
        ];
    }
}