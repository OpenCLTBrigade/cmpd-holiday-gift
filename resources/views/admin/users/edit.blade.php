@extends('layouts.admin')

@section('content')
    @if (Auth::User()->hasRole("admin"))
    <p>
      <b>Note: </b> When creating a new user they will need to be activated from the
      <a href="{{route('admin.user.pending')}}">pending registrations</a> screen.
    </p>
    @endif
    {!! form($form) !!}
    @include('partials.admin.file', ['file'=> $object->picture])
@endsection
