@extends('layouts.admin', ['no_boxes' => true])

@section('content')
    @if (Auth::user()->hasRole('admin'))
    <section class="content">
        <div class="col-xs-12 col-md-6">
            <div class="box">
                <div class="box-header with-border">
                    <h1 class="box-title">
                        Quick Overview
                    </h1>
                </div>
                <div class="box-body">
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <td>
                                    Accounts pending approval
                                </td>
                                <td>
                                    {{ $accounts_pending_approval }}
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-default" onclick="window.location='/admin/user/pending'">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                            {{-- TODO Waiting for #30
                            <tr>
                                <td>
                                    Nominations Pending Review
                                </td>
                                <td>
                                    --
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-default" onclick="window.location='/admin/household'">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nominations approved / reviewed
                                </td>
                                <td colspan="2">
                                    -- / --
                                </td>
                            </tr>--}}
                            <tr>
                                <td>
                                    Incomplete drafts
                                </td>
                                <td colspan="2">
                                    {{$drafts}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="box">
                <div class="box-header with-border">
                    <h1 class="box-title">
                        Reports
                    </h1>
                </div>
                <div class="box-body">
                  <ul>
                    <li> <a href="{{ url('/api/export_data_excel') }}">Export data into Excel</a>
                  </ul>
                </div>
            </div>
        </div>

    </section>
    @endif {{--Admins only--}}
@endsection
