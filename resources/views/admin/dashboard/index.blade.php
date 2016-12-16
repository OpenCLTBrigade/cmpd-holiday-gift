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
                            <tr>
                                <td>
                                    Nominations Pending Review
                                </td>
                                <td>
                                    {{ $nominations_pending_review }}
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
                                    {{ $nominations_approved }} / {{ $nominations_reviewed }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Children (approved / reviewed / pending)
                                </td>
                                <td colspan="2">
                                    {{ $children_approved }} / {{ $children_reviewed }} / {{ $children_pending }}
                                </td>
                            </tr>
                            @foreach ($orgs as $org)
                            <tr>
                                <td>
                                    Nominations from {{ strtoupper($org->type) }}
                                </td>
                                <td colspan="2">
                                  {{ $org->approved }} / {{ $org->reviewed }} / {{ $org->pending }}
                                </td>
                            </tr>
                            @endforeach
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
                    <li> <a href="{{ url('/api/bike_report') }}">Bike report</a>
                    <li> <a href="{{ url('/api/division_report') }}">Division report</a>
                    <li> <a href="{{ url('/api/link_report') }}">The Link report</a>
                  </ul>
                </div>
            </div>
            <div class="box">
                <div class="box-header with-border">
                    <h1 class="box-title">
                      Packing Slips
                    </h1>
                </div>
                <div class="box-body">
                  <ul>
                    <li> <a href="{{ url('/admin/packing_slips') }}">All Approved Households</a>
                    {{--<li> <a href="{{ url('/admin/packing_slips?after=') }}">New and Updated Households since</a> <input type="text" name="packing_slips_after" id="packing_slips_after"/> --}}
                    <li> <a href="{{ url('/admin/packing_slip_config') }}">Set custom fields</a>
                  </ul>
                </div>
                {{--<script>
                  $('#packing_slips_after').blur(function(ev){ $(ev.target).prevAll('a').attr('href', function(i, href){ return href.replace(/=.*$/, "=" + $(ev.target).val()) }); });
                </script>--}}
            </div>
        </div>

    </section>
    @endif {{--Admins only--}}
@endsection
