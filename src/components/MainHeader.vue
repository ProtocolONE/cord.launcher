<template lang="pug">
.main-header
  nav.roboto.flex
    q-btn.capitalize.q-pa-none.q-mr-lg(to="/" aria-label="logo" flat)
      box-logo.main-header__logo(background="rgba(8, 8, 8, .35)")
    q-btn.capitalize.q-mr-lg.nav__item(
      v-for="{ name, label, path } in routes"
      :key="name"
      :to="path"
      :label="label"
      :class="{ active: $route.name === name }"
      :aria-label="label"
      flat
    )
    q-btn.capitalize.q-ml-auto.nav__item(
      to="/user"
      label="User (for test)"
      aria-label="User (for test)"
      flat)
    q-btn.capitalize.nav__item(
      label="Sign out"
      aria-label="Sign out"
      flat
      @click="signOut")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MAIN_ROUTES } from '@/router/routes'

import BoxLogo from 'components/BoxLogo'

@Component({
  components: { BoxLogo }
})

export default class MainHeader extends Vue {
  get routes () {
    return MAIN_ROUTES.map(item => {
      item.label = this.$trans('links', item.name)
      return item
    })
  }

  signOut () {
    if (process.env.MODE === 'electron') {
      require('electron').ipcRenderer.send('logged', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
$tab-border-radius = 100px

.main-header
  padding: $base-padding
  background-color: $primary

  &__logo
    height: 48px
    color: rgba($white, .25)

.nav

  &__item
    height: 48px
    border-radius: $tab-border-radius
    font-weight: normal
    font-size: 16px
    color: $grey
    transition: color $transition-duration $transition-property

    &::before
      border-radius: $tab-border-radius
      
    &.active
      background: #080808
      color: $white
</style>
