<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Delatbabel\Elocrypt\Elocrypt;

class Child extends Model
{
    use Elocrypt;

    protected $table = "child";

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $encrypts = [
        'dob',
        'last4ssn',
        'email'
    ];

    protected $fillable = [
        "household_id",
        "name_first",
        "name_middle",
        "name_last",
        "dob",
        "race",
        "last4ssn",
        "free_or_reduced_lunch",
        "reason_for_nomination",
        "school_id",
        "bike_want",
        "bike_size",
        "bike_style",
        "clothes_want",
        "clothes_size_shirt",
        "clothes_size_pants",
        "shoe_size",
        "favourite_colour",
        "interests",
        "additional_ideas",
        "preferred_contact_method"
    ];

    public function household()
    {
        return $this->belongsToOne("Household");
    }

}
