<?php

namespace App\Forms\Admin;

use App\Base\Forms\AdminForm;
use App\Role;

class UsersForm extends AdminForm
{
    public function buildForm()
    {

        $roles = Role::all()->pluck('name', 'id')->toArray();

        $this
            ->add('name_first', 'text', [
                'label' => "First Name"
            ])
            ->add('name_last', 'text', [
                'label' => "Last Name"
            ])

            ->add("affiliation_id", "select", [
                "choices" => $this->parseAffiliationsIntoSelectArray(),
                "label" => "Affiliation"
            ])

            ->add('rank', 'text', [
                'label' => "Rank / Position"
            ])

            ->add('role', 'choice', [
                'choices' => $roles,
                'multiple' => false
            ])

            ->add('phone', 'text', [
                'label' => "Phone Number"
            ])

            ->add('email', 'email', [
                'label' => trans('admin.fields.user.email')
            ])
            ->add('password', 'password', [
                'label' => trans('admin.fields.user.password'),
                'value' => ''
            ])
            ->add('password_confirmation', 'password', [
                'label' => trans('admin.fields.user.password_confirmation')
            ]);
        parent::buildForm();
    }

    private function parseAffiliationsIntoSelectArray() {
        $a = array();
        $affiliations = \App\Affiliation::all(["id", "type", "name"]);
        foreach ($affiliations as $affiliation) {
            $a[$affiliation["id"]] = strtoupper($affiliation['type'] . " - " . ucwords($affiliation['name']));
        }
        return $a;
    }
}
