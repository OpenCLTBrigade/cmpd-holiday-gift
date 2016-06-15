<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCmpdFieldsToHousehold extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('household', function (Blueprint $table) {
	    $table->string('case_number')->nullable();
        });

	Schema::table('household_address', function (Blueprint $table) {
	    $table->string('cmpd_division')->nullable();
	    $table->string('cmpd_response_area')->nullable();
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
	    $table->dropColumn('case_number');
        });

        Schema::table('household_address', function (Blueprint $table) {
	    $table->dropColumn('cmpd_division');
	    $table->dropColumn('cmpd_response_area');
        });
    }
}
