@extends('layouts.admin')

@section('content')

    <form class="form-horizontal form-condensed datatable-form" autocomplete="false">
        <div class="row">
            <div class="form-group">
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <input type="search" class="form-control input-sm search" placeholder="Filter results" for="Households" autofocus />
                    <div class="form-control-feedback"><span class="fa fa-spinner fa-spin"></span></div>
                </div>
            </div>
        </div>
    </form>

    <table id="Households" class="table table-hover table-striped datatable" data-server="true">
        <thead>
            <th data-name="head_of_household_name">Head of Household</th>
            <th data-name="child_count">Children</th>
            @if (Auth::user()->hasRole("admin"))
            <th data-name="nominated_by">Nominated by</th>
            @endif
            <th data-name="uploaded_form">Uploaded Form</th>
            <th data-render="renderActions"></th>
        </thead>
    </table>

    <script type="text/javascript">
        let table = $("#Households");

        function renderActions (data, type, row) {
            let output = '<ul class="list-inline no-margin-bottom">';
            output += '<li><button class="btn btn-xs bg-navy action" data-action="show"><i class="fa fa-search"></i> Show</button></li>';
            output += '<li><button class="btn btn-xs bg-olive action" data-action="edit"><i class="fa fa-pencil-square-o"></i> Edit</button></li>';
            output += '</ul>';

            return output;
        }

        // Handle button clicks
        table.on ("action", function (event, data, action, element, row) {
            switch (action) {
                case "show":
                    window.location.href += "/" + row.id;
                    break;
                case "edit":
                    window.location.href += "/" + row.id +"/edit";
                    break;
            }
        });
    </script>
@endsection
