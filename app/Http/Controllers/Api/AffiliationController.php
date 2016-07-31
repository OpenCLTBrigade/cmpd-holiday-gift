<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AffiliationController extends Controller
{
  public function cms()
  {
    return \App\Affiliation::query()->cms()->get();
  }
}
