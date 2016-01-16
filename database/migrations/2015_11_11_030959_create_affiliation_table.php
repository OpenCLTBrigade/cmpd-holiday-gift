<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAffiliationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('affiliation', function (Blueprint $table) {
            $table->increments('id');
            $table->string("type");
            $table->string("name");
            $table->string("address_street");
            $table->string("address_street2")->nullable();
            $table->string("address_city");
            $table->string("address_state");
            $table->string("address_zip")->nullable();
            $table->string("phone");
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
    }
}
