<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_recipients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('notification_id');
            $table->unsignedBigInteger('recipient_id');
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->boolean('is_archived')->default(false);
            $table->timestamps();
            
            // Unique: Each recipient gets notification only once
            $table->unique(['notification_id', 'recipient_id']);
            
            $table->index('recipient_id');
            $table->index('is_read');
            $table->index('is_archived');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_recipients');
    }
};