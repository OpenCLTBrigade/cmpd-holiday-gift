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
                    'active' => 'N',
                    'confirmed_email' => 'Y',
                    'approved' => 'Y'
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
                'nomination_limit'  => 1000000,
                'active' => 'Y',
            ]
        );

        $role = \App\Role::find(1);
        $newUser->attachRole($role);

        // Add test nominator account
        $newUser2 = App\User::create(
            [
                'name_first'        => "Nominator",
                'name_last'         => "Account",
                "affiliation_id"    => 2,
                "email"             => "nominator@codeforcharlotte.org",
                'password'          => 'nomnom',
                'nomination_limit'  => 5,
                'active' => 'Y',
            ]
        );

        $role2 = \App\Role::find(2);
        $newUser2->attachRole($role2);


    }
}
