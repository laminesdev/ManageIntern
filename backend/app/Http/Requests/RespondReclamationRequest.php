<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RespondReclamationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'response' => 'required|string|min:10',
            'status' => 'required|in:solved,archived',
        ];
    }

    public function messages(): array
    {
        return [
            'response.required' => 'Response is required',
            'response.min' => 'Response must be at least 10 characters',
            'status.in' => 'Status must be either solved or archived',
        ];
    }
}