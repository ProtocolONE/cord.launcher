<template lang="pug">
q-carousel.slider.color-white(
  height="460px"
  quick-nav
  infinite
  autoplay
)

  q-carousel-slide.flex.column.justify-between.q-pa-none(
    v-for="(game, i) in games"
    :key="game.name + i"
    :img-src="game.preview"
  )

    template(v-if="type === 'default'")

      header.row.justify-between.q-pa-md.slider__header
        .col-auto
          h4.text-bold.q-mb-xs.slider__title.color-white
            router-link.q-link(:to="game.url") {{ game.name }}
          q-rating(:value="game.rating" size="16" color="white" readonly)
        .col-auto
          base-paragraph.color-white.q-mb-sm(size="14")
            | {{ $trans('paragraphs', 'gamesFollowingTags') }}:
          .row.justify-end
            .col-auto(
              v-for="(tag, i) in game.tags"
              :key="tag"
              :class="{ ['q-mr-sm']: i !== (game.tags.length - 1) }"
            )
              base-tag(:label="tag")

      footer.row.justify-between.q-pa-md

        .col-auto.flex.items-center: icons-list(:icons="game.platforms")

        .col-auto
          q-btn.q-pa-none.q-mr-sm
            box-icon(size="48" icon="fas fa-heart fa-lg" background="rgba(0, 0, 0, 0.3)")
          q-btn.roboto.q-pa-none.text-bold.price(color="secondary")
            box(width="96" height="48") $ {{ game.price }}

    figure.flex.column.slider-separate(v-else-if="type === 'separate'")
      figcaption.q-pa-md.flex.column.justify-around.slider-separate__caption

        h4.text-bold.q-mb-xs.slider__title.color-white.slider-separate__title
          router-link.q-link(:to="game.url") {{ game.name }}

        base-paragraph.roboto.text-white.q-mb-md.slider-separate__paragraph(size="14")
          | {{ game.description }}

        .flex.items-center
          icons-list(:icons="game.platforms" :background="false")

  q-btn(
    :class="['quick-nav', { 'quick-nav--active': props.current }]"
    slot="quick-nav"
    slot-scope="props"
    color="white"
    flat
    dense
    rounded
    @click="props.goToSlide()"
  )
    q-icon.quick-nav__icon.quick-nav__icon--inactive(name="fas fa-circle fa-xs")
    q-icon.quick-nav__icon.quick-nav__icon--active(name="fas fa-circle")
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
export default class Slider extends Vue {
  @Prop(Array) games: Game[]
  @Prop({
    type: String,
    default: 'default',
    validator (value: string): boolean { return ['default', 'separate'].includes(value) }
  }) type: string
}
</script>

<style lang="stylus" scoped>
.slider
  border-radius: 4px

  &__header
    background-color: rgba(38, 38, 38, .5)

  &__title
    margin-top: 0
    font-size: 24px
    text-shadow: 0 2px 2px rgba(0, 0, 0, .45)
    letter-spacing: -0.02em

  /deep/
    .q-carousel-inner
      height: calc(100% - 40px - 10px)
      box-shadow: 0 6px 6px -3px rgba(0,0,0,0.2), 0 10px 14px 1px rgba(0,0,0,0.14), 0 4px 18px 3px rgba(0,0,0,0.12)

    .q-carousel-quick-nav
      height: 40px
      background: transparent
      .q-btn
        color: rgba($black, .9) !important
        &:not(.inactive)
          color: $white !important

.quick-nav
  position: relative

  &--active .quick-nav__icon--active
    visibility: visible

  &__icon
    padding: 5px

    &--active
      position: absolute
      visibility: hidden
      color: rgba($white, .9)
      font-size: 8px !important

    &--inactive
      color: rgba($black, .4)
      font-size: 16px !important

.price
  letter-spacing: 0.05em
  font-size: 16px

.slider-separate
  height: 100%
  margin: 0

  &__title
    font-size: 16px

  &__caption
    height: 230px
    margin-top: auto
    background-color: #484848

  &__paragraph
    opacity: .5
    line-height: 26px
</style>
