<?php
namespace App\Http\Controllers\Admin;
use App\Base\Controllers\AdminController;
use App\HouseholdAddress;

class ToolsController extends AdminController
{
  public function index()
  {

  }
  public function cmpdAddressInfo()
  {

    $count_incomplete = HouseholdAddress::query()->missingCmpdInfo()->count();
    return view('admin.tools.cmpd_address_info',
      [
        'count_incomplete' => $count_incomplete
      ]
    );
  }
}
