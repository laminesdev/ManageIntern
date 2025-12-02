<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // ============================================
        // PART 1: FIX ENUM MISMATCHES (Only for MySQL)
        // ============================================
        
        $driver = DB::connection()->getDriverName();
        
        if ($driver === 'mysql' || $driver === 'mariadb') {
            $this->fixEnumsForMySQL();
        } elseif ($driver === 'sqlite') {
            // SQLite doesn't support ALTER ENUM, so we skip this part
            echo "SQLite detected: Skipping ENUM modifications (not supported)\n";
        }
        
        // ============================================
        // PART 2: ADD MISSING INDEXES (All databases)
        // ============================================
        
        $this->addMissingIndexes();
    }
    
    private function fixEnumsForMySQL(): void
    {
        echo "MySQL/MariaDB detected: Attempting to fix ENUMs...\n";
        
        // 1. Check and fix tasks.priority enum
        try {
            $currentPriority = DB::select("SHOW COLUMNS FROM tasks WHERE Field = 'priority'");
            if (!empty($currentPriority)) {
                $type = $currentPriority[0]->Type;
                if (strpos($type, "'urgent'") === false) {
                    DB::statement("ALTER TABLE tasks MODIFY COLUMN priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium'");
                    echo "✓ Added 'urgent' to tasks.priority enum\n";
                } else {
                    echo "✓ tasks.priority already has 'urgent'\n";
                }
            }
        } catch (\Exception $e) {
            echo "⚠ Could not modify tasks.priority: " . $e->getMessage() . "\n";
        }
        
        // 2. Check and fix evaluations.evaluation_type enum
        try {
            $currentEvalType = DB::select("SHOW COLUMNS FROM evaluations WHERE Field = 'evaluation_type'");
            if (!empty($currentEvalType)) {
                $type = $currentEvalType[0]->Type;
                if (strpos($type, "'weekly'") === false) {
                    DB::statement("ALTER TABLE evaluations MODIFY COLUMN evaluation_type ENUM('mid_term', 'final', 'monthly', 'weekly', 'quarterly', 'project') DEFAULT 'monthly'");
                    echo "✓ Added 'weekly' to evaluations.evaluation_type enum\n";
                } else {
                    echo "✓ evaluations.evaluation_type already has 'weekly'\n";
                }
            }
        } catch (\Exception $e) {
            echo "⚠ Could not modify evaluations.evaluation_type: " . $e->getMessage() . "\n";
        }
    }
    
    private function addMissingIndexes(): void
    {
        echo "Adding missing indexes...\n";
        
        // 1. Add manager_id index to users table
        if (Schema::hasTable('users') && Schema::hasColumn('users', 'manager_id')) {
            Schema::table('users', function (Blueprint $table) {
                // Drop existing index if it has a different name
                $table->index('manager_id', 'users_manager_id_index');
            });
            echo "✓ Added index on users.manager_id\n";
        }
        
        // 2. Add assigned_by index to tasks table
        if (Schema::hasTable('tasks')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->index('assigned_by', 'tasks_assigned_by_index');
            });
            echo "✓ Added index on tasks.assigned_by\n";
            
            // 3. Add composite index for status + priority
            Schema::table('tasks', function (Blueprint $table) {
                $table->index(['status', 'priority'], 'tasks_status_priority_index');
            });
            echo "✓ Added composite index on tasks (status, priority)\n";
        }
        
        // 4. Add composite index for users role queries
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                $table->index(['role', 'department_id'], 'users_role_department_index');
            });
            echo "✓ Added composite index on users (role, department_id)\n";
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove indexes
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropIndexIfExists('users_manager_id_index');
                $table->dropIndexIfExists('users_role_department_index');
            });
        }
        
        if (Schema::hasTable('tasks')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->dropIndexIfExists('tasks_assigned_by_index');
                $table->dropIndexIfExists('tasks_status_priority_index');
            });
        }
        
        // Note: We cannot safely revert ENUM changes without data loss
        echo "Note: ENUM modifications cannot be safely reverted. Manual intervention required.\n";
    }
};