<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AffiliationController extends Controller
{

    public function __construct()
    {
//        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @apiDescription
     * Returns a full list of possible affiliations.<br/><br/>
     *
     * Possible types are `cmpd`, `cfd`, and `cms`. <br/><br/>
     *
     * CMS records do not include the `phone` field.
     *
     * @api {GET} /api/affiliation/ List Affiliations
     * @apiName List Affiliations
     * @apiGroup Affiliation
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * [
     *   {
     *     id: "1",
     *     type: "cmpd",
     *     name: "Eastway",
     *     address_street: "3024 Eastway Dr.",
     *     address_street2: null,
     *     address_city: "Charlotte",
     *     address_state: "NC",
     *     address_zip: "28205",
     *     phone: "704-336-8535",
     *     created_at: "2016-02-03 01:54:41",
     *     updated_at: "2016-02-03 01:54:41"
     *   },
     *   ...
     * ]
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return \App\Affiliation::all();
    }
}
