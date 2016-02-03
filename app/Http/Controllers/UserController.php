<?php

namespace App\Http\Controllers;

use App\User;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @apiDescription Lists all users. Includes the data of their
     * `affiliation` record.
     *
     * @api {GET} /api/user/ List users
     * @apiName List Users
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $M = User::with("affiliation")->get();
//        $M = User::all();

        return $M;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @apiDescription Register a new user account
     *
     * @api {POST} /api/user/ Add User
     * @apiName Add User
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {string} name_first
     * @apiParam {string} name_last
     * @apiParam {string} rank
     * @apiParam {string} phone
     * @apiParam {int} affiliation_id References an `affiliation` record
     * @apiParam {string} email
     * @apiParam {string} password
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 1
     *     }
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $M = User::create(Input::get());
        return response()->json(['id' => $M->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @apiDescription Update a new user account
     *
     * @api {PUT} /api/user/:id Update User
     * @apiName Update User
     * @apiGroup User
     * @apiVersion 1.0.0
     *
     * @apiParam {string} [name_first]
     * @apiParam {string} [name_last]
     * @apiParam {string} [rank]
     * @apiParam {string} [phone]
     * @apiParam {int} [affiliation_id References an `affiliation` record
     * @apiParam {string} [email]
     * @apiParam {string} [password]
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $table = (new \App\User())->getTable();
        try {
            DB::table($table)->where('id', '=', $id)->update(array($request->all()));
        } catch (Exception $e) {
            // TODO: Something eventually
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
