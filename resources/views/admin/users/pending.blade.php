@extends('layouts.admin')

@section('content')
<form class="form-horizontal form-condensed  datatable-form" autocomplete="false">
    <div class="row">
        <div clsas="form-group">
            <div class="col-xs-12 col-sm-6 col-md-4">
                <input type="search" class="form-control input-sm search" placeholder="Filter results" for="Users" autofocus />
                <div class="form-control-feedback"><span class="fa fa-spinner fa-spin"></span></div>
            </div>
        </div>
    </div>
</form>

<table id="Users" class="table table-hover table-striped datatable" data-server="true">
    <thead>
    <th class="sortable" data-name="name_last" data-order="asc">Last Name</th>
    <th class="sortable" data-name="name_first">First Name</th>
    <th class="sortable" data-name="email">Email</th>
    <th class="sortable" data-name="phone">Phone</th>
    <th class="sortable" data-name="affiliation.type">Affiliation</th>
    <th class="sortable" data-name="affiliation.name">Location</th>
    <th data-render="renderActions"></th>
    </thead>
</table>

<script type="text/javascript">
    let table = $("#Users");

    function renderAddress (data, type, row) {
        return row.address_street +", "+ row.address_city +", "+ row.address_state +" "+ row.address_zip;
    }

    function renderActions (data, type, row) {
        let output = '<ul class="list-inline no-margin-bottom">';
        output += '<li><button class="btn btn-xs bg-danger action" data-action="decline"><i class="fa fa-times"></i> Decline</button></li>';
        output += '<li><button class="btn btn-xs bg-olive action" data-action="approve"><i class="fa fa-check"></i> Approve</button></li>';
        output += '</ul>';

        return output;
    }

    // Handle button clicks
    table.on ("action", function (event, data, action, element, row) {
        switch (action) {
            case "decline":
                if (confirm ("Decline this user?")) {
                  window.location.href += "/" + row.id +"/decline";
                }
                break;
            case "approve":
                if (confirm ("Approve this user?")) {
                  window.location.href += "/" + row.id +"/approve";
                }
                break;
        }
    });
</script>
@endsection