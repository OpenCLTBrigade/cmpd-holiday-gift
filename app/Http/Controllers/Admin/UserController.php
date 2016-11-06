<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\UserRequest;
use App\User;
use Auth;
use Mail;
use Laracasts\Flash\Flash;

class UserController extends AdminController
{

  public function __construct()
  {
    $this->middleware('admins_only');
    parent::__construct();
  }

  /**
     * Display a listing of the users.
     * @return Response
     */
    public function index()
    {
        return view('admin.users.index');
    }

    public function pending()
    {
        return view('admin.users.pending');
    }

    /**
     * Store a newly created user in storage
     *
     * @param UserRequest $request
     * @return Response
     */
    public function store(UserRequest $request)
    {
        $class = User::class;
        $model = $class::create($request->all());
        $model->id ? Flash::success(trans('admin.create.success')) : Flash::error(trans('admin.create.fail'));
        $model->roles()->sync([$request->get("role")]);

        return $this->redirectRoutePath("index");

    }

    /**
     * Display the specified user.
     *
     * @param User $user
     * @return Response
     */
    public function show(User $user)
    {
        return $this->viewPath("show", $user);
    }

    /**
     * Show the form for editing the specified user.
     *
     * @param User $user
     * @return Response
     */
    public function edit(User $user)
    {
        return $this->getForm($user);
    }

    /**
     * Update the specified user in storage.
     *
     * @param User $user
     * @param UserRequest $request
     * @return Response
     */
    public function update(User $user, UserRequest $request)
    {

        $saveRole = function() use ($user, $request) {
            $user->roles()->sync([$request->get("role")]);
        };

        return $this->saveFlashRedirect($user, $request, null, "index", $saveRole);
    }

    /**
     * Remove the specified user from storage.
     *
     * @param User $user
     * @return Response
     */
    public function destroy(User $user)
    {
        if ($user->id != Auth::user()->id) {
            return $this->destroyFlashRedirect($user);
        } else {
            return $this->redirectRoutePath("index", "admin.delete.self");
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param User $user
     * @return Response
     */
    public function toggleActive($id)
    {
      $user = User::findOrFail($id);
      $newActive = $user['active'] == 'Y' ? 'N' : 'Y';
      $user['active'] = $newActive;
      $user->save();
      return $this->redirectRoutePath("index");
    }
    
    public function search(Request $request) 
    {
        $search = trim ($request->input ("search")["value"] ?: "", " ,");
        $start = $request->input ("start") ?: 0;
        $length = $request->input ("length") ?: 25;
        $columns = $request->input ("columns");
        $order = $request->input ("order");
        
        $users =  User::query()
            ->select ("users.*", "affiliation.type", "affiliation.name")
            ->join ("affiliation", "affiliation.id", "=", "users.affiliation_id")
            ->where ("name_last", "LIKE", "$search%")
            ->orWhere ("email", "LIKE", "%$search%")
            ->orderBy ($columns[$order[0]["column"]]["name"], $order[0]["dir"]);
        
        $count = $users->count ();

        $users = $users
            ->take ($length)
            ->skip ($start)
            ->get ()
            ->toArray ();
        
        return $this->dtResponse ($request, $users, $count);
    }

    public function searchPending(Request $request)
    {
      $search = trim ($request->input ("search")["value"] ?: "", " ,");
      $start = $request->input ("start") ?: 0;
      $length = $request->input ("length") ?: 25;
      $columns = $request->input ("columns");
      $order = $request->input ("order");

      $users =  User::query()
        ->select ("users.*", "affiliation.type", "affiliation.name")
        ->join ("affiliation", "affiliation.id", "=", "users.affiliation_id")
        ->where ("name_last", "LIKE", "$search%")
        ->pending()
        ->orderBy ($columns[$order[0]["column"]]["name"], $order[0]["dir"]);

      $count = $users->count ();

      $users = $users
        ->take ($length)
        ->skip ($start)
        ->get ()
        ->toArray ();

      return $this->dtResponse ($request, $users, $count);
    }

    public function approve ($id)
    {
      if (!\Auth::user()->hasRole("admin"))
      {
        abort(403);
      }
      $User = User::findOrFail($id);
      $User->active = "Y";
      $User->approved = "Y";
      $User->save();
      Flash::success("{$User->name_first} {$User->name_last} has been approved");

      Mail::queue("email.notify_of_activation", [ "user" => $User ], function($message) use($User) {
          $message->from(env("MAIL_FROM_ADDRESS"));
          $message->to($User->email);
          $message->subject(env("MAIL_WELCOME_EMAIL_SUBJECT"));
      });

      return \Redirect::route("admin.user.pending");
    }

    public function decline ($id)
    {
      if (!\Auth::user()->hasRole("admin"))
      {
        abort(403);
      }
      $User = User::findOrFail($id);
      $User->active= "Y";
      $User->declined = "Y";
      $User->save();
      Flash::success("User has been declined");
      return \Redirect::route("admin.user.pending");
    }
}
