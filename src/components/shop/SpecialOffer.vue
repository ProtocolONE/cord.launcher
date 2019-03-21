<template lang="pug">
section.special-offer(:style="style")

  base-tag(:to="game.url" :label="$trans('labels', 'specialOffer')")

  .row
    .col.flex.column.items-center.justify-center
      base-title.color-white.text-bold.q-mb-sm(level="4")
        router-link.q-link(:to="game.url") {{ game.name }}
      q-rating.q-mb-xl(:value="game.rating" size="16" color="white" readonly)
      q-btn.text-bold.roboto.special-offer__price(
        :to="game.url"
        :label="`$ ${ game.price }`"
        color="secondary"
      )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Game } from 'interfaces'

@Component
export default class SpecialOffer extends Vue {
  @Prop(Object) game: Game

  get style () {
    return { backgroundImage: `url(${ this.game.preview })` }
  }
}
</script>

<style lang="stylus" scoped>
.special-offer
  height: calc(100vw / 4)
  min-height: 250px
  max-height: 500px
  padding: $base-padding
  background-position: center
  background-size: cover
  background-repeat: no-repeat

  &__price
    padding: 5px 40px
    font-size: 20px
    letter-spacing: 0.05em
</style>
