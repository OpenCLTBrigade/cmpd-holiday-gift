@extends('layouts.auth')
@inject('affModel', 'App\Affiliation')

@section('title')
    {{ trans('auth.register.title') }} | {{ trans('admin.title') }}
@stop

@section('content')

    <div class="login-box" id="login-box">
        <div class="header">
            <i class="fa fa-user-plus"></i> {{ trans('auth.register.title') }}
        </div>

        {!! Form::open(['method' => 'POST', 'route' => 'auth.register']) !!}

        <div class="body">
            @include('errors.validation')
            <div class="form-group has-feedback">
                {!! Form::label('name_first', trans('auth.register.name_first')) !!}
                {!! Form::text('name_first', null, ['class' => 'form-control']) !!}
                <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('name_last', trans('auth.register.name_last')) !!}
                {!! Form::text('name_last', null, ['class' => 'form-control']) !!}
                <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('affiliation', trans('auth.register.affiliation')) !!}
                {!! Form::select('affiliation_id', $affModel::parseAffiliationsIntoSelectArray(), null,  ['class' => 'form-control' ]) !!}
                <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('Rank / Position', trans('auth.register.rank')) !!}
                {!! Form::text('rank', null, ['class' => 'form-control']) !!}
                <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('phone', trans('auth.register.phone')) !!}
                {!! Form::text('phone', null, ['class' => 'form-control']) !!}
                <i class="fa fa-phone form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('email', trans('auth.register.email')) !!}
                {!! Form::text('email', null, ['class' => 'form-control']) !!}
                <i class="fa fa-envelope form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('password', trans('auth.register.password')) !!}
                {!! Form::password('password', ['class' => 'form-control']) !!}
                <i class="fa fa-lock form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                {!! Form::label('password_confirmation', trans('auth.register.password_confirmation')) !!}
                {!! Form::password('password_confirmation', ['class' => 'form-control']) !!}
                <i class="fa fa-lock form-control-feedback"></i>
            </div>
        </div>

        <div class="footer">
            {!! Form::submit(trans('auth.register.submit'), ['class' => 'btn bg-auth btn-block btn-flat']) !!}
            <hr/>
            <div class="row">
                <div class="col-xs-6">
                    <a class="btn btn-link" href="{{ route('auth.login') }}"> <i class="fa fa-sign-in"></i> {{ trans('auth.login.submit') }}</a>
                </div>
            </div>
        </div>

        {!!  Form::close() !!}
    </div>

@endsection