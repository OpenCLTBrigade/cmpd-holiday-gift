<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HouseholdPhone extends Model
{
    protected $table = "household_phone";

    protected $fillable = [
        "household_id",
        "phone_type",
        "phone_number"
    ];
}
