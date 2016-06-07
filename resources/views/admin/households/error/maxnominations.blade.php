@extends('layouts.admin')

@section('content')
<h2>
    You have reached the maximum number of nominations you are allowed for this year.
</h2>

<h3><a href="{{route('admin.household.index')}}">Manage Nominations</a></h3>
@endsection
