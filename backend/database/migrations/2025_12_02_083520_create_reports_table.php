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
            $table->enum('type', ['attendance', 'performance']);
            $table->date('period_start');
            $table->date('period_end');
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->json('data');
            $table->foreignId('generated_by')->constrained('users')->cascadeOnDelete();
            $table->boolean('sent_to_admin')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};