<template>
<section class="cord-padding l-game-line-more">

  <header v-if="title" class="l-game-line-more__header">
    <h2 v-if="title" class="title title--light color-light-3">
      {{ title }}
      <q-icon v-if="tooltip" :name="tooltipIcon" size=".7em" class="more-icon">
        <q-tooltip>{{ tooltip }}</q-tooltip>
      </q-icon>
    </h2>
    <q-btn v-if="more" :label="$t('more')" class="more-btn" @click="$router.push(more)"/>
  </header>

  <div class="row gutter-sm more-list">
    <div
        v-for="{ name, preview, url } in list"
        :key="`${ name }-${ _uid }`"
        class="col-lg-3 col-md-6 col-sm-6 col-xs-12 more-list__item">
        <router-link
            :to="url"
            :style="{ backgroundImage: `url(${ preview })` }"
            class="t-hover-opacity shadow-10 more-list__link">
          <span class="more-list__label">{{ name }}</span>
        </router-link>
    </div>
  </div>

</section>
</template>

<script>
export default {
  name: 'GameLineMore',

  props: {
    title: String,
    tooltip: String,
    tooltipIcon: {
      type: String,
      default: 'info' // icons from https://material.io/tools/icons/
    },
    more: String,
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-line-more
  ~ .l-game-line-more
    padding-top: 0
  &__header
    display: flex
    align-items: center
    margin-bottom: ($space-base * 1.5)
  @media (max-width $breakpoint-md-max)
    margin-top: ($space-base * 1.5)
    margin-bottom: ($space-base * 1.5)
    ~ .l-game-line-more
      margin-top: 0

.more-icon
  color: rgba(144, 144, 144, .5)

.more-btn
  margin-left: auto
  text-transform: capitalize
  background-color: rgba(18, 18, 18, .3)

.more-list
  &__link
    position: relative
    display: inline-flex
    width: 100%
    height: $block-md
    max-height: 25rem
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    border-radius: $border-radius
  &__label
    position: absolute
    top: $space-base
    left: $space-base
    font-size: 2.4rem
    letter-spacing: -.02em
    text-shadow: 0 .2rem .2rem rgba(0, 0, 0, .45)
</style>
