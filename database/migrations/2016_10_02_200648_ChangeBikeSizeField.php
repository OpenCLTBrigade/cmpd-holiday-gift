<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeBikeSizeField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('child', function (Blueprint $table) {
        $table->text("bike_size")->nullable()->change();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('child', function (Blueprint $table) {
        $table->integer("bike_size")->nullable()->change();
      });
    }
}
