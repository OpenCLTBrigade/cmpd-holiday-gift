<?php

namespace App\Http\Controllers\Api;

use App\HouseholdAddress;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HouseholdAddressController extends Controller
{
  public function index(Request $request)
  {
    $sMissing = $request->get('missing_cmpd');

    $query = HouseholdAddress::query();
    if ($sMissing) {
      $query->missingCmpdInfo();
    }

    return $query->get();
  }

  public function update ($id, Request $request)
  {
    $address = HouseholdAddress::find($id);
    $ok = $address->update([
      'cmpd_division' => $request->input('cmpd_division'),
      'cmpd_response_area' => $request->input('cmpd_response_area'),
    ]);
    return ['ok' => $ok];
  }
}

