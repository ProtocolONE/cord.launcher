<template>
<article id="game">

  // --- slider
  <game-info v-bind="gameInfo"/>
  <game-preview v-bind="gamePreview"/>

</article>
</template>

<script>
import GameInfo from '@layouts/game/GameInfo'
import GamePreview from '@layouts/game/GamePreview'

import { game, initial } from '@test-data'
import { mapMutations, mapGetters } from 'vuex'

import { merge, pick } from 'lodash'

export default {
  name: 'Game',

  components: { GameInfo, GamePreview },

  data () {
    return {
      initialPaths: ['locale'],
      gameInfoPaths: ['availablePlatforms', 'recommended', 'price'],
      gamePreviewPaths: ['likeTags', 'followTags', 'friends', 'bestReview', 'info']
    }
  },

  computed: {
    ...mapGetters('game', ['getFullGameData']),

    gameId () {
      return this.$route.params.id
    },

    gameInfo () {
      return merge(
        pick(initial, this.initialPaths),
        pick(this.getFullGameData, this.gameInfoPaths)
      )
    },

    gamePreview () {
      return pick(this.getFullGameData, this.gamePreviewPaths)
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
