@extends('layouts.admin')

@section('content')
		<div class="row">
			<div class="box-profile col-md-4"></div>
			<div class="box-profile col-md-4">
				<h3 class="profile-username text-center">
					{{ $object->name_first }}  {{ $object->name_last }}
				</h3>
				<p class="text-muted text-center">{{ $object->rank }} </p>
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
					  <b>Mail</b> <a class="pull-right" href="mailto:{{ $object->email }}">{{ $object->email  }}</a>
					</li>
          <li class="list-group-item">
            <b>Gender</b> <a class="pull-right" href="genderto:{{ $object->gender }}">{{ $object->gender }}</a>
          </li>
          <li class="list-group-item">
            <b>Date of Birth</b> <a class="pull-right" href="dobto:{{ $object->dob }}">{{ $object->dob }}</a>
          </li>
          <li class="list-group-item">
            <b>Last 4 SSN</b> <a class="pull-right" href="last4ssnto:{{ $object->last4ssn }}">{{ $object->last4ssn }}</a>
          </li>
				</ul>
        <ul class="list-group list-group-unbordered">
            @foreach ($object->address as $address)
              <li class="list-group-item">
                <b>Address Street</b> <a class="pull-right">{{$address->address_street}}</a>
              </li>
              <li class="list-group-item">
                <b>Address Street 2</b> <a class="pull-right">{{$address->address_street2}}</a>
              </li>
              <li class="list-group-item">
                <b>City</b> <a class="pull-right">{{$address->address_city}}</a>
              </li>
              <li class="list-group-item">
                <b>State</b> <a class="pull-right">{{$address->address_state}}</a>
              </li>
              <li class="list-group-item">
                <b>Zip</b> <a class="pull-right">{{$address->address_zip}}</a>
              </li>
            @endforeach
			</div>
			<div class="box-profile col-md-4"></div>
		</div>

@endsection
