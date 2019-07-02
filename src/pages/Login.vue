<template lang="pug">
q-page.base-padding
  .login.fixed-center

    h4.q-mb-lg.base-title.text-grey-5  {{ $trans('titles', 'login') }}

    q-form.q-mb-md.q-gutter-xs.text-center(@submit="handle_login")
      q-input(
          v-model="user_email"
          :label="$trans('labels', 'user_email')"
          :rules="validate('empty', 'email')"
          type="email"
          color="white"
          dark
          clearable)
      q-input(
          v-model="user_name"
          :label="$trans('labels', 'user_name')"
          :rules="validate_empty"
          color="white"
          dark
          clearable)

    .flex.justify-between.q-mb-md.text-grey-14
      q-checkbox(
          v-model="remember_user"
          :label="$trans('labels', 'remember_me')"
          text-color="teal"
          dark)
      q-btn(
        :label="`${$trans('labels', 'forgot_password')}?`"
        flat
        dark
        no-caps)

    .flex.justify-between
      q-btn.text-underline(
        :label="registered_label"
        flat
        dark
        no-caps
        color="white"
        @click="handle_register")
      q-btn.text-black(
        :label="$trans('labels', 'sign_in')"
        dark
        no-caps
        color="white"
        type="submit")
</template>

<script>
import { input_validators } from 'src/mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',

  mixins: [input_validators],

  data () {
    return {
      user_email: null,
      user_name: null,
      remember_user: true
    }
  },

  computed: {
    ...mapGetters(['get_origin_url']),

    registered_label () {
      return `${this.$trans('labels', 'not_registered')}? ${this.$trans('labels', 'sign_up')}`
    }
  },

  methods: {
    handle_register () {
      let url = `${this.get_origin_url}/auth/registration`
      this.$open_url(url)
    },

    handle_login () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  width: 420px
</style>
