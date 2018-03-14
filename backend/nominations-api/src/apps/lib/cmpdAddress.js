function findFeature(data, lnglat) {
  for (const feature of data.features) {
    if (geometryContains(feature.geometry, lnglat)) {
      return feature;
    }
  }
  return null;
}

function geometryContains(geo, lnglat) {
  switch (geo['type']) {
    case 'Polygon':
      return polygonContains(geo['coordinates'], lnglat);
    case 'MultiPolygon':
      for (const poly of geo.coordinates) {
        if (polygonContains(poly, lnglat)) {
          return true;
        }
      }
      return false;
    default:
      throw new Error('Unsupported geometry ', geo['type']);
  }
}

function polygonContains(poly, lnglat) {
  if (!linearringContains(poly[0], lnglat)) {
    return false;
  }
  for (const ring of poly.slice(1)) {
    if (linearringContains(ring, lnglat)) {
      return false;
    }
  }
  return true;
}

function linearringContains(ring, lnglat) {
  // assume the projection is cylindrical and no line crosses the antimeridian
  const cx = lnglat[0];
  const cy = lnglat[1];
  let inside = false;
  for (let i = 0; i + 1 < ring.length; i++) {
    const ax = ring[i][0];
    const ay = ring[i][1];
    const bx = ring[i + 1][0];
    const by = ring[i + 1][1];
    // See https://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html for why this works
    if (ay > cy !== by > cy && cx < (bx - ax) * (cy - ay) / (by - ay) + ax) {
      inside = !inside;
    }
  }
  return inside;
}

module.exports = findFeature;
