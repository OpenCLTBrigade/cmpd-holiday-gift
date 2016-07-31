<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use App\Http\Controllers\Api\DataTables\UserDataTable;
use App\Http\Requests\Admin\UserRequest;
use App\User;
use Auth;
use Laracasts\Flash\Flash;

class UserController extends AdminController
{

    /**
     * Display a listing of the users.
     *
     * @param UserDataTable $dataTable
     * @return Response
     */
    public function index(UserDataTable $dataTable)
    {
        $users = $dataTable->query()->orderBy("active", "ASC")->orderBy("name_last")->orderBy("id")->paginate(5);
        return view('admin.users.index', ['users' => $users]);
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
}
