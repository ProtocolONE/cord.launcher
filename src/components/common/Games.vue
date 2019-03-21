<template lang="pug">
section.games

  header.q-mb-lg.row
    .col.flex.items-center
      base-title.q-mb-none {{ title }}
      q-icon.q-ml-sm.tooltip(v-if="tooltip" name="fas fa-info-circle fa-lg")
        q-tooltip(v-html="tooltip")
      q-btn.capitalize.q-ml-auto.more(v-if="more" :to="more" :label="$trans('labels', 'more')")

  .row.gutter-sm
    div(
      v-for="(game, i) in games"
      :key="game.name + i"
      :class="classes[rowItems]"
    )
      game-item(:game="game")

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Game } from 'interfaces'

import GameItem from './GameItem'

@Component({
  components: { GameItem }
})
export default class Games extends Vue {
  @Prop({
    type: String,
    default: '4',
    validator (value: string): boolean {
      return ['1', '2', '4'].includes(value)
    }
  })
  rowItems: string

  @Prop(String) title: string
  @Prop(String) tooltip: string
  @Prop(String) more: string
  @Prop(Array) games: Game[]

  classes = {
    '1': 'col-12',
    '2': 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
    '4': 'col-lg-3 col-md-6 col-sm-12 col-xs-12'
  }
}
</script>

<style lang="stylus" scoped>
.games:not([class*="q-pa-none"])
  padding: 30px 45px 40px

.tooltip
  color: rgba(144, 144, 144, .5)

.more
  background-color: rgba(18, 18, 18, .3)
  font-size: 14px
</style>
