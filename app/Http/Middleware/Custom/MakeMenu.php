<?php

namespace App\Http\Middleware\Custom;

use Closure;
use Menu;

class MakeMenu
{
    /**
     * @var string
     */
    private $circle = "circle-o";

    /**
     * Set menus in middleware as sessions are not stored already in service providers instead
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->makeAdminMenu();
        return $next($request);
    }

    private function makeAdminMenu()
    {
        Menu::make('admin', function ($menu) {
            $dashboard = $menu->add(trans('admin.menu.dashboard'), ['route' => 'admin.root'])
                ->icon('dashboard')
                ->prependIcon();

            $household = $menu->add(trans('admin.menu.household.root'), '#')
                ->icon("home")
                ->prependIcon();

            $household->add(trans('admin.menu.household.add'), ['route' => 'admin.household.create'])
                ->icon($this->circle)
                ->prependIcon();

            $household->add(trans('admin.menu.household.all'), ['route' => 'admin.household.index'])
                ->icon($this->circle)
                ->prependIcon();

            /*
            $pages = $menu->add(trans('admin.menu.page.root'), '#')
                ->icon('folder')
                ->prependIcon();

            $pages->add(trans('admin.menu.page.add'), ['route' => 'admin.page.create'])
                ->icon($this->circle)
                ->prependIcon();

            $pages->add(trans('admin.menu.page.all'), ['route' => 'admin.page.index'])
                ->icon($this->circle)
                ->prependIcon();

            $categories = $menu->add(trans('admin.menu.category.root'), '#')
                ->icon('book')
                ->prependIcon();

            $categories->add(trans('admin.menu.category.add'), ['route' => 'admin.category.create'])
                ->icon($this->circle)
                ->prependIcon();

            $categories->add(trans('admin.menu.category.all'), ['route' => 'admin.category.index'])
                ->icon($this->circle)
                ->prependIcon();

            $articles = $menu->add(trans('admin.menu.article.root'), '#')
                ->icon('edit')
                ->prependIcon();

            $articles->add(trans('admin.menu.article.add'), ['route' => 'admin.article.create'])
                ->icon($this->circle)
                ->prependIcon();

            $articles->add(trans('admin.menu.article.all'), ['route' => 'admin.article.index'])
                ->icon($this->circle)
                ->prependIcon();

            */

            if (\Auth::user()->hasRole("admin"))
            {
                $users = $menu->add(trans('admin.menu.user.root'), '#')
                    ->icon('users')
                    ->prependIcon();

                $users->add(trans('admin.menu.user.add'), ['route' => 'admin.user.create'])
                    ->icon($this->circle)
                    ->prependIcon();

                $users->add(trans('admin.menu.user.all'), ['route' => 'admin.user.index'])
                    ->icon($this->circle)
                    ->prependIcon();


                $users->add("List Affiliations", ['route' => 'admin.affiliation.index'])
                    ->icon($this->circle)
                    ->prependIcon();

                $settings = $menu->add(trans('admin.menu.setting'), ['route' => 'admin.setting.index'])
                    ->icon('gears')
                    ->prependIcon();

                $users->add("Pending Registrations", ['route' => 'admin.user.pending'])
                    ->icon($this->circle)
                    ->prependIcon();
            }
        });
    }
}
