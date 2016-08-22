<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserApproved extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("users", function(Blueprint $table) {

          // Users most confirm their own email
          $table->char("confirmed_email", 1)->default("N");
          $table->char("confirmation_code", 32)->nullable();

          // Admins must also approve new users
          $table->char("approved", 1)->default("N");
          $table->char("declined", 1)->default("N");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      if (Schema::hasColumn("users", "declined"))
      {
        Schema::table("users", function($table) {
            $table->dropColumn('approved');
            $table->dropColumn('declined');
            $table->dropColumn('confirmed_email');
            $table->dropColumn('confirmation_code');
        });
      }
    }
}
