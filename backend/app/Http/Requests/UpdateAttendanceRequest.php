<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:present,absent,late,excused',
        ];
    }

    public function messages(): array
    {
        return [
            'status.in' => 'Status must be: present, absent, late, or excused',
        ];
    }
}