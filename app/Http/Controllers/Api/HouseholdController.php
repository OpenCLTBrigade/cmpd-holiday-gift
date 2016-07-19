<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HouseholdController extends Controller
{
    public function index()
    {
        // TODO: Increase limit after testing
        return \App\Household::with("child", "address", "phone")->paginate(3);
    }

    public function show($id)
    {
        return \App\Household::with("child", "address", "phone")->where("id", "=", $id)->get();
    }
}
