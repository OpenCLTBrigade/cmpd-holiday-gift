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
            $table->string('name_middle')->nullable();
            $table->string('name_last');

            $table->text('dob'); // Text because of encryption

            $table->string('race')->nullable();

            $table->text('last4ssn'); // Text because of encryption

            $table->char('free_or_reduced_lunch', 1);

            $table->text('reason_for_nomination');

            $table->string('school_name')->nullable();
            $table->string('school_address')->nullable();
            $table->string('school_address2')->nullable();
            $table->string('school_city')->nullable();
            $table->string('school_state')->nullable();
            $table->string('school_zip')->nullable();
            $table->string('school_phone')->nullable();

            $table->char('bike_want', 1)->default("N");
            $table->integer("bike_size")->nullable();
            $table->string("bike_style")->nullable();

            $table->char('clothes_want', 1)->default("N");
            $table->string("clothes_size_shirt")->nullable();
            $table->string("clothes_size_pants")->nullable();

            // Shoes don't fall under the "clothes" umbrella apparently?
            $table->string("shoe_size")->nullable();

            $table->string("favourite_colour")->nullable();
            $table->text("interests")->nullable();
            $table->text("additional_ideas")->nullable();

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
