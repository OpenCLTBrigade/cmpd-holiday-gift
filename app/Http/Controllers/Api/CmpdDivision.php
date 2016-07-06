<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

require_once(base_path() . '/app/Libraries/GeoContains.php');

class CmpdDivision extends Controller {
  public function info(Request $request) {
    $data = json_decode(file_get_contents(base_path() . '/data/CharlotteMecklenburg_Police_Response_Areas.geojson'), true);

    $result = \App\Libraries\GeoContains\find_feature($data, [$request->input('lng'), $request->input('lat')]);

    if(!$result) {
      $response = '{"error": "no matching division"}';
    } else {
      $response = json_encode(['division' => $result['properties']['DIVISION'],
			       'response_area' => $result['properties']['RA']]);
    }
    return response($response, 200)->header('Content-Type', 'application/json');
  }
}
