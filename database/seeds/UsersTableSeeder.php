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

            $firstName = $faker->firstName;
            $lastName = $faker->lastName;

            App\User::create(
                [
                    'name_first'    => $firstName,
                    'name_last'     => $lastName,
                    "affiliation_id"=> $faker->numberBetween(1,57),
                    "email"         => $faker->email,
                    'password'      => Hash::make('admin')
                ]
            );

            $this->command->info("Seeded user {$firstName} {$lastName}");
        }

        // Add dev account until we enable registration
        App\User::create(
            [
                'name_first'    => "Developer",
                'name_last'     => "lastName",
                "affiliation_id"=> 1,
                "email"         => "developer@codeforcharlotte.org",
                'password'      => Hash::make('admin')
            ]
        );

    }
}
