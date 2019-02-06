<template>
<q-tabs :class="$style.app_nav" color="transparent">
  <q-route-tab
      v-for="{ name, path } in pages"
      :key="name"
      :name="name"
      :to="path"
      class="app-nav__item"
      slot="title">
    {{ $t(name) }}
  </q-route-tab>
</q-tabs>
</template>

<script>
import { pages } from '@src/router/routes'

export default {
  name: 'AppNav',

  data () {
    return {
      pages
    }
  }
}
</script>

<style lang="stylus" module>
@import '~variables'

.app_nav

  [class~="q-tabs-head"]
    font-size: 1.6rem

  [class~="q-tabs-bar"]
    display: none

  [class~="q-link"]
    padding: 0 1.6rem

    color: $text-color-light-2
    font-weight: normal
    text-transform: capitalize

    border-radius: 10rem
    transition: background .3s linear .3s, color .3s linear

    &::before
      border-radius: 10rem

    &:not(:last-child)
      margin-right: 2.4rem

    &[class~="active"]
      background: $bg-black
      color: $white

      &::before
        background: $page-background
</style>
