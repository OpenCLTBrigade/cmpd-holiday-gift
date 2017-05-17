<subcomponent name="registration-field">
    <template>
        <div class="form-group has-feedback" :class="validate && {'has-error': errors.has(name) }">
            <label :for="name">{{label}}</label>
            <input :id="name" v-validate="validate" class="form-control" :name="name" :type="type" :value="devel[name]"/>
            <i class="fa form-control-feedback" :class="{icon}"></i>
            <p class="text-danger" v-if="validate && errors.has(name)">{{ errors.first(name) }}</p>
        </div>
    </template>
    <script>
        module.exports = {
            props: {
                name: {required: true},
                label: {required: true},
                validate: {default: null},
                type: {default: 'text'},
                icon: {default: null}
            },
            computed: {
                devel: function () {
                    return this.$parent.$root.devel;
                }
            }
        };
    </script>
</subcomponent>

<template>
  <auth-layout>
    <div class="container">
      <div class="login-box" id="login-box">
        <!-- TODO <p>{{flash}}</p>-->
        <div class="header">
            <i class="fa fa-user-plus"></i> Register
        </div>
      <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted" id="signup" name="register" method="post" action="/register">
        <div class="body">
            <!-- TODO: include errors.validation -->
            <registration-field name="firstname" label="First Name" validate="required|regex:^[a-zA-Z-. ]+$|min:1" />
            <registration-field name="lastname" label="Last Name" validate="required|regex:^[a-zA-Z-. ]+$|min:1" />
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
            <registration-field name="rank" label="Rank" />
            <registration-field name="phone" label="Phone" validate="required" />
            <registration-field name="email" label="Email" validate="required|email" />
            <registration-field name="password" label="Password" validate="required" type="password" icon="fa-lock" />
            <registration-field name="password_confirmation" label="Password (again)" validate="confirmed:password" type="password" icon="fa-lock" />
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
    /* eslint-env browser */

    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);

    export default {
        props: ({affiliation: {required: true}, devel: {default: () => ({})}}),
        data: () => ({formSubmitted: false}),
        components: {'auth-layout': require('./layouts/auth.vue')},
        methods: {
            validateBeforeSubmit(_e) {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    this.submitForm();
                }
            },
            submitForm() {
                document.getElementById('signup').submit();
                this.formSubmitted = true;
            }
        }
    };
</script>

<style>
</style>
