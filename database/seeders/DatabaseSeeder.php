<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Define Roles
        $adminRole = Role::firstOrCreate(['nama' => 'Admin']);
        $userRole = Role::firstOrCreate(['nama' => 'User']);

        // Create Admin
        User::firstOrCreate(
            ['username' => 'super admin'],
            [
                'id_role' => $adminRole->id,
                'nama' => 'Administrator',
                'email' => 'admin@email.test',
                'password' => bcrypt('112233')
            ]
        );

        // Create Default User
        User::firstOrCreate(
            ['username' => 'user'],
            [
                'id_role' => $userRole->id,
                'nama' => 'Standard User',
                'email' => 'user@email.test',
                'password' => bcrypt('112233')
            ]
        );
    }
}
