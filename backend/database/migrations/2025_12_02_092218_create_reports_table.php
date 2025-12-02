<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['attendance', 'performance', 'department', 'general'])->default('attendance');
            $table->date('period_start');
            $table->date('period_end');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->json('data');
            $table->unsignedBigInteger('generated_by');
            $table->boolean('sent_to_admin')->default(false);
            $table->timestamps();
            
            $table->index('type');
            $table->index('department_id');
            $table->index('period_start');
            $table->index('period_end');
            $table->index('sent_to_admin');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};