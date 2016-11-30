<html>
  <head>
    <title>
      Packing Slip
    </title>
    <style>
@page {
  size: 8.5in 11in;
  margin: 0in;
}
* {
font-size: inherit;
}
body {
font-family: Sans-Serif;
font-size: 10pt;
padding: 0;
margin: 0
}
table {
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
td {
vertical-align: top;
padding: 5px;
}
    </style>
  </head>
  <body>
    @foreach ($households as $household)
    @php
    $address = $household->address->count() ? $household->address[0] : new \App\HouseholdAddress();
    @endphp
    <div style="page-break-after:always; page-break-inside: avoid; padding: 0.6in; width: 7.3in">
      <div style="width:50%; float:left">
        <b style="font-size:1.6em">Family Summary Sheet</b><br/>
        <br/>
        <b>Referred By:</b> {{ $household->nominator_name }}<br/>
        <b>Affiliation:</b> {{ $household->nominator->affiliation->name }} ({{ $household->nominator->affiliation->type }})<br/>
        <b style="font-size:1.3em">Division: {{ $address->cmpd_division ?: "__" }}</b><br/>
        <b style="font-size:1.3em">Response Area: {{ $address ->cmpd_response_area ?: "___" }}</b><br/>
      </div>
      <div style="width:50%; float:right">
        <div style="font-weight: bold; font-size: 2.6em; border: 4px solid black; text-align: center">
          {{ $household->id }}
        </div>
        <br/>
        <b>Bicycles requested:</b> {{ $household->child->filter(function($child){ return $child->bike_want == "Y"; })->count() }}<br/>
        <br/><b>Bicycles assigned:</b> ____<br/>
      </div>
      <div style="clear:both; height: 15px"> </div>
      <table style="width: 100%;">
        <tr>
          <td width="50%"><b>Name (First, Last)</b><br/>&nbsp;{{ $household->name_last }}, {{ $household->name_first }}</td>
          <td width="50%" rowspan="2">
            <b>Address</b>
            <br/>&nbsp;{{ $address->address_street }}
            {!! $address->address_street2 ? "<br/>&nbsp;" . htmlentities($address->address_street2) : "" !!}
            <br/>&nbsp;{{ $address->address_city }},
            {{ $address->address_state }},
            {{ $address->address_zip }}
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
        <tr>
          <td style="border: 3px solid black">
            Contact the warehouse for assistance at:
            <br/>
            <br/>Phone: {{ $assistance['phone'] }}
            <br/>Radio: {{ $assistance['radio'] }}
            <br/>
            <br/><b style="font-stretch: condensed">RETURN THIS DOCUMENT TO THE WAREHOUSE</b>
          </td>
          <td style="border: 3px solid black">
            <b>I certify that I have made the delivery to this location:</b>
            <br/>
            <br/>
            <div style="width: 90%; border-top: 2px solid black; margin: 0 5%; margin-top: 2em; text-align: center">
              Officer Making Delivery - Printed Name
            </div>
          </td>
        </tr>
      </table>
      <table width="100%">
        <tr>
          <td colspan="6" style="text-align: center; background: #ccc">
            <b style="font-size:0.8em">Check the first column below when toys for the child have been entered into their box</b>
            <br/>
            <br/><b style="font-size:1.5em">Children Information</b>
          </td>
        </tr>
        <tr>
          <td><b>Done</b></td>
          <td><b>Name</b></td>
          <td><b>Sex</b></td>
          <td><b>Age</b></td>
          <td><b>Bike&nbspRequested</b></td>
          <td><b>Notes</b></td>
        </tr>
        @foreach ($household->child as $child)
        <tr>
          <td></td>
          <td>{{ $child->name_first }}</td>
          <td>{{ $child->gender }}</td>
          <td>{{ $child->age }}</td>
          <td>
            {{ $child->bike_want == "Y" ? $child->bike_size . "\n" . $child->bike_style : "no" }}
          </td>
          <td>
            <div style="max-height: 7.5em; overflow: hidden; font-size: 0.9em">
              @if ($child->clothes_want == 'Y')
              Shirt size: {{ $child->clothes_size_shirt }},
              Pants size: {{ $child->clothes_size_pants }},
              Shoe size: {{ $child->shoe_size }}
              @endif
              @if ($child->favourite_colour != '')
              Favorite color: {{ $child->favourite_colour }}
              @endif
              @if ($child->interests != '')
              Interests: {{ $child->interests }}
              @endif
              @if ($child->additional_ideas != '')
              Ideas: {{ $child->additional_ideas }}
              @endif
            </div>
          </td>
        </tr>
        @endforeach
      </table>
      <br/>
      <span style="font-size: 0.8em">
        <b>Instructions: Officers,</b> although a bike may be requested,
        there are not enough bikes for all requests. Please note the box
        to determine the number of bikes that have bee nassigned to this
        family. In the Bike Requested area, if a bike has been assigned,
        it will be circled for the child it has bee nassigned to.

        <br/> <br/><b>Volunteers:</b> If you are filling the family box
        for the children on this list, please enter the number of gifts
        you have put into the box for each child in the DONE box to the
        left of each child's names.
      </span>
    </div>
    @endforeach
  </body>
</html>
