<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // Always need these
      $this->call(SettingTableSeeder::class);
      $this->call(LanguageTableSeeder::class);
      $this->call(RoleTableSeeder::class);
      $this->call(PermissionTableSeeder::class);
      $this->call(AffiliateTableSeeder::class);

      switch (strtolower(App::environment()))
      {
        case "production":
          $this->call(ProductionUsersTableSeeder::class);
          break;

        case "local":
          // Project-specific seeders
          $this->call(UsersTableSeeder::class);
          $this->call(HouseholdTableSeeder::class);
          $this->call(HouseholdAddressSeeder::class);
          $this->call(HouseholdPhoneSeeder::class);
          $this->call(ChildTableSeeder::class);
          break;
      }
    }
}
