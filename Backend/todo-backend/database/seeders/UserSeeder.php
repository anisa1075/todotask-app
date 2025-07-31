<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('users')->insert( array(
            array(
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345678'),
                'role' => 1,
            ),
            array(
                'name' => 'user1',
                'email' => 'user1@gmail.com',
                'password' => Hash::make('12345678'),
                'role' => 2,
            ),
        ));
    }
}
