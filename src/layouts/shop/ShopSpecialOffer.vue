<template>
<section
  class="cord-padding l-shop-special-offer"
  :style="containerStyle"
>

  <q-btn
    class="l-shop-special-offer__btn"
    :label="$t('specialOffer')"
    style="background-color:rgba(0, 0, 0, 0.5)"
    rounded
  />

  <div class="flex col-12 column items-center justify-center l-shop-special-offer__content">
    <h5 class="title title--bold">
      <router-link :to="url">
        {{ name }}
      </router-link>
    </h5>
    <q-rating :value="rating" size="1.6rem" color="white" readonly/>
    <icon-box width="160" height="48" background="#121212" class="text-bold roboto">
      $ {{ price }}
    </icon-box>
  </div>

</section>
</template>

<script>
import IconBox from '@components/blocks/IconBox'

export default {
  name: 'ShopSpecialOffer',

  components: { IconBox },

  props: {
    name: String,
    url: String,
    rating: [String, Number],
    price: [String, Number],
    preview: String
  },

  computed: {
    containerStyle () {
      console.log(
        this.$props
      )
      return { backgroundImage: `url(${ this.preview })` }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

$btn-h = 3.6rem

.l-shop-special-offer
  position: relative
  height: $block-lg
  min-height: 25rem
  max-height: 50rem
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  @media (min-width $breakpoint-lg-min)
    padding: ($space-base * 1.8) ($space-base * 2.4)

  &__btn
    height: $btn-h

  &__content
    height: 100%
    margin-top: -($btn-h)

    .title
      margin-bottom: ($space-base / 1.5)
      text-shadow: 0 .2rem .2rem rgba(0, 0, 0, .45)

    .q-rating
      margin-bottom: ($space-base * 1.5)

    .b-icon-box
      font-size: 2rem
      letter-spacing: .05em
</style>
