<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHouseholdTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('household', function (Blueprint $table) {
            $table->increments('id');

            /*
             * Users nominate a household with children
             */
            $table->integer('nominator_user_id')->unsigned();
            $table->foreign('nominator_user_id')->references('id')->on('users');

            $table->string('name_first');
            $table->string('name_middle')->nullable();
            $table->string('name_last');

            $table->text('dob'); // Text because of encryption

            $table->string('race')->nullable();

            $table->string('gender');
            $table->text('email'); // Text because of encryption

            $table->text('last4ssn'); // Text because of encryption

            $table->string('preferred_contact_method');
            $table->char("draft", 1)->default("Y");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::drop('household');
    }
}
