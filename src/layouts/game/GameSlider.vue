<template>
<section class="l-game-slider" :style="sliderStyle">

  <header class="row cord-padding gutter-md l-game-slider__header">

    <div class="col-lg-1">
      <q-btn
          :label="$t('back')"
          :style="buttonBackStyle"
          flat
          color="#FFF"
          class="l-game-slider__back"
          :class="$style.no_bg"
          @click="$router.go(-1)"/>
    </div>

    <div class="col-lg-3">
      <h5 class="title title--bold">{{ name }}</h5>
      <q-rating :value="rating" size="1.6rem" color="white" readonly/>
    </div>

    <div class="col-lg-4 row following-tags">
      <div
          v-for="tag in followTags"
          :key="tag"
          class="col-auto following-tags__item">
        <q-btn
            :label="tag"
            style="background-color:rgba(0, 0, 0, 0.15)"
            rounded
            class="following-tags__btn"/>
      </div>
    </div>

    <div class="col-lg-4 justify-end released">
      <span>{{ releasedLabel }}</span>
      <span class="released__divider"></span>
      <span>{{ developer }} / {{ publisher }}</span>
    </div>

  </header>

</section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'GameSlider',

  props: {
    name: String,
    preview: String,
    rating: [String, Number],
    followTags: Array,
    releaseDate: [Date, Number, String],
    developer: String,
    publisher: String
  },

  computed: {
    sliderStyle () {
      return { backgroundImage: `url(${ this.preview })` }
    },

    buttonBackStyle () {
      return { backgroundImage: `url(statics/button-back-bg.png)` }
    },

    releasedLabel () {
      let date = moment(this.releaseDate).locale(this.$i18n.locale).format('MMMM D, YYYY')
      return `${ this.$t('releasedOn') } ${ date }`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.cord-padding
  @media (min-width $breakpoint-xl-min)
    padding: ($space-base * 1.8) ($space-base * 2.4)

.l-game-slider
  min-height: calc(var(--vw) / 2)
  max-height: 85.4rem
  background-repeat: no-repeat
  background-position: center
  background-size: cover

  &__header
    background-color: rgba(38, 38, 38, .5)

  &__back
    min-width: 8.4rem
    min-height: 4rem
    padding: ($space-base / 2) $space-base ($space-base / 2) ($space-base * 1.5)
    text-transform: capitalize
    background-repeat: no-repeat
    background-position: left center
    opacity: .75

.following-tags
  &__item
    margin-bottom: ($space-base / 2)
    &:not(:last-child)
      margin-right: ($space-base / 2)
  &__btn
    height: 4rem
    padding: $space-base ($space-base * 1.5)
    font-family: Roboto
    font-weight: bold
    font-size: 1.2rem
    letter-spacing: .1em
    line-height: 1em
    text-transform: uppercase

.released
  display: flex
  align-items: center
  font-family: Roboto
  font-size: 1.6rem

  &__divider
    width: .1rem
    height: 2.4rem
    background-color: $text-color-light-4

  > *:not(:last-child)
    margin-right: ($space-base / 1.5)
</style>

<style lang="stylus" module>
.no_bg:hover [class~="q-focus-helper"],
.no_bg:focus [class~="q-focus-helper"]
  background-color: transparent !important
</style>
