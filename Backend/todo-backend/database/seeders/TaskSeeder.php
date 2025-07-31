<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert( array(
            array(
                'judul' => 'Meeting Online',
                'is_completed' => false,
                'user_id' => 1,
                'slug' => 'meeting-online',
            ),
            array(
                'judul' => 'Cuci Baju',
                'is_completed' => true,
                'user_id' => 2,
                'slug' => 'cuci-baju',
            ),
        ));
    }

}
