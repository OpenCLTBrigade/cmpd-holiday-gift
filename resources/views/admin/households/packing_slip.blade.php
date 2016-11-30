<html>
  <head>
    <title>
      Packing Slip
    </title>
    <style>
@page {
  size: A4 portrait;
  margin: 0px;
}
body {
font-family: Sans-Serif;
margin: 1.6cm;
}
table {
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
td {
vertical-align: top
}
    </style>
  </head>
  <body>
    @foreach ($households as $household)
    <div style="page-break-after:always">
      <div style="width:50%; float:left">
        <b style="font-size:1.6em">Family Summary Sheet</b><br/>
        <br/>
        <b>Referred By:</b> {{ $household->nominator_name }}<br/>
        <b>Affiliation:</b> {{ $household->nominator->affiliation->name }} ({{ $household->nominator->affiliation->type }})<br/>
        <br/>
        <b style="font-size:1.3em">Division: {{ $household->address[0]->cmpd_division ?: "__" }}</b><br/>
        <b style="font-size:1.3em">Response Area: {{ $household->address[0]->cmpd_response_area ?: "___" }}</b><br/>
      </div>
      <div style="width:50%; float:right">
        <div style="font-weight: bold; font-size: 2.6em; border: 4px solid black; text-align: center">
          {{ $household->id }}
        </div>
        <br/>
        <b>Bicycles assigned:</b> {{ $household->child->filter(function($child){ return $child->bike_want == "Y"; })->count() }}<br/>
      </div>
      <div style="clear:both; height: 15px"> </div>
      <table style="width: 100%;">
        <tr>
          <td width="50%"><b>Name (First, Last)</b><br/>&nbsp;{{ $household->name_last }}, {{ $household->name_first }}</td>
          <td width="50%" rowspan="2" style="height: 5em">
            <b>Address</b>
            <br/>&nbsp;{{ $household->address[0]->address_street }}
            {!! $household->address[0]->address_street2 ? "<br/>&nbsp;" . htmlentities($household->address[0]->address_street2) : "" !!}
            <br/>&nbsp;{{ $household->address[0]->address_city }},
            {{ $household->address[0]->address_state }},
            {{ $household->address[0]->address_zip }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Phone Numbers</b>
            @foreach ($household->phone as $phone)
            <br/>&nbsp;{{ $phone->phone_number }} ({{ $phone->phone_type }})
            @endforeach
          </td>
        </tr>
      </table>
    </div>
    @endforeach
  </body>
</html>
