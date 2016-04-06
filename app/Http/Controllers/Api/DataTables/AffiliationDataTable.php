<?php

namespace App\Http\Controllers\Api\DataTables;

use App\Base\Controllers\DataTableController;
use App\Affiliation;

class AffiliationDataTable extends DataTableController
{
    /**
     * Columns to show
     *
     * @var array
     */
    protected $columns = ['type', 'name'];

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $articles = Affiliation::query();
        return $this->applyScopes($articles);
    }
}
