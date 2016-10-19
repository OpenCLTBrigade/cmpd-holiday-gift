<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HouseholdAttachment extends Model
{
    // Note: the `path' must be formatted as "user-{user_id}/{md5_contents}_{file_name}"

  protected $fillable = [ "household_id", "path" ];

  public static function boot() {
    if (\Auth::user() && !\Auth::user()->hasRole("admin"))
    {
      static::addGlobalScope('own_records', function(\Illuminate\Database\Eloquent\Builder $builder) {
        $builder->where('owner', '=', \Auth::user()->id);
      });
    }
  }
}
