<template lang="pug">
#auth-web-form-example
  q-dialog(:full-width="!isMobile" :full-height="!isMobile" value persistent)
    q-card
      auth-web-form(title="Cord launcher" :mobile="isMobile")
</template>

<script>
import AuthWebForm from '@protocol-one/auth-web-form'

export default {
  name: 'AuthWebFormExample',

  components: {
    AuthWebForm
  },

  computed: {
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
