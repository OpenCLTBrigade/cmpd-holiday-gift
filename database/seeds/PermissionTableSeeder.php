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
         * Hey you! Yes, you there! TRY and keep this docblock up to date will ya pease? O:-)

            LIST OF PERMISSIONS

            - manager-users
            - manage-nominations - In place of "add-nominations"
            - add-nominations - In place of "manage-nominations"
            - access-reports
        */

        /* Admin -- Approve and Create an account */
        $manageUsers = new Permission();
        $manageUsers->name = "manage-users";
        $manageUsers->display_name = "Manage User Accounts";
        $manageUsers->description = "Create, edit, and approve users";
        $manageUsers->save();

        $manageNominations = new Permission();
        $manageNominations->name = "manage-nominations";
        $manageNominations->display_name = "Manage All Nominations";
        $manageNominations->description = "View, create, and edit all nominations";
        $manageNominations->save();

        $addNominations = new Permission();
        $addNominations->name = "manage-users";
        $addNominations->display_name = "Add Nominations";
        $addNominations->description = "Add nominations from school";
        $addNominations->save();

        $accessReports = new Permission();
        $accessReports->name = "access-reports";
        $accessReports->display_name = "Access Reports";
        $accessReports->description = "Access reporting features";
        $accessReports->save();


        // PERMISSIONS BELOW ARE TBD.

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
