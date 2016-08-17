<html>
<head></head>
<body style="">
<p>A new user has registered on {{ url('') }} and needs approval.</p>
<p>
  <a href="{{ url('admin/user/' . $user->id) }}">
    {{ $user->name_first }} {{ $user->name_last }} (user #{{ $user->id }})
  </a>
</p>
<p>
  <a href="{{ url('admin/user/pending') }}">View all users pending approval</a>
</p>
</body>
</html>
