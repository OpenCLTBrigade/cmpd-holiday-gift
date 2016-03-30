<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use App\Http\Controllers\Api\DataTables\HouseholdDataTable;
use App\Http\Controllers\ChildController;
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
    public function index(HouseholdDataTable $dataTable)
    {
        return $dataTable->render($this->viewPath());
    }

    /**
     * Store a newly created user in storage
     */
    public function store(HouseholdRequest $request)
    {
        $request['nominator_user_id'] = Auth::user()->id;
        return $this->createFlashRedirect(Household::class, $request);
    }

    /**
     * Display the specified user.
     */
    public function show(Household $household)
    {
       return $this->viewPath("show", $household);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(Household $household)
    {
        $household->child;
        $household->address;
        return $this->getForm($household);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Household $household, HouseholdRequest $request)
    {	
		$childController = new ChildController();
		$childController->updateAll($request['child']);
        return $this->saveFlashRedirect($household, $request);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(Household $user)
    {
        # TODO: Not sure we want to do this... :S
    }
}