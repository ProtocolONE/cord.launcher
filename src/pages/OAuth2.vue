<template lang="pug">
q-page.auth
  q-dialog(:value="true" persistent)
    q-card.auth-modal
      q-card-section
        .text-h6 {{ $trans('titles', 'auth') }}
      q-separator
      q-card-section.flex.items-center.justify-center.auth-modal__body
        q-spinner(name="ring"
                  v-show="!is_form_loaded"
                  color="accent"
                  size="10em")
        iframe.auth-modal__frame(v-show="is_form_loaded" :src="src")
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'OAuth2Page',

  data () {
    return {
      is_form_loaded: false,
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

  methods: {
    ...mapMutations('oauth2', ['set_token', 'set_token_expires']),

    handle_post_message ({ data }) {
      let name = data.name
      if (name === 'formResize') return

      if (!this.is_form_loaded) {
        if (name === 'loaded') {
          setTimeout(() => {
            this.is_form_loaded = true
          }, 500)
        }
        return
      }

      try {
        if (data.success) {
          let { access_token, expires_in } = data

          this.set_token(access_token)
          this.set_token_expires(expires_in)

          // this.$router.push({ name: 'registration' })
          // --- TODO: add registration step
          this.$router.push({ name: 'home' })
        }

        if (data.error) console.error(data.error)
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
