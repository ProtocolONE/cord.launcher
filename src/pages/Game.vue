<template lang="pug">
// --- TODO: раскидать на компоненты
q-page
  template(v-if="!loading && game")
    // preview
    section.preview
      // toolbar
      q-toolbar.toolbar.base-padding.text-white

        q-btn.q-btn__back(:to="{ name: 'shop' }" :label="$trans('labels', 'back')")

        q-toolbar-title.flex.items-center
          .flex.column.q-mr-lg
            | {{ game.title }}
            q-rating(:value="game.rating" color="white" size="1em" readonly)
          tags(:tags="game.genres")

        .release.flex.roboto
          .release__date.q-mr-sm {{ $trans('labels', 'released_on') }} {{ game.releaseDate | localize }}
          .release__divider.q-mr-sm
          .release__publisher {{ publisher_developer_title }}

    // info
    section.info
      q-toolbar.base-padding.text-white(class="bg-primary")
        q-btn.platform-icon.q-pa-md(v-for="(icon, i) in platform_icons"
                                    :key="icon"
                                    :icon="icon"
                                    :class="{ 'q-mr-sm': i < platform_icons.length }"
                                    :ripple="false"
                                    flat)
        q-space
        q-btn.q-pa-md.q-mr-sm.bg-secondary(icon="fas fa-heart")
        q-btn.q-pa-md.bg-secondary: b.game-price.roboto {{ `$ ${game.price}` }}

    // trailers and screenshots
    section.media.base-padding
      .row.q-col-gutter-md
        .col-3(v-for="{ id, url, is_video } in media" :key="id")
          q-card(class="bg-grey-9" dark)
            q-card-section.q-pa-none
              .media__item
                .q-video(v-if="is_video")
                  video(width="100%" height="100%" controls)
                    source(:src="url" type="video/mp4")
                q-img(v-else :src="url")

    // Requirements & Languages
      TODO: table as Vue-component
    section.row.q-col-gutter-md.base-padding.text-grey
      // requirements
      .requirements.col-lg-6.col-md-8.col-12
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
                table.requirements__table: tbody.vertical-top
                  q-tr(v-for="(val, key) in system_data.minimal" :key="key")
                    q-td.q-pl-none.q-pt-sm.text-uppercase {{ key }}
                    q-td.q-pa-sm.text-white {{ val }}
              // recommended
              .col-md-6.col-12
                h5.base-title.text-white.text-normal {{ $trans('labels', 'recommended') }}
                table.requirements__table: tbody.vertical-top
                  q-tr(v-for="(val, key) in system_data.recommended" :key="key")
                    q-td.q-pl-none.q-pt-sm.text-uppercase {{ key }}
                    q-td.q-pa-sm.text-white {{ val }}
      // languages
      .languages.col-lg-6.col-md-4.col-12
        h4.base-title.q-mb-lg {{ $trans('titles', 'language_support') }}
        table.languages__table
          thead.vertical-top: q-tr
            q-th.q-pt-sm.q-pr-sm.q-pb-sm.text-bold(v-for="val in ['language', 'text', 'audio']" :key="val")
              | {{ $trans('labels', val) }}
          tbody.vertical-top
            q-tr(v-for="lang in support_languages" :key="lang")
              q-td.q-pt-sm.q-pr-sm.q-pb-sm.text-white.text-bold
                | {{ $trans('locales', lang) }}
              q-td.q-pa-sm(v-for="val in ['text', 'audio']" :key="val")
                q-icon.languages__icon.text-white(v-show="has_support(val, lang)" name="fas fa-check")

  // loader
  q-inner-loading(:showing="loading || !game" dark)
    q-spinner(name="ring"
              color="accent"
              size="10em")
</template>

<script>
import Tags from 'components/Tags'

import { date } from 'quasar'
import { map } from 'lodash-es'
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
      system_requirement_tab: null,
      preview_media: null
    }
  },

  computed: {
    ...mapState('game', ['game']),

    ...mapGetters('game', {
      requirements: 'get_system_requirements',
      media: 'get_game_media'
    }),

    platform_icons () {
      return map(this.requirements, ({ icon }) => icon)
    },

    publisher_developer_title () {
      let { publisher, developer } = this.game
      if (publisher.title === developer.title) {
        return publisher.title
      }
      return `${publisher.title} / ${developer.title}`
    },

    support_text () {
      return this.game.requirements.languages.text
    },

    support_audio () {
      return this.game.requirements.languages.audio
    },

    support_languages () {
      let languages_list = this.support_text.concat(this.support_audio)
      return new Set(languages_list)
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
    ...mapMutations('game', ['set_game']),

    has_support (prop, lang) {
      return this[`support_${prop}`].includes(lang)
    }
  }
}
</script>

<style lang="stylus" scoped>
.preview
  min-height: calc(100vw / 2)
  max-height: 850px
  background-color: rgba($white, .5)

.toolbar
  background: rgba($primary, 0.5)

.release
  font-size: 16px
  &__divider
    width: 1px
    background-color: $grey

.platform-icon
  cursor: default

.game-price
  font-size: 16px
  letter-spacing: 0.05em

.media

  &__item
    width: 100%
    height: 150px
    border-radius: 4px
    background-color: $black

    > *
      width: 100%
      height: 100%
      border-radius: inherit

.requirements

  &__table
    width: 100%
    font-size: 16px

.languages

  &__table
    width: 100%
    font-size: 16px

  &__icon
    font-size: 14px
</style>
