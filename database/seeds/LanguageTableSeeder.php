<?php

use Illuminate\Database\Seeder;
use App\Language;

class LanguageTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('languages')->delete();
        Language::create(['title' => 'Spanish', 'code' => 'sp', 'site_title' => 'CMPD Winter Gift Project', 'site_description' => '']);
        Language::create(['title' => 'English', 'code' => 'en', 'site_title' => 'CMPD Winter Gift Project', 'site_description' => '']);
    }
}
