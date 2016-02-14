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

    public function users()
    {
        return $this->belongsToMany("\App\User");
    }
}
