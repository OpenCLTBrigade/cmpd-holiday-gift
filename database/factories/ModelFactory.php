<?php

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'email' => $faker->email,
        'name' => $faker->name,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Category::class, function (Faker\Generator $faker) {
    return [
        'color' => $faker->hexColor,
        'description' => $faker->sentence(5),
        'language_id' => $faker->numberBetween(1, 2),
        'title' => $faker->sentence(5)
    ];
});

$factory->define(App\Article::class, function (Faker\Generator $faker) {
    return [
        'category_id' => $faker->numberBetween(1, 5),
        'content' => implode("<br/><br/>", $faker->paragraphs(8)),
        'description' => $faker->sentence(5),
        'published_at' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'title' => $faker->sentence(5)
    ];
});

$factory->define(App\HouseholdAddress::class, function (Faker\Generator $faker) {
    $aptNo = $faker->numberBetween(100,999);
    return [
        "household_id"      => $faker->numberBetween(1,49),
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
        "household_id" => $faker->numberBetween(1,49),
        "phone_type"   => $faker->randomElement(["Home","Work","Other"]),
        "phone_number" => $faker->phoneNumber
    ];
});