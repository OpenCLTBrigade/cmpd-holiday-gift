<?php
namespace App;
use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{

    public static $ADMIN_ID = 1;
    public static $NOMINATOR_ID = 2;
    public static $NOMINEE_ID = 3;
    public static $PARTNER_ID = 4;
    public static $VOLUNTEER_ID = 5;

    public function user() {
        return $this->belongsToMany('App\User');
    }
}