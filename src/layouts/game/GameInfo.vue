<template>
<section class="row cord-padding l-game-info">

  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 row items-center icons">
    <div v-for="platform in platforms" :key="platform" class="icons__item">
      <icon :name="platform" :size="iconsSize" :fill="iconsColor"/>
    </div>
  </div>

  <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12 row items-center order-xs-first order-md-none locales">
    <div class="col-auto locales__current">
      <icon name="internationalization" :size="iconsSize" :stroke="iconsColor" fill="transparent"/>
      {{ $t(locale) }}
    </div>
    <div class="col-auto locales__list">
      <icon-box size="48" radius="50%">+3</icon-box>
    </div>
  </div>

  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 row items-center justify-md-end no-wrap">

    <a href="javascript:void(0)" class="col-auto icon-box-link">
      <icon-box width="100%" height="48" class="icon-box icon-box--recommended">
        <icon name="heart" :size="iconsSize" :fill="iconsColor"/>
        {{ recommended }}
      </icon-box>
    </a>

    <a href="javascript:void(0)" class="col-auto icon-box-link">
      <icon-box width="100%" height="48" class="col-auto icon-box icon-box--price">
        $ {{ price }}
      </icon-box>
    </a>

  </div>

</section>
</template>

<script>
import Icon from '@components/Icon'
import IconBox from '@components/blocks/IconBox'

import { keys, pickBy } from 'lodash'

export default {
  name: 'GameInfo',

  components: { Icon, IconBox },

  props: {
    availablePlatforms: Object,
    recommended: [String, Number],
    price: [String, Number],
    locale: String
  },

  data () {
    return {
      iconsSize: 20,
      iconsColor: '#FFF'
    }
  },

  computed: {
    platforms () {
      return keys(
        pickBy(this.availablePlatforms, Boolean)
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-info
  background-color: $bg-dark

  @media (min-width $breakpoint-lg-min)
    $p = ($space-base * 2)
    padding-top: $p
    padding-bottom $p

  @media (max-width $breakpoint-sm-max)
    > *
      margin-bottom: $space-base

.icons__item:not(:last-child)
  margin-right: ($space-base * 2)

.icon-box-link
  flex: 1
  max-width: 16rem
  justify-content: start
  &:not(:last-of-type)
    margin-right: $space-base

.locales
  font-family: Roboto
  font-size: 1.6rem

  &__current
    margin-right: $space-base
    line-height: 0
    svg
      margin-right: ($space-base / 2)

.icon-box
  &--recommended
    justify-content: center
    font-family: Roboto
    .c-icon
      margin-right: $space-base

  &--price
    justify-content: center
    font-family: Roboto
    font-weight: bold
</style>
