<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReviewedApprovedToHousehold extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('household', function ($table) {
            $table->integer("reviewed")->default(0);
            $table->integer("approved")->default(0);
            $table->string("reason", 255);
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
            $table->dropColumn('reviewed');
            $table->dropColumn('approved');
            $table->dropColumn('reason');
        });
    }
}
