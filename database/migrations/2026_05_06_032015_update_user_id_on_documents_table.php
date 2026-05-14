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
        // 1. Update foreign key pada tabel dokumen/koran (tabel 'input')
        Schema::table('input', function (Blueprint $table) {
            // Hapus constraint foreign key lama (default: namaTabel_namaKolom_foreign)
            $table->dropForeign(['id_user']); 
            
            // Ubah kolom id_user menjadi nullable
            $table->unsignedBigInteger('id_user')->nullable()->change();
            
            // Tambahkan kembali constraint dengan nullOnDelete()
            $table->foreign('id_user')->references('id')->on('users')->nullOnDelete();
        });

        // 2. Tambahkan kolom status di tabel users jika belum ada
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'status')) {
                $table->string('status')->default('aktif')->after('email');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('input', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
            
            // Kembalikan seperti semula (tidak nullable dan cascadeOnDelete)
            $table->unsignedBigInteger('id_user')->nullable(false)->change();
            $table->foreign('id_user')->references('id')->on('users')->cascadeOnDelete();
        });

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};
