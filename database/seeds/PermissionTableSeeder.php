<?php

use Illuminate\Database\Seeder;
use App\Models\Permission;

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

            Nominator-specific
            - Can enter nominees
            - Can see list of all nominees for their school.
            - Can edit their nominee's information
            - Can see nominee status
        */

        $approveAccount = new Permission();
        $approveAccount->name = "user-create";
        $approveAccount->display_name = "Create account requests";
        $approveAccount->description = "Create and approve user accounts.";
        $approveAccount->save();

        $editAccount = new Permission();
        $editAccount->name = "user-edit";
        $editAccount->display_name = "Edit all users";
        $editAccount->save();

        $viewUserList = new Permission();
        $viewUserList->name ="user-list";
        $viewUserList->display_name = "View user list";
        $viewUserList->save();

        $approveNomination = new Permission();
        $approveNomination->name = "nomination-approve";
        $approveNomination->display_name = "Approve Nominations";
        $approveNomination->save();

        $viewNominee = New Permission();
        $viewNominee->name = "nomination-view-all";
        $viewNominee->display_name = "View All Nominees";
        $viewNominee->save();

        $reporting = New Permission();
        $reporting->name = "reporting";
        $reporting->display_name = "Reporting Functions";
        $reporting->description = "Reporting features for Salvation Army, etc.";
        $reporting->save();

        $createNominee = new Permission();
        $createNominee->name = "nomination-create";
        $createNominee->display_name = "Enter Nominees";
        $createNominee->save();

        $createNomineeCMS = new Permission();
        $createNomineeCMS->name = "nomination-create-cms";
        $createNomineeCMS->display_name = "Enter Nominees from own School";
        $createNomineeCMS->save();

        $viewNomineeForSchool = new Permission();
        $viewNomineeForSchool->name = "nomination-view-cms";
        $viewNomineeForSchool->display_name = "View Nominees from own School";
        $viewNomineeForSchool->save();

        $viewOwnNominee = new Permission();
        $viewOwnNominee->name = "nomination-view-own";
        $viewOwnNominee->display_name = "View own nominees";
        $viewOwnNominee->save();

        $editNomination = new Permission();
        $editNomination->name = "nomination-edit";
        $editNomination->display_name = "Edit any Nominee";
        $editNomination->save();

        $editOwnNomination = new Permission();
        $editOwnNomination->name = "nomination-edit-own";
        $editOwnNomination->display_name = "Edit own nomination";
        $editOwnNomination->save();
    }
}
