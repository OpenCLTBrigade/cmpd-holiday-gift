<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\User::create(
            [

                'name_first'    => "Test",
                'name_last'     => "Buddy",
                "affiliation_id"=> 57,
                "email"         => "test@buddy.com",
                'password'      => Hash::make('admin')
            ]
        );
    }
}
