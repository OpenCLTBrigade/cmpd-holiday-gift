@extends('layouts.admin', ['no_boxes' => true])

@section('content')
        @include('partials.forms.household')

  <script type="text/javascript">
    app.fetchRecord({{$object->id}});
  </script>
@endsection