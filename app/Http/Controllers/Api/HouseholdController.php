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
          return [
            "ok" => false,
            "message" => "Max number of nominations reached",
            "household" => null
          ];
        }
        else
        {
            $request['nominator_user_id'] = Auth::user()->id;
            $id = $this->createFlashParentRedirect(Household::class, $request);
            $this->upsertAll(
              [
                "Child" => $request->input("child"),
                "HouseholdAddress"  => $request->input("address"),
                "HouseholdPhone"  => $request->input("phone")
              ],
              "household_id",
              $id
            );
            return [
              "ok" => true,
              "message" => "",
              "household" => $this->show($id)
            ];
        }
    }

    /**
     * Update the specified user in storage.
     */
    public function update($id, HouseholdRequest $request)
    {
        $household = Household::findOrFail($id);
        $this->upsertAll(
            [
                "Child" => $request->input("child"),
                "HouseholdAddress"  => $request->input("address"),
                "HouseholdPhone"  => $request->input("phone")
            ],
            "household_id",
            $id
        );
        $this->saveFlashParentRedirect($household, $request);

        // Return fresh data
        return [
          "ok" => true,
          "message" => "",
          "household" => $this->show($id)
        ];
    }

    public function upload_attachment(Request $request) {
        $file = request->file('file');
        if(!$file->isValid()){
            return [ "error" => $file->getErrorMessage() ];
        }
        $file->store(TODO_user_id, "forms");
    }
}
