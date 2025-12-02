<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('manager_id');
            $table->string('subject');
            $table->text('description');
            $table->enum('status', ['pending', 'in_review', 'solved', 'archived'])->default('pending');
            $table->text('response')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('intern_id');
            $table->index('manager_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamations');
    }
};