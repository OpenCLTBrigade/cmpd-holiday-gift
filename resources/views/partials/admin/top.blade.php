<header class="main-header">
    <a href="{{ route('admin.root') }}" class="logo"> {{ trans('admin.title')  }}</a>
    <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle</span>
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="user">
					<a href="#" >
						<span class="hidden-xs">{{ Auth::user()->name_first  }}</span>
                    </a>
				</li>
				<li class="dropdown user user-menu">
                    <a href="{{ route('auth.logout')}}" >
						<i class="fa fa-sign-out"></i> {{ trans('auth.logout') }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</header>
