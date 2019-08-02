<template lang="pug">
q-page.auth
  q-dialog(:value="true" persistent)
    q-card.auth-modal
      q-card-section.flex.items-center.justify-center.auth-modal__body
        iframe.auth-modal__frame(:src="src" frameborder="0")
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OAuth2Page',

  data () {
    return {
      email: null,
      password: null,
      is_remember: false
    }
  },

  computed: {
    ...mapState('oauth2', {
      src: state => `${state.url}/login`
    })
  },

  created () {
    window.addEventListener('message', this.handle_post_message, false)
  },

  destroyed () {
    window.removeEventListener('message', this.handle_post_message, false)
  },

  methods: {
    ...mapActions('oauth2', ['update_user_info']),
    ...mapMutations('oauth2', ['set_token', 'set_token_expires']),

    async handle_post_message (e) {
      console.log(e.data)

      // let name = data.name
      // if (name === 'formResize') return
      //
      // if (!this.is_form_loaded) {
      //   if (name === 'loaded') {
      //     setTimeout(() => {
      //       this.is_form_loaded = true
      //     }, 500)
      //   }
      //   return
      // }
      //
      // try {
      //   if (data.success) {
      //     let { access_token, expires_in } = data
      //
      //     this.set_token(access_token)
      //     this.set_token_expires(expires_in)
      //
      //     await this.update_user_info()
      //
      //     this.$router.push({ name: 'registration' })
      //   }
      //
      //   if (data.error) console.error(data.error)
      // }
      // catch (error) {
      //   console.error(error)
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth-modal
  background-color: $white

  &__body
    width: 420px
    height: 600px
    max-width: 100%
    max-height: 100%
    min-width: 320px
    min-height: 600px
    padding: 0

  &__frame
    width: 100%
    height: 100%
    overflow: hidden
    border: 0
</style>
