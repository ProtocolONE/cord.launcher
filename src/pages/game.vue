<template lang="pug">
q-page.game

  .row: .col: slider(:game="game")

  .row: .col: info(:game="game")

  .row: .col: socials(:game-name="game.name" :socials="socials")

  .row: .col: preview

  .row: .col: gallery

  .row: .col: reviews(:game="game")

  section.row.game__requirements
    .col-lg-8.col-12.q-mb-lg
      requirements(:requirements="requirements.systems")
    .row.col-lg-4.col-12
      .col-lg-12.col-md-6.col-sm-6.col-xs-12.q-mb-lg
        languages(:languages="requirements.languages")
      .col-lg-12.col-md-6.col-sm-6.col-xs-12
        rating(:rating="requirements.rating")

  each _ in [1, 2]
    .row: .col: games(:title="$trans('titles', 'friendsGames')" :games="games" more="/more")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Slider from 'components/game/Slider'
import Info from 'components/game/Info'
import Preview from 'components/game/Preview'
import Gallery from 'components/game/Gallery'
import Reviews from 'components/game/Reviews'
import Requirements from 'components/game/SystemRequirements'
import Languages from 'components/game/Languages'
import Rating from 'components/game/Rating'
import Socials from 'components/game/Socials'
import Games from 'components/common/Games'

@Component({
  components: {
    Slider,
    Info,
    Preview,
    Gallery,
    Reviews,
    Requirements,
    Languages,
    Rating,
    Socials,
    Games
  }
})
export default class Game extends Vue {
  @namespace('game').State('game') game
  @namespace('game').State('socials') socials
  @namespace('shop').State('games') games

  get requirements () {
    return this.game.requirements
  }
}
</script>

<style lang="stylus" scoped>
.game
  &__requirements
    padding: $base-padding
</style>
