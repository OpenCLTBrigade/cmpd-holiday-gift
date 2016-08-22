<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\HouseholdRequest;
use App\Household;
use Auth;

class HouseholdController extends AdminController
{

    /**
     * Display a listing of the users.
     */
    public function index()
    {
        return view('admin.households.index');
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
        //$household->child;
        //$household->address;
				//$household->phone;
        return $this->viewPath("edit", $household);
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
            return view($this->viewPath("create"));
        }
    }
    
    public function search(Request $request) 
    {
        $search = trim ($request->input ("search")["value"] ?: "", " ,");
        $start = $request->input ("start") ?: 0;
        $length = $request->input ("length") ?: 25;
        $columns = $request->input ("columns");
        $order = $request->input ("order");
        
        $households =  Household::query()
            ->where ("name_last", "LIKE", "$search%")
            ->orWhere ("email", "LIKE", "%$search%")
            ->orderBy ($columns[$order[0]["column"]]["name"], $order[0]["dir"]);
        
        $count = $households->count ();
        
        $households = $households
            ->take ($length)
            ->skip ($start)
            ->get ()
            ->toArray ();
        
        return $this->dtResponse ($request, $households, $count);
    }
}
