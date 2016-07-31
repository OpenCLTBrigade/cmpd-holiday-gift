<?php

namespace App\Http\Controllers\Admin;

use App\Affiliation;
use App\User;
use App\Base\Controllers\AdminController;
use App\Http\Requests\Admin\AffiliationRequest;
use Illuminate\Http\Request;

class AffiliationController extends AdminController
{
    public function index()
    {
        return view('admin.affiliations.index');
    }

    public function show(Affiliation $affiliation)
    {
        $Users = User::where("affiliation_id", "=", $affiliation->id)->get();
        return $this->viewPathWithData("show", [
            'affiliation' => $affiliation,
            'users' => $Users
        ]);
    }
    
    public function search(Request $request) 
    {
        $search = trim ($request->input ("search")["value"] ?: "", " ,");
        $start = $request->input ("start") ?: 0;
        $length = $request->input ("length") ?: 25;
        $columns = $request->input ("columns");
        $order = $request->input ("order");
        
        $affiliations =  Affiliation::query()
            ->where ("type", "LIKE", "$search%")
            ->orWhere ("name", "LIKE", "$search%")
            ->orderBy ($columns[$order[0]["column"]]["name"], $order[0]["dir"]);
        
        $count = $affiliations->count ();
        
        $affiliations = $affiliations
            ->take ($length)
            ->skip ($start)
            ->get ()
            ->toArray ();
        
        return $this->dtResponse ($request, $affiliations, $count);
    }

}
