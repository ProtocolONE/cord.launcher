<template lang="pug">
q-layout.l-auth
  q-page-container
    router-view
</template>

<script>
// --- TODO: set loading indicator
export default {
  name: 'AuthLayout'
}
</script>

<style lang="stylus" scoped>
.l-auth
  background-color: $primary
</style>
