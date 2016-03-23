{!! form_start($form) !!}

{!! form_row($form->name_first) !!}
{!! form_row($form->name_last) !!}
{!! form_row($form->dob) !!}
{!! form_row($form->email) !!}

<div class="collection-container" data-prototype="{{ form_row($form->child->prototype()) }}">
<!--    {!! form_row($form->child) !!}-->
</div>

<button type="button" class="add-to-collection btn btn-default">Add Child</button>

{!! form_end($form) !!}

<script>
    $(document).ready(function() {
        $('.add-to-collection').on('click', function(e) {
            e.preventDefault();
            var container = $('.collection-container');
            var count = container.children().length;
            var proto = container.data('prototype').replace(/child/g, count);
            container.append(proto);
        });
    });
</script>