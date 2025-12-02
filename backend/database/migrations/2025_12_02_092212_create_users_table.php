<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'manager', 'intern'])->default('intern');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('role');
            $table->index('department_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};