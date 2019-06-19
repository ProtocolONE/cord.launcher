<template lang="pug">
q-page {{ $route.name }}
</template>

<script>
export default {
  name: 'HomePage',

  created () {
    this.$store.dispatch('user/login_user')
  }
}
</script>
