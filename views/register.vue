<template>
  <auth-layout>
    <div class="container">
      <p>{{flash}}</p>
      <form id="signup" name="register" method="post" action="/register">
        <label for="email">Email Address</label>
        <input class="text" name="email" type="email" />
        <label for="firstname">Firstname</label>
        <input name="firstname" type="text" />
        <label for="lastname">Lastname</label>
        <input name="lastname" type="text" />
        <label for="password">Password</label>
        <input name="password" type="password" />
        <input class="btn" type="submit" value="Register" />
      </form>
    </div>
  </auth-layout>
</template>

<script>
  export default {
    props: {flash: {default: ''}},
    components: {'auth-layout': require('./layouts/auth.vue')}
  }
</script>

<style>
</style>
