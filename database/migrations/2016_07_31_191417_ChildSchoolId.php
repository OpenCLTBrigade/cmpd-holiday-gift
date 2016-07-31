<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChildSchoolId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("child", function(Blueprint $table)
        {
            $table->removeColumn('school_address');
            $table->removeColumn('school_address2');
            $table->removeColumn('school_city');
            $table->removeColumn('school_state');
            $table->removeColumn('school_zip');
            $table->removeColumn('school_phone');

            $table->integer("school_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("child", function(Blueprint $table)
        {
            $existingTable = DB::table("child");
            if (Schema::hasColumn("child", "school_id"))
            {
                $table->dropForeign("school_id");
                $table->removeColumn("school_id");
            }

            if (!Schema::hasColumn("child", "school_phone"))
            {
                $table->string('school_phone');
                $table->string('school_name');
                $table->string('school_address');
                $table->string('school_address2');
                $table->string('school_city');
                $table->string('school_state');
                $table->string('school_zip');
            }
        });
    }
}
