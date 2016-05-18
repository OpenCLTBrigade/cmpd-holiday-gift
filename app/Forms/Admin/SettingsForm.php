<?php

namespace App\Forms\Admin;

use App\Base\Forms\AdminForm;

class SettingsForm extends AdminForm
{
    public function buildForm()
    {
        $this
            ->add('email', 'text', [
                'label' => trans('admin.fields.setting.email')
            ])
            ->add('analytics_id', 'text', [
                'label' => trans('admin.fields.setting.analytics_id')
            ]);
        parent::buildForm();
    }
}
