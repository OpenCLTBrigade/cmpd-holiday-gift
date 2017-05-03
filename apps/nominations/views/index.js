/* eslint-env browser */
/* global Vue */

// Load common libraries for all views
window.jQuery = window.$ = require('jquery');
window.Vue = require('vue').default;
require('admin-lte');
require('bootstrap');

// Load common styles
require('bootstrap/dist/css/bootstrap.css');
require('admin-lte/dist/css/AdminLTE.css');
require('font-awesome/css/font-awesome.css');

window.loadView = function (name, data) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    var View = Vue.extend(require(`./${name}.vue`));
    new View({
        el: div,
        propsData: data
    });
};

