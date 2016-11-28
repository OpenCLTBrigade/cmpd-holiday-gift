<html>
  <head>
    <title>
      Packing Slip
    </title>
    <style>
@page {
  size: A4 portrait;
}
    </style>
  </head>
  <body>
    @foreach ($households as $household)
    <div style="page-break-after=always">
      <div style="width:50% float:left">
        <h1>Family summary Sheet</h1><br/>
        <b>Referred By:</b> {{ $household->nominator_name }}<br/>
        <b>Affiliation:</b> {{ $household->nominator->affiliation->name }} ({{ $household->nominator->affiliation->type }})<br/>
        <b style="font-size:1.3em">Division: {{ $household->addresses }}</span><br/>
      </div>
    </div>
    @endforeach
  </body>
</html>
