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
        $this->call(UserTableSeeder::class);
        $this->call(SettingTableSeeder::class);
        $this->call(LanguageTableSeeder::class);
        $this->call(CategoryTableSeeder::class);
        $this->call(ArticleTableSeeder::class);

        // Project-specific seeders
        $this->call(RoleTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        $this->call(AffiliateTableSeeder::class);
        //$this->call(UsersTableSeeder::class); // TODO: Restore this
        $this->call(HouseholdTableSeeder::class);
        $this->call(HouseholdAddressSeeder::class);
        $this->call(HouseholdPhoneSeeder::class);
        $this->call(ChildTableSeeder::class);
    }
}
