<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * This will create the roles... and nothing more.
         * Permissions are generated and assigned in the PermissionTableSeeder
         */

        /*
         * Admins

            This is just four CMPD officers that administer the program.

            Permissions: - Approve account requests
            - Approve nominations
            - Can view all nominees.
            - Reporting features for Salvation Army/Link109

         */
        $admin = new Role();
        $admin->name         = 'admin';
        $admin->display_name = 'Administrator';
        $admin->save();

        /*
         * Nominators...
         - Can enter nominees
         - Can see list of all nominees for their school.
         - Can edit their nominee's information
         - Can see nominee status
         *
         * Note that a nominee is defined as a household and the children of the household.
         * We create a Household and one/many child(ren) associated with it.
         */
        $nominator = new Role();
        $nominator->name         = 'nominator';
        $nominator->display_name = 'Nominator';
        $nominator->save();

        // Visitors not included for Phase One

    }
}
