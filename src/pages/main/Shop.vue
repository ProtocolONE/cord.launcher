<template>
<article id="shop">

  <div class="cord-padding row">
    <h2 class="title title--light color-light-3 q-mb-lg col-12">
      {{ $t('popularAndRecommendedTitle') }}
    </h2>
    <shop-slider1
        v-bind="shopPopularGames"
        class="col-lg-8 col-12 q-pr-lg-md q-mb-xs-md q-mb-lg-none"
    />
    <shop-slider2
        v-bind="shopRecommendedGames"
        class="col-lg-4 col-12 q-mb-xs-md q-mb-lg-none"
    />
  </div>

  <div class="row carousel-row">
    <games-carousel
      v-bind="shopFriendsGamesAndInfo"
      classes="col-lg-12 col-md-6 col-sm-12 col-xs-12"
      class="col-lg-7 col-12"
    />
    <games-carousel
      v-bind="shopUpdatesAndExpansionsGames"
      classes="col-lg-6 col-md-6 col-sm-6 col-xs-12 shop-more-updates"
      class="col-lg-5 col-12"
    />
  </div>

  <shop-popular-categories v-bind="shopPopularCategories"/>
  <games-carousel v-bind="shopFriendsGames"/>
  <shop-special-offer v-bind="shopSpecialOffer"/>
  <games-carousel v-bind="shopFriendsGames"/>

  <div class="row carousel-row">
    <games-carousel
      v-bind="shopFriendsGamesAndInfo"
      classes="col-lg-12 col-md-6 col-sm-12 col-xs-12"
      class="col-lg-7 col-12"
    />
    <games-carousel
      v-bind="shopUpdatesAndExpansionsGames"
      classes="col-lg-6 col-md-6 col-sm-6 col-xs-12"
      class="col-lg-5 col-12"
    />
  </div>

  <games-carousel v-bind="shopFriendsGames"/>
  <shop-popular-categories v-bind="shopPopularCategories"/>

</article>
</template>

<script>
import ShopSlider1 from '@/layouts/shop/ShopSlider1'
import ShopSlider2 from '@/layouts/shop/ShopSlider2'
import ShopPopularCategories from '@/layouts/shop/ShopPopularCategories'
import GamesCarousel from '@/layouts/common/GamesCarousel'
import ShopSpecialOffer from '@/layouts/shop/ShopSpecialOffer'

import { shop, game } from '@/test-data'
import { mapMutations, mapGetters } from 'vuex'

import { pick } from 'lodash'

export default {
  name: 'Shop',

  components: {
    ShopSlider1,
    ShopSlider2,
    ShopPopularCategories,
    GamesCarousel,
    ShopSpecialOffer
  },

  data () {
    return {
      shopPopularGamesPaths: ['popularGames'],
      shopRecommendedGamesPaths: ['recommendedGames'],
      shopPopularCategoriesPath: ['popularCategories']
    }
  },

  computed: {
    ...mapGetters('shop', ['getFullShopData']),

    shopPopularGames () {
      let { popularGames: items } = pick(
        this.getFullShopData,
        this.shopPopularGamesPaths
      )
      return { items }
    },

    shopRecommendedGames () {
      let { recommendedGames: items } = pick(
        this.getFullShopData,
        this.shopRecommendedGamesPaths
      )
      return { items }
    },

    shopFriendsGamesAndInfo () {
      return {
        ...this.shopFriendsGames,
        tooltip: null,
        list: this.getFullShopData.friendsGames
      }
    },

    shopUpdatesAndExpansionsGames () {
      return {
        title: this.$t('updatesAndExpansionsTitle'),
        list: game.gamesMore,
        more: '/'
      }
    },

    shopFriendsGames () {
      return {
        title: this.$t('friendsGamesTitle'),
        list: game.gamesMore,
        tooltip: this.$t('friendsGamesTitle'),
        more: '/'
      }
    },

    shopPopularCategories () {
      let { popularCategories: categories } = pick(
        this.getFullShopData,
        this.shopPopularCategoriesPath
      )
      return { categories }
    },

    shopSpecialOffer () {
      return this.getFullShopData.specialOffer
    }
  },

  created () {
    this.saveShopData(shop)
  },

  methods: {
    ...mapMutations('shop', ['saveShopData'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.carousel-row
  > *
    padding-top: 0
    &:first-child
      padding-right: 0
      @media (min-width $breakpoint-xs-min)
        padding-right: ($space-base / 2)
      @media (min-width $breakpoint-sm-max)
        padding-right: $space-base
    &:last-child
      padding-left: $space-base
      @media (min-width $breakpoint-lg-min)
        padding-left: 0
</style>

<style lang="stylus">
@import '~variables'

.shop-more-updates
  @media (min-width $breakpoint-xs-min) and (max-width $breakpoint-sm-max)
    &:nth-child(2n - 1)
      padding-left: ($space-base / 2)
  @media (max-width $breakpoint-xs-max)
    padding-left: ($space-base / 2) !important
</style>
