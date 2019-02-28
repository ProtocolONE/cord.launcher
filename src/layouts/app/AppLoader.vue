<template>
<q-layout class="app-layout">
  <q-page-container>
    <q-page class="flex items-center justify-center">
      <q-spinner-grid color="tertiary" size="15%"/>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.app-layout {
  background-color: lighten($page-background, 25%)
}
</style>
