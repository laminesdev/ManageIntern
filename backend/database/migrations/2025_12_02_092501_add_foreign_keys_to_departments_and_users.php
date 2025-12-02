<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Departments table - ONLY add foreign key, NOT the column
        Schema::table('departments', function (Blueprint $table) {
            if (Schema::hasColumn('departments', 'manager_id')) {
                $table->foreign('manager_id')->references('id')->on('users')->onDelete('set null');
            }
        });

        // Users table - add foreign keys for existing columns
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'department_id')) {
                $table->foreign('department_id')->references('id')->on('departments')->onDelete('set null');
            }
            if (Schema::hasColumn('users', 'manager_id')) {
                $table->foreign('manager_id')->references('id')->on('users')->onDelete('set null');
            }
        });

        // Tasks table
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreign('assigned_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('cascade');
        });

        // Attendances table
        Schema::table('attendances', function (Blueprint $table) {
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recorded_by')->references('id')->on('users')->onDelete('cascade');
        });

        // Evaluations table
        Schema::table('evaluations', function (Blueprint $table) {
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Notifications table
        Schema::table('notifications', function (Blueprint $table) {
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Notification recipients table
        Schema::table('notification_recipients', function (Blueprint $table) {
            $table->foreign('notification_id')->references('id')->on('notifications')->onDelete('cascade');
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Reclamations table
        Schema::table('reclamations', function (Blueprint $table) {
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('manager_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Reports table
        Schema::table('reports', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('generated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // Drop foreign keys (same as before)
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['generated_by']);
        });

        Schema::table('reclamations', function (Blueprint $table) {
            $table->dropForeign(['intern_id']);
            $table->dropForeign(['manager_id']);
        });

        Schema::table('notification_recipients', function (Blueprint $table) {
            $table->dropForeign(['notification_id']);
            $table->dropForeign(['recipient_id']);
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign(['sender_id']);
        });

        Schema::table('evaluations', function (Blueprint $table) {
            $table->dropForeign(['intern_id']);
            $table->dropForeign(['manager_id']);
        });

        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign(['intern_id']);
            $table->dropForeign(['recorded_by']);
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['assigned_by']);
            $table->dropForeign(['assigned_to']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['manager_id']);
        });

        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign(['manager_id']);
        });
    }
};