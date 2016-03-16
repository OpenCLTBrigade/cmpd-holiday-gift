@extends('layouts.admin')

@section('content')
		<div class="row">
			<div class="box-profile col-md-4"></div>
			<div class="box-profile col-md-4">
				<h3 class="profile-username text-center">
					{{ $object->name_first }}  {{ $object->name_last  }} 
				</h3>
				<p class="text-muted text-center">{{ $object->rank }} </p>
				<ul class="list-group list-group-unbordered">
					<li class="list-group-item">
					  <b>Mail</b> <a class="pull-right" href="mailto:{{ $object->email }}">{{ $object->email  }}</a>
					</li>
				  </ul>
			</div>
			<div class="box-profile col-md-4"></div>
		</div>
@endsection
