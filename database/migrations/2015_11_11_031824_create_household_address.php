<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHouseholdAddress extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('household_address', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('household_id')->unsigned();
            $table->foreign('household_id')->references('id')->on('household');

            $table->string("type");
            $table->string("address_street");
            $table->string("address_street2");
            $table->string("address_city");
            $table->string("address_state");
            $table->string("address_zip");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('household_address', function($table) {
            $table->dropForeign('household_id');
        });
        Schema::drop('household_address');
    }
}
