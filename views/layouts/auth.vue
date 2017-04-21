<!-- The layout for the login and register pages -->

<template>
  <div class="auth-wrapper">>
    <div class="auth-header login-box">
      <img src="/img/auth-logo.png" title="CMPD Explorers Christmas Project">
      <div class="made-by">By Code For Charlotte</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  module.exports = {
    
  };
</script>

<style lang="less">
@auth_color: #3c8dbc;
@logo_blue: #00355d;

body {
    background-color: #eeeeee;
    color: white;
    font-weight: bold;
    &:hover {
        color: saturate(white,25%);
    }
}

.auth-header {
    background-color: #eeeeee;
    border-radius: 4px;
    img {
        max-width: 100%;
        display: block;
        margin: 0px auto;
    }
    .made-by {
        text-align: center;
        font-size: 180%;
        color: #6da1e4;
        position: relative;
        top: -10px;
    }
}

.auth-wrapper {
    margin-top: 2%;
    margin-bottom: 2%;
}

.login-box {
    margin: 10px auto;
    .header {
        background: none repeat scroll 0 0 @logo_blue;
        border-radius: 4px 4px 0 0;
        box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.2) inset;
        color: #fff;
        font-size: 26px;
        font-weight: 300;
        padding: 20px 10px;
        text-align: center;
    }
    .body {
        background: none repeat scroll 0 0 #fff;
        color: #444;
        padding: 10px 20px;
        .fa {
            margin-top: 10px;
        }
    }
    .footer {
        background: none repeat scroll 0 0 #fff;
        color: #444;
        padding: 10px 20px;
        border-radius: 0 0 4px 4px;
        a {
            padding-left: 0;
        }
    }
}
</style>
