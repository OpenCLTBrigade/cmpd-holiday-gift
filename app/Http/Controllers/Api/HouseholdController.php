<?php

namespace App\Http\Controllers\Api;
use Auth;
use App\Http\Requests\Admin\HouseholdRequest;
use App\Household;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Base\Controllers\AdminController;

class HouseholdController extends AdminController
{
    public function show($id)
    {
        return \App\Household::with("child", "address", "phone")->where("id", "=", $id)->get();
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

}
