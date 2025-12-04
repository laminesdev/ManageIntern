<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,urgent',
            'deadline' => [
                'sometimes',
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    if (strtotime($value) <= strtotime('today')) {
                        $fail('The deadline must be a future date.');
                    }
                }
            ],
            'status' => 'sometimes|required|in:pending,in_progress,completed,cancelled'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Task title is required',
            'description.required' => 'Task description is required',
            'deadline.after' => 'Deadline must be a future date',
            'priority.in' => 'Priority must be: low, medium, high, or urgent',
            'status.in' => 'Status must be: pending, in_progress, completed, or cancelled',
        ];
    }
}