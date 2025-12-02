<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('recorded_by');
            $table->date('attendance_date');
            $table->enum('status', ['present', 'absent', 'late', 'excused'])->default('present');
            $table->timestamp('recorded_at')->useCurrent();
            $table->timestamps();
            
            // Unique constraint: No duplicate attendance for same intern on same day
            $table->unique(['intern_id', 'attendance_date']);
            
            $table->index('intern_id');
            $table->index('attendance_date');
            $table->index(['intern_id', 'attendance_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};