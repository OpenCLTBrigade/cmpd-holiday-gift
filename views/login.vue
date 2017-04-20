<template>
  <auth-layout>
  <div class="container">
    <p>{{message}}</p>
    <form id="login" name="login" method="post" action="login">
      <label for="email">Email Address</label>
      <input class="text" name="email" type="text" />
      <label for="password">Password</label>
      <input name="password" type="password" />
      <input class="btn" type="submit" value="Sign In" />
    </form>
  </div>
  </auth-layout>
</template>

<script>
  module.exports = {
    data: function () { return { message: "hi" }; },
    components: { 'auth-layout': require('./components/authLayout.vue') }
  }
</script>

<style></style>
