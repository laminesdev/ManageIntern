<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'type' => 'required|in:attendance,performance',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start',
        ];
    }

    public function messages(): array
    {
        return [
            'type.in' => 'Report type must be either attendance or performance',
            'period_end.after_or_equal' => 'End date must be after or equal to start date',
        ];
    }
}