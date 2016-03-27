<div class="col-md-12">
    {!! form_start($form) !!}
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Head of Household Information</h3>
        </div>

        <div class="box-body">
            <div class="row">
                <div class="col-xs-12 col-sm-4">
                    {!! form_row($form->name_first) !!}
                </div>

                <div class="col-xs-12 col-sm-4">
                    {!! form_row($form->name_middle) !!}
                </div>

                <div class="col-xs-12 col-sm-4">
                    {!! form_row($form->name_last) !!}
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-4">
                    {!! form_row($form->gender) !!}
                </div>
                <div class="col-xs-12 col-sm-4">
                    {!! form_row($form->dob) !!}
                </div>
                <div class="col-xs-12 col-sm-4">
                    {!! form_row($form->last4ssn) !!}
                </div>
            </div>

            {!! form_row($form->email) !!}
            {!! form_row($form->preferred_contact_method) !!}
            {!! form_row($form->reason_for_nomination) !!}

        </div>
    </div>

    <div class="box box-danger">
        <div class="box-header with-border">
            <h3 class="box-title">Addresses</h3>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="collection-container-householdaddress" data-prototype="{{ form_row($form->address->prototype()) }}">
                    {!! form_row($form->address) !!}
                </div>
            </div>
            <button type="button" class="add-household_address btn btn-default">Add Address</button>
            <button type="button" class="remove-household_address btn btn-danger">Remove Last Address</button>
        </div>
    </div>

    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">Phone Numbers</h3>
        </div>
        <div class="box-body">
            Coming Soon
        </div>
    </div>

    <div class="collection-container" data-prototype="{{ form_row($form->child->prototype()) }}">
            {!! form_row($form->child) !!}
    </div>



    <button type="button" class="add-to-collection btn btn-default">Add Child</button>

    {!! form_end($form) !!}

    </div>
</div>

<script>
    $(document).ready(function() {
        // Add child
        $('.add-to-collection').on('click', function(e) {
            e.preventDefault();
            var container = $('.collection-container');
            var count = container.children().length;
            var proto = container.data('prototype').replace(/child/g, count);
            var html = '<div class="box"><div class="box-header with-border"><h3 class="box-title">Child</h3></div>' +
                '<div class="box-body"' +
                proto +
                '</div></div>';
            container.append(html);
        });

        // Add household address
        $('.add-household_address').on('click', function(e) {
            e.preventDefault();
            var container = $('.collection-container-householdaddress');
            var count = container.children().length;
            var proto = container.data('prototype').replace(/address/g, count);
            container.append("<hr>" + proto);
        });

        // Remove household address
        $('.remove-household_address').on('click', function(e) {
            e.preventDefault();
            var a = $(".collection-Address");
            a[a.length-1].remove();
        });



        @if (!count($object->child))
            if($(".collection-Child").length > 0)
                $(".collection-Child").remove();
        @endif

        @if (!count($object->address))
            if($(".collection-Address").length > 0)
                $(".collection-Address").remove();
        @endif
    });
</script>