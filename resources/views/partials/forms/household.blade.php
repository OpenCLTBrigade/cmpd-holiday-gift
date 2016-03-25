

<div class="col-md-12">
    {!! form_start($form) !!}
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Household Information</h3>
        </div>

        <div class="box-body">
            {!! form_row($form->name_first) !!}
            {!! form_row($form->name_last) !!}
            {!! form_row($form->dob) !!}
            {!! form_row($form->email) !!}
        </div>
    </div>

    <div class="box box-danger">
        <div class="box-header with-border">
            <h3 class="box-title">Addresses</h3>
        </div>
        <div class="box-body">
            Coming Soon
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
    });
</script>