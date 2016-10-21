<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Delatbabel\Elocrypt\Elocrypt;

class Household extends Model
{
    use Elocrypt;

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
        "preferred_contact_method",
        "draft",
        "nomination_email_sent"
    ];

    protected $encrypts = [
        'dob',
        'last4ssn',
        'email'
    ];

    protected $appends = [
        'nominator_name',
        'form_files',
    ];

    public static $raceOptions = [
      "American Indian",
      "Alaskan Native",
      "Asian",
      "African American",
      "Hispanic",
      "Pacific Islander",
      "White",
      "Other"
    ];

//    protected $hidden = [
//        'hidden'
//    ];

    protected static function boot()
    {
        parent::boot();

        # Check \Auth::user() to fix db seeder
        if (\Auth::user() && !\Auth::user()->hasRole("admin"))
        {
            static::addGlobalScope('own_records', function(\Illuminate\Database\Eloquent\Builder $builder) {
                $builder->where('nominator_user_id', '=', \Auth::user()->id);
            });
        }
        else
        {
          static::addGlobalScope('published', function(\Illuminate\Database\Eloquent\Builder $builder)
          {
            $myId = \Auth::user()->id;
            $builder->getQuery()->whereRaw("
              CASE
                WHEN
                  draft = 'Y' THEN nominator_user_id = {$myId}
                  ELSE nominator_user_id > ''
                  END
            ");
          });
        }
    }

    public function child() {
		return $this->hasMany("\App\Child");
    }
    // $Household = new Household();
    // $Household->child; $Household->address;
    // $Household->child[0]->name_first;

    public function address() {
        return $this->hasMany("\App\HouseholdAddress");
    }

    public function nominator() {
        return $this->belongsTo("\App\User", "nominator_user_id", "id");
    }

    public function phone() {
        return $this->hasMany("\App\HouseholdPhone");
    }

    public function attachment() {
        return $this->hasMany("\App\HouseholdAttachment");
    }

    public function getNominatorNameAttribute() {
        return $this->nominator->name_first . " " . $this->nominator->name_last;
    }

    public function getCreatedAtAttribute($value) {
        return date("M j, Y", strtotime($value));
    }

    public function getUpdatedAtAttribute($value) {
        return date("M j, Y", strtotime($value));
    }

    public function getFormFilesAttribute() {
        return array("foo", "bar");
    }
}
