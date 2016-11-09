<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;
use Laracasts\Flash\Flash;
use Illuminate\Http\Request;
use Mail;
use App\Role;

use App\Base\Auth\AuthenticatesActiveAndRegistersUsers;

function appropriate_email_domains() {
    return [
      "CMPD" => "cmpd.org",
      "CMS" =>  "cms.k12.nc.us",
      "CFD" => "ci.charlotte.nc.us",
      "CFC" => "codeforcharlotte.org"
    ];
}

// Register a validator for user emails
Validator::extend('appropriate_email', function($attribute, $value, $parameters)
{
    $parts = explode("@", $value, 2);
    if (count($parts) < 2) {
        return false;
    }
    foreach (appropriate_email_domains() as $group => $domain) {
        if (!strcasecmp($domain, $parts[1])) {
            return true;
        }
    }
    return false;
});

// Insert the list of domains into the error message
Validator::replacer('appropriate_email', function($message, $attribute, $rule, $parameters) {
        $domains = appropriate_email_domains();
        $pretty_domains = '@' . implode(', @', array_slice($domains, 0, -1)) . ' or @' . end($domains);
        return str_replace(':domains', $pretty_domains, $message);
});

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */
    use AuthenticatesActiveAndRegistersUsers, ThrottlesLogins;

    /**
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * Create a new authentication controller instance.
     *
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => ['logout', 'getLogout']]);
        $this->middleware("throttle");
    }

    /**
     * Get a validator for an incoming registration request.
     * Didn't use the UserRequest rules, password is not required for some reason...
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name_first'      => 'required|max:255',
            'name_last'       => 'required|max:255',
            'affiliation_id'  => 'required',
            'email'           => 'required|email|appropriate_email|max:255|unique:users',
            'password'        => 'required|min:6|confirmed',
            'g-recaptcha-response' => 'required|recaptcha',
        ],
        [
            'name_first.required'       => 'The first name is required',
            'name_last.required'        => 'The last name is required',
            'affiliation_id.required'   => 'The affiliation is required.',
            'email.appropriate_email' => 'An email ending in :domains is required.',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $model = User::create([
            'name_first' => $data['name_first'],
            'name_last' => $data['name_last'],
            'email' => $data['email'],
            'affiliation_id' => $data['affiliation_id'],
            'phone' => $data['phone'],
            'rank' => $data['rank'],
            'password' => Hash::make($data['password']),
            'active' => 'N',
            'approved' => 'N',
            'confirmed_email' => 'N',
            'confirmation_code' => md5(mt_rand()),
        ]);
        $model->roles()->sync([Role::$NOMINATOR_ID]);
        return $model;
    }

  /**
   * Define actions after registration is complete.
   * @param Request $request
   * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
   */
  public function postRegister(Request $request)
   {
       $validator = $this->validator($request->all());

       if ($validator->fails())
       {
           $this->throwValidationException(
               $request, $validator
           );
       }
       $user = $this->create($request->all());

       Mail::queue("email.confirm_email", [ "user" => $user ], function($message) use($user) {
               $message->from(env("MAIL_FROM_ADDRESS"));
               $message->to($user->email);
               $message->subject(env("MAIL_CONFIRM_EMAIL_SUBJECT"));
           });

       Flash::success(trans('auth.register.success'));
       return redirect('/auth/login');
   }

   /**
   * Confirm user's email
   * @param Request $request
   * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
   */
  public function confirmEmail(Request $request)
   {
       $user = User::findOrFail($request['id']);
       if($user->confirmed_email != 'Y' &&
          $user->confirmation_code != $request['confirmation_code']){
           Flash::error(trans('auth.confirm_email.failure'));
           return redirect('/auth/login');
       }
       $user->confirmation_code = null;
       $user->confirmed_email = 'Y';
       $user->save();

       Mail::queue("email.new_user_needs_activation", [ "user" => $user ], function($message){
               $message->from(env("MAIL_FROM_ADDRESS"));
               $message->to(env("MAIL_ADMIN_ADDRESS"));
               // TODO: improve the subject line
               $message->subject(env("MAIL_NEW_USER_NEEDS_APPROVAL_SUBJECT"));
           });

       Flash::success(trans('auth.confirm_email.success'));
       return redirect('/auth/login');
   }
}
