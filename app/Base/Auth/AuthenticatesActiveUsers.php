<?php
namespace App\Base\Auth;

use Illuminate\Http\Request;

trait AuthenticatesActiveUsers {
    use \Illuminate\Foundation\Auth\AuthenticatesUsers
    {
        getCredentials as ogGetCredentials;
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function getCredentials(Request $request)
    {
        $creds = $request->only($this->loginUsername(), 'password');
        $creds['active'] = "Y";
        return $creds;
    }
}
