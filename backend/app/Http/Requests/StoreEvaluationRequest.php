<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'intern_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $intern = \App\Models\User::find($value);
                    if (!$intern || !$intern->isIntern()) {
                        $fail('You can only evaluate interns.');
                    }
                    if ($intern->manager_id !== $this->user()->id) {
                        $fail('You can only evaluate interns in your department.');
                    }
                }
            ],
            'score' => 'required|numeric|min:0|max:100',
            'comments' => 'nullable|string',
            'evaluation_type' => 'required|in:mid_term,final,monthly,weekly,quarterly,project',
        ];
    }

    public function messages(): array
    {
        return [
            'score.min' => 'Score cannot be less than 0',
            'score.max' => 'Score cannot be greater than 100',
            'evaluation_type.in' => 'Evaluation type must be: mid_term, final, monthly, weekly, quarterly, or project',
        ];
    }
}