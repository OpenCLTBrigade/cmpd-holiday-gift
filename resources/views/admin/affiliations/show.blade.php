@extends('layouts.admin')

@section('content')
<div class="row">
    <div class="col-md-12">
        <h3 class="profile-username text-left text-bold">
            {{$affiliation->type}} - {{$affiliation->name}}
        </h3>
    </div>
</div>

<div class="row">
    <div class="box-profile col-md-6">

        <ul class="list-group list-group-unbordered">

            <li class="list-group-item" style="height:100px;">
                <b>Address</b>
                <a class="pull-right">
                    {{ $affiliation->address_street }}
                    @if ($affiliation->address_street2)
                        <br/>
                        {{ $affiliation->address_street2 }}
                    @endif
                    <br/>
                    {{$affiliation->address_city}}, {{$affiliation->address_state}},<br/>
                    {{$affiliation->address_zip}}
                </a>
            </li>
        </ul>
    </div>

    <div class="box-profile col-md-6">

        <ul class="list-group list-group-unbordered">

            <li class="list-group-item">
                <b>Phone Number</b> <a class="pull-right">{{ $affiliation->phone }}</a>
            </li>
        </ul>

    </div>
</div>

<div class="row">
   <div class="col-md-12">
        <h3 class="profile-username text-left text-bold">
            Users
        </h3>

        <ul class="list-group list-group-unbordered">
            @if (count($users) )
                <table class="table table-striped table-responsive">
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </thead>
                    <tbody>
                    @foreach ($users as $user)
                        <tr>
                            <td>{{$user->name_first}} {{$user->name_last}}</td>
                            <td>
                                <a href="mailto:{{ $user->email }}">
                                    {{ $user->email  }}
                                </a>
                            </td>
                            <td>{{$user->phone}}</td>
                            <td style="text-align:right;">
                                <a href="{{route('admin.user.show', ['id' => $user->id])}}" class="btn btn-xs bg-navy">
                                    <i class="fa fa-search"></i>
                                    Show
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @else
                No users found
            @endif
        </ul>
    </div>
</div>
@endsection
