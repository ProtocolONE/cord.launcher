<template lang="pug">
q-page

  // preview
  section.preview
    // toolbar
    q-toolbar.toolbar.base-padding.text-white(v-if="!loading && game")

      q-btn.q-btn__back(:to="{ name: 'shop' }" :label="$trans('labels', 'back')")

      q-toolbar-title.flex.items-center
        .flex.column.q-mr-lg
          | {{ game.title }}
          q-rating(:value="game.rating" color="white" size="1em" readonly)
        tags(:tags="game.tags")

      .release.flex.roboto
        .release__date.q-mr-sm {{ $trans('labels', 'released_on') }} {{ game.releaseDate | localize }}
        .release__divider.q-mr-sm
        .release__publisher {{ game.publisher.title }}

    // Requirements & Languages
    section.base-padding.text-grey
      .requirements
        h4.base-title {{ $trans('titles', 'system_requirements') }}
      .languages

    // loader
    q-inner-loading(:showing="loading || !game" dark)
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
    localize: value => date.formatDate(value, 'MMM DD, YYYY')
  },

  components: {
    Tags
  },

  data () {
    return {
      loading: true
    }
  },

  computed: mapState('game', ['game']),

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

.release
  font-size: 16px
  &__divider
    width: 1px
    background-color: $grey
</style>
