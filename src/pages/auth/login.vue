<template lang="pug">
q-page.login
  form
    .row.gutter-sm.justify-center
      .col-lg-4.col-md-6.col-12.row
        .col-12: base-title {{ $trans('titles', 'login') }}
        .col-12: base-input(v-model="email" type="email" :label="$trans('labels', 'email')")
        .col-12.q-mb-lg: base-input(v-model="pwd" type="password" :label="$trans('titles', 'password')")

        .col-12.row.q-mb-lg.items-center
          .col-6
            base-checkbox.dark(v-model="remember" :label="$trans('labels', 'rememberMe')")
          .col-6.flex.justify-end
            router-link.q-link.dark(to="/auth") {{ $trans('labels', 'forgotPassword') }}

        .col-12.row.q-mt-lg.items-center
          .col-6
            router-link.q-link.underline(to="/auth") {{ signUpLabel }}
          .col-6.flex.justify-end
            q-btn(type="submit" color="white" text-color="primary") {{ $trans('labels', 'signIn') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  email = null
  pwd = null
  remember = false

  get signUpLabel () {
    return this.$trans('labels', 'notRegistered') + ' ' + this.$trans('labels', 'signUp')
  }
}
</script>

<style lang="stylus" scoped>
.login
  padding: $base-padding

.dark
  color: #4B4B4B

.underline
  text-decoration: underline
</style>
