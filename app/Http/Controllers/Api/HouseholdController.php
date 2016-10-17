<?php

namespace App\Http\Controllers\Api;
use Auth;
use App\Http\Requests\Admin\HouseholdRequest;
use App\Household;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Base\Controllers\AdminController;

use Storage;

class HouseholdController extends AdminController
{
    public function show($id)
    {
        return \App\Household::with("child", "address", "phone", "attachment")->where("id", "=", $id)->get();
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
            if($request."draft" == "N" && $request."nomination_email_sent" == "N")
            {
                $this->sendNotification($request);
                //change notification_email_sent to Y
            }
            $this->upsertAll(
              [
                "Child" => $request->input("child"),
                "HouseholdAddress"  => $request->input("address"),
                "HouseholdPhone"  => $request->input("phone"),
                "HouseholdAttachment" => $request->input("attachment"),
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
        if($household.draft == "N" && $household.nomination_email_sent == "N")
        {
            $this->sendNotification($request);
            //change notification_email_sent to Y
        }
        $this->upsertAll(
            [
                "Child" => $request->input("child"),
                "HouseholdAddress"  => $request->input("address"),
                "HouseholdPhone"  => $request->input("phone"),
                "HouseholdAttachment" => $request->input("attachment"),
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
        $file = $request->file('file');
        if (!$file->isValid()) {
            return ["error" => $file->getErrorMessage()];
        }
        $path = "user-" . Auth::user()->id . "/" . md5_file($file->getPathName()) . "_" . $file->getClientOriginalName();
        $res = Storage::disk("forms")->put($path, fopen($file->getPathName(), "r"));
        if (!$res) {
            return ["error" => "failed"];
        }
        return ["ok" => true, "path" => $path];
    }

    public function sendNotification(Household $household) {
        Mail::queue("email.nomination_submitted", [ "household" => $household ], function($message) use($household) {
            $message->from(env("MAIL_FROM_ADDRESS"));
            $message->to(env("NOMINATION_NOTICE_ADDRESS"));
            $message->subject(env("NOMINATION_SUBJECT"));
        });
    }
}
