<template>
<section class="l-shop-slider">

  <q-carousel
    :class="$style.slider"
    class="text-white"
    height="460px"
    quick-nav
    infinite
    autoplay
  >

    <q-carousel-slide
      v-for="(item, index) in items"
      :key="`${ item.name }-${ _uid }-${ index }`"
    >

      <figure class="flex column slide">
        <div class="slide__img" :style="{ backgroundImage: `url(${ item.preview })` }"></div>
        <figcaption class="q-pa-lg flex column justify-around slide__caption">
          <h6 class="title title--bold roboto">
            <router-link :to="item.url">
              {{ item.label }}
            </router-link>
          </h6>
          <p class="paragraph text-white roboto">{{ item.description }}</p>
          <div class="flex items-center">
            <icon
              v-for="icon in item.platforms"
              :key="icon"
              :name="icon"
              size="20"
              fill="white"
              class="q-mr-md"
            />
          </div>
        </figcaption>
      </figure>

    </q-carousel-slide>

    <q-btn
      slot="quick-nav"
      slot-scope="props"
      color="white"
      flat
      dense
      class="quick-nav"
      :class="{
        'quick-nav--active': props.current
      }"
      @click="props.goToSlide()"
    >
      <icon name="circle" size="16" fill="#121212" class="inactive-icon"/>
      <icon name="circle" size="8" fill="white" class="active-icon"/>
    </q-btn>

  </q-carousel>

</section>
</template>

<script>
import Icon from '@components/Icon'
import IconBox from '@components/blocks/IconBox'

export default {
  name: 'ShopSlider2',

  components: { Icon, IconBox },

  props: {
    items: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.slide
  height: 100%
  margin: 0

  &__img
    flex: 1 0 50%
    width: 100%
    background-position: top center
    background-size: cover
    background-repeat: no-repeat

  &__caption
    flex: 1 0 50%
    background-color: $bg-dark-4

.quick-nav
  position: relative

  .active-icon
    position: absolute
    color: $white
    font-size: .8rem !important
    opacity: 0
    transition: opacity .2s linear

  .inactive-icon
    color: $bg-dark-3

  &--active
    opacity: .8

    .active-icon
      opacity: 1
</style>

<style lang="stylus" module>
@import '~variables'

.slider
  --nav-height: 4rem
  --nav-offset: 1rem

  border-radius: $border-radius

  [class~="q-carousel-slide"]
    padding: 0

  [class~="q-carousel-inner"]
    height: calc(100% - var(--nav-height) - var(--nav-offset))
    box-shadow: 0 6px 6px -3px rgba(0,0,0,0.2), 0 10px 14px 1px rgba(0,0,0,0.14), 0 4px 18px 3px rgba(0,0,0,0.12)

  [class~="q-carousel-quick-nav"]
    height: var(--nav-height)
    background: transparent
    [class~="q-btn"]
      color: $bg-dark-3 !important
      &:not([class~="inactive"])
        color: $white !important
</style>
