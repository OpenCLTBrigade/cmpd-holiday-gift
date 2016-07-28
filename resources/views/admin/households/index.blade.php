@extends('layouts.admin')

@section('content')
    
    <form class="form-horizontal form-condensed" autocomplete="false">
        <div class="row">
            <div clsas="form-group">
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <input type="search" class="form-control input-sm search" placeholder="Filter results" for="Households" autofocus />
                    <div class="form-control-feedback" style="display: none;"><span class="fa fa-spinner fa-spin"></span></div>
                </div>
            </div>
        </div>
    </form>
    
    <table id="Households" class="table table-hover table-striped datatable" data-ajax="true">
        <thead>
            <th class="sortable" data-name="name_first">First Name</th>
            <th class="sortable" data-name="name_last">Last Name</th>
            <th class="sortable" data-name="email">Email</th>
            <th class="sortable" data-name="gender">Gender</th>
            <th class="sortable" data-name="dob">Date of Birth</th>
            <th data-render="renderActions"></th>
        </thead>
    </table>
    
    <script type="text/javascript">
        let table = $("#Households");
        
        function renderActions (data, type, row) {
            let output = '<ul class="list-inline no-margin-bottom">';
            output += '<li><button class="btn btn-xs bg-navy action" data-action="show"><i class="fa fa-search"></i> Show</button></li>';
            output += '<li><button class="btn btn-xs bg-olive action" data-action="edit"><i class="fa fa-pencil-square-o"></i> Edit</button></li>';
            output += '<li><button class="btn btn-xs btn-danger action" data-action="delete"><i class="fa fa-trash-o"></i> Delete</button></li>';
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
                case "delete":
                    if (confirm ("Are you sure?")) {
                        $.ajax ({
                            url: "./" + row.id,
                            type: "POST",
                            data: { "_method": "DELETE", "_token": "need to generate token" },
                            success: function (result) {
                                table.refresh ();
                            }
                        });
                    }
                    break;
            }
        });
    </script>
@endsection