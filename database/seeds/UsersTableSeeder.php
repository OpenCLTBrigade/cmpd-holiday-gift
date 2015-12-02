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
        $faker = Faker\Factory::create();

        for ($i=0; $i<5; $i++) {
            App\User::create(
                [
                    'name_first'    => $faker->firstName,
                    'name_last'     => $faker->lastName,
                    "affiliation_id"=> $faker->numberBetween(1,57),
                    "email"         => $faker->email,
                    'password'      => Hash::make('admin')
                ]
            );
        }
    }
}
