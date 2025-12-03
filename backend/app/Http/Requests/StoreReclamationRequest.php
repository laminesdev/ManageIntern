<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReclamationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isIntern();
    }

    public function rules(): array
    {
        return [
            'subject' => 'required|string|max:255',
            'description' => 'required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'subject.required' => 'Subject is required',
            'description.required' => 'Description is required',
            'description.min' => 'Description must be at least 10 characters',
        ];
    }
}