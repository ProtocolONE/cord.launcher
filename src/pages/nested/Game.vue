<template>
<article id="game">
  <game-slider v-bind="gameSlider"/>
  <game-info v-bind="gameInfo"/>
  <game-preview v-bind="gamePreview"/>
  <game-reviews v-bind="gameReviews"/>
  <game-requirements v-bind="gameRequirements"/>
  <game-social v-bind="gameSocial"/>
  <game-line-more v-bind="gameLineMoreByDeveloper"/>
  <game-line-more v-bind="gameLineMoreByUser" class="q-mb-lg"/>
</article>
</template>

<script>
import GameSlider from '@layouts/game/GameSlider'
import GameInfo from '@layouts/game/GameInfo'
import GamePreview from '@layouts/game/GamePreview'
import GameSocial from '@layouts/game/GameSocial'
import GameLineMore from '@layouts/game/GameLineMore'
import GameReviews from '@layouts/game/GameReviews'
import GameRequirements from '@layouts/game/GameRequirements'

import { game, initial } from '@test-data'
import { mapMutations, mapGetters } from 'vuex'

import { merge, pick } from 'lodash'

export default {
  name: 'Game',

  components: {
    GameSlider,
    GameInfo,
    GamePreview,
    GameSocial,
    GameLineMore,
    GameReviews,
    GameRequirements
  },

  data () {
    return {
      initialPaths: ['locale'],
      gameSliderPaths: ['name', 'preview', 'rating', 'followTags', 'releaseDate', 'developer', 'publisher'],
      gameInfoPaths: ['availablePlatforms', 'recommended', 'price'],
      gamePreviewPaths: ['likeTags', 'followTags', 'friends', 'bestReview', 'info'],
      gameRequirementsPaths: ['requirements'],
      gameSocialPaths: ['name', 'followSocial'],
      gameReviewsPaths: ['gameRating', 'reviews']
    }
  },

  computed: {
    ...mapGetters('game', ['getFullGameData']),

    gameId () {
      return this.$route.params.id
    },

    gameSlider () {
      return pick(this.getFullGameData, this.gameSliderPaths)
    },

    gameInfo () {
      return merge(
        pick(initial, this.initialPaths),
        pick(this.getFullGameData, this.gameInfoPaths)
      )
    },

    gamePreview () {
      return pick(this.getFullGameData, this.gamePreviewPaths)
    },

    gameRequirements () {
      return pick(this.getFullGameData, this.gameRequirementsPaths)
    },

    gameSocial () {
      return pick(this.getFullGameData, this.gameSocialPaths)
    },

    gameLineMoreByDeveloper () {
      let { developer, gamesMore } = this.getFullGameData
      return {
        title: `${ this.$t('gamesByLabel') } ${ developer }`,
        list: gamesMore,
        more: '/'
      }
    },

    gameLineMoreByUser () {
      return {
        title: this.$t('gamesLikesByUserTitle'),
        list: this.getFullGameData.gamesMore,
        tooltip: this.$t('gamesLikesByUserTitle'),
        more: '/'
      }
    },

    gameReviews () {
      return pick(this.getFullGameData, this.gameReviewsPaths)
    }
  },

  watch: {
    gameId: {
      immediate: true,
      handler (value) {
        this.saveGameData(game)
      }
    }
  },

  methods: {
    ...mapMutations('game', ['saveGameData'])
  }
}
</script>
