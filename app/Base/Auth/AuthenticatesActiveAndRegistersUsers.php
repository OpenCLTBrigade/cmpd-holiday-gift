<?php
namespace App\Base\Auth;

use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Base\Auth\AuthenticatesActiveUsers;

trait AuthenticatesActiveAndRegistersUsers {

    use AuthenticatesActiveUsers, RegistersUsers {
        AuthenticatesActiveUsers::redirectPath insteadof RegistersUsers;
        AuthenticatesActiveUsers::getGuard insteadof RegistersUsers;
    }

}