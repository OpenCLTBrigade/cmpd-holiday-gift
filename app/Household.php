<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    protected $table = "household";

    protected $fillable = [
        "nominator_user_id",
        "name_first",
        "name_middle",
        "name_last",
        "dob",
        "race",
        "gender",
        "email",
        "last4ssn",
        "preferred_contact_method"
    ];

    protected $appends = [
        'nominator_name'
    ];

    protected $hidden = [
        'hidden'
    ];

    public function child() {
        return $this->hasMany("\App\Child");
    }

    public function address() {
        return $this->hasMany("\App\HouseholdAddress");
    }

    public function nominator() {
        return $this->belongsTo("\App\User", "nominator_user_id", "id");
    }

    public function phone() {
        return $this->hasMany("\App\HouseholdPhone");
    }

    public function getNominatorNameAttribute() {
        return $this->nominator->name_first . " " . $this->nominator->name_last;
    }
}

# Household::find(1)->children()
# $household = Household::find(1);
# $children = $household->children();