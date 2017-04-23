<!-- The layout for the dashboard and main application -->

<template>
  <div class="wrapper">
    <main-top></main-top>
    <main-sidebar></main-sidebar>
    <div class="content-wrapper">
      <main-header></main-header>
      <section class="content">
        <div class="row">
          <!-- TODO: is no_box used anywhere? -->
          <div v-if="!no_box" class="col-xs-12">
            <div class="box">
              <div class="box-body">
                <flash-message>{{flash}}</flash-message>
                <slot></slot>
              </div>
            </div>
          </div>
          <template v-else>
            <flash-message>{{flash}}</flash-message>
            <slot></slot>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  module.exports = {
      data: () => ({
          no_box: false,
          flash: ''
      }),
      components: {
          'main-top': require('./main/top.vue'),
          'main-sidebar': require('./main/sidebar.vue'),
          'main-header': require('./main/header.vue'),
          'flash-message': require('../components/flashMessage.vue')
      }
  };
</script>

<style lang="less">
@import "../../node_modules/bootstrap/less/mixins.less";
@import "../../node_modules/bootstrap/less/variables.less";
@import "../../node_modules/admin-lte/build/less/mixins.less";
@import "../../node_modules/admin-lte/build/less/variables.less";
@import "../../vendor/navbar-variant.less";

@logo_blue: #00355d;

//Navbar
.main-header {
    .navbar {
        .navbar-variant(@logo_blue; #fff);
        .sidebar-toggle {
            color: #fff;
            &:hover {
                background-color: darken(@logo_blue, 5%);
            }
        }
        @media (max-width: @screen-header-collapse) {
            .dropdown-menu {
                li {
                    &.divider {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                    a {
                        color: #fff;
                        &:hover {
                            background: darken(@logo_blue, 5%);
                        }
                    }
                }
            }
        }
    }
    //Logo
    .logo {
        .logo-variant(darken(@logo_blue, 5%));
    }

    li.user-header {
        background-color: @logo_blue;
    }
}
//Content Header
.content-header {
    background: transparent;
}

//User Panel (resides in the sidebar)
.user-panel {

    > .info, > .info > a {
        color: #fff;
    }
}

//Sidebar & Treeview menu
// the menu
.sidebar-menu > li {
    &.header {
        color: lighten(@sidebar-dark-bg, 20%);
        background: darken(@sidebar-dark-bg, 4%);
    }
    > a {
        border-left: 3px solid transparent;
        margin-right: 1px;
    }
    //Hover and active states
    > a:hover, &.active > a {
        color: @sidebar-dark-hover-color;
        background: @sidebar-dark-hover-bg;
        border-left-color: @logo_blue;
    }

    > .treeview-menu {
        margin: 0 1px;
        background: @sidebar-dark-submenu-bg;
    }
}
// Sidebar color (Both .wrapper and .left-side are responsible for sidebar bg color)
.wrapper,
.main-sidebar,
.left-side {
    background: @sidebar-dark-bg;
}

.sidebar a {
    color: @sidebar-dark-color;
    &:hover {
        text-decoration: none;
    }
}
// skin blue treeview-menu
.treeview-menu {
    > li {
        > a {
            color: @sidebar-dark-submenu-color;
        }
        &.active > a, > a:hover {
                          color: @sidebar-dark-submenu-hover-color;
                      }
    }
}

.sidebar-form {
    .border-radius(3px);
    border: 1px solid lighten(@sidebar-dark-bg, 10%);
    margin: 10px 10px;
    input[type="text"], .btn {
        box-shadow: none;
        background-color: lighten(@sidebar-dark-bg, 10%);
        border: 1px solid transparent;
        height: 35px;
        .transition(all @transition-speed @transition-fn);
    }
    input[type="text"] {
        color: #666;
        .border-radius(2px, 0, 2px, 0) !important;
        &:focus, &:focus + .input-group-btn .btn {
                     background-color: #fff;
                     color: #666;
                 }
        &:focus + .input-group-btn .btn {
            border-left-color: #fff;
        }
    }
    .btn {
        color: #999;
        .border-radius(0, 2px, 0, 2px) !important;
    }
}


.skin-blue.layout-top-nav .main-header > .logo {
    .logo-variant(@logo_blue);
}

.wrapper, .main-sidebar, .left-side {
    background: #222222;
}

.sidebar-menu > li.active > a {
    background: darken(#222222, 5%);
}

.sidebar-menu > li > a:hover {
    background: darken(#222222, 5%);
}

.sidebar-menu > li > .treeview-menu {
    background: lighten(#222222, 5%);
}

.sidebar a {
    color: #ccc;
}

.treeview-menu > li > a {
    color : darken(#ccc, 5%);
}
</style>
