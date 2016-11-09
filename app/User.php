<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Support\Facades\Hash;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
    use Authenticatable;
    use Authorizable;
    use CanResetPassword;
    use EntrustUserTrait {
        Authorizable::can insteadof EntrustUserTrait;
        EntrustUserTrait::can as hasPermission;
    }

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name_first",
        "name_last",
        "rank",
        "phone",
        "affiliation_id",
        "email",
        "password",
        "active"
    ];

    protected $hidden = ['password'];

    protected static function boot()
    {
      parent::boot();
      static::addGlobalScope('notDeclined', function(\Illuminate\Database\Eloquent\Builder $builder) {
        $builder->where('declined', '=', "N");
      });
    }

  /**
   * For an account to be in considered pending the
   * user must have confirmed their email address.
   *
   * @param \Illuminate\Database\Eloquent\Builder $query
   * @return \Illuminate\Database\Eloquent\Builder
   */
    public function scopePending ($query)
    {
      return $query->where('approved', '=', 'N')->where('confirmed_email', '=', 'Y');
    }

    /**
     * Set the ip address attribute.
     *
     * @param $ip
     * @return string
     */
    public function setIpAddressAttribute($ip)
    {
        $this->attributes['ip_address'] = inet_pton($ip);
    }

    public function affiliation() {
        return $this->hasOne('\App\Affiliation', "id", "affiliation_id");
    }

    public function roles() {
        return $this->belongsToMany('App\Role');
    }

  /**
   * @param \Illuminate\Database\Eloquent\Builder $query
   * @return \Illuminate\Database\Eloquent\Builder
   */
    public function scopeThisYear ($query)
    {
      // TODO: Query current year...
      return $query;
    }

    /**
     * Whether or not the user has reached their limit of nominations for the year
     *
     * TODO: Rejected nominations should not count toward the limit
     * TODO: Need to use current year for limit
     *
     * @return bool
     */
    public function getMaxNominationsReachedAttribute()
    {
        $nominated_by_user = \DB::table('household')->where("nominator_user_id", "=", $this->id)->count();
        return ($nominated_by_user >= $this->nomination_limit);
    }

}
