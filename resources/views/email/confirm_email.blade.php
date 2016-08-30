<html>
<head></head>
<body style="">
  {{-- TODO: improve this email --}}
  <p>
    Hello {{ $user->name_first }} {{ $user->name_last }}.
  </p>
  <p>
    <a href="{{ url('auth/confirm_email?id=' . $user->id . '&confirmation_code=' . $user->confirmation_code) }}">
      Click here
    </a>
    to confirm your registration on {{ url('') }}.
  </p>
</body>
</html>
