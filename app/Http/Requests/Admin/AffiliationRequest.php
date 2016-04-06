<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Request;

class AffiliationRequest extends Request
{
    public function authorize()
    {
        return true;
    }

}
