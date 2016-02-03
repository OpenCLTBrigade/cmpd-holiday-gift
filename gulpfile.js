var elixir = require('laravel-elixir');
var gulp = require('gulp');

apidoc = require('gulp-apidocjs');

gulp.task('apidoc', function(cb){
    apidoc.exec({
        src: "app/Http/Controllers",
        dest: "public/docs/"
    }, cb);
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss')
        .task('apidoc');
});

