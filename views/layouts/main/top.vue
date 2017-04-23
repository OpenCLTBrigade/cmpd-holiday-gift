<template>
  <header class="main-header">
    <a href="/" class="logo">Home</a>
    <nav class="navbar navbar-static-top" role="navigation">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="user">
            <a href="#" >
              <!-- TODO: why was this a link? -->
              <span class="hidden-xs">{{user.name_first}}</span>
            </a>
          </li>
          <li class="dropdown user user-menu">
            <a href="/logout">
              <i class="fa fa-sign-out"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  module.exports = {
    props: {
      user: {type: Object, required: true}
    }
  }
</script>
