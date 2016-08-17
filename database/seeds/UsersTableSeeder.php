<?php

use Illuminate\Database\Seeder;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;

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

            $firstName = $faker->firstName;
            $lastName = $faker->lastName;


            $newUser = App\User::create(
                [
                    'name_first'    => $firstName,
                    'name_last'     => $lastName,
                    "affiliation_id"=> $faker->numberBetween(1,57),
                    "email"         => $faker->email,
                    'password'      => 'admin',
                    'nomination_limit'=> 5,
                    'active' => 'Y',
                ]
            );

            $this->command->info("Seeded user {$firstName} {$lastName}");

            $role_id = $faker->numberBetween(1, 5);
            $role = \App\Role::find($role_id);

            $newUser->attachRole($role);


        }

        // Add dev account until we enable registration
        $newUser = App\User::create(
            [
                'name_first'        => "Developer",
                'name_last'         => "lastName",
                "affiliation_id"    => 1,
                "email"             => "developer@codeforcharlotte.org",
                'password'          => 'admin',
                'nomination_limit'  => 5,
                'active' => 'Y',
            ]
        );

        $role = \App\Role::find(1);
        $newUser->attachRole($role);


    }
}
