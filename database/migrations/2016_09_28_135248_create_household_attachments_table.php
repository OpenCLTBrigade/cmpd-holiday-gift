<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHouseholdAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('household_attachments', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('household_id')->unsigned()->nullable();
            $table->foreign('household_id')->references('id')->on('household');

            $table->integer('owner_user_id')->unsigned()->nullable();
            $table->foreign('owner_user_id')->references('id')->on('users');

            $table->string('path');

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
        Schema::drop('household_attachments');
    }
}
