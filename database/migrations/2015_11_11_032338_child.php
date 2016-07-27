<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Child extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('child', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('household_id')->unsigned();
            $table->foreign('household_id')->references('id')->on('household');

            $table->string('name_first');
            $table->string('name_middle');
            $table->string('name_last');

            $table->date('dob');

            $table->string('race');

            $table->integer('last4ssn');

            $table->char('free_or_reduced_lunch', 1);

            $table->text('reason_for_nomination');

            $table->string('school_name')->nullable();
            $table->string('school_address')->nullable();
            $table->string('school_address2')->nullable();
            $table->string('school_city')->nullable();
            $table->string('school_state')->nullable();
            $table->string('school_zip')->nullable();
            $table->string('school_phone')->nullable();

            $table->char('bike_want', 1);
            $table->integer("bike_size");
            $table->string("bike_style");

            $table->char('clothes_want', 1);
            $table->string("clothes_size_shirt");
            $table->string("clothes_size_pants");

            // Shoes don't fall under the "clothes" umbrella apparently?
            $table->string("shoe_size");

            $table->string("favourite_colour");
            $table->text("interests");
            $table->text("additional_ideas");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('child');
    }
}
