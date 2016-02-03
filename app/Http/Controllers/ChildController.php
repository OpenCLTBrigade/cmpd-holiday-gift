<?php

namespace App\Http\Controllers;

use DB;
#use Illuminate\Database\DatabaseManager as DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Mockery\CountValidator\Exception;

class ChildController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Children = \App\Child::all();
        return $Children;
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
     * @apiDescription Create a new child record.<br/><Br/>
     * A child belongs to a `household`.
     * @api {POST} /api/child/ Add Child
     * @apiName Add Child
     * @apiGroup Child
     * @apiVersion 1.0.0
     *
     * @apiParam {int} household_id
     * @apiParam {string} name_first
     * @apiParam {string} name_middle
     * @apiParam {string} name_last
     * @apiParam {date} dob
     * @apiParam {string} race
     * @apiParam {int} last4ssn
     * @apiParam {char} free_or_reduced_lunch Y|N
     * @apiParam {string} reason_for_nomination
     * @apiParam {string} school_name
     * @apiParam {string} school_address
     * @apiParam {string} school_address2
     * @apiParam {string} school_city
     * @apiParam {string} school_state
     * @apiParam {int[5]} school_zip
     * @apiParam {int[10]} school_phone
     * @apiParam {char} bike_want Y|N
     * @apiParam {int[2]} [bike_size] Should be provided if `bike_want` is Y
     * @apiParam {string} [bike_style] Should be provided if `bike_want` is Y
     * @apiParam {char} clothes_want Y|N
     * @apiParam {string} [clothes_size_shirt] Should be provided if `clothes_want` is Y
     * @apiParam {string} [clothes_size_pants] Should be provided if `clothes_want` is Y
     * @apiParam {string} [shoe_size] Should be provided if `clothes_want` is Y
     * @apiParam {string} [favourite_colour]
     * @apiParam {string} [interests]
     * @apiParam {string} [additional_ideas]
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
        $Child = \App\Child::create(Input::get());
        return response()->json(['id' => $Child->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return \App\Child::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $table = (new \App\Child())->getTable();
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
