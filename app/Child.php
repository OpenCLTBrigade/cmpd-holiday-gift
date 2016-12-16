<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Delatbabel\Elocrypt\Elocrypt;
use League\Flysystem\Exception;

class Child extends Model
{
    use Elocrypt;

    protected $table = "child";

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $encrypts = [
        'dob',
        'last4ssn'
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
        "preferred_contact_method",
        "gender"
    ];

    public function household()
    {
        return $this->belongsTo("\App\Household");
    }

    public function getAgeAttribute()
    {
      /*
       * Fix in 1.2.5
       * Some DOB's got inserted with the wrong format.
       * MySQL isn't enforcing a format because we use encryption so DOB is a
       * text field. Thus, some formats cause an issue. Lame, right?
       */
      try {
        $age = \Carbon\Carbon::parse($this->dob);
      } catch (\Exception $e)
      {
        $dob = str_replace("-","/",$this->dob);
        $dob = str_replace("0200","200",$dob);
        $age = \Carbon\Carbon::parse($dob);
      }
      return $age->diffInYears();
    }

}
