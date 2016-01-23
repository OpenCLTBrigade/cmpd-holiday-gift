<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'api', 'middleware' => 'cors'], function () {

    Route::resource('affiliation', 'AffiliationController',
        ['only' => ['index']]
    );

    Route::resource('household', 'HouseholdController',
        ['only' => ['index', 'show', 'store', 'update']]
    );

    Route::resource('household_address', 'HouseholdAddressController',
        ['only' => ['show', 'store', 'update']]
    );

    Route::resource('household_phone', 'HouseholdPhoneController',
        ['only' => ['show', 'store', 'update']]
    );

    Route::resource('child', 'ChildController',
        ['only' => ['index', 'show', 'store', 'update']]
    );

    Route::resource('user', 'UserController',
        ['only' => ['index', 'show', 'store', 'update']]
    );

    Route::resource('auth', 'AuthenticateController', ['only' => ['index']]);
    Route::post('auth', 'AuthenticateController@authenticate');


});
