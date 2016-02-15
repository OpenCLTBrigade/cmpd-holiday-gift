<?php

use Illuminate\Database\Seeder;

class ChildTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        // Add ten children to the DB
        for ($i=0; $i<55; $i++) {

            $firstName = $faker->firstName;
            $lastName = $faker->lastName;
            App\Child::create(
                [
                    "household_id" => $faker->numberBetween(1, 49),
                    "name_first" => $firstName,
                    "name_middle" => $faker->firstName,
                    "name_last" => $lastName,
                    "dob" => $faker->date,
                    "race" => "race",
                    "last4ssn" => $faker->numerify("####"),
                    "free_or_reduced_lunch" => $faker->randomElement(["Y", "N"]),
                    "reason_for_nomination" => $faker->text(200),
                    "school_name" => $faker->text(30),
                    "school_address" => $faker->address,
                    "school_address2" => "",
                    "school_city" => $faker->city,
                    "school_state" => "WW",
                    "school_zip" => $faker->numerify("#####"),
                    "school_phone" => $faker->phoneNumber,
                    "bike_want" => $faker->randomElement(['Y', 'N']),
                    "bike_size" => $faker->randomElement(['12', '24']),
                    "bike_style" => $faker->randomElement(["A", "B", "C"]),
                    "clothes_want" => $faker->randomElement(['Y', 'N']),
                    "clothes_size_shirt" => $faker->randomElement(['S', 'M', 'L']),
                    "clothes_size_pants" => $faker->randomElement(['S', 'M', 'L']),
                    "shoe_size" => $faker->numerify("#"),
                    "favourite_colour" => $faker->randomElement(['Red', 'Blue', 'Green', 'Orange']),
                    "interests" => $faker->text(30),
                    "additional_ideas" => $faker->text(50)
                ]
            );

//            $this->command->info("Seeded Child: {$firstName} {$lastName}");

        }
    }
}
