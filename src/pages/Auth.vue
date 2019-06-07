<template lang="pug">
q-page
  iframe(:src="src" style="width:100vw;height:100vh")
<!--  form(@submit.prevent="login")-->
<!--    .row.gutter-sm.justify-center-->
<!--      .col-lg-6.col-md-8.col-12.row-->
<!--        .col-12-->
<!--          base-title {{ $trans('titles', 'login') }}-->
<!--        .col-12-->
<!--          base-input(v-model="email" type="email" :label="$trans('labels', 'email')")-->
<!--        .col-12.q-mb-lg-->
<!--          base-input(v-model="password" type="password" :label="$trans('titles', 'password')")-->

<!--        .col-12.row.q-mb-lg.items-center-->
<!--          .col-6-->
<!--            base-checkbox.dark(v-model="is_remember" :label="$trans('labels', 'rememberMe')")-->
<!--          .col-6.flex.justify-end-->
<!--            router-link.q-link.dark(to="/auth")-->
<!--              | {{ $trans('labels', 'forgotPassword') }}-->

<!--        .col-12.row.q-mt-lg.items-center-->
<!--          .col-6-->
<!--            router-link.q-link.underline(to="/auth")-->
<!--              | {{ sign_up_label }}-->
<!--          .col-6.flex.justify-end-->
<!--            q-btn.capitalize(type="submit" color="white" text-color="primary")-->
<!--              | {{ $trans('labels', 'signIn') }}-->
</template>

<script>
export default {
  name: 'AuthPage',

  data () {
    return {
      src: 'http://localhost:3000/login',
      email: null,
      password: null,
      is_remember: false
    }
  },

  computed: {
    sign_up_label () {
      let unregistered = this.$trans('labels', 'notRegistered')
      let sign_up = this.$trans('labels', 'signUp')
      return `${unregistered} ${sign_up}`
    }
  },

  created () {
    window.addEventListener('message', (e) => {
      console.log(e.data)
    })
  }
}
</script>

<style lang="stylus" scoped>
.p-auth
  overflow: hidden
</style>
