<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('manager_id');
            $table->decimal('score', 5, 2); // 0.00 to 100.00
            $table->text('comments')->nullable();
            $table->enum('evaluation_type', ['mid_term', 'final', 'monthly', 'quarterly', 'project'])->default('monthly');
            $table->timestamp('evaluated_at')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('intern_id');
            $table->index('manager_id');
            $table->index('evaluation_type');
            $table->index('evaluated_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};