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

            Permissions: 
            - Approve account requests
            - Approve nominations
            - Can view all nominees.
            - Reporting features for Salvation Army/Link109
         */
        $admin = new Role();
        $admin->id = Role::$ADMIN_ID;
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
        $admin->id = Role::$NOMINATOR_ID;
        $nominator->name         = 'nominator';
        $nominator->display_name = 'Nominator';
        $nominator->save();

        /*
         *Nominee

         This group is the families that have been nominated 
         and would like to verify status of nomination.  
         They will have a user account with the ability to 
         check status and update information on form.

         Can
         - Have account
         - View nomination status
         - Update Information
        */
        $nominee = new Role();
        $admin->id = Role::$NOMINEE_ID;
        $nominee->name         = 'nominee';
        $nominee->display_name = 'Nominee';
        $nominee->save();

        /* 
         *Partners

         This group is Salvation Army, Link 107.5 and other
         partners that come online.  Salvation Army receives 
         a report outlined in the reporting documentation.

         Can 
         - Receive reports
        */
        $partner = new Role();
        $admin->id = Role::$PARTNER_ID;
        $partner->name         = 'partner';
        $partner->display_name = 'Partner';
        $partner->save();

        /*
         *Volunteers

         This group are the volunteers for delivery and present 
         sorting.  They will be able to sign up for shifts and 
         receive reminder notifications.

         Can 
         - Have account
         - View shifts
         - Sign-up for shifts
         - Receive emails reminders 
        */
        $volunteer = new Role();
        $admin->id = Role::$VOLUNTEER_ID;
        $volunteer->name         = 'volunteer';
        $volunteer->display_name = 'Volunteer';
        $volunteer->save();

    }
}
