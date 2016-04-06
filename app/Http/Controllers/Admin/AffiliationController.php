<?php

namespace App\Http\Controllers\Admin;

use App\Affiliation;
use App\Base\Controllers\AdminController;
use App\Http\Requests\Admin\AffiliationRequest;
use App\Http\Controllers\Api\DataTables\AffiliationDataTable;

class AffiliationController extends AdminController
{
    public function index(AffiliationDataTable $dataTable)
    {
        return $dataTable->render($this->viewPath());
    }

}
