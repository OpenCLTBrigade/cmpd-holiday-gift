<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index ()
    {
        $Users = \App\User::query()->paginate(5);
        return $Users;
    }
}
