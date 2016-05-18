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

//    protected $hidden = [
//        'hidden'
//    ];

    protected static function boot()
    {
        parent::boot();

        if (!\Auth::user()->hasRole("admin"))
        {
            static::addGlobalScope('age', function(\Illuminate\Database\Eloquent\Builder $builder) {
                $builder->where('nominator_user_id', '=', \Auth::user()->id);
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

    public function getNominatorNameAttribute() {
        return $this->nominator->name_first . " " . $this->nominator->name_last;
    }

    public function getCreatedAtAttribute($value) {
        return date("M j, Y", strtotime($value));
    }

    public function getUpdatedAtAttribute($value) {
        return date("M j, Y", strtotime($value));
    }
}