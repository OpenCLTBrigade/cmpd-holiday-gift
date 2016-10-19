<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<script src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&language=en">
</script>
<div id="app" class="container-fluid">
  <!-- <form v-on:submit.prevent=""> -->
  <div class="box box-primary">
    <div class="box-header with-border">
      <h1 class="box-title">Head of Household Information</h1>
    </div>

    <!-- INITIAL PART OF FORM -->

    <div class="box-body">
      <div class="row">

        <div class="col-md-6 col-sm-12">
          <div class="form-group required">
            <label>First Name</label>
            <input type="text" class="form-control" id="name-first" v-model="household.name_first">
          </div>
        </div>

        <div class="col-md-6 col-sm-12">
          <div class="form-group required">
            <label class="required">Last Name</label>
            <input type="text" class="form-control" id="name-last" v-model="household.name_last">
          </div>
        </div>
      </div>

      <div class="row">

        <!-- Do we want an "Other", "Prefer Not to Specify" or similar gender option? -->

        <div class="col-md-4 col-sm-12">
          <div class="form-group required">
            <label for="gender" class="control-label">Gender</label>
            <select class="form-control" id="gender" v-model="household.gender" name="gender">
              <option value="" selected="selected">==== Select ====</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>

        <div class="col-md-4 col-sm-12">
          <div class="form-group required">
            <label for="dob" class="control-label">Date of Birth</label>
            <input class="form-control" v-model="household.dob" name="dob" type="date" id="dob">
          </div>
        </div>

        <div class="col-md-4 col-sm-12">
          <div class="form-group required">
            <label class="control-label">Last four digits of SSN</label>
            <input class="form-control" type="number" v-model="household.last4ssn">
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-md-4 col-sm-12">
          <div class="form-group">
            <label class="control-label">Email</label>
            <input class="form-control" type="email" v-model="household.email">
          </div>
        </div>

        <div class="col-md-4 col-sm-12">
          <div class="form-group">
            <label class="control-label">Preferred Contact Method</label>
            <select class="form-control" v-model="household.preferred_contact_method">
              <option value="" selected="selected">==== Select ====</option>
              <option value="email">E-Mail</option>
              <option value="text">Text</option>
              <option value="mail">Phone</option>
            </select>
          </div>
        </div>

        <div class="col-md-4 col-sm-12">
          <div class="form-group required">
            <label for="reason_for_nomination" class="control-label">Ethnicity</label>
            <select class="form-control" id="race" v-model="household.race" name="race">
              <option value="">==== Select ====</option>
              <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
              <option value="Asian">Asian</option>
              <option value="African American">African American</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Pacific Islander">Pacific Islander</option>
              <option value="White">White</option>
            </select>

            <!-- Perhaps include a description of how / why ethnicity info is used? -->

          </div>
        </div>




      </div>
    </div>
    <!-- /box-body -->
  </div>
  <!-- /box-primary -->


  <!-- ADDRESS HEADER -->

  <div class="box box-danger">
    <div class="box-header with-border">
      <h1 class="box-title">Delivery Address</h1>
    </div>

    <!-- ADDRESS SECTION  -->
    <div class="box-body">

      <div class="row" v-for="address in household.address">
        <div class="col-xs-12 col-sm-4">
          <div class="form-group required">

            <label class="control-label">Type</label>
            <select class="form-control" v-model="address.type">
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>

          </div>
        </div>

        <div class="col-xs-12 col-sm-4">
          <div class="form-group required">

            <label class="control-label">Street Address</label>
            <input class="form-control street-address" type="text" v-model="address.address_street" v-on:blur="address_on_blur">
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="form-group">

            <label class="control-label">Street Address 2</label>
            <input class="form-control" type="text" v-model="address.address_street2">
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="form-group required">

            <label class="control-label">City</label>
            <input class="form-control" type="text" v-model="address.address_city">
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="form-group required">

            <label class="control-label">State</label>
            <input class="form-control" type="text" v-model="address.address_state">
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="form-group required">

            <label class="control-label">ZIP Code</label>
            <input class="form-control" type="text" v-model="address.address_zip">
          </div>
        </div>
        <hr>
      </div>

      <!-- Can accomodate multiple addresses but is currently limiting users to 1 address
      <div class="row">
        <div class="col-xs-12">
          <button class="btn addbtn" v-on:click="addAddress">Add Address</button>
          <button class="btn btn-danger" v-on:click="removeAddress">Remove Address</button>
        </div>
      </div>
    -->

    </div>


      <!-- /box-danger -->


  </div>



  <!-- PHONE HEADER -->

  <div class="box box-danger">
    <div class="box-header with-border">
      <h1 class="box-title">Phone Numbers</h1>
    </div>


    <!-- PHONE SECTION -->

    <div class="box-body">
      <div class="row" v-for="phone in household.phone">
        <div class="form-group">

          <div class="col-xs-12 col-sm-4">
            <div class="form-group required">

              <label class="control-label">Type</label>
              <select class="form-control" v-model="phone.phone_type">
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Mobile</option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-8">
            <div class="form-group required">

              <label class="control-label">Phone</label>
              <input class="form-control" type="text" v-model="phone.phone_number">
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="form-group">

            </div>
            <input class="form-control" type="hidden" />

          </div>

        </div>
      </div>
      <!--  /box  -->
      <div class="row">
        <div class="col-xs-12">
          <button class="btn addbtn" v-on:click="addPhone">Add Phone</button>
          <button class="btn btn-danger" v-on:click="removePhone">Remove Phone</button>
        </div>
      </div>
    </div>
  </div>

  <!-- CHILD HEADER -->

  <div v-for="record in household.child" class="box box-success">
    <div class="box-header with-border">
      <h1 class="box-title">Child @{{$index+1}} <span v-if="record.name_first.length > 0 || record.name_last.length > 0">-</span> @{{record.name_first}} @{{record.name_last}}</h1>
    </div>


    <!-- CHILD SECTION -->

    <div class="box-body">
      <div class="row"  >

      <div class="col-xs-12 col-sm-6">
        <div class="form-group required">

          <label class="control-label">First Name</label>
          <input class="form-control" type="text" v-model="record.name_first">

        </div>
      </div>

      <div class="col-xs-12 col-sm-6">

        <div class="form-group required">

          <label class="control-label">Last Name</label>
          <input class="form-control" type="text" v-model="record.name_last">



        </div>
      </div>
    </div>
    <!-- /row -->
    <!--</div> /box-body -->

    <div class="row">
      <div class="col-xs-12 col-sm-4">

        <div class="form-group required">

          <label class="control-label">Ethnicity</label>
          <input class="form-control" type="text" v-model="record.race">

          <!-- Perhaps include a description of how / why ethnicity info is used? -->

        </div>
      </div>

      <div class="col-xs-12 col-sm-4">

        <div class="form-group required">

          <label class="control-label">Last four digits of SSN</label>
          <input class="form-control" type="text" v-model="record.last4ssn">



        </div>
      </div>
      <div class="col-xs-12 col-sm-4">

        <div class="form-group required">

          <label class="control-label">Child receives free or reduced lunch?</label>
          <select class="form-control" v-model="record.free_or_reduced_lunch">
            <option value="">==== Select ====</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>


        </div>
      </div>
    </div>
    <!-- row -->

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group required">

          <label class="control-label">Date of Birth</label>
          <input class="form-control" v-model="record.dob" type="date">

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group required">

          <label class="control-label">School Name</label>
          <select class="form-control" v-model="record.school_id">
            <option value='@{{ school.id }}' v-for='school in schools'>
              @{{ school.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">

          <input type="checkbox" v-bind:true-value="'Y'" v-bind:false-value="'N'" v-model="record.bike_want">&nbsp;Child wants bike?</input>


        </div>
      </div>
    </div>

    <div id="bike-options" v-if="record.bike_want == 'Y'">
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group required">

            <label class="control-label">Bike style</label>
            <select class="form-control" v-model="record.bike_style">
              <option value="">==== Select ====</option>
              <option value="Tricycle">Tricycle</option>
              <option value="Mountain">Mountain Bike</option>
              <option value="BMX">BMX Bike</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group required">

            <label class="control-label">Bike size</label>
            <select class="form-control" v-model="record.bike_size">
              <option value="">==== Select ====</option>
              <option value="Tricycle">Tricycle</option>
              <option value='12” Bicycle'>12” Bicycle</option>
              <option value='16” Bicycle'>16” Bicycle</option>
              <option value='20” Coaster Brake Bicycle'>20” Coaster Brake Bicycle</option>
              <option value='20” Geared Bicycle'>20” Geared Bicycle</option>
              <option value='24” Geared Bicycle'>24” Geared Bicycle</option>
            </select>

            <p><a href="https://www.performancebike.com/images/performance/web/PDFs/09_GrowthGuarantee_handout_Chart.pdf" target="_blank">Not sure? Click for size guide.</a>

          </div>
        </div>
      </div>

    </div>
    <!-- /bike options -->
    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">

          <input type="checkbox" v-bind:true-value="'Y'" v-bind:false-value="'N'" v-model="record.clothes_want">
          Child wants clothes?
          </input>

        </div>
      </div>
    </div>

    <div name="clothes-options" v-show="record.clothes_want == 'Y'">

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">

            <label class="control-label">Shirt size</label>
            <input class="form-control" type="text" v-model="record.clothes_size_shirt">

          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">

            <label class="control-label">Pants size</label>
            <input class="form-control" type="text" v-model="record.clothes_size_pants">

          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">

            <label class="control-label">Shoe size</label>
            <input class="form-control" type="text" v-model="record.shoe_size">

          </div>
        </div>
      </div>

    </div>
    <!-- /clothes options -->

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">

          <label class="control-label">Favorite color</label>
          <input class="form-control" type="text" v-model="record.favourite_colour">
          <!-- Backend: note the english / american spelling difference -->


        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">

          <label class="control-label">Child's interests</label>
          <textarea class="form-control" cols="50" rows="10" v-model="record.interests"></textarea>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">

          <label class="control-label">Additional ideas</label>
          <textarea class="form-control" cols="50" rows="10" v-model="record.additional_ideas"></textarea>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="form-group required">

          <label class="control-label">Reason for nomination</label>
          <textarea class="form-control" cols="50" rows="10" v-model="record.reason_for_nomination"></textarea>

        </div>
      </div>
    </div>
    <!-- /row -->

    </div>
    <!-- /box-body -->

    </div>

    <div class="box">
      <div class="box-body">
        <button class="btn addbtn" v-on:click="addChild">Add Child</button>
        <button class="btn btn-danger" v-on:click="removeChild">Remove Child</button>
      <!-- @{{ $data | json }} -->
      </div>
    </div>

  <div class="box box-danger">
    <div class="box-header with-border">
      <h1 class="box-title">Scanned Forms</h1>
    </div>
    <div class="box-body">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <label class="control-label">Existing Files</label>
          <div v-for="attachment in household.attachment">
            <span class="filename">
              <a href="/admin/household_attachment/@{{attachment.id}}">
                @{{ attachment.path.split('_')[1] }}
              </a>
            </span>
            {{-- <button class="btn btn-danger" v-on:click="TODO:delete_file">Delete</button> --}}
          </div>
          <div v-for="file_name in uploading_forms">
            <span class="filename">
              @{{ file_name }} (uploading...)
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label class="control-label">Upload File</label>
            <input type="file" class="form-control" v-on:blur="upload_form_file">
          </div>
        </div>
      </div>
    </div>
    <!-- /box-body -->
  </div>
  <!-- /box-primary -->
  
    <button class="btn addbtn" v-show="household.draft != 'N'" v-on:click="doSave(true)" :disabled="loading || saving">Save Draft</button>
    <button class="btn addbtn" v-show="household.draft != 'N'" v-on:click="doSave(false)" :disabled="loading || saving">Submit Nomination</button>
    <button class="btn addbtn" v-show="household.draft == 'N'" v-on:click="doSave(false)" :disabled="loading || saving">Update</button>
    <i v-show="saving" class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  </div>


  <!--  /box box-success -->
  <!-- </form> -->



</div>    <!-- /app -->
<!-- /container -->

<!-- START OF VUE.JS CODE -->

<script src="http://cdn.jsdelivr.net/vue/1.0.25/vue.js"></script>

<script>
//                   MAIN VUE CODE'

var app = new Vue(
  {
    el: '#app',

    data: {
      loading: false,
      saving: false,
      schools: [],
      household: {
        phone: [],
        address: [{}],
        child: [],
        attachment: [],
      },
      uploading_forms: [],
    },

    created: function() {
      this.fetchSchools();
    },

    methods: {

      upload_form_file: function(e) {
        console.log(e);
        var file = e.target.files[0];
        if (!file) {
          return;
        }
        var file_name = file.name;
        var data = new FormData();
        data.append("file", file);
        this.uploading_forms.push(file_name);
        $(e.target).val('');
        var self = this;
        var fail = function(msg) {
          msg = "Error uploading file '" + file_name + "': " + msg;
          alert(msg);
          console.log(msg);
          self.uploading_forms.$remove(file_name);
        }
        $.ajax({
          url: "/api/upload_household_form_file",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
          },
          type: 'POST',
          success: function(res){
            if (res.ok) {
              self.uploading_forms.$remove(file_name);
              self.household.attachment.push({ path: res.path });
            } else {
              fail(res.error || "unknown error");
            }
          },
          error: function(xhr, type, errmsg) {
            fail(type + ": " + errmsg);
          }
        });
      },

      address_on_blur: function(e)
      {
        var geocoder= new google.maps.Geocoder(); // TODO: make global?
        var mapping = {"locality" : "address_city", "administrative_area_level_1" : "address_state", "postal_code" : "address_zip"};
        var request = {
          'address': e.target.value,
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
              console.log(results[0].geometry.location.lat());
              console.log(results[0].geometry.location.lng());
              var addressElements = results[0].address_components;

              //due to the componentRestrictions parameter in the request,
              //even if the address is invalid, the response always has appended
              //the state and the country.
              if (addressElements.length < 3)
              {
                console.log('geocode error', addressElements);
                $('#errorMsg').modal();
                return;
              }
              /// at this point:
              // addressElements = {"locality" : "...city...", "administrative_area_level_1": "...state...", "postal_code": "...", ... }

              var address_index = $(e.target).parentsUntil('.box').last().parent().prevAll().length;
              console.log('index', address_index);

              console.log(self);
              for (var i in addressElements)
              {
                var type = mapping[addressElements[i].types[0]];
                if (type)
                {
                  var update = {};
                  update[type] = addressElements[i].long_name;
                  self.household.address.$set(0, Object.assign({}, self.household.address[0], update));

                }
              }
              populate_cmpd_info(results[0].geometry.location, address_index);
            }
            else
            {
              $('#errorMsg').modal()
            }
          }
        );
        //

        var populate_cmpd_info = function(location, address_index) {
          console.log('foo', location);
          $.ajax({
            url: '/api/cmpd_info',
            data: {lat: location.lat(), lng: location.lng()},
            success: function(info) {
              console.log('bar', info);
              if (info.error)
              {
                console.log('baz');
                // TODO: maybe don't ignore errors
              }
              else
              {
                self.household.address[0].cmpd_division = info.division;
                self.household.address[0].cmpd_response_area = info.response_area;
                console.log(info.division + " | " + info.response_area);
              }
            },
            error: function() {
              console.log('quux');
              // TODO: maybe don't ignore errors
            }
          });
        };
      },

      addAddress: function()
      {
        this.household.address.push
        (
          {
            type: "",
            address_street: "",
            address_street2: "",
            address_city: "",
            address_state: "",
            address_zip: "",
            cmpd_division: "",
            response_area: ""
          }
        )  ;
      },
      removeAddress: function()
      {
        this.household.address.pop();
      },

      addPhone: function() {
        this.household.phone.push({
          phone_type: "",
          phone_number: ""
        });
      },

      removePhone: function() {
        this.household.phone.pop();
      },

      addChild: function() {
        this.household.child.push({});
      },
      removeChild: function() {
        this.household.child.pop();
      },

      doSave: function(draft)
      {
        if (this.saving === true)
          return; // Already in the middle of saving >:(

        this.saving = true;

        // Refuse to submit if required fields are empty, and highlight missing fields
        // Mark a field as required by adding the `required' class to the containing `form-group'
        var missing = false;
        $('.form-group.required input, .form-group.required select, .form-group.required textarea').each(function(i, el){
          if(!$(el).val()){
            missing = true;
            $(el).addClass('missing-field');
          }else{
            $(el).removeClass('missing-field');
          }
        });
        if(!draft && missing){ // Don't require all fields if it's only a draft...
          this.saving = false;
          alert("Please enter all of the required fields before submitting your nomination.");
          return;
        }

        var id = (typeof this.household.id != "undefined") ? this.household.id : null;
        var urlSuffix = (id != null) ? "/" + id : "";
        var url = "/api/household" + urlSuffix;
        var self = this;
        this.household.draft = (draft === true) ? "Y" : "N";
        var method = (id != null) ? "PUT" : "POST"

        console.log("id is " + id);
        console.log("urlSuffix is " + urlSuffix);
        console.log("url is " + url);
        console.log("method is " + method);
        console.log("Draft saved to " + this.household.draft);

        $.ajax({
          url: url,
          method: method,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify(self.household),
          headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
          },
          success: function(data) {
            self.saving = false;
            if (data.ok)
            {
              self.household = data.household[0];
            }
            else if (!data.ok && typeof data.message != "undefined")
            {
              alert(data.message);
            }
            else
            {
              alert("Could not create nomination");
            }
          },
          error: function(errMsg) {
            self.saving = false;
            alert("Unexpected error. Please review your form for missing or invalid fields, try again later or contact an administrator");
            console.log(errMsg);
          }
        });

      },

      doNothing: function() {
      },

      fetchSchools: function ()
      {
        console.log("fetchData invoked")

        var xhr = new XMLHttpRequest();
        var self = this;

        //xhr.open('GET', self.apiURL + self.userName)
        xhr.open('GET', '/api/affiliation/cms');

        //console.log(self.userName + " = self.userName")
        xhr.onload = function ()
        {
          self.schools = JSON.parse (xhr.responseText)
        };

        xhr.send();
      },

      fetchRecord: function (id)
      {
        var  self = this;
        self.loading = true;
        $("#loading_overlay").show();
        $.get("/api/household/" + id, {}, function (e) {
          self.loading = false;
          self.household = e[0];
          $("#loading_overlay").hide();
        });
      }
    }
  });
//        var child = app.$refs.address;

</script>
