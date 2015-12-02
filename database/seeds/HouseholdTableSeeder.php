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

        for ($i=1; $i < 7; $i++) {
            App\Household::create(
                [
                    "nominator_user_id" => 1,
                    "name_first"    =>  $faker->firstName,
                    "name_middle"   =>  $faker->firstName,
                    "name_last" =>  $faker->lastName,
                    "dob"   =>  $faker->date,
                    "race"  =>  "race",
                    "gender"    =>  $faker->randomElement(["M","F"]),
                    "email" =>  $faker->email,
                    "last4ssn"  =>  $faker->numerify("####"),
                    "preferred_contact_method" => $faker->randomElement(["phone","email",])
                ]
            );
        }
    }
}
