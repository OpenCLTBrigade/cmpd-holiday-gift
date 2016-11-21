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
        $household = Household::where('id','=',$id)->with("child", "address", "phone")->first();
        return $this->viewPath("show", $household);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit($id)
    {
        $household = Household::findOrFail($id);
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
            ->where ("household.name_last", "LIKE", "$search%")
            ->orWhere ("household.email", "LIKE", "%$search%");

        switch($order[0]['column']){
        case "1": // Head of Household
            $households = $households
                ->orderBy ("name_last", $order[0]["dir"])
                ->orderBy ("name_first", $order[0]["dir"]);
            break;
        case "3": // Nominated by
            $households = $households
                ->join('users', 'users.id', '=', 'household.nominator_user_id')
                ->orderBy('users.name_last', $order[0]["dir"])
                ->orderBy('users.name_first', $order[0]["dir"])
                ->select('household.*');
            break;
        }

        $count = $households->count ();

        $households = $households
            ->take ($length)
            ->skip ($start)
            ->get ();

        $res = [];
        foreach ($households as $household) {
          $household->head_of_household_name = "{$household->name_first} {$household->name_last}";
          $household->child_count = count($household->child);
          $household->nominated_by = "<a href='/admin/user/{$household->nominator->id}'>{$household->nominator->name_first} {$household->nominator->name_last}</a>";
          $household->uploaded_form= (count($household->attachment)) ? "Yes" : "--";

          // Household reviewed?
          if ($household->reviewed)
          {
            if ($household->approved)
            {
              $household->review_options = 'Approved';
            }
            else
            {
              // Eventually we will show rejected nominees on a different list
              $household->review_options = 'Rejected';
            }
          }
          else
          {
            $household->review_options = '<a onClick="vm.show_review_modal('.$household->id.');" class="btn btn-sm btn-default">Review</a>';
          }
          $res[] = $household;
        }

        $households = $res;



        return $this->dtResponse ($request, $households, $count);
    }

    public function review (Household $household, Request $request)
    {
      $approved = $request->input('approved', 0);
      $reason = $request->input('reason' , null);
      $message = $request->input('message', null);

      // If approved?
      switch ($approved)
      {
        // Approved the nomination
        case 1:
          $household->reviewed = 1;
          $household->approved = 1;
          return ['ok' => $household->save()];
          break;

        // Declined the nomination
        case 0:
          if (!$reason)
          {
            return ['ok' => false, 'message' => 'Must provide a reason for declining.'];
          }

          // Update stuffs...
          $household->reviewed = 1;
          $household->approved = 0;
          $household->reason = $reason;

          if ($household->save())
          {
            // Cool... it saved... now, do we have to email the nominator to let them know what's up?
            if ($message)
            {
              // TODO: Dispatch an email
            }
          }
          else
          {
            return ['ok' => false, 'message' => 'Could not update nomination. Please try again later.'];
          }


          break;
      }
    }
}
