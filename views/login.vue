<template>
  <auth-layout>
    <div class="login-box" id="login-box">
      <flash-message>{{message}}</flash-message>
      <div class="header">
        <i class="fa fa-sign-in"></i> Sign-in
      </div>
      <form id="login" name="login" method="post" action="login">
        <div class="body">
          <!-- TODO: include errors.validation -->
          <div class="form-group has-feedback">
            <label for="email">Email Address</label>
            <input class="form-control" name="email" type="text" />
            <i class="fa fa-envelope form-control-feedback"></i>
          </div>
          <div class="form-group has-feedback">
            <label for="password">Password</label>
            <input class="form-control" name="password" type="password" />
            <i class="fa fa-lock form-control-feedback"></i>
          </div>
          <div class="form-group">
            <input type="checkbox" /> Remember me
          </div>
        </div>
        <div class="footer">
          <input class="btn bg-auth btn-block btn-flat" type="submit" value="Sign In" />
          <!-- TODO: forgot email -->
          <div class="col-xs-6">
            <a class="btn btn-link pull-right" href="/register">
              <i class="fa fa-user-plus"></i> Register
            </a>
          </div>
        </div>
      </form>
    </div>
  </auth-layout>
</template>

<script>
  module.exports = {
    data: function () { return { message: "hi" }; } ,
    components: {
        'auth-layout': require('./layouts/auth.vue'),
        'flash-message': require('./components/flashMessage.vue')
    }
  }
</script>

<style></style>
