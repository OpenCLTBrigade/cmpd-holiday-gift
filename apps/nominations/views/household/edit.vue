<!-- TODO: most of this file was copied verbatim from the 2016 project and needds to be adapted and cleaned up -->

<subcomponent name="box">
  <template>
    <div :class="['box'] + (type ? [`box-${type}`] : [])">
      <div class="box-header with-border" v-if="title">
        <h1 class="box-title">{{title}}</h1>
      </div>
      <div class="box-body">
        <slot />
      </div>
    </div>
  </template>
  <script>
      module.exports = {props: ['title', 'type']};
  </script>
</subcomponent>

<subcomponent name="row">
  <template>
    <div class="row">
      <slot />
    </div>
  </template>
</subcomponent>

<subcomponent name="form-group">
    <!-- TODO: label for="..." -->
    <template>
        <div :class="`col-md-${width} col-sm-12`">
            <div :class="`form-group ${required == 'no' ? '' : 'required'}`">
                <label class="control-label">
                    {{label}}
                </label>
                <slot/> 
            </div>
        </div>
    </template>
    <script>
        module.exports = {
            props: {
                width: {default: 12},
                label: {required: true},
                required: {default: 'no'}
            }
        };
    </script>
    <style scoped>
     label { color: darkgray; }
    </style>
</subcomponent>

<template>
  <main-layout :user="user" title="Edit Household" current_section="households">
    <div class="container-fluid">
      <box type="primary" title="Head of Household Information">
        <row>
          <form-group width="6" label="First Name" required>
            <input type="text" class="form-control" id="name-first" v-model="household.name_first">
          </form-group> 
          <form-group width="6" label="Last Name" required>
              <input type="text" class="form-control" id="name-last" v-model="household.name_last">
          </form-group>
        </row>

        <row>
          <form-group width="4" label="Gender" required>
              <select class="form-control" id="gender" v-model="household.gender" name="gender">
                   <option value="" selected="selected">==== Select ====</option>
                   <option value="M">Male</option>
                   <option value="F">Female</option>
              </select>
          </form-group>
          <form-group width="4" label="Date of Birth" required>
              <input class="form-control" v-model="household.dob" name="dob" type="date" id="dob">
          </form-group>
          <form-group width="4" label="Last four digits of SSN" required>
              <input class="form-control" type="number" v-model="household.last4ssn">
          </form-group>
        </row>

        <row>
          <form-group width="4" label="Email">
              <input class="form-control" type="email" v-model="household.email">
          </form-group>
          <form-group width="4" label="Preferred Contact Method">
              <select class="form-control" v-model="household.preferred_contact_method"> 
                 <option value="" selected="selected">==== Select ====</option>
                 <option value="email">E-Mail</option>
                 <option value="text">Text</option>
                 <option value="mail">Phone</option>
            </select>
          </form-group>
          <form-group width="4" label="Ethnicity" required>
              <select class="form-control" id="race" v-model="household.race" name="race">
                 <option value="">==== Select ====</option>
                 <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                 <option value="Asian">Asian</option>
                 <option value="African American">African American</option>
                 <option value="Hispanic">Hispanic</option>
                 <option value="Pacific Islander">Pacific Islander</option>
                 <option value="White">White</option>
                 <option value="Other">Other</option>
            </select>
          </form-group>
        </row>
      </box>

      <box type="danger" title="Delivery Address">
        <row v-for="address in household.address" key="address.id">
          <form-group label="Type">
            <select class="form-control" v-model="address.type">
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </form-group>
          <form-group label="Street Address" required>
            <input class="form-control street-address" type="text" v-model="address.address_street" v-on:blur="address_on_blur">
          </form-group>
          <form-group label="Street Address 2">
            <input class="form-control" type="text" v-model="address.address_street2">
          </form-group>
          <form-group label="City" required>
            <input class="form-control" type="text" v-model="address.address_city">
          </form-group>
          <form-group label="State" required>
            <input class="form-control" type="text" v-model="address.address_state">
          </form-group>
          <form-group label="ZIP Code" required>
            <input class="form-control" type="text" v-model="address.address_zip">
          </form-group>
          
          <!--TODO  @if (Auth::user()->hasRole('admin')) -->
          <form-group label="CMPD Division">
            <input class="form-control" type="text" v-model="address.cmpd_division">
          </form-group>
          <form-group label="CMPD Response Area">
            <input class="form-control" type="text" v-model="address.cmpd_response_area">
          </form-group>
          <!--TODO  @endif -->
          <hr>
        </row>
      </box>

      <box type="danger" title="Phone Numbers">
        <row v-for="phone in household.phone" key="phone.id">
          <form-group label="Type" required>
            <select class="form-control" v-model="phone.phone_type">
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Mobile</option>
            </select>
          </form-group>
          <form-group label="Phone" required>
            <input class="form-control" type="text" v-model="phone.phone_number">
          </form-group>
        </row>

        <div class="col-xs-12">
          <button class="btn addbtn" v-on:click="addPhone">Add Phone</button>
          <button class="btn btn-danger" v-on:click="removePhone">Remove Phone</button>
        </div>
      </box>

      <box v-for="record in household.child"
           key="record.id"
           :title="`Child ${$index+1} - ${record.name_first} ${record.name_last}`">
        <row>
          <form-group label="First Name" required> 
              <input class="form-control" type="text" v-model="record.name_first">
          </form-group>
          <form-group label="Last Name" required>
            <input class="form-control" type="text" v-model="record.name_last">
          </form-group>
        </row>

        <row>
          <form-group width="2" label="Gender" required>
            <select class="form-control" v-model="record.gender" name="gender">
              <option value="">==== Select ====</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </form-group>
          <form-group width="3" label="Ethnicity" required>
            <select class="form-control" id="race" v-model="record.race" name="race">
              <option value="">==== Select ====</option>
              <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
              <option value="Asian">Asian</option>
              <option value="African American">African American</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Pacific Islander">Pacific Islander</option>
              <option value="White">White</option>
              <option value="Other">Other</option>
            </select>
          </form-group>
          <form-group width="3" label="Last four digits of SSN" required>
            <input class="form-control" type="text" v-model="record.last4ssn">
          </form-group>
          <form-group width="4" label="Child receives free or reduced lunch?" required>
            <select class="form-control" v-model="record.free_or_reduced_lunch">
              <option value="">==== Select ====</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </form-group>
        </row>

        <row>
          <form-group label="Date of Birth" required>
              <!- <input class="form-control" v-model="record.dob" type="date">
          </form-group>
          <form-group label="School Name" required>
              <select class="form-control" v-model="record.school_id">
                 <option :value='school.id' v-for='school in schools'>
                   {{ school.name }}
                 </option>
            </select>
          </form-group>
        </row>

        <row>
          <div class="col-xs-12">
            <div class="form-group"> 
                <input type="checkbox" v-bind:true-value="'Y'" v-bind:false-value="'N'" v-model="record.bike_want">&nbsp;Child wants bike?</input>
            </div>
          </div>
        </row>

        <template v-if="record.bike_want">
          <row>
            <form-group label="Bike style" required>
                <select class="form-control" v-model="record.bike_style">
                   <option value="">==== Select ====</option>
                   <option value="Tricycle">Tricycle</option>
                   <option value="Mountain">Mountain Bike</option>
                   <option value="BMX">BMX Bike</option>
              </select>
            </form-group>
          </row>

          <row>
            <form-group label="Bike size" required>
                <select class="form-control" v-model="record.bike_size">
                   <option value="">==== Select ====</option>
                   <option value="Tricycle">Tricycle</option>
                   <option value='12” Bicycle'>12” Bicycle</option>
                   <option value='16” Bicycle'>16” Bicycle</option>
                   <option value='20” Coaster Brake Bicycle'>20” Coaster Brake Bicycle</option>
                   <option value='20” Geared Bicycle'>20” Geared Bicycle</option>
                   <option value='24” Geared Bicycle'>24” Geared Bicycle</option>
              </select>

              <p><a href="https://www.performancebike.com/images/performance/web/PDFs/09_GrowthGuarantee_handout_Chart.pdf" target="_blank">
                  Not sure? Click for size guide.
              </a></p>
            </form-group>
          </row>
        </template>

        <row>
          <div class="col-xs-12">
            <div class="form-group">
                <input type="checkbox" v-bind:true-value="'Y'" v-bind:false-value="'N'" v-model="record.clothes_want">
                  Child wants clothes?
                  </input>
            </div>
          </div>
        </row>

        <template v-if="record.clothes_want">
          <row>
            <form-group label="Shirt size">
                <input class="form-control" type="text" v-model="record.clothes_size_shirt">
            </form-group>
          </row>
          <row>
            <form-group label="Pants size">
                <input class="form-control" type="text" v-model="record.clothes_size_pants">
            </form-group>
          </row>
          <row>
            <form-group label="Shoe size">
                <input class="form-control" type="text" v-model="record.shoe_size">
            </form-group>
          </row>
        </template>

        <row>
          <form-group label="Favorite color">
              <input class="form-control" type="text" v-model="record.favourite_colour">
            <!-- TODO: fix the english / american spelling difference -->
          </form-group>
        </row>

        <row>
          <form-group label="Child's interests">
            <textarea class="form-control" cols="50" rows="10" v-model="record.interests"></textarea>
          </form-group>
        </row>

        <row>
          <form-group label="Additional ideas">
            <textarea class="form-control" cols="50" rows="10" v-model="record.additional_ideas"></textarea>
          </form-group>
        </row>

        <row>
          <form-group label="Reason for nomination" required>
            <textarea class="form-control" cols="50" rows="10" v-model="record.reason_for_nomination"></textarea>
          </form-group>
        </row>

      </box>
    
      <box>
          <button class="btn addbtn" v-on:click="addChild">Add Child</button>
          <button class="btn btn-danger" v-on:click="removeChild">Remove Child</button>
      </box>

      <box v-show="!household.id">
        Please save the nomination as a draft before uploading a file.
      </box>

      <box type="danger" title="Scanned Forms"v-if="household.id">
        <row>
          <div class="col-md-12 col-sm-12">
            <label class="control-label">Existing Files</label>
            <div v-for="attachment in household.attachment">
              <span class="filename">
                <a :href="`/admin/household_attachment/${attachment.id}`">
                  {{ attachment.path.split('_')[1] }}
                </a>
              </span>
            </div>
            <div v-for="file_name in uploading_forms">
              <span class="filename">
                {{ file_name }} (uploading...)
              </span>
            </div>
          </div>
        </row>
        <row>
          <form-group label="Upload File">
            <input type="file" class="form-control" v-on:blur="upload_form_file">
          </form-group>
        </row>
      </box>

      <box>
        <button class="btn addbtn" v-show="household.draft" v-on:click="doSave(true)" :disabled="loading || saving">Save Draft</button>
        <button class="btn addbtn" v-show="household.draft && household.id" v-on:click="doSave(false)" :disabled="loading || saving">Submit Nomination</button>
        <button class="btn addbtn" v-show="household.draft" v-on:click="doSave(false)" :disabled="loading || saving">Update</button>
        <i v-show="saving" class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        <span v-show="showSavedMessage">Saved!</span>
      </box>
    </div>
  </main-layout>
</template>

<script>
    /* eslint-env browser */
    /* global $ */ // TODO: get rid of jquery use
    module.exports = {
        props: {
            user: {required: true},
            household: {
                default: {
                    phone: [],
                    address: [{}],
                    child: [],
                    attachment: []
                }
            },
            schools: {default: []}
        },
        data: () => ({
            loading: false,
            saving: false,
            showSavedMessage: false,
            uploading_forms: []
        }),
        methods: {

            upload_form_file: function (e) {
                var file = e.target.files[0];
                if (!file) {
                    return;
                }
                var file_name = file.name;
                var data = new FormData();
                data.set('file', file);
                data.set('household_id', this.household.id);
                this.uploading_forms.push(file_name);
                $(e.target).val('');
                var self = this;
                var fail = function (msg) {
                    msg = 'Error uploading file \'' + file_name + '\': ' + msg;
                    alert(msg); // TODO: don't use alert
                    self.uploading_forms.$remove(file_name);
                };
                $.ajax({
                    url: '/api/upload_household_form_file',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                    type: 'POST',
                    success: function (res) {
                        if (res.ok) {
                            self.uploading_forms.$remove(file_name);
                            self.household.attachment.push({path: res.path, id: res.id});
                        } else {
                            fail(res.error || 'unknown error');
                        }
                    },
                    error: function (xhr, type, errmsg) {
                        fail(type + ': ' + errmsg);
                    }
                });
            },
            address_on_blur: function (e) {
                // TOOD: load google maps
                var geocoder = new google.maps.Geocoder();
                var mapping = {
                    locality: 'address_city',
                    administrative_area_level_1: 'address_state',
                    postal_code: 'address_zip'
                };
                var request = {
                    'address': e.target.value,
                    'region': 'US',
                    'componentRestrictions': {'administrativeArea': 'North Carolina'}
                };

                var self = this;
                geocoder.geocode(
          request,
          function (results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                  var addressElements = results[0].address_components;

                  //due to the componentRestrictions parameter in the request,
                  //even if the address is invalid, the response always has appended
                  //the state and the country.
                  if (addressElements.length < 3) {
                      $('#errorMsg').modal(); // TODO: better error message
                      return;
                  }
              /// at this point:
                // addressElements = {
                //   "locality" : "...city...",
                //   "administrative_area_level_1": "...state...",
                //   "postal_code": "...", ... }

                  var address_index = $(e.target).parentsUntil('.box').last().parent().prevAll().length;
                  for (var i in addressElements) {
                      var type = mapping[addressElements[i].types[0]];
                      if (type) {
                          var update = {};
                          update[type] = addressElements[i].long_name;
                          self.household.address.$set(0, Object.assign({}, self.household.address[0], update));

                      }
                  }
                  populate_cmpd_info(results[0].geometry.location, address_index);
              } else {
                  $('#errorMsg').modal();
              }
          }
        );
        //

                var populate_cmpd_info = function (location) {
                    $.ajax({
                        url: '/api/cmpd_info',
                        data: {lat: location.lat(), lng: location.lng()},
                        success: function (info) {
                            if (info.error) {
                // TODO: maybe don't ignore errors
                            } else {
                                self.household.address[0].cmpd_division = info.division;
                                self.household.address[0].cmpd_response_area = info.response_area;
                            }
                        },
                        error: function () {
                        // TODO: maybe don't ignore errors
                        }
                    });
                };
            },

            addAddress: function () {
                this.household.address.push (
                    {
                        type: '',
                        address_street: '',
                        address_street2: '',
                        address_city: '',
                        address_state: '',
                        address_zip: '',
                        cmpd_division: '',
                        response_area: ''
                    }
        );
            },
            removeAddress: function () {
                this.household.address.pop();
            },

            addPhone: function () {
                this.household.phone.push({
                    phone_type: '',
                    phone_number: ''
                });
            },

            removePhone: function () {
                this.household.phone.pop();
            },

            addChild: function () {
                this.household.child.push({});
            },
            removeChild: function () {
                this.household.child.pop();
            },

            doSave: function (draft) {
                if (this.saving === true) {
                    return;
                } // Already in the middle of saving >:(
                this.showSavedMessage = false;
                this.saving = true;

                // Refuse to submit if required fields are empty, and highlight missing fields
                // Mark a field as required by adding the `required' class to the containing `form-group'
                var missing = false;
                $('.form-group.required input, .form-group.required select, .form-group.required textarea').each(function (i, el) {
                    if (!$(el).val()) {
                        missing = true;
                        $(el).addClass('missing-field');
                    } else {
                        $(el).removeClass('missing-field');
                    }
                });
                if (!draft && missing) { // Don't require all fields if it's only a draft...
                    this.saving = false;
                    // TODO: don't alert
                    alert('Please enter all of the required fields before submitting your nomination.');
                    return;
                }

                var id = (typeof this.household.id !== 'undefined') ? this.household.id : null;

                var urlSuffix = id === null ? '/' + id : '';
                var url = '/api/household' + urlSuffix;
                var self = this;
                this.household.draft = (draft === true) ? 'Y' : 'N';
                if (id === null) {
                    this.household.nomination_email_sent = (draft !== true) ? 'Y' : 'N';
                }
                var method = (id !== null) ? 'PUT' : 'POST';

                $.ajax({
                    url: url,
                    method: method,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(self.household),
                    headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                    success: function (data) {
                        self.saving = false;
                        if (data.ok) {
                            self.household = data.household[0];
                            self.showSavedMessage = true;
                        } else if (!data.ok && typeof data.message !== 'undefined') {
                            alert(data.message); // TODO: don't use alert
                        } else {
                            // TODO: don't use alert
                            alert('Could not create nomination');
                        }
                    },
                    error: function (_errMsg) {
                        self.saving = false;
                        // TODO: don't use alert
                        alert('Unexpected error. Please review your form for missing or invalid fields,'
                              + 'try again later or contact an administrator');
                    }
                });

            },

            doNothing: function () {
            },

            fetchRecord: function (id) {
                var self = this;
                self.loading = true;
                $('#loading_overlay').show();
                $.get('/api/household/' + id, {}, function (e) {
                    self.loading = false;
                    self.household = e[0];
                    $('#loading_overlay').hide();
                });
            }

        }
    };

    // TODO: google maps
    // script src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&language=en" /script


</script>
