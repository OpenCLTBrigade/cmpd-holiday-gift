<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AffiliationController extends Controller
{
  public function school ()
  {
    return Affiliation::CMS();
    //Make a query scope which lets you do Affiliation::query()->cms();
  }
}
