<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'deleted_at')) {
                $table->softDeletes();
            }
        });
        Schema::table('input', function (Blueprint $table) {
            if (!Schema::hasColumn('input', 'deleted_at')) {
                $table->softDeletes();
            }
        });
        Schema::table('hasil', function (Blueprint $table) {
            if (!Schema::hasColumn('hasil', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('input', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table('hasil', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
