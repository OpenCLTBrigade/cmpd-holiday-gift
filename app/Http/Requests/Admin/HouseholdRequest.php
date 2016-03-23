<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Request;
use App\Household;

class HouseholdRequest extends Request
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        # TODO: Specify these (using dummy)
        
        return [
            // 'email'  => 'required|email|min:6|unique:users,email,'.$this->segment(3)
        ];
        
    }
}
