<?php

namespace App\Forms\Admin;

use App\Base\Forms\AdminForm;
use Kris\LaravelFormBuilder\Form;

class HouseholdsForm extends AdminForm
{
    public function buildForm()
    {
		//TODO trans('label from lang files') all label attributes
        $this
            ->add('name_first', 'text', [
                'label' => 'First Name'
            ])
            ->add('name_middle', 'text', [
                'label' => 'Middle Name'
            ])
            ->add('name_last', 'text', [
                'label' => 'Last Name'
            ])
            ->add('dob', 'date', [
                'label' => ''
            ])
            ->add('email', 'text', [
                'label' => 'Email'
            ])
            ->add('last4ssn', 'number', [
                'label' => 'Last four digits of SSN'
            ])
            ->add('gender', 'select', [
                'choices' => array(
                    "M" => "Male",
                    "F" => "Female"
                ),
                'empty_value' => '==== Select ====',
                'label' => "Gender"
            ])
            ->add('preferred_contact_method', 'select', [
                'choices' => array(
                    "email" => "E-Mail",
                    "text" => "Text",
                    "mail" => "Mail"
                ),
                'label' => "Preferred Contact Method",
                'empty_value' => '==== Select ===='
            ])
            ->add('reason_for_nomination', 'textarea', [
                'label' => 'Reason for nomination'
            ])
	    ->add('case_number', 'text', [
                'label' => 'Case Number'
            ])
	    ->add("address", "collection", [
                "type" => "form",
                "template" => "formtemplates.collection.in-box",
                "options" => [
                    "class" => 'App\Forms\Admin\HouseholdAddressForm',
                    "label" => false,
                    "empty_row" => true
                ]
            ])

			->add("phone", "collection", [
                "type" => "form",
                "template" => "formtemplates.collection.in-box",
                "options" => [
                    "class" => 'App\Forms\Admin\HouseholdPhoneForm',
                    "label" => false,
                    "empty_row" => true
                ]
            ])
			->add('child', 'collection', [
                'type' => 'form',
                'template' => 'formtemplates.collection.box',
                'options' => [
                    'class' => 'App\Forms\Admin\ChildForm',
                    'label' => false,
                    'empty_row' => true
                ]
            ]);
        parent::buildForm();
    }
}

class HouseholdAddressForm extends Form
{
    public function buildForm()
    {
        $this
            ->add("type", "select",
            [
                "template" => "formtemplates.select.col-xs-12_col-sm-4",
                "choices" => [
                    "Home" => "Home",
                    "Work" => "Work"
                ]
            ])
            ->add("address_street", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "Street Address"
            ])
            ->add("address_street2", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "Street Address 2"
            ])
            ->add("address_city", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "City"
            ])
            ->add("address_state", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "State"
            ])
            ->add("address_zip", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "ZIP Code"
            ])
            ->add("cmpd_division", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "CMPD Division"
            ])
            ->add("cmpd_response_area", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "CMPD Response Area"
            ])
	    ->add('id', 'hidden')
        ;
        // parent::buildForm();

    }
}


class HouseholdPhoneForm extends Form
{
    public function buildForm()
    {
        $this
            ->add("phone_type", "select",
            [
                "template" => "formtemplates.select.col-xs-12_col-sm-4",
                "choices" => [
                    "Home" => "Home",
                    "Work" => "Work"
                ],
                "label" => "Phone Type"
            ])
            ->add("phone_number", "text", [
                "template" => "formtemplates.text.col-xs-12_col-sm-4",
                'label' => "Phone Number"
            ])
			->add('id', 'hidden')
        ;
        // parent::buildForm();

    }
}

class ChildForm extends Form
{
    public function buildForm()
    {
        $this
            ->add('name_first', 'text')
            ->add('name_middle', 'text')
            ->add('name_last', 'text')
            ->add('race', 'text')
            ->add('last4ssn', 'text')
            ->add('free_or_reduced_lunch', 'text')
            ->add('dob', 'date')
            ->add("school_id", "select", [
                "choices" => $this->parseSchoolArray(),
                "label" => "School"
            ])
            ->add('bike_want', 'radio')
            ->add('bike_style', 'text')
            ->add('bike_size', 'text')
            ->add('clothes_want', 'radio')
            ->add('clothes_size_shirt', 'text')
            ->add('clothes_size_pants', 'text')
            ->add('shoe_size', 'text')
            ->add('favourite_colour', 'text')
            ->add('interests', 'textarea')
            ->add('additional_ideas', 'textarea')
            ->add('reason_for_nomination', 'textarea')
			->add('id', 'hidden')
        ;
		// parent::buildForm();
    }

    private function parseSchoolArray() {
        $a = array();
        $affiliations = \App\Affiliation::query()
            ->where("type","=","cms")
            ->get(["id", "type", "name"]);
        foreach ($affiliations as $affiliation) {
            $a[$affiliation["id"]] = strtoupper($affiliation['type'] . " - " . ucwords($affiliation['name']));
        }
        return $a;
    }

}


