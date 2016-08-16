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

            // Text because of encryption
            $table->text("address_street");
            $table->text("address_street2");
            $table->text("address_city");
            $table->text("address_state");
            $table->text("address_zip");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('household_address');
    }
}
