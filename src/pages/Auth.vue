<template lang="pug">
q-page.auth
  q-dialog(:value="true" persistent)
    q-card.auth-modal
      q-card-section
        .text-h6 {{ $trans('titles', 'auth') }}
      q-separator
      q-card-section.flex.auth-modal__body
        iframe.auth-modal__frame(:src="src")
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AuthPage',

  data () {
    return {
      // --- TODO: get src from env
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
    window.addEventListener('message', this.handle_post_message, false)
  },

  methods: {
    ...mapMutations(['set_token']),

    handle_post_message ({ data }) {
      try {
        let {
          access_token,
          success,
          error
        } = data

        if (success && access_token) {
          let route = JSON.parse(sessionStorage.getItem('route'))
          sessionStorage.removeItem('route')
          this.set_token(access_token)
          this.$router.go(route || 0)
        }

        if (error) console.error(error)
      }
      catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth-modal
  background-color: $white

  &__body
    width: 500px
    height: 500px

  &__frame
    width: 100%
    height: 100%
    padding-top: 50px
</style>
