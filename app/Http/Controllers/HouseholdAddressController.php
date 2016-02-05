<?php

namespace App\Http\Controllers;

use App\HouseholdAddress;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HouseholdAddressController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @apiDescription
     * Adds a household address
     *
     * @api {POST} /api/household_address/ Add Address
     * @apiName Add Address
     * @apiGroup Household Address
     * @apiVersion 1.0.0
     * @apiParam {string} type
     * @apiParam {string} address_street
     * @apiParam {string} [address_street2]
     * @apiParam {string} address_city
     * @apiParam {string} address_state
     * @apiParam {int[5]} address_zip
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "id": 1
     * }
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $householdAddress = HouseholdAddress::create(Input::get());
        return response()->json(['id' => $householdAddress->id]);
    }

    /**
     * Display the specified resource.
     * @apiDescription
     * Returns a household address
     *
     * @api {GET} /api/household_address/:id Show Address
     * @apiName Show Address
     * @apiGroup Household Address
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "id": 1,
     *   "created_at": "2016-02-03 01:53:41",
     *   "updated_at": "2016-02-03 01:53:41",
     *   "household_id": 4,
     *   "type": "Work",
     *   "address_street": "116 Koss Springs Apt. 567",
     *   "address_street2": "",
     *   "address_city": "Deanbury",
     *   "address_state": "OK",
     *   "address_zip": "42864"
     * }
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return HouseholdAddress::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     * @apiDescription
     * Updates a household address
     *
     * @api {PUT} /api/household_address/:id Update Address
     * @apiName Update Address
     * @apiGroup Household Address
     * @apiVersion 1.0.0
     * @apiParam {string} type
     * @apiParam {string} address_street
     * @apiParam {string} [address_street2]
     * @apiParam {string} address_city
     * @apiParam {string} address_state
     * @apiParam {int[5]} address_zip
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "id": 1
     * }
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $table = (new \App\HouseholdAddress())->getTable();
        try {
            DB::table($table)->where('id', '=', $id)->update(array($request->all()));
        } catch (Exception $e) {

        }
    }
}
