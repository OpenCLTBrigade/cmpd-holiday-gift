<?php

namespace App\Http\Controllers\Admin;

use App\Base\Controllers\AdminController;
use App\Household;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use LaravelAnalytics;

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
      $accounts_pending_approval = User::query()->pending()->count();
      $draftCount = Household::query()->draft()->count();
      return view('admin.dashboard.index', [
        'accounts_pending_approval' => $accounts_pending_approval,
        'drafts' => $draftCount
      ]);
    }
}
