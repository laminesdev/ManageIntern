<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isManager();
    }

    public function rules(): array
    {
        $attendanceId = $this->route('attendance') ? $this->route('attendance')->id : null;

        return [
            'intern_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $intern = \App\Models\User::find($value);
                    if (!$intern || !$intern->isIntern()) {
                        $fail('You can only record attendance for interns.');
                    }
                    if ($intern->manager_id !== $this->user()->id) {
                        $fail('You can only record attendance for interns in your department.');
                    }
                }
            ],
            'attendance_date' => [
                'required',
                'date',
                'before_or_equal:today',
                Rule::unique('attendances')->where(function ($query) {
                    return $query->where('intern_id', $this->intern_id);
                })->ignore($attendanceId),
            ],
            'status' => 'required|in:present,absent,late,excused',
        ];
    }

    public function messages(): array
    {
        return [
            'intern_id.required' => 'Please select an intern',
            'attendance_date.required' => 'Attendance date is required',
            'attendance_date.before_or_equal' => 'Attendance date cannot be in the future',
            'attendance_date.unique' => 'Attendance already recorded for this intern on this date',
            'status.in' => 'Status must be: present, absent, late, or excused',
        ];
    }
}