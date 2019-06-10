<template lang="pug">
q-layout.main

  q-header.main__header.header
    nav.roboto.flex.nav
      q-btn.q-pa-none(to="/" flat): logo.header__logo
      q-btn.text-capitalize.q-ml-lg.nav__item(v-for="{ name, path, label } in routes"
                                              :key="name"
                                              :to="path"
                                              :label="label"
                                              :aria-label="label"
                                              :class="{ active: $route.name === name }"
                                              flat)

      q-btn-dropdown.q-ml-auto.q-pa-none.q-pl-sm(flat)
        template(v-slot:label)
          q-avatar(size="40px"): img(src="https://cdn.quasar.dev/img/boy-avatar.png")
        q-list(bordered separator)
          q-item(v-close-popup clickable @click="logout")
            q-item-section Logout

  q-page-container: router-view

  q-footer.main__footer.footer
    q-btn.q-pa-none(to="/" flat): logo.footer__logo
</template>

<script>
import Logo from 'components/Logo'

import { main_routes } from 'src/router/routes'

export default {
  name: 'BaseLayout',

  components: {
    Logo
  },

  data () {
    return {
      routes: main_routes.map(route => ({
        name: route.name,
        path: route.path,
        label: this.$trans('links', route.name)
      }))
    }
  },

  methods: {
    logout () {
      this.$router.push({ name: 'logout' })
    }
  }
}
</script>

<style lang="stylus" scoped>
$tab-border-radius = 100px

.main
  &__header
    padding: 35px 45px
  &__footer
    padding: 85px 45px

.header
  &__logo
    opacity: 0.25

.footer
  &__logo
    height: 84px
    opacity: 0.5

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
      background: $secondary
      color: $white
</style>
