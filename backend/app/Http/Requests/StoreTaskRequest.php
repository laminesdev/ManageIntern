<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assigned_to' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $intern = \App\Models\User::find($value);
                    if (!$intern || !$intern->isIntern()) {
                        $fail('You can only assign tasks to interns.');
                    }
                    if ($intern->manager_id !== $this->user()->id) {
                        $fail('You can only assign tasks to interns in your department.');
                    }
                }
            ],
            'priority' => 'required|in:low,medium,high,urgent',
            'deadline' => 'required|date|after:today',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Task title is required',
            'description.required' => 'Task description is required',
            'assigned_to.required' => 'Please select an intern to assign the task',
            'deadline.after' => 'Deadline must be a future date',
            'priority.in' => 'Priority must be: low, medium, high, or urgent',
        ];
    }
}