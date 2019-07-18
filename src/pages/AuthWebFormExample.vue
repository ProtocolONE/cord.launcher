<template lang="pug">
#auth-web-form-example
  q-dialog(value full-width full-height persistent)
    q-card
      auth-web-form(title="Cord launcher")
</template>

<script>
import AuthWebForm from '@protocol-one/auth-web-form'

export default {
  name: 'AuthWebFormExample',

  components: {
    AuthWebForm
  }
}
</script>
