<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Affiliation extends Model
{
    protected $table = "affiliation";

    protected $fillable = [
        "type",
        "name",
        "address_street",
        "address_street2",
        "address_city",
        "address_state",
        "phone"
    ];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function scopeCms($query)
    {
      return $query->where('type', '=', 'cms');
    }

    public function users()
    {
        return $this->belongsToMany("\App\User");
    }

    public function getTypeAttribute($value) {
        return strtoupper($value);
    }

    public function setTypeAttribute($value) {
        $this->attributes['type'] = strtolower($value);
    }

    public static function parseAffiliationsIntoSelectArray() {
      $a = array();
      $affiliations = static::all(["id", "type", "name"]);
      foreach ($affiliations as $affiliation) {
        $a[$affiliation["id"]] = strtoupper($affiliation['type'] . " - " . ucwords($affiliation['name']));
      }
      return $a;
    }
}
