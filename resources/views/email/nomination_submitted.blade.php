<html>
<head></head>
<body style="">
{{-- TODO: improve this email --}}
<p>
    A new nomination has been submitted.
</p>
<p>
    <a href="{{ url('/admin/household/' . $household->id) }}">
        Click here
    </a>
    to view nomination or go to {{ url('') }}.
</p>
</body>
</html>