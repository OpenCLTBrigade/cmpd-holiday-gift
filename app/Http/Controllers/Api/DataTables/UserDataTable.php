<?php

namespace App\Http\Controllers\Api\DataTables;

use App\Base\Controllers\DataTableController;
use App\User;

class UserDataTable extends DataTableController
{
    /**
     * Columns to show
     *
     * @var array
     */
    protected $columns = ["name_first", "name_last"];

    protected $pluck_columns = [
        "affiliation_id" => ["affiliation", "name"]
    ];
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
        $users = User::query();
        return $this->applyScopes($users);
    }




}
