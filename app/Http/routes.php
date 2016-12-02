<?php

/*
 * Routes used for logging in, registration, etc.
 */
Route::group(['middleware' => 'web'], function () {
    // Redirect / to /admin
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

/*
 * API Routes
 * Used for saving nomination forms and stuff
 */
Route::group(['prefix' => 'api', 'namespace' => 'Api', 'middleware' => ['api', 'admin']], function () {
    Route::resource("user", 'UserController');
    Route::resource("household", 'HouseholdController',
    [
      'except' => [
        'index'
      ]
    ]);
    Route::get('household_address', ['uses' => 'HouseholdAddressController@index']);
    Route::put('household_address/{id}', ['uses' => 'HouseholdAddressController@update']);

    Route::get('affiliation/schools', 'AffiliationController@schools');
    Route::get('cmpd_info', ['uses' => 'CmpdDivision@info']);
    Route::post('upload_household_form_file', ['uses' => 'HouseholdController@upload_attachment']);
    Route::get('export_data_excel', ['uses' => 'Export@export_data_excel']);
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

    Route::resource('household_attachment', 'HouseholdAttachmentController', ['only' => ['show']]);

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

    Route::get('packing_slips', 'HouseholdController@packing_slips');
    Route::get('packing_slip_config', 'HouseholdController@packing_slip_config')->name('admin.packing_slip_config');
    Route::post('packing_slip_set_config', 'HouseholdController@packing_slip_set_config');
    Route::get('household/{id}/packing_slip', 'HouseholdController@packing_slip');

    Route::post('household/search', 'HouseholdController@search'); // Used for the table (household.index)
    Route::post('household/{id}/review', 'HouseholdController@review'); // Used for feedback
    Route::post('household/{id}/delete', 'HouseholdController@delete');

    Route::resource('affiliation', 'AffiliationController');
    Route::post('affiliation/search', 'AffiliationController@search'); // Used for the table (affiliation.index)

    Route::get('tools ', ['as' => 'admin.tools.index', 'uses' => 'ToolsController@index']);
    Route::get('tools/cmpd_address_info', ['as' => 'admin.tools.cmpd_address_info', 'uses' => 'ToolsController@cmpdAddressInfo']);
});
