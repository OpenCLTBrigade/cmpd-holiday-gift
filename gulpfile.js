var elixir = require('laravel-elixir'),
    bowerDir  = 'resources/assets/vendor/',
    adminLess  = [
        bowerDir + 'admin-lte/build/less',
        bowerDir + 'bootstrap-datepicker/less',
        bowerDir + 'font-awesome/less',
        "resources/assets/less/skin-cmpd.less"
    ],
    adminCss = [
        'bootstrap/dist/css/bootstrap.min.css',
        'nestable-fork/dist/jquery.nestable.min.css',
        'admin.css',
        'mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css',
        'datatables.net-bs/css/dataTables.bootstrap.min.css',
	    'datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css',
        'datatables.net-responsive-bs/css/responsive.bootstrap.css',
        'morris.js/morris.css'
    ],
    adminJs = [
        'jquery/dist/jquery.min.js',
        'vue/dist/vue.min.js',
	'js-cookie/src/js.cookie.js',
        'bootstrap/dist/js/bootstrap.min.js',
        'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
        'mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js',
        'datatables.net/js/jquery.dataTables.min.js',
        'datatables.net-bs/js/dataTables.bootstrap.min.js',
        'datatables-buttons/js/dataTables.buttons.js',
        'datatables-buttons/js/buttons.bootstrap.js',
        'datatables.net-fixedheader/js/dataTables.fixedHeader.js',
        'datatables.net-responsive/js/dataTables.responsive.js',
        'datatables.net-responsive-bs/js/responsive.bootstrap.js',
        'admin-lte/dist/js/app.min.js'
    ],
    applicationLess  = [
        bowerDir + 'font-awesome/less'
    ],
    applicationCss = [
        'bootstrap/dist/css/bootstrap.min.css',
        'jquery-floating-social-share/dist/jquery.floating-social-share.min.css',
        'datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css',
        'datatables.net-responsive-bs/css/responsive.bootstrap.css',
        'application.css'
    ],
    applicationJs = [
        'jquery/dist/jquery.min.js',
        'jquery-floating-social-share/dist/jquery.floating-social-share.min.js',
        'bootstrap/dist/js/bootstrap.min.js'
    ];

elixir(function(mix) {
    mix
        .less('admin.less', bowerDir + 'admin.css', { paths: adminLess })
        .styles(adminCss, 'public/css/admin.css', bowerDir)
        .scripts(adminJs, 'public/js/admin.js', bowerDir)
        .sass('admin-buttons.scss', 'public/css/admin-buttons.css')
        .copy('resources/assets/datatables/buttons.server-side.js', 'public/js/buttons.server-side.js')
        .copy('resources/assets/js/admin.js', 'public/js/admin-custom.js')
        .copy(bowerDir + 'font-awesome/fonts', 'public/build/fonts')
        .copy(bowerDir + 'bootstrap/fonts', 'public/build/fonts')
        .less('application.less', bowerDir + 'application.css', { paths: applicationLess })
        .styles(applicationCss, 'public/css/application.css', bowerDir)
        .scripts(applicationJs, 'public/js/application.js', bowerDir)
        .copy('resources/assets/js/application.js', 'public/js/application-custom.js')
        .version(['css/admin.css', 'css/application.css', 'js/admin.js', 'js/application.js']);
});
