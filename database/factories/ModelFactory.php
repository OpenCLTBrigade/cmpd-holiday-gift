<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/*

 $factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});
*/

// Before I discovered model factories I was building them directly in the seeders...
// ....so some of them are here but the rest are in the seeder files ^^; - Andrew N

$factory->define(App\HouseholdAddress::class, function (Faker\Generator $faker) {
    $aptNo = $faker->numberBetween(100,999);
    return [
        "household_id"      => $faker->numberBetween(1,7),
        "type"              => $faker->randomElement(["Home","Work"]),
        "address_street"    => $faker->streetAddress,
        "address_street2"   => $faker->randomElement(["Apt {$aptNo}", ""]),
        "address_city"      => $faker->city,
        "address_state"     => "OK",
        "address_zip"       => $faker->numerify("#####")
     ];
});

$factory->define(App\HouseholdPhone::class, function (Faker\Generator $faker) {
    $aptNo = $faker->numberBetween(100,999);
    return [
        "household_id" => $faker->numberBetween(1,6),
        "phone_type"   => $faker->randomElement(["home","work","other"]),
        "phone_number" => $faker->phoneNumber
    ];
});