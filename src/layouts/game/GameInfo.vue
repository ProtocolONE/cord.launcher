<template>
<section class="row cord-padding l-game-info">

  <div class="col row items-center icons">
    <div v-for="platform in platforms" :key="platform" class="icons__item">
      <icon :name="platform" :size="iconsSize" :fill="iconsFill"/>
    </div>
  </div>

  <div class="col">
    // --- other
  </div>

  <div class="col row items-center justify-end no-wrap">

    <a href="javascript:void(0)" class="col-auto icon-box-link">
      <icon-box width="100%" height="48" class="icon-box icon-box--recommended">
        <icon name="heart" :size="iconsSize" :fill="iconsFill"/>
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
    price: [String, Number]
  },

  data () {
    return {
      iconsSize: 20,
      iconsFill: '#FFF'
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

.icons__item:not(:last-child)
  margin-right: 3.4rem

.icon-box-link
  width: 100%
  max-width: 16rem
  justify-content: start
  &:not(:last-of-type)
    margin-right: $space-base

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
