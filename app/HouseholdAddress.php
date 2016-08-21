<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Delatbabel\Elocrypt\Elocrypt;

class HouseholdAddress extends Model
{
    use Elocrypt;

    protected $table = "household_address";

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $encrypts = [
        'address_street',
        'address_street2',
        'address_city',
        'address_state',
        'address_zip'
    ];

    protected $fillable = [
        "household_id",
        "type",
        "address_street",
        "address_street2",
        "address_city",
        "address_state",
        "address_zip",
        'cmpd_division',
        'cmpd_patrol_area'
    ];
}
