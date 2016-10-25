<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNominationEmailSentToHousehold extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('household', function ($table) {
            $table->char("nomination_email_sent", 1)->default("N");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('household', function (Blueprint $table) {
            $table->dropColumn('nomination_email_sent');
        });
    }
}
