<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,urgent',
            'deadline' => 'sometimes|required|date|after:today',
        ];
    }

    public function messages(): array
    {
        return [
            'deadline.after' => 'Deadline must be a future date',
            'priority.in' => 'Priority must be: low, medium, high, or urgent',
        ];
    }
}