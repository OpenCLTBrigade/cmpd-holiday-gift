<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use App\Household;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use LaravelAnalytics;
use Illuminate\Support\Facades\DB;

class DashboardController extends AdminController
{
    /**
     * Total day scope for statistics
     *
     * @var int
     */
    private $period;

    /**
     * Total results
     *
     * @var int
     */
    private $limit;

    /**
     * Start of the scope
     *
     * @var DateTime
     */
    private $start;

    /**
     * End of the scope
     *
     * @var static
     */
    private $end;

    /**
     * Country variable for the regions distribution
     *
     * @var mixed
     */
    private $country;

    public function __construct()
    {
        $this->period = 30;
        $this->limit = 16;
        $this->end = Carbon::today();
        $this->start = Carbon::today()->subDays($this->period);
        $this->country = env('ANALYTICS_COUNTRY');
        parent::__construct();
    }

    public function getIndex()
    {
      $stats = array();

      $stats['accounts_pending_approval'] = User::query()->pending()->count();

      // TODO: unify 'Y'/'N'/0/1
      $stats['nominations_pending_review'] =
          Household::where('draft', 'N')
          ->where('reviewed', 0)
          ->count();

      $stats['nominations_approved'] =
          Household::where('reviewed', 1)
          ->count();

      $stats['nominations_reviewed'] =
          Household::where('approved', 1)
          ->count();

      $stats['children_approved'] =
          Household::where('reviewed', 1)
          ->join('child', 'child.household_id', '=', 'household.id')
          ->count();

      $stats['children_reviewed'] =
          Household::where('household.approved', 1)
          ->join('child', 'child.household_id', '=', 'household.id')
          ->count();

      $stats['children_pending'] =
          Household::where('household.reviewed', 0)
          ->where('household.draft', 'N')
          ->join('child', 'child.household_id', '=', 'household.id')
          ->count();

      $stats['drafts'] = Household::query()->draft()->count();

      $stats['orgs'] =
          DB::table('household')
          ->select(
                   'affiliation.type',
                   DB::raw('count(case when household.approved = 1 then 1 else null end) as approved'),
                   DB::raw('count(case when household.reviewed = 1 then 1 else null end) as reviewed'),
                   DB::raw('count(case when household.draft = "N" and household.reviewed = 0 then 1 else null end) as pending'))
          ->join('users', 'users.id', '=', 'household.nominator_user_id')
          ->join('affiliation', 'affiliation.id', '=', 'users.affiliation_id')
          ->groupBy('affiliation.type')
          ->get();

      return view('admin.dashboard.index', $stats);
    }
}
