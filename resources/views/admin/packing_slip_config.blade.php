<html>
  <head><title>Packing Slip Config</title></head>
  <body>
    <h2>Custom packing slip fields</h2>
    <form method="POST" action="/admin/packing_slip_set_config">
      <label>Assistance Phone Number: <input name="packing_slip_phone" value="{{ $packing_slip_phone }}" type="text"/></label><br/>
      <label>Assistance Radio: <input name="packing_slip_radio" value="{{ $packing_slip_radio }}" type="text"/></label><br/>
      <input type="hidden" name="household_id" value="{{ $household_id }}" />
      <input type="hidden" name="_token" value="{{ csrf_token() }}" />
      <input type="submit"/>
    </form>
  </body>
</html>
