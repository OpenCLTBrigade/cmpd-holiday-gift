@extends('layouts.admin')

@section('content')
		<div class="row">
      <div class="box-profile col-xs-12">
        <h3 class="profile-username text-center">
          {{ $object->name_first }}  {{ $object->name_last  }}
        </h3>
        <!-- Left side -->
        <div class="box-profile col-md-6">
          <ul class="list-group list-group-unbordered">
            <li class="list-group-item"><b>Mail</b> <span class="pull-right">{{ $object->email  }}</span></li>
            <li class="list-group-item"><b>Gender</b> <span class="pull-right">{{ $object->gender }}</span></li>
            <li class="list-group-item"><b>Date of Birth</b> <span class="pull-right">{{ $object->dob }}</span></li>
            <li class="list-group-item"><b>Last 4 SSN</b> <span class="pull-right">{{ $object->last4ssn }}</span></li>
            <li class="list-group-item"><b>Preferred Contact Method</b> <span class="pull-right">{{ $object->preferred_contact_method }}</span></li>
          </ul>
        </div>
        <!-- Right side -->
        <div class="box-profile col-md-6">
          <div class="box-profile col-md-12">
            @foreach ($object->address as $address)
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item"><b>Address Street</b><span class="pull-right">{{$address->address_street}}</span></li>
                <li class="list-group-item"><b>Address Street 2</b><span class="pull-right">{{$address->address_street2}}</span></li>
                <li class="list-group-item"><b>City</b><span class="pull-right">{{$address->address_city}}</span></li>
                <li class="list-group-item"><b>State</b><span class="pull-right">{{$address->address_state}}</span></li>
                <li class="list-group-item"><b>Zip</b><span class="pull-right">{{$address->address_zip}}</span></li>
              </ul>
            @endforeach
            @foreach ($object->phone as $household_phone)
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item"><b>Contact ({{$household_phone->phone_type}})</b> <span class="pull-right">{{$household_phone->phone_number}}</span></li>
              </ul>
            @endforeach
          </div>
        </div>
      </div>
		</div>
    <div class="row">
      <div class="box-profile col-xs-12">
            <!-- Loop that will list all known value in the ChildController -->
            <h3 class="profile-username text-center">Child/Children</h3>
            @foreach ($object->child as $child)
            <div class="box-profile col-md-6">
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item"><b>First Name</b><span class="pull-right">{{$child->name_first}}</span></li>
                <li class="list-group-item"><b>Middle Name</b><span class="pull-right">{{$child->name_middle}}</span></li>
                <li class="list-group-item"><b>Last Name</b><span class="pull-right">{{$child->name_last}}</span></li>
                <li class="list-group-item"><b>Date of Birth</b><span class="pull-right">{{$child->dob}}</span></li>
								<li class="list-group-item"><b>Age</b><span class="pull-right">{{$child->age}}</span></li>
                <li class="list-group-item"><b>Ethnicity</b><span class="pull-right">{{$child->race}}</span></li>
                <li class="list-group-item"><b>Last 4 SSN</b><span class="pull-right">{{$child->last4ssn}}</span></li>
                <li class="list-group-item"><b>Free or Reduced Lunch</b><span class="pull-right">{{$child->free_or_reduced_lunch}}</span></li>
                <li class="list-group-item">
                  <b>Reason for Nomination</b>
                  <p>
                    {{$child->reason_for_nomination}}
                  </p>
                </li>
                <li class="list-group-item"><b>School Name</b><span class="pull-right">{{$child->school_name}}</span></li>
                <li class="list-group-item"><b>School Address</b><span class="pull-right">{{$child->school_address}}</span></li>
                <li class="list-group-item"><b>School Address 2</b><span class="pull-right">{{$child->school_address2}}</span></li>
                <li class="list-group-item"><b>School City</b><span class="pull-right">{{$child->school_city}}</span></li>
                <li class="list-group-item"><b>School State</b><span class="pull-right">{{$child->school_state}}</span></li>
                <li class="list-group-item"><b>School Zip</b><span class="pull-right">{{$child->school_zip}}</span></li>
                <li class="list-group-item"><b>School Phone</b><span class="pull-right">{{$child->school_phone}}</span></li>
                <li class="list-group-item">
                  <b>Bike? </b>
                  <span class="pull-right">
                    @if ($child->bike_want == "Y")
                      Yes
                    @else
                      No
                    @endif
                  </span>
                </li>
                @if ($child->bike_want == "Y")
                <li class="list-group-item"><b>Bike Size</b><span class="pull-right">{{$child->bike_size}}</span></li>
                <li class="list-group-item"><b>Bike Style</b><span class="pull-right">{{$child->bike_style}}</span></li>
                @endif
                <li class="list-group-item">
                  <b>Clothes?</b>
                  <span class="pull-right">
                    @if ($child->clothes_want == "Y")
                      Yes
                    @else
                      No
                    @endif
                  </span>
                </li>
                @if ($child->clothes_want)
                <li class="list-group-item"><b>Shirt Size</b><span class="pull-right">{{$child->clothes_size_shirt}}</span></li>
                <li class="list-group-item"><b>Pants Size</b><span class="pull-right">{{$child->clothes_pants_size}}</span></li>
                <li class="list-group-item"><b>Shoe Size</b><span class="pull-right">{{$child->shoe_size}}</span></li>
                <li class="list-group-item"><b>Favorite Color</b><span class="pull-right">{{$child->favorite_color}}</span></li>
                @endif
                <li class="list-group-item">
                  <b>Interests</b>
                  <p>
                    {{$child->interests}}
                  </p>
                </li>
                <li class="list-group-item">
                  <b>Additional Ideas</b>
                  <p>
                    {{$child->additional_ideas}}
                  </p>
                </li>
              </ul>
            </div>
            @endforeach
      </div>
    </div>
@endsection
