<template lang="pug">
q-page
  q-toolbar.base-padding.text-white.toolbar(v-if="!loading")
    q-btn(:to="{ name: 'shop' }" :label="$trans('labels', 'back')")
    q-toolbar-title.flex.items-center
      .flex.column.q-mr-lg
        | {{ game.title }}
        q-rating(:value="game.rating" color="white" size="1em" readonly)
      tags(:tags="game.tags")
    div
      | {{ game.publisher.title }}
      | {{ game.releaseDate | localize }}
    // pre {{ game }}

  q-inner-loading(:showing="loading" dark)
    q-spinner(name="ring"
              color="accent"
              size="10em")
</template>

<script>
import Tags from 'components/Tags'

import { date } from 'quasar'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'GamePage',

  filters: {
    localize: value => {
      console.log(date.formatDate(value, 'DD-MMM-YYYY'))
      return value
    }
  },

  components: {
    Tags
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapState('game', ['game']),

    release_date () {
      console.log(this.game.releaseDate)
      return this.game.releaseDate
    }
  },

  watch: {
    '$route.params.game_id': {
      immediate: true,
      async handler (game_id) {
        await this.load_game(game_id)
        // --- timeout for loading animation
        setTimeout(() => { this.loading = false }, 1000)
      }
    }
  },

  destroyed () {
    this.set_game(null)
  },

  methods: {
    ...mapActions('game', ['load_game']),
    ...mapMutations('game', ['set_game'])
  }
}
</script>

<style lang="stylus" scoped>
.toolbar
  background: rgba($primary, 0.5)
</style>
