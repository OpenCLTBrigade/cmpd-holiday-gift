<?php

use Illuminate\Database\Seeder;
use App\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Permissions we have to create

            Admin-specific
            - Approve account requests
            - Approve nominations
            - Can view all nominees.
            - Reporting features for Salvation Army/Link109

            Partner-specific
            - Receive reports
        */

        /* Admin -- Approve and Create an account */
        $approveAccount = new Permission();
        $approveAccount->name = "user-create";
        $approveAccount->display_name = "Create account requests";
        $approveAccount->description = "Create and approve user accounts.";
        $approveAccount->save();

        /* Admin -- Edit all users */
        $editAccount = new Permission();
        $editAccount->name = "user-edit";
        $editAccount->display_name = "Edit all users";
        $editAccount->save();

        /*Admin -- View all users */
        $viewUserList = new Permission();
        $viewUserList->name ="user-list";
        $viewUserList->display_name = "View user list";
        $viewUserList->save();

        /* Admin -- Approve nomination */
        $approveNomination = new Permission();
        $approveNomination->name = "nomination-approve";
        $approveNomination->display_name = "Approve Nominations";
        $approveNomination->save();

        /* Admin - view all Nominees */
        $viewNominee = New Permission();
        $viewNominee->name = "nomination-view-all";
        $viewNominee->display_name = "View All Nominees";
        $viewNominee->save();

        /* Admin and Partners -- receive reports */
        $reporting = New Permission();
        $reporting->name = "reporting";
        $reporting->display_name = "Reporting Functions";
        $reporting->description = "Reporting features for Salvation Army, etc.";
        $reporting->save();


        /*
         Nominee-specific 
         - View nomination status
         - Update Information
        */

        /* Nominee -- View own status */
        $viewOwnNominee = new Permission();
        $viewOwnNominee->name = "nomination-view-own";
        $viewOwnNominee->display_name = "View own nominees";
        $viewOwnNominee->save();

        /* Nominee -- Edit own status */
        $editOwnNomination = new Permission();
        $editOwnNomination->name = "nomination-edit-own";
        $editOwnNomination->display_name = "Edit own nomination";
        $editOwnNomination->save();


        /* 
         Nominator Status --- Still needs Updating 

         Nominator-specific
            - Can enter nominees
            - Can see list of all nominees for their school.
            - Can edit their nominee's information
            - Can see nominee status
        */

        /* Nominator -- Enter Nominee */
        $createNominee = new Permission();
        $createNominee->name = "nomination-create";
        $createNominee->display_name = "Enter Nominees";
        $createNominee->save();

        /* Nominator -- Edit Any Nominee*/
        $editNomination = new Permission();
        $editNomination->name = "nomination-edit";
        $editNomination->display_name = "Edit any Nominee";
        $editNomination->save();

        /* Nominator View Any Nominee Status */
        $viewNomination = new Permission();
        $viewNomination->name = "nomination-edit";
        $viewNomination->display_name = "Edit any Nominee";
        $viewNomination->save();


        $createNomineeCMS = new Permission();
        $createNomineeCMS->name = "nomination-create-cms";
        $createNomineeCMS->display_name = "Enter Nominees from own School";
        $createNomineeCMS->save();

        $viewNomineeForSchool = new Permission();
        $viewNomineeForSchool->name = "nomination-view-cms";
        $viewNomineeForSchool->display_name = "View Nominees from own School";
        $viewNomineeForSchool->save();


        /*
         Volunteers -- May need updating
         - View shifts
         - Sign-up for shifts
        */
        /* Volunteer -- View Shifts */
        $viewShift = new Permission();
        $viewShift->name = "view-shift";
        $viewShift->display_name = "View available shifts";
        $viewShift->save();

        /* Volunteer - add shift */
        $addShift = new Permission();
        $addShift->name = "add-shift";
        $addShift->display_name = "Add shift to work schedule";
        $addShift->save();
    }
}
