<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Request;
use App\User;

class UserRequest extends Request
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
        $rules = [];
        $rules['password']  = 'sometimes|confirmed|min:6|max:20';
        $rules['email']     = 'required|email|min:6|unique:users,email,'.$this->segment(3);
        $rules['name_first']= 'required|min:3';
        $rules['name_last']= 'required|min:3';
        $rules['name_first']= 'required|min:3';
        $rules['affiliation_id'] = 'required';
        $rules['phone'] = 'required';
        return $rules;
    }
}
