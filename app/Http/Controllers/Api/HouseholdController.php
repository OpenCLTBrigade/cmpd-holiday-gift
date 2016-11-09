<?php

namespace App\Http\Controllers\Api;
use Auth;
use Mail;
use App\Http\Requests\Admin\HouseholdRequest;
use App\Household;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Base\Controllers\AdminController;

use Storage;

use App\HouseholdAttachment;

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
            if($request['draft'] == "N")
            {
                $this->sendNotification($id);
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
        //make call from database
        if($request['draft'] == "N" && $household['nomination_email_sent'] == "N")
        {
            $this->sendNotification($id);
            $request['nomination_email_sent'] = "Y";
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
        if (!Auth::user()->hasRole('admin') && Household::findOrFail($request->household_id)->nominator_user_id != Auth::user()->id) {
            return ["error" => "permission denied"];
        }
        $path = "user-" . Auth::user()->id . "/" . md5_file($file->getPathName()) . "_" . $file->getClientOriginalName();
        $res = Storage::disk("forms")->put($path, fopen($file->getPathName(), "r"));
        if (!$res) {
            return ["error" => "failed"];
        }
        $attachment = new HouseholdAttachment;
        $attachment->owner_user_id = Auth::user()->id;
        $attachment->path = $path;
        $attachment->household_id = $request->household_id;
        $attachment->save();
        return ["ok" => true, "path" => $path, "id" => $attachment->id];
    }

    public function sendNotification($id) {
        Mail::queue("email.nomination_submitted", [ "id" => $id], function($message) use($id) {
            $message->from(env("MAIL_FROM_ADDRESS"));
            $message->to(env("MAIL_ADMIN_ADDRESS"));
            $message->subject("New nomination submitted");
        });
    }
}
