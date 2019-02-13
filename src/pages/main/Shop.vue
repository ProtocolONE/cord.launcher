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

  <shop-popular-categories v-bind="shopPopularCategories"/>
  <games-carousel v-bind="shopFriendsGames"/>
  <games-carousel v-bind="shopFriendsGames"/>
  <games-carousel v-bind="shopFriendsGames"/>

</article>
</template>

<script>
import ShopSlider1 from '@layouts/shop/ShopSlider1'
import ShopSlider2 from '@layouts/shop/ShopSlider2'
import ShopPopularCategories from '@layouts/shop/ShopPopularCategories'
import GamesCarousel from '@layouts/common/GamesCarousel'

import { shop, game } from '@test-data'
import { mapMutations, mapGetters } from 'vuex'

import { pick } from 'lodash'

export default {
  name: 'Shop',

  components: {
    ShopSlider1,
    ShopSlider2,
    ShopPopularCategories,
    GamesCarousel
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
