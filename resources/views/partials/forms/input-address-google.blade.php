
var mapping = {"locality" : "[address_city]", "administrative_area_level_1" : "[address_state]", "postal_code" : "[address_zip]"}

$('form').on('blur','input[name$="[address_street]"]', function(e) {
  var request = {
    'address': this.value,
    'region' : 'US',
    componentRestrictions: {
      'administrativeArea': 'North Carolina'
    }
  }
  geocoder.geocode(request, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      //For reference for call to response area API
      console.log(results[0].geometry.location.lat());
      console.log(results[0].geometry.location.lng());
      var addressElements = results[0].address_components;

      //due to the componentRestrictions parameter in the request,
      //even if the address is invalid, the response always has appended
      //the state and the country.
      if (addressElements.length < 3)
      {
        $('#errorMsg').modal()
        return;
      }
      for(var i in addressElements)
      {
          var typez = mapping[addressElements[i].types[0]];
          if (typez)
          {
              var target = 'input[name$="'+ typez +'"]'
              $(e.target).parentsUntil(".row").find(target).val(addressElements[i].long_name);
          }
      }
     } else {
       $('#errorMsg').modal()
     }
  })
});
