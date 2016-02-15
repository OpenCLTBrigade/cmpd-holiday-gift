<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HouseholdAddress extends Model
{
    protected $table = "household_address";

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $fillable = [
        "household_id",
        "type",
        "address_street",
        "address_street2",
        "address_city",
        "address_state",
        "address_zip"
    ];
}
