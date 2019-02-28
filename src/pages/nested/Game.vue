<template>
<article id="game">
  <game-slider v-bind="gameSlider"/>
  <game-info v-bind="gameInfo"/>
  <game-preview v-bind="gamePreview"/>
  <game-gallery v-bind="gameGallery"/>
  <game-reviews v-bind="gameReviews"/>
  <game-requirements v-bind="gameRequirements"/>
  <game-social v-bind="gameSocial"/>
  <games-carousel v-bind="gamesCarouselByDeveloper"/>
  <games-carousel v-bind="gamesCarouselByUser" class="q-mb-lg"/>
</article>
</template>

<script>
import GameSlider from '@/layouts/game/GameSlider'
import GameInfo from '@/layouts/game/GameInfo'
import GamePreview from '@/layouts/game/GamePreview'
import GameGallery from '@/layouts/game/GameGallery'
import GameSocial from '@/layouts/game/GameSocial'
import GameReviews from '@/layouts/game/GameReviews'
import GameRequirements from '@/layouts/game/GameRequirements'
import GamesCarousel from '@/layouts/common/GamesCarousel'

import { game, initial } from '@/test-data'
import { mapMutations, mapGetters } from 'vuex'

import { merge, pick } from 'lodash-es'

export default {
  name: 'Game',

  components: {
    GameSlider,
    GameInfo,
    GamePreview,
    GameGallery,
    GameSocial,
    GameReviews,
    GameRequirements,
    GamesCarousel
  },

  data () {
    return {
      initialPaths: ['locale'],
      gameSliderPaths: ['name', 'preview', 'rating', 'followTags', 'releaseDate', 'developer', 'publisher'],
      gameInfoPaths: ['availablePlatforms', 'recommended', 'price'],
      gamePreviewPaths: ['likeTags', 'followTags', 'friends', 'bestReview', 'info'],
      gameGalleryPaths: ['gallery'],
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

    gameGallery () {
      return pick(this.getFullGameData, this.gameGalleryPaths)
    },

    gameRequirements () {
      return pick(this.getFullGameData, this.gameRequirementsPaths)
    },

    gameSocial () {
      return pick(this.getFullGameData, this.gameSocialPaths)
    },

    gamesCarouselByDeveloper () {
      let { developer, gamesMore } = this.getFullGameData
      return {
        title: `${ this.$t('gamesByLabel') } ${ developer }`,
        list: gamesMore,
        more: '/'
      }
    },

    gamesCarouselByUser () {
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
