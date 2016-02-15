<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HouseholdPhone extends Model
{
    protected $table = "household_phone";

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $fillable = [
        "household_id",
        "phone_type",
        "phone_number"
    ];
}
