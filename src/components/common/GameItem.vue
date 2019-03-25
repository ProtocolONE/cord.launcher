<template lang="pug">
.game.shadow-10(:style="style")
  router-link.q-link.q-pa-sm.flex.column.justify-between(:to="game.url")
    header.flex.justify-between

      base-title.text-bold(level="5" color="white") {{ game.name }}

      .flex.justify-center.items-center.user(v-if="game.users")
        q-btn.q-mr-sm.user__btn(
          :style="{ backgroundImage: `url(${ user.logo })` }"
          rounded
          flat
        )
        span.q-mr-sm.user__name {{ user.name }}
        q-btn.text-bold.user__count(
          :label="`+ ${ game.users.length - 1 }`"
          rounded
          flat
        )

    footer.row.items-center.justify-between(v-if="game.platforms || game.price")

      .col-auto.flex.items-center.justify-between
        icons-list(v-if="game.platforms" :icons="game.platforms")

      .col-auto.flex.items-center
        q-btn.q-pa-none.q-mr-sm
          box-icon(size="48" icon="fas fa-heart fa-lg" background="rgba(0, 0, 0, 0.3)")
        q-btn.roboto.q-pa-none.text-bold.price(v-if="game.price" color="secondary")
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
export default class GameItem extends Vue {
  @Prop(Object) game: Game

  get user () {
    return this.game.users[0]
  }

  get style () {
    return {
      backgroundImage: `url(${ this.game.preview })`
    }
  }
}
</script>

<style lang="stylus" scoped>
.game
  width: 100%
  height: 100%
  min-height: 200px
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  border-radius: 6px

.q-link
  width: 100%
  height: 100%

.user
  font-size: 14px

  &__btn
    width: 36px
    height: 36px
    background-repeat: no-repeat
    background-position: center
    background-size: cover

  &__name
    letter-spacing: -0.02em

  &__count
    width: 40px
    height: 40px
    padding: 0
    background-color: rgba(29, 29, 29, .4)
    letter-spacing: -0.05em
    line-height: 40px
</style>
