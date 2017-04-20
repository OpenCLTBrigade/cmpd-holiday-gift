<template>
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
</template>

<script>
  export default {
    data: () => {},
  }
</script>

<style></style>
