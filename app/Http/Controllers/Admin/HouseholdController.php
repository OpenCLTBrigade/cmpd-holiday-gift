<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use App\Http\Controllers\Api\DataTables\HouseholdDataTable;
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
        if(Auth::user()->max_nominations_reached)
        {
            return view("admin.households.error.maxnominations");
        }
        else
        {
            $request['nominator_user_id'] = Auth::user()->id;
            $id = $this->createFlashParentRedirect(Household::class, $request);
            $this->upsertAll(["Child" => $request['child'],
                            "HouseholdAddress"  => $request['address'],
                            "HouseholdPhone"  => $request['phone']], "household_id", $id);
            return $this->redirectRoutePath("index");
        }
    }

    /**
     * Display the specified user.
     */
    public function show($id)
    {
        $household = Household::findOrFail($id);
        return $this->viewPath("show", $household);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit($id)
    {
        $household = Household::findOrFail($id);
			  //IMPORTANT: LOAD THE ATTRIBUTE WHEN ADDING TO FORM
        $household->child;
        $household->address;
				$household->phone;
        return $this->getForm($household);
    }

    /**
     * Update the specified user in storage.
     */
    public function update($id, HouseholdRequest $request)
    {
        $household = Household::findOrFail($id);
		$this->upsertAll(["Child" => $request['child'],
						"HouseholdAddress"  => $request['address'],
						"HouseholdPhone"  => $request['phone']], "household_id", $household['id']);
        return $this->saveFlashRedirect($household, $request);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(Household $household)
    {
        # TODO: Not sure we want to do this... :S
    }

    public function create() {
        if(Auth::user()->max_nominations_reached)
        {
            return view("admin.households.error.maxnominations");
        }
        else
        {
            return parent::create();
        }
    }
}
