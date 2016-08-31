@extends('layouts.admin')

@section('content')
  @if (Auth::User()->hasRole("admin"))
  <p>
    <b>Note: </b> After creating a new user they will need to be activated from the
    <a href="{{route('admin.user.pending')}}">pending registrations</a> screen.
  </p>
  @endif
  {!! form($form) !!}
@endsection