<template lang="pug">
q-page#auth-web-form-example.auth
  q-dialog(:value="true" persistent full-width full-height)
    div
      iframe.auth-modal__frame(:src="src")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthWebFormExample',

  computed: {
    ...mapState('oauth2', {
      src: state => `${state.url}/login`
    }),

    screenResolution () {
      if (this.$route.query.type && this.$route.query.type === 'mobile') {
        return 'mobile'
      }
      return 'desktop'
    },

    isMobile () {
      return this.screenResolution === 'mobile'
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
