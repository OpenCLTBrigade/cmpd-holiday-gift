<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index ()
    {
        // Don't select all fields to keep password hash and tokens private
        $Users = \App\User::query()->select(["id", "name_first", "name_last", "rank", "phone", "affiliation_id", "email", "created_at", "updated_at"])->paginate(5);
        return $Users;
    }
}
