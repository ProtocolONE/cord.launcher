<template>
<article id="game">

  // --- slider

  <game-info v-bind="gameInfo"/>

</article>
</template>

<script>
import GameInfo from '@layouts/game/GameInfo'

import { game } from '@test-data'
import { mapMutations, mapGetters } from 'vuex'

import { pick } from 'lodash'

export default {
  name: 'Game',

  components: { GameInfo },

  data () {
    return {
      gameInfoPaths: ['availablePlatforms', 'recommended', 'price']
    }
  },

  computed: {
    ...mapGetters('game', ['getFullGameData']),

    gameId () {
      return this.$route.params.id
    },

    gameInfo () {
      return pick(this.getFullGameData, this.gameInfoPaths)
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
