<template lang="pug">
q-page

  // preview
  section.preview(v-if="!loading && game")
    // toolbar
    q-toolbar.toolbar.base-padding.text-white

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
        q-tabs(v-model="system_requirement_tab" align="left" class="text-white")
          q-tab.q-pa-none(v-for="(system_data, system) in requirements"
                          :key="system"
                          :name="system"
                          :data-name="system")
            q-btn(:icon="system_data.icon" flat)

        q-tab-panels(v-model="system_requirement_tab" class="bg-transparent" animated)
          q-tab-panel(v-for="(system_data, system) in requirements"
                      :key="system"
                      :name="system")
            pre {{ system_data }}
            q-table(:title="$trans('labels', system_data.minimal)"
                    :data="[]"
                    :columns="[]"
                    dark)

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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

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
      loading: true,
      system_requirement_tab: null
    }
  },

  computed: {
    ...mapState('game', ['game']),
    ...mapGetters('game', {
      requirements: 'get_system_requirements'
    })
  },

  watch: {
    '$route.params.game_id': {
      immediate: true,
      async handler (game_id) {
        await this.load_game(game_id)

        // --- timeout for loading animation
        setTimeout(() => { this.loading = false }, 1000)
      }
    },

    'game.platforms' (platforms) {
      this.system_requirement_tab = platforms[0]
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
