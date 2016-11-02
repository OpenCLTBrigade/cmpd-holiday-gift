<?php

namespace App\Http\Middleware\Custom;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminsOnly
{
  public function __construct()
  {
    //
  }

  public function handle($request, Closure $next)
  {
    $user = Auth::user();
    if (!$user->hasRole("admin"))
    {
      abort(403, 'Unauthorized');
    }
    return $next($request);
  }
}
