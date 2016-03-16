<?php

namespace App\Http\Controllers\Api\DataTables;

use App\Base\Controllers\DataTableController;
use App\Household;

class HouseholdDataTable extends DataTableController
{
    /**
     * Columns to show
     *
     * @var array
     */
    protected $columns = ["name_first", "name_last"];

    /**
     * Image columns to show
     *
     * @var array
     */
    protected $image_columns = [];

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $users = Household::query();
        return $this->applyScopes($users);
    }
}
