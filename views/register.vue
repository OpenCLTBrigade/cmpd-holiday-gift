<template>
  <auth-layout>
    <div class="container">
      <div class="login-box" id="login-box">
        <p>{{flash}}</p>
        <div class="header">
            <i class="fa fa-user-plus"></i> Register
        </div>
      <form id="signup" name="register" method="post" action="/register">
        <div class="body">
            <!-- TODO: include errors.validation -->
            <div class="form-group has-feedback">
              <label for="firstname">First Name</label>
              <input class="form-control" name="firstname" type="text" />
              <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="lastname">Last Name</label>
              <input class="form-control" name="lastname" type="text" />
              <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="affiliation">Affiliation</label>
              <select class="form-control" name="affiliation">
                <option value="" disabled hidden>=== Select affiliation ===</option>
                <option v-for="affiliate in affiliation" v-bind:value="affiliate.id">
                  {{ affiliate.type.toUpperCase() }} - {{ affiliate.name }}
                </option>
            </select>
              <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="rank">Rank</label>
              <input class="form-control" name="rank" type="text" />
              <i class="fa form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="phone">Phone</label>
              <input class="form-control" name="phone" type="tel" />
              <i class="fa fa-phone form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="email">Email Address</label>
              <input class="form-control" name="email" type="email" />
              <i class="fa fa-envelope form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="password">Password</label>
              <input class="form-control" name="password" type="password" autocomplete="off" />
              <i class="fa fa-lock form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
              <label for="password_confirmation">Confirm Password</label>
              <input class="form-control" name="password_confirmation" type="password" autocomplete="off" />
              <i class="fa fa-lock form-control-feedback"></i>
            </div>
            <div class="form-group has-feedback">
                <!-- TODO: Add Recaptcha -->
            </div>
        </div>

        <div class="footer">
            <input class="btn bg-auth btn-block btn-flat" type="submit" value="Register" />
            <hr/>
            <div class="row">
                <div class="col-xs-6">
                    <a class="btn btn-link" href="/login"> <i class="fa fa-sign-in"></i>Login</a>
                </div>
            </div>
        </div>
      </form>
    </div>
</div>
  </auth-layout>
</template>

<script>
  module.exports = {
      props: {affiliation: {required: true}, flash: {default: ''}},
      components: {'auth-layout': require('./layouts/auth.vue')}
  };
</script>

<style>
</style>
