@extends('layouts.admin')

@section('content')
    <script src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&language=en">
    </script>
    <div v-show="!working && !finished">
        <p>
            There are {{$count_incomplete}} addresses missing the cmpd_division or cmpd_response_area field.
        </p>

        <button class="btn btn-danger" v-on:click="startFix">
            Click to fix!
        </button>
    </div>
    <div v-show="working">
        <h2>
            <i class="fa fa-spinner fa-pulse"></i>
            Working...
        </h2>
        <p>
            @{{progress_message}}
        </p>


    </div>
    <div v-show="working || finished">
        <strong>Found</strong>: @{{ count_found }}<br/>
        <strong>Fixed</strong>: @{{ count_fixed }}<br/>
        <strong>Might fix</strong>: @{{ count_might_fix }}<br/>
        <strong>Can't Fix</strong>: @{{ count_cant_fix }}<br/>
    </div>
    <div>
        <textarea style="width:100%; margin-top:20px;" rows="5" id="superLog"></textarea>
    </div>


    <script type="text/javascript">
        var vm = new Vue({
            el: "body",
            data: {
                working: false,
                finished: false,
                household_address: [],
                count_fixed: 0,
                count_cant_fix: 0,
                count_might_fix: 0,
                count_found: 0,
                currently_fixing: {},
                progress_message: ""
            },
            methods: {
                log: function (msg)
                {
                  console.log(msg);
                this.progress_message = msg;
                  $("#superLog").val(msg + "\n" + $("#superLog").val());
                    if (this.count_found > 0 && (parseInt(this.count_fixed) + parseInt(this.count_cant_fix)) == this.count_found)
                    {
                        this.working = false;
                        this.finished = true;
                    }
                },
                startFix: function()
                {
                    this.working = true;
                    this.getInvalidHouseholdList();
                },
                getInvalidHouseholdList: function ()
                {
                    var self = this;
                    this.progress_message = "Getting address list";
                    this.log("Getting address list");
                    $.get('/api/household_address?missing_cmpd=1', {},
                        function (res)
                        {
                            self.household_address = res;
                            self.count_found = res.length;
                            self.progress_message = "Loaded " + self.length + " addresses.";
                            self.log("Loaded " + self.length + " addresses.");
                            self.processAddresses()
                        }
                    );
                },
                processAddresses: function () {
                    var delay = 500;
                    var self = this;
                    for (i in this.household_address)
                    {
                        setTimeout(function() {
                            var a = self.household_address[i];
                            // this.progress_message = "Working on address ID: " + a.id;
                            self.log(self.progress_message = "Working on address ID: " + a.id);
                            self.geocode(a);
                        }, delay);
                        delay = parseInt(delay) + 1075; // Google rate limiting lolol
                    }
                },
                geocode: function (address) {
                    this.progress_message = "Geocoding address " + address.id;
                    var geocoder= new google.maps.Geocoder();
                    var mapping = {"locality" : "address_city", "administrative_area_level_1" : "address_state", "postal_code" : "address_zip"};
                    var request = {
                        'address': address.address_street,
                        'region' : 'US',
                        'componentRestrictions': {
                            'administrativeArea': 'North Carolina'
                        }
                    };

                    var self = this;
                    geocoder.geocode
                    (
                        request,
                        function(results, status)
                        {
                            if (status === google.maps.GeocoderStatus.OK)
                            {
                                //For reference for call to response area API
                                self.log(results[0].geometry.location.lat());
                                self.log(results[0].geometry.location.lng());
                                var addressElements = results[0].address_components;

                                //due to the componentRestrictions parameter in the request,
                                //even if the address is invalid, the response always has appended
                                //the state and the country.
                                if (addressElements.length < 3)
                                {
                                    self.count_cant_fix++;
                                    self.log('geocode error', addressElements);
                                    return;
                                }
                                /// at this point:
                                // addressElements = {"locality" : "...city...", "administrative_area_level_1": "...state...", "postal_code": "...", ... }

                                self.populate_cmpd_info(address, results[0].geometry.location);
                            }
                            else
                            {
                                self.log(address.id + " - That address didn't work.");
                                self.count_cant_fix++;
                            }
                        }
                    );
                },
                populate_cmpd_info: function (address, location)
                {
                    this.count_might_fix++;
                    var self = this;
                    this.progress_message = "Finding d/Ra for address " + address.id;
                    $.ajax({
                        url: '/api/cmpd_info',
                        data: {lat: location.lat(), lng: location.lng()},
                        success: function(info) {
                            if (info.error)
                            {
                                self.count_cant_fix++;
                                self.log(info.error);
                            }
                            else
                            {
                                $.ajax ({
                                    url: '/api/household_address/' + address.id,
                                    method: 'PUT',
                                    headers: {
                                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                    },
                                    data: {
                                        cmpd_division: info.division,
                                        cmpd_response_area: info.response_area
                                    },
                                    success: function () {
                                        var has = "(";
                                        if (info.division.length > 0)
                                        {
                                            has = has + "Had division " + info.division + ". ";
                                        }
                                        if (info.response_area.length > 0)
                                        {
                                            has = has + "Had response area. " + info.response_area + ".";
                                        }
                                        has = has + ")";

                                        self.count_fixed++;
                                        self.log("Updated address " + address.id + " " + has);
                                    }
                                });
                                self.log(info.division + " | " + info.response_area);
                            }
                        }
                    });
                }
            }
        })
    </script>
@endsection