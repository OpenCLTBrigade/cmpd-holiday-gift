@extends('layouts.admin', ['no_boxes' => true])

@section('content')
<section class="content">
    <div class="row">
        @include('partials.forms.household')
    </div>
</section>
@endsection