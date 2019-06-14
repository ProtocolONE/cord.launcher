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
      TODO: table as Vue-component
    section.base-padding.text-grey
      // requirements
      .requirements
        h4.base-title.q-mb-lg {{ $trans('titles', 'system_requirements') }}
        q-tabs(v-model="system_requirement_tab" align="left" class="text-white")
          q-tab.q-pa-none(v-for="(system_data, system) in requirements"
                          :key="system"
                          :name="system"
                          :data-name="system")
            q-btn(:icon="system_data.icon" flat)
        q-tab-panels(v-model="system_requirement_tab" class="bg-transparent" animated)
          q-tab-panel.q-pl-none(v-for="(system_data, system) in requirements"
                                :key="system"
                                :name="system")
            // minimal
            .row
              .col-md-6.col-12
                h5.base-title.text-white.text-normal {{ $trans('labels', 'minimal') }}
                table.requirements__table: tbody
                  q-tr(v-for="(val, key) in system_data.minimal" :key="key")
                    q-td.q-pl-none.text-uppercase {{ key }}
                    q-td.q-pa-sm.text-white {{ val }}
              // recommended
              .col-md-6.col-12
                h5.base-title.text-white.text-normal {{ $trans('labels', 'recommended') }}
                table.requirements__table: tbody
                  q-tr(v-for="(val, key) in system_data.recommended" :key="key")
                    q-td.q-pl-none.text-uppercase {{ key }}
                    q-td.q-pa-sm.text-white {{ val }}
      // languages
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

.requirements

  &__table
    font-size: 16px
</style>
