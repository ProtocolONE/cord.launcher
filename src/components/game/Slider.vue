<template lang="pug">
section.slider(:style="sliderStyle")

  header.row.gutter-sm.slider__header
    .col-lg-1.flex.items-center
      q-btn.capitalize.roboto.slider__back(
        :label="$trans('labels', 'back')"
        :style="btnStyle"
        color="white"
        @click="$router.go(-1)"
        flat
      )
    .col-lg-3
      base-title.q-mb-xs.text-white.text-bold.slider__title(level="4")
        | {{ game.name }}
      q-rating(:value="game.rating" size="16px" color="white" readonly)

    .row.col-lg-4
      base-tag(
        v-for="tag in game.tags"
        :key="tag"
        :label="tag"
        color="transparent"
      )

    .col-lg-4.flex.items-center.justify-end.roboto.release
      span.q-mr-sm.release__label {{ game.releaseDate }}
      span.q-mr-sm.release__divider
      span.release__label {{ game.developer }} / {{ game.publisher }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Game } from 'interfaces'

@Component
export default class Slider extends Vue {
  @Prop(Object) game: Game

  get sliderStyle () {
    return {
      backgroundImage: `url(${ this.game.preview })`
    }
  }

  get btnStyle () {
    return {
      backgroundImage: 'url(statics/images/arrow-left-bg.png)'
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  min-height: calc(100vw / 2)
  max-height: 850px
  background-repeat: no-repeat
  background-position: center
  background-size: cover

  &__header
    padding: $base-padding
    background-color: rgba(38, 38, 38, .5)

  &__back
    padding: 0 $space-base 0 ($space-base * 2)
    background-repeat: no-repeat
    background-position: left center
    letter-spacing: -0.02em
    color: rgba($white, .75)
    font-weight: normal
    &:hover /deep/ .q-focus-helper,
    &:focus /deep/ .q-focus-helper
      background: transparent !important

  &__title
    text-shadow: 0 2px 2px rgba(0, 0, 0, .5)

.release
  font-size: 16px

  &__divider
    width: 1px
    height: 24px
    background-color: #C4C4C4
</style>
