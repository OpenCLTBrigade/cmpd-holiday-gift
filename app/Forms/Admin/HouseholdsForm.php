<?php

namespace App\Forms\Admin;

use App\Base\Forms\AdminForm;
class HouseholdsForm extends AdminForm
{
    public function buildForm()
    {
		//TODO trans('label from lang files') all label attributes
        $this
            ->add('name_first', 'text', [
                'label' => 'First Name'
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
			->add('Children', 'collection', [
                'type' => 'form',
                'prototype' => true,
                'prototype_name' => '__NAME__',
                'property' => 'child',
                'options' => [   
                    'class' => 'App\Forms\Admin\ChildForm',
                    'label' => "Child",
                    'empty_row' => true
                ]
            ]);
        parent::buildForm();
    }
}

class ChildForm extends AdminForm
{
    public function buildForm()
    {
        $this
            ->add('name_first', 'text')
            ->add('name_last', 'text');
		parent::buildForm();
    }

    protected function addButtons() {
        // Do nothing
    }
}

