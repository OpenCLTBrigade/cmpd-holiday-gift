<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use App\Http\Controllers\Api\DataTables\UserDataTable;
use App\Http\Requests\Admin\HouseholdRequest;
use App\Household;
use Auth;

class HouseholdController extends AdminController
{
    /**
     * Display a listing of the users.
     *
     * @param UserDataTable $dataTable
     */
    public function index(UserDataTable $dataTable)
    {
        #return $dataTable->render($this->viewPath());
    }

    /**
     * Store a newly created user in storage
     */
    public function store(HouseholdRequest $request)
    {
        #return $this->createFlashRedirect(Household::class, $request, $this->imageColumn);
    }

    /**
     * Display the specified user.
     */
    public function show(Household $household)
    {
       # return $this->viewPath("show", $household);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(Household $user)
    {
        #return $this->getForm($user);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Household $household, HouseholdRequest $request)
    {
        #return $this->saveFlashRedirect($household, $request, $this->imageColumn);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(Household $user)
    {
        # TODO: Not sure we want to do this... :S
    }
}