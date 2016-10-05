<html>
<head></head>
<body style="">
  {{-- TODO: improve this email --}}
  <p>
    Hello {{ $user->name_first }} {{ $user->name_last }}.
  </p>
  <p>
    Your account on <a href="{{ url('') }}">{{ url('') }}</a>
    has been activated by an administrator.
  </p>
{{--
  <p>
    For information on getting started, read <a href="#">this user guide</a>.
  </p>
--}}
</body>
</html>
