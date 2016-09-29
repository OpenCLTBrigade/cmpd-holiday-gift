<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\HouseholdAttachment;

use Storage;

class HouseholdAttachmentController extends AdminController
{
    public function show($id) {
        if(false /* TODO: user isn't attachment creator && user isn't admin */){
            abort(403);
        }
        $file = HouseholdAttachment::find($id);
        if(!$file) {
            abort(404);
        }
        return response(Storage::disk('forms')->get($file->path))
            ->header('Content-type', 'none');
    }
}
