<?php

// Determine which region contains a given location

namespace App\Libraries\GeoContains;

function test() {
  $data = json_decode(file_get_contents('data/CharlotteMecklenburg_Police_Response_Areas.geojson'), true);
  foreach([[[1450406, 539119], 'not found'], // ensure the data has been converted from state coordinates
	   [[0,0], 'not found'],
	   [[-81.6141, 35.2861], 'not found'],
	   [[-80.84, 35.227], 'Central Division'],
	   [[-80.6716, 35.2346], 'Hickory Grove Division']]
	  as $test) {
    $result = find_feature($data, $test[0])['properties']['DNAME'] ?: 'not found';
    if($result != $test[1]) {
      echo 'FAIL ' . json_encode($test[0]) . ': ' . $result . ' (but expected ' . $test[1] . ")\n";
    } else {
      echo 'OK   ' . json_encode($test[0]) . ': ' . $result . "\n";
    }
  }
}

function find_feature($json, $lnglat) {
  foreach($json['features'] as $feature) {
    if(geometry_contains($feature['geometry'], $lnglat)) {
      return $feature;
    }
  }
}

function geometry_contains($geo, $lnglat) {
  switch($geo['type']) {
  case 'Polygon':
    return polygon_contains($geo['coordinates'], $lnglat);
    break;
  case 'MultiPolygon':
    foreach($geo['coordinates'] as $poly) {
      if(polygon_contains($poly, $lnglat)) {
	return true;
      }
    }
    return false;
    break;
  default:
    throw new Exception('Unsupported geometry ' . $geo['type']);
    break;
  }
}

function polygon_contains($poly, $lnglat) {
  if (!linearring_contains($poly[0], $lnglat)) {
    return false;
  }
  foreach(array_slice($poly, 1) as $ring) {
    if(linearring_contains($ring, $lnglat)) {
      return false;
    }
  }
  return true;
}

function linearring_contains($ring, $lnglat) {
  // assume the projection is cylindrical and no line crosses the antimeridian
  $cx = $lnglat[0];
  $cy = $lnglat[1];
  $inside = false;
  for($i = 0; $i + 1 < count($ring); $i++) {
    $ax = $ring[$i][0];
    $ay = $ring[$i][1];
    $bx = $ring[$i+1][0];
    $by = $ring[$i+1][1];
    // See https://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html for why this works
    if(($ay>$cy) != ($by>$cy) &&
       $cx < ($bx-$ax) * ($cy-$ay) / ($by-$ay) + $ax) {
      $inside = !$inside;
    }
  }
  return $inside;
}

// test();

?>