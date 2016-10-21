<?php

use Illuminate\Database\Seeder;

class HouseholdTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i=1; $i < 50; $i++) {
            $firstName = $faker->firstName;
            $middleName = $faker->firstName;
            $lastName = $faker->lastName;
            App\Household::create(
                [
                    "nominator_user_id" => 1,
                    "name_first"    =>  $firstName,
                    "name_middle"   =>  $middleName,
                    "name_last" =>  $lastName,
                    "dob"   =>  $faker->date,
                    "race"  =>  $faker->randomElement(\App\Household::$raceOptions),
                    "gender"    =>  $faker->randomElement(["M","F"]),
                    "email" =>  $faker->email,
                    "last4ssn"  =>  $faker->numerify("####"),
                    "preferred_contact_method" => $faker->randomElement(["phone","email",]),
                    "draft" => "N"
                ]
            );
            $this->command->info("Seeded household {$firstName} {$middleName} {$lastName}");
        }
    }
}
