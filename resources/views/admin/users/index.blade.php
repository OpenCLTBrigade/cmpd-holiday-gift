@extends('layouts.admin')

@section('content')

  <div class="row">
    <div class="col-md-3">
      Name
    </div>
    <div class="col-md-3">
      Role
    </div>
    <div class="col-md-3">
      Affiliation
    </div>
    <div class="col-md-3">
      Actions
    </div>
  </div>
  @foreach ($users as $user)
  <div class="row">
    <div class="col-md-3">
      {{ $user->name_first.' '.$user->name_first }}
    </div>
    <div class="col-md-3">
      {{ $user->roles[0]->display_name }}
    </div>
    <div class="col-md-3">
      {{ $user->affiliation['type'].' - '.$user->affiliation['name'] }}
    </div>
    <div class="col-md-3">
      <a class="btn btn-xs bg-navy" href="{{ route('admin.user.show', $user->id) }}"><i class="fa fa-search"></i>Show</a>
      <a class="btn btn-xs bg-green" href="{{ route('admin.user.edit', $user->id) }}"><i class="fa fa-pencil-square-o"></i>Edit</a>
      @if ($user->active == 'N')
        <a class="btn btn-xs bg-red" href="{{ route('admin.user.toggleActive', $user->id) }}"><i class="fa fa-pencil-square-o"></i>Activate</a>
      @endif
    </div>
  </div>

  @endforeach
{{ $users->render() }}
@endsection
