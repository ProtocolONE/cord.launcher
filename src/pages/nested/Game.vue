<template>
<article id="game">
  <game-slider v-bind="gameSlider"/>
  <game-info v-bind="gameInfo"/>
  <game-preview v-bind="gamePreview"/>
  <game-social v-bind="gameSocial"/>
</article>
</template>

<script>
import GameSlider from '@layouts/game/GameSlider'
import GameInfo from '@layouts/game/GameInfo'
import GamePreview from '@layouts/game/GamePreview'
import GameSocial from '@layouts/game/GameSocial'

import { game, initial } from '@test-data'
import { mapMutations, mapGetters } from 'vuex'

import { merge, pick } from 'lodash'

export default {
  name: 'Game',

  components: {
    GameSlider,
    GameInfo,
    GamePreview,
    GameSocial
  },

  data () {
    return {
      initialPaths: ['locale'],
      gameSliderPaths: ['name', 'preview', 'rating', 'followTags', 'releaseDate', 'developer', 'publisher'],
      gameInfoPaths: ['availablePlatforms', 'recommended', 'price'],
      gamePreviewPaths: ['likeTags', 'followTags', 'friends', 'bestReview', 'info'],
      gameSocialPaths: ['name', 'followSocial']
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

    gameSocial () {
      return pick(this.getFullGameData, this.gameSocialPaths)
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
