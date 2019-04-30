<template lang="pug">
q-layout.auth

  q-layout-header.auth-header
    nav.roboto.flex
      q-btn.capitalize.q-pa-none.q-mr-lg(to="/auth" aria-label="logo" flat)
        box-logo.main-header__logo(background="rgba(8, 8, 8, .35)")
      q-btn.q-ml-auto.capitalize.q-mr-sm(
        to="/auth"
        label="Login"
        aria-label="Login"
        flat
      )
      q-btn.capitalize(
        to="/auth/sign"
        label="Sign"
        aria-label="Sign"
        flat
      )

  q-page-container.auth-container
    slot: router-view

  q-layout-footer.auth-footer
    .row.gutter-sm.q-mb-sm: .col.flex.justify-center
      base-paragraph.auth__paragraph {{ $trans('labels', 'orSignWith') }}
    .row.gutter-sm.flex.justify-center.q-mb-lg
      .col-auto
        q-btn.q-pa-none(to="/auth" flat)
          box-icon(icon="fab fa-facebook-f" width="84" height="48")
      .col-auto
        q-btn.q-pa-none(to="/auth" flat)
          box-icon(icon="fab fa-odnoklassniki" width="84" height="48")
      .col-auto
        q-btn.q-pa-none(to="/auth" flat)
          box-icon(icon="fab fa-vk" width="84" height="48")
    .row.flex.justify-center
      .col.text-center
        a.q-link(href="#" @click.prevent) {{ $trans('labels', 'legalLinks') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import BoxLogo from 'components/BoxLogo'
import BoxIcon from 'components/BoxIcon'

@Component({
  components: { BoxLogo, BoxIcon }
})
export default class AuthLayout extends Vue {}
</script>

<style lang="stylus" scoped>
.auth
  background-color: $primary

  &__paragraph
    color: $tertiary !important

.auth-header,
.auth-footer
  padding: $base-padding
  box-shadow: none

.q-link
  color: $tertiary
  text-decoration: underline
</style>
