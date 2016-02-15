<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Household;
use Illuminate\Support\Facades\Input;

class HouseholdController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * @apiDescription Lists all households with their associated `child`, `household_address`, and
     * `household_phone` records.
     *
     * @api {GET} /api/household List Households
     * @apiName List Households
     * @apiGroup Household
     * @apiPermission user
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * * [
     *    {
     *        id: 1,
     *        nominator_user_id: 1,
     *        name_first: "Santino",
     *        name_middle: "Nolan",
     *        name_last: "Connelly",
     *        dob: "1985-05-01",
     *        race: "race",
     *        gender: "F",
     *        email: "zThompson@hotmail.com",
     *        last4ssn: 1082,
     *        preferred_contact_method: "phone",
     *        nominator_name: "Jovanny Crona",
     *        created_at: "Feb 3, 2016",
     *        updated_at: "Feb 3, 2016",
     *        child: [
     *            {
     *                id: 7,
     *                created_at: "2016-02-03 01:53:41",
     *                updated_at: "2016-02-03 01:53:41",
     *                household_id: 1,
     *                name_first: "Lilyan",
     *                name_middle: "Schuyler",
     *                name_last: "Halvorson",
     *                dob: "1983-05-16",
     *                race: "race",
     *                last4ssn: 7496,
     *                free_or_reduced_lunch: "Y",
     *                reason_for_nomination: "Illo sed et minima necessitatibus cum officiis nisi.",
     *                school_name: "Dicta et non quam magnam qui.",
     *                school_address: "73214 River Knoll Apt. 387 South Marcelino, AK 83905",
     *                school_address2: "",
     *                school_city: "South Solon",
     *                school_state: "WW",
     *                school_zip: "79039",
     *                school_phone: "(234)181-8776x252",
     *                bike_want: "N",
     *                bike_size: 12,
     *                bike_style: "B",
     *                clothes_want: "Y",
     *                clothes_size_shirt: "L",
     *                clothes_size_pants: "M",
     *                shoe_size: "4",
     *                favourite_colour: "Red",
     *                interests: "Quos vel quo ab itaque.",
     *                additional_ideas: "Aut et et ab commodi accusamus."
     *            }
     *        ],
     *        address: [
     *            {
     *                id: 7,
     *                created_at: "2016-02-03 01:53:41",
     *                updated_at: "2016-02-03 01:53:41",
     *                household_id: 1,
     *                type: "Home",
     *                address_street: "612 King Valleys",
     *                address_street2: "Apt 731",
     *                address_city: "North Juanatown",
     *                address_state: "OK",
     *                address_zip: "10443"
     *            }
     *        ],
     *        phone: [
     *            {
     *                id: 2,
     *                created_at: "2016-02-03 01:53:41",
     *                updated_at: "2016-02-03 01:53:41",
     *                household_id: 1,
     *                phone_type: "other",
     *                phone_number: "(076)328-5606"
     *            }
     *        ],
     *        nominator: {
     *          id: 1,
     *          name_first: "Jovanny",
     *          name_last: "Crona",
     *          rank: "",
     *          phone: "",
     *          affiliation_id: 16
     *       }
     *    }
     *  ]
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Households = Household::with("child", "address", "phone")->get();
        return $Households;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * @apiDescription Creates a household record. The `id` of the newly created record is returned so it
     * can be used to create associated `household_phone`, `household_address`, and `child` records.
     *
     * @api {POST} /api/household/ Create household
     * @apiName Create household
     * @apiGroup Household
     * @apiPermission user
     * @apiVersion 1.0.0
     *
     * @apiParam {string} name_first
     * @apiParam {string} name_middle
     * @apiParam {string} name_last
     * @apiParam {date} dob
     * @apiParam {string} race
     * @apiParam {string} gender
     * @apiParam {string} email
     * @apiParam {int[4]} last4ssn
     * @apiParam {string} preferred_content_method
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *    {
     *      id: 42
     *    }
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $household = Household::create(Input::get());
        return response()->json(['id' => $household->id]);
    }

    /**
     * @apiDescription Returns the requested household with its associated `child`, `household_address`, and
     * `household_phone` records.
     *
     * @api {GET} /api/household/:id Get household
     * @apiName Get household
     * @apiGroup Household
     * @apiPermission user
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *    {
     *        id: 1,
     *        nominator_user_id: 1,
     *        name_first: "Santino",
     *        name_middle: "Nolan",
     *        name_last: "Connelly",
     *        dob: "1985-05-01",
     *        race: "race",
     *        gender: "F",
     *        email: "zThompson@hotmail.com",
     *        last4ssn: 1082,
     *        preferred_contact_method: "phone",
     *        nominator_name: "Jovanny Crona",
     *        created_at: "Feb 3, 2016",
     *        updated_at: "Feb 3, 2016",
     *        child: [
     *            {
     *                id: 7,
     *                created_at: "2016-02-03 01:53:41",
     *                updated_at: "2016-02-03 01:53:41",
     *                household_id: 1,
     *                name_first: "Lilyan",
     *                name_middle: "Schuyler",
     *                name_last: "Halvorson",
     *                dob: "1983-05-16",
     *                race: "race",
     *                last4ssn: 7496,
     *                free_or_reduced_lunch: "Y",
     *                reason_for_nomination: "Illo sed et minima necessitatibus cum officiis nisi.",
     *                school_name: "Dicta et non quam magnam qui.",
     *                school_address: "73214 River Knoll Apt. 387 South Marcelino, AK 83905",
     *                school_address2: "",
     *                school_city: "South Solon",
     *                school_state: "WW",
     *                school_zip: "79039",
     *                school_phone: "(234)181-8776x252",
     *                bike_want: "N",
     *                bike_size: 12,
     *                bike_style: "B",
     *                clothes_want: "Y",
     *                clothes_size_shirt: "L",
     *                clothes_size_pants: "M",
     *                shoe_size: "4",
     *                favourite_colour: "Red",
     *                interests: "Quos vel quo ab itaque.",
     *                additional_ideas: "Aut et et ab commodi accusamus."
     *            }
     *        ],
     *        address: [
     *            {
     *                id: 7,
     *                created_at: "2016-02-03 01:53:41",
     *                updated_at: "2016-02-03 01:53:41",
     *                household_id: 1,
     *                type: "Home",
     *                address_street: "612 King Valleys",
     *                address_street2: "Apt 731",
     *                address_city: "North Juanatown",
     *                address_state: "OK",
     *                address_zip: "10443"
     *            }
     *        ],
     *        phone: [
     *            {
     *                id: 2,
     *                created_at: "2016-02-03 01:53:41",
     *                updated_at: "2016-02-03 01:53:41",
     *                household_id: 1,
     *                phone_type: "other",
     *                phone_number: "(076)328-5606"
     *            }
     *        ],
     *      nominator: {
     *          id: 1,
     *          name_first: "Jovanny",
     *          name_last: "Crona",
     *          rank: "",
     *          phone: "",
     *          affiliation_id: 16
     *       }
     *    }
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return \App\Household::with("child", "address", "phone")->where("id", "=", $id)->get();
    }

    /**
     * @apiDescription Updates a household record
     *
     * @api {PUT} /api/household/:id Update Household
     * @apiName Update Household
     * @apiGroup Household
     * @apiPermission user
     * @apiVersion 1.0.0
     *
     * @apiParam {string} name_first
     * @apiParam {string} name_middle
     * @apiParam {string} name_last
     * @apiParam {date} dob
     * @apiParam {string} race
     * @apiParam {string} gender
     * @apiParam {string} email
     * @apiParam {int[4]} last4ssn
     * @apiParam {string} preferred_content_method
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $table = (new \App\Household())->getTable();
        try {
            DB::table($table)->where('id', '=', $id)->update(array($request->all()));
        } catch (\Exception $e) {
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
