<?php

use Illuminate\Database\Seeder;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;

class ProductionUsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $faker = Faker\Factory::create();

    // Add dev account until we enable registration
    $newUser = App\User::create(
      [
        'name_first'        => "Developer",
        'name_last'         => "EditMe",
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