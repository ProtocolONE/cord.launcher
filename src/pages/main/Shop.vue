<template>
<article id="shop">

  <div class="cord-padding row">
    <h2 class="title title--light color-light-3 q-mb-lg col-12">
      {{ $t('popularAndRecommendedTitle') }}
    </h2>
    <shop-slider1
        v-bind="shopPopular"
        class="col-lg-8 col-12 q-pr-lg-md q-mb-xs-md q-mb-lg-none"
    />
    <shop-slider2
        v-bind="shopRecommended"
        class="col-lg-4 col-12 q-mb-xs-md q-mb-lg-none"
    />
  </div>

</article>
</template>

<script>
import ShopSlider1 from '@layouts/shop/ShopSlider1'
import ShopSlider2 from '@layouts/shop/ShopSlider2'

import { shop } from '@test-data'
import { mapMutations, mapGetters } from 'vuex'

import { pick } from 'lodash'

export default {
  name: 'Shop',

  components: {
    ShopSlider1,
    ShopSlider2
  },

  data () {
    return {
      shopPopularPaths: ['popular'],
      shopRecommendedPaths: ['recommended']
    }
  },

  computed: {
    ...mapGetters('shop', ['getFullShopData']),

    shopPopular () {
      let { popular: items } = pick(this.getFullShopData, this.shopPopularPaths)
      return { items }
    },

    shopRecommended () {
      let { recommended: items } = pick(this.getFullShopData, this.shopRecommendedPaths)
      return { items }
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
