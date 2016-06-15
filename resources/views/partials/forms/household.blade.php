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
	    <div class="row">
	      <div class="col-xs-12 col-sm-4">
		{!! form_row($form->case_number) !!}
	      </div>
	    </div>
        </div>
    </div>

    <div class="box box-danger">
        <div class="box-header with-border">
            <h3 class="box-title">Addresses</h3>
        </div>
        <div class="box-body">
			<div class="collection-container-address" data-prototype="{{ form_row($form->address->prototype()) }}">
				{!! form_row($form->address) !!}
			</div>
            <button type="button" class="add-address btn btn-default">Add Address</button>
            <button type="button" class="remove-address btn btn-danger">Remove Last Address</button>
        </div>
    </div>

    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">Phone Numbers</h3>
        </div>
        <div class="box-body">
			<div class="collection-container-phone" data-prototype="{{ form_row($form->phone->prototype()) }}">
				{!! form_row($form->phone) !!}
			</div>
            <button type="button" class="add-phone btn btn-default">Add Phone</button>
            <button type="button" class="remove-phone btn btn-danger">Remove Phone</button>
        </div>
    </div>

    <div class="collection-container-child" data-prototype="{{ form_row($form->child->prototype()) }}">
        {!! form_row($form->child) !!}
    </div>



    <button type="button" class="add-child btn btn-default">Add Child</button>

    {!! form_end($form) !!}

    </div>
</div>

@include('partials.common.error-modal', ['id'=> 'errorMsg', 'title' => 'Something went wrong!', 'body' => 'Please verify that the address used is correct.'])

<script src="https://maps.googleapis.com/maps/api/js?key={{ Config::get('settings')->analytics_id }}&language=en"></script>
<script>

    $(document).ready(function() {
        var geocoder = new google.maps.Geocoder();
        @include('partials.forms.input-address-google')
        @include('partials.forms.children-js', ['class'=> 'Child', 'container' => 'child', 'boxed' => true, "parent" => $object ])
        @include('partials.forms.children-js', ['class'=> 'Phone', 'container' => 'phone', 'boxed' => false, "parent" => $object ])
		    @include('partials.forms.children-js', ['class'=> 'Address', 'container' => 'address', 'boxed' => false, "parent" => $object ])
    });

</script>
