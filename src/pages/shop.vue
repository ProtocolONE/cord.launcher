<template lang="pug">
q-page.shop

  .row.column.shop__row
    .col: base-title {{ $trans('titles', 'popularRecommended') }}
    .row.gutter-sm
      .col-lg-8: slider(:games="popularGames")
      .col-lg-4: slider(type="separate" :games="popularGames")

  .row.shop__row
    .col-lg-6.col-md-12.col-sm-12.q-pr-none.q-pr-lg-md.q-pb-lg
      games.q-pa-none(
        :title="$trans('titles', 'friendsGames')"
        :games="popularGames"
        row-items="1"
        more="/more"
      )
    .col-lg-6.col-md-12.col-sm-12
      games.q-pa-none(
        :title="$trans('titles', 'friendsGames')"
        :games="games"
        row-items="2"
        more="/more"
      )

  .row: .col: popular-categories

  .row: .col
    games(
      :title="$trans('titles', 'friendsGames')"
      :games="games"
      more="/more"
      tooltip="tooltip"
    )

  .row: .col: special-offer(:game="specialOffer")

  .row: .col
    games(
      :title="$trans('titles', 'friendsGames')"
      :games="games"
      more="/more"
      tooltip="tooltip"
    )

  .row.shop__row
    .col-lg-6.col-md-12.col-sm-12.q-pr-none.q-pr-lg-md.q-pb-lg
      games.q-pa-none(
        :title="$trans('titles', 'friendsGames')"
        :games="popularGames"
        row-items="1"
        more="/more"
      )
    .col-lg-6.col-md-12.col-sm-12
      games.q-pa-none(
        :title="$trans('titles', 'friendsGames')"
        :games="games"
        row-items="2"
        more="/more"
      )

  .row: .col: games(:title="$trans('titles', 'friendsGames')" :games="games")

  .row: .col: popular-categories
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Game } from 'interfaces'

import Slider from 'components/shop/Slider'
import SpecialOffer from 'components/shop/SpecialOffer'
import PopularCategories from 'components/common/PopularCategories'
import Games from 'components/common/Games'

@Component({
  components: {
    Slider,
    SpecialOffer,
    PopularCategories,
    Games
  }
})
export default class Shop extends Vue {
  @namespace('shop').State('popularGames') popularGames: Game[]
  @namespace('shop').State('specialOffer') specialOffer: Game
  @namespace('shop').State('games') games: Game[]
}
</script>

<style lang="stylus" scoped>
.shop__row
  padding: $base-padding
</style>
