<template lang="pug">
section.row.info

  .row.col-lg-2.col-md-2.col-sm-6.col-xs-5.items-center
    icons-list(:icons="game.platforms" :background="false")

  .row.col-lg-6.col-md-4.col-sm-12.col-xs-12.items-center.order-xs-first.order-md-none.roboto.locales
    .col-auto.q-mr-sm
      q-icon.q-mr-sm(name="fas fa-globe" size="20px")
      | {{ $trans('locales', $q.i18n.getLocale()) }}
    .col-auto
      box(size="48" radius="50%" background="rgba(0, 0, 0, .6)") +3

  .row.col-lg-4.col-md-6.col-sm-6.col-xs-7.items-center.justify-md-end.no-wrap
    q-btn.q-pa-none.q-mr-sm
      box-icon(size="48" icon="fas fa-heart fa-lg")
    q-btn.q-pa-none.text-bold.roboto(color="secondary")
      box(width="96" height="48") $ {{ game.price }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Game } from 'interfaces'

import Box from 'components/Box'
import BoxIcon from 'components/BoxIcon'
import IconsList from 'components/common/IconsList'

@Component({
  components: { Box, BoxIcon, IconsList }
})
export default class Info extends Vue {
  @Prop(Object) game: Game
}
</script>

<style lang="stylus" scoped>
.info
  padding: $base-padding
  background-color: $primary

.locales
  font-size: 16px
</style>
