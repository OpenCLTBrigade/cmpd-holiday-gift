# Police Response Area data

Downloaded from: http://maps.co.mecklenburg.nc.us/openmapping/data.html

Converted to geojson using `ogr2ogr`: http://www.gdal.org/

`ogr2ogr -t_srs WGS84 -f geojson CharlotteMecklenburg_Police_Response_Areas.geojson CharlotteMecklenburg_Police_Response_Areas.shp`
