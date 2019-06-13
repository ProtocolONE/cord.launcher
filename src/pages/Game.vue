<template lang="pug">
q-page.page
  pre {{ game }}
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'GamePage',

  computed: mapState('game', ['game']),

  watch: {
    '$route.params.game_id': {
      immediate: true,
      handler (game_id) {
        this.load_game(game_id)
      }
    }
  },

  methods: {
    ...mapActions('game', ['load_game'])
  }
}
</script>
