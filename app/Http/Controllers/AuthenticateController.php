<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthenticateController extends Controller
{

    public function index()
    {
        // TODO: show users
    }

    /**
     * @apiDescription Create an access token. The token must be supplied with
     * all requests that required authentication.<br/><br/>
     *
     * Token can be sent as a request parameter or in the request header with bearer authorization.<br/><br/>
     *
     * Information for the authenticated user account is returned along with the token.
     *
     * @api {POST} /api/login/ Create Token
     * @apiName Log in
     * @apiGroup Authentication
     * @apiPermission guest
     * @apiVersion 1.0.0
     *
     * @apiParam {string} email
     * @apiParam {string} password
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
     *   "token": "authorization_token_here",
     *   "user": {
     *     "id": "6",
     *     "name_first": "Developer",
     *     "name_last": "lastName",
     *     "rank": "",
     *     "phone": "",
     *     "affiliation_id": "1"
     *   }
     * }
     *
     * @apiSuccessExample Bad-Login:
     *  HTTP/1.1 401 Unauthorized
     * {"error":"invalid_credentials"}
     *
     */
    public function authenticate(Request $request)
    {

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = \Auth::user();
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token', 'user'));
    }
}