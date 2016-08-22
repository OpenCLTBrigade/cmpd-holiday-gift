<?php

Route::group(['middleware' => 'web'], function () {
    // Application routes
    Route::group(['namespace' => 'Application'], function () {
        Route::get('/', function(){
			return redirect('admin');
		});
    });
    // Auth routes
    Route::group(['namespace' => 'Auth'], function () {
        Route::group(['prefix' => 'auth'], function () {
            Route::get('/', ['as' => 'auth.root', 'uses' => 'AuthController@getLogin']);
            Route::get('login', ['as' => 'auth.login', 'uses' => 'AuthController@getLogin']);
            Route::post('login', ['as' => 'auth.login', 'uses' => 'AuthController@postLogin']);
            Route::get('register', ['as' => 'auth.register', 'uses' => 'AuthController@getRegister']);
            Route::post('register', ['as' => 'auth.register', 'uses' => 'AuthController@postRegister']);
            Route::get('logout', ['as' => 'auth.logout', 'uses' => 'AuthController@getLogout']);
            Route::get('confirm_email', ['as' => 'auth.confirm_email', 'uses' => 'AuthController@confirmEmail']);
        });
        Route::group(['prefix' => 'password'], function () {
            Route::get('email', ['as' => 'password.email', 'uses' => 'PasswordController@getEmail']);
            Route::post('email', ['as' => 'password.email', 'uses' => 'PasswordController@postEmail']);
            Route::get('reset/{token?}', ['as' => 'password.reset', 'uses' => 'PasswordController@showResetForm']);
            Route::post('reset', ['as' => 'password.reset', 'uses' => 'PasswordController@postReset']);
        });
    });
});

// API routes
Route::group(['prefix' => 'api', 'namespace' => 'Api', 'middleware' => ['api', 'admin']], function () {
    Route::resource("user", 'UserController');
    Route::resource("household", 'HouseholdController',
    [
      'except' => [
        'index'
      ]
    ]);
    Route::get('affiliation/cms', 'AffiliationController@cms');
    Route::get('cmpd_info', ['uses' => 'CmpdDivision@info']);
});

// Admin routes
# myapp.com/admin/
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => 'admin'], function () {
    // GET
    Route::get('/', ['as' => 'admin.root', 'uses' => 'DashboardController@getIndex']);
    Route::get('setting', ['as' => 'admin.setting.index', 'uses' => 'SettingController@getSettings']);
    // POST
    Route::post('language/change', ['as' => 'admin.language.change' , 'uses' => 'LanguageController@postChange']);
    Route::post('page/order', ['as' => 'admin.page.order' , 'uses' => 'PageController@postOrder']);
    // PATCH
    Route::patch('setting/{setting}', ['as' => 'admin.setting.update', 'uses' => 'SettingController@patchSettings']);
    // Resources
    Route::resource('article', 'ArticleController');
    Route::resource('category', 'CategoryController');
    Route::resource('language', 'LanguageController');
    Route::resource('page', 'PageController');
    
    // User Routes
    Route::get('user/pending', ['as' => 'admin.user.pending', 'uses' => 'UserController@pending']);
    Route::get('user/pending/{id}/approve', ['as' => 'admin.user.pending.approve', 'uses' => 'UserController@approve']);
    Route::get('user/pending/{id}/decline', ['as' => 'admin.user.pending.approve', 'uses' => 'UserController@decline']);
    Route::post('user/pending/search', ['as' => 'admin.user.pending.search', 'uses' => 'UserController@searchPending']);
    Route::resource('user', 'UserController');
    Route::post('user/search', 'UserController@search');
    Route::get('user/toggleActive/{id}', ['as' => 'admin.user.toggleActive', 'uses' => 'UserController@toggleActive']);

    // Household Routes
    Route::resource('household', 'HouseholdController',
    [
      'only' => [
        'index',
        'show',
        'edit',
        'create'
      ]
    ]);
    Route::post('household/search', 'HouseholdController@search');

    Route::resource('affiliation', 'AffiliationController');
    Route::post('affiliation/search', 'AffiliationController@search');

});
