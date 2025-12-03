<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendNotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'recipient_ids' => [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    foreach ($value as $recipientId) {
                        $recipient = \App\Models\User::find($recipientId);
                        if (!$recipient || !$recipient->isIntern()) {
                            $fail('You can only send notifications to interns.');
                        }
                        if ($recipient->manager_id !== $this->user()->id) {
                            $fail('You can only send notifications to interns in your department.');
                        }
                    }
                }
            ],
            'recipient_ids.*' => 'exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Notification title is required',
            'message.required' => 'Notification message is required',
            'recipient_ids.required' => 'Please select at least one recipient',
            'recipient_ids.array' => 'Recipients must be an array',
        ];
    }
}