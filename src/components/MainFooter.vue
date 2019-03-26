<template lang="pug">
.row.main-footer

  .row.col-lg-2.col-md-2.col-sm-3.col-xs-4.gt-xs
    .col-12
      q-btn.lato.q-pa-none(to="/" aria-label="logo")
        box-logo.main-footer__logo(height="84" background="rgba(0, 0, 0, .5)")
    .col-12.q-pt-lg
      box.text-bold {{ currentYear }}

  .col-lg-2.col-md-4.col-sm-9.col-xs-8.gt-xs
    ul.text-bold.list
      li
        a.q-link(
          href="http://super.com"
          target="_blank"
          rel="noreferrer"
          @click.prevent="$openUrl('http://super.com')"
        )
          | Super.com
      li(v-for="{ name, url } in links" :key="name")
        router-link.q-link(:to="url" :aria-label="name") {{ name }}

  .col-lg-8.col-md-6.col-sm-12.col-xs-12.order-xs-first.order-md-none.q-mb-xs-md.q-mb-md-none
    copyright.q-mb-xl
    q-btn.q-pa-none.q-mr-lg.q-mb-md(v-for="icon in icons" :key="icon")
      box-icon(:icon="`${ icon } fa-2x`" background="rgba(0, 0, 0, 0.5)")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Box from 'components/Box'
import BoxLogo from 'components/BoxLogo'
import BoxIcon from 'components/BoxIcon'
import Copyright from 'components/Copyright'

@Component({
  components: { Box, BoxLogo, BoxIcon, Copyright }
})
export default class MainFooter extends Vue {
  currentYear = new Date().getFullYear()

  get icons () {
    let icons = ['fa-youtube', 'fa-twitter', 'fa-facebook-f']
    return icons.map(icon => `fab ${ icon }`)
  }

  get links () {
    let links = ['vacancies', 'company', 'terms', 'agreement']
    return links.map(link => ({ name: this.$trans('links', link), url: link }))
  }
}
</script>

<style lang="stylus" scoped>
.main-footer
  padding: 85px 45px 70px
  background-color: $primary

  &__logo
    color: rgba($white, .5)

.list
  font-size: 16px
  letter-spacing: -0.02em
  line-height: 40px
</style>
