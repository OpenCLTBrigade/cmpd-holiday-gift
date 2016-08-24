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
            <li class="list-group-item "><b>Mail</b> <a class="pull-right" href="mailto:{{ $object->email }}">{{ $object->email  }}</a></li>
            <li class="list-group-item "><b>Gender</b> <a class="pull-right" href="genderto:{{ $object->gender }}">{{ $object->gender }}</a></li>
            <li class="list-group-item "><b>Date of Birth</b> <a class="pull-right" href="dobto:{{ $object->dob }}">{{ $object->dob }}</a></li>
            <li class="list-group-item "><b>Last 4 SSN</b> <a class="pull-right" href="last4ssnto:{{ $object->last4ssn }}">{{ $object->last4ssn }}</a></li>
            <li class="list-group-item "><b>Preferred Contact Method</b> <a class="pull-right" href="preferred_contact_methodto:{{ $object->preferred_contact_method }}">{{ $object->preferred_contact_method }}</a></li>
          </ul>
        </div>
        <!-- Right side -->
        <div class="box-profile col-md-6">
          <div class="box-profile col-md-12">
            @foreach ($object->address as $address)
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item"><b>Address Street</b><a class="pull-right">{{$address->address_street}}</a></li>
                <li class="list-group-item"><b>Address Street 2</b><a class="pull-right">{{$address->address_street2}}</a></li>
                <li class="list-group-item"><b>City</b><a class="pull-right">{{$address->address_city}}</a></li>
                <li class="list-group-item"><b>State</b><a class="pull-right">{{$address->address_state}}</a></li>
                <li class="list-group-item"><b>Zip</b><a class="pull-right">{{$address->address_zip}}</a></li>
              </ul>
            @endforeach
            @foreach ($object->phone as $household_phone)
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item"><b>Type</b> <a class="pull-right">{{$household_phone->phone_type}}</a></li>
                <li class="list-group-item"><b>Number</b> <a class="pull-right">{{$household_phone->phone_number}}</a></li>
              </ul>
            @endforeach
          </div>
        </div>
      </div>
		</div>
    <div class="row">
      <div class="box-profile col-xs-12">
            <!-- Loop that will list all known value in the ChildController -->
            <!-- Temporary fix -->
            <h3 class="profile-username text-center">Child/Children</h3>
            @foreach ($object->child as $child)
            <div class="box-profile col-md-6">
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item"><b>First Name</b><a class="pull-right">{{$child->name_first}}</a></li>
                <li class="list-group-item"><b>Middle Name</b><a class="pull-right">{{$child->name_middle}}</a></li>
                <li class="list-group-item"><b>Last Name</b><a class="pull-right">{{$child->name_last}}</a></li>
                <li class="list-group-item"><b>Date of Birth</b><a class="pull-right">{{$child->dob}}</a></li>
                <li class="list-group-item"><b>Race</b><a class="pull-right">{{$child->race}}</a></li>
                <li class="list-group-item"><b>Last 4 SSN</b><a class="pull-right">{{$child->last4ssn}}</a></li>
                <li class="list-group-item"><b>Free or Reduced Lunch</b><a class="pull-right">{{$child->free_or_reduced_lunch}}</a></li>
                <li class="list-group-item"><b>Reason for Nomination</b><a class="pull-right">{{$child->reason_for_nomination}}</a></li>
                <li class="list-group-item"><b>School Name</b><a class="pull-right">{{$child->school_name}}</a></li>
                <li class="list-group-item"><b>School Address</b><a class="pull-right">{{$child->school_address}}</a></li>
                <li class="list-group-item"><b>School Address 2</b><a class="pull-right">{{$child->school_address2}}</a></li>
                <li class="list-group-item"><b>School City</b><a class="pull-right">{{$child->school_city}}</a></li>
                <li class="list-group-item"><b>School State</b><a class="pull-right">{{$child->school_state}}</a></li>
                <li class="list-group-item"><b>School Zip</b><a class="pull-right">{{$child->school_zip}}</a></li>
                <li class="list-group-item"><b>School Phone</b><a class="pull-right">{{$child->school_phone}}</a></li>
                <li class="list-group-item"><b>Bike Want</b><a class="pull-right">{{$child->bike_want}}</a></li>
                <li class="list-group-item"><b>Bike Size</b><a class="pull-right">{{$child->bike_size}}</a></li>
                <li class="list-group-item"><b>Bike Style</b><a class="pull-right">{{$child->bike_style}}</a></li>
                <li class="list-group-item"><b>Clothes Want</b><a class="pull-right">{{$child->clothes_want}}</a></li>
                <li class="list-group-item"><b>Shirt Size</b><a class="pull-right">{{$child->clothes_size_shirt}}</a></li>
                <li class="list-group-item"><b>Pants Size</b><a class="pull-right">{{$child->clothes_pants_size}}</a></li>
                <li class="list-group-item"><b>Shoe Size</b><a class="pull-right">{{$child->shoe_size}}</a></li>
                <li class="list-group-item"><b>Favorite Color</b><a class="pull-right">{{$child->favorite_color}}</a></li>
                <li class="list-group-item"><b>Interests</b><a class="pull-right">{{$child->interests}}</a></li>
                <li class="list-group-item"><b>Additional Ideas</b><a class="pull-right">{{$child->additional_ideas}}</a></li>
              </ul>
            </div>
            @endforeach
      </div>
    </div>
@endsection
