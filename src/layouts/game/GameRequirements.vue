<template>
<section class="row cord-padding gutter-sm l-game-requirements">

  <div class="col-lg-8 col-12 system-requirements">
    <h2 class="q-mb-xl title title--light color-light-3">
      {{ $t('systemRequirementsTitle') }}
    </h2>
    <q-tabs :class="$style.tabs" underline-color="transparent" color="transparent" animated>

      <q-tab
          v-for="(_, system, index) in systems"
          :key="system"
          :name="system"
          :default="index === 0"
          :class="$style.tabs__item"
          slot="title">

        <icon-box width="100%" height="100%">
          <icon :name="system" fill="white" size="28"/>
        </icon-box>

      </q-tab>

      <q-tab-pane
          v-for="(requirements, system) in systems"
          :key="system"
          :name="system"
          class="q-pa-none q-mt-xl">

        <div class="row gutter-sm">

          <game-requirements-table
              :title="$t('minimalLabel')"
              :requirements="requirements.minimal"
              class="col-xs-12 col-md-6"/>

          <game-requirements-table
              :title="$t('recommendedLabel')"
              :requirements="requirements.recommended"
              class="col-xs-12 col-md-6"/>

        </div>

      </q-tab-pane>

    </q-tabs>
  </div>

  <div class="row col-lg-4 col-12">

    <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12 language-support">
      <h2 class="title title--light color-light-3">{{ $t('languageSupportTitle') }}</h2>

      <table class="language-support__table">

        <thead>
          <tr>
            <th>{{ $t('language') }}</th>
            <th width="25%">{{ $t('text') }}</th>
            <th width="25%">{{ $t('audioLabel') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="lang in availableLanguagesSupport" :key="lang">
            <td>{{ lang }}</td>
            <td>
              <q-icon
                  v-if="isLanguageSupport(lang, 'text')"
                  name="done"
                  size="2.5rem"/>
            </td>
            <td>
              <q-icon
                  v-if="isLanguageSupport(lang, 'audio')"
                  name="done"
                  size="2.5rem"/>
            </td>
          </tr>
        </tbody>

      </table>

    </div>

    <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12 rating">
      <h2 class="title title--light color-light-3">{{ $t('ratingTitle') }}</h2>
      <div class="rating__container" :style="ratingStyle"></div>
    </div>

  </div>

</section>
</template>

<script>
import GameRequirementsTable from './GameRequirementsTable'

import Icon from '@/components/Icon'
import IconBox from '@/components/blocks/IconBox'

import { union, includes } from 'lodash-es'

export default {
  name: 'GameRequirements',

  components: { GameRequirementsTable, Icon, IconBox },

  props: {
    requirements: Object
  },

  computed: {
    languagesSupport () {
      return this.requirements.languagesSupport
    },

    audioLanguagesSupport () {
      return this.languagesSupport.audio
    },

    textLanguagesSupport () {
      return this.languagesSupport.text
    },

    availableLanguagesSupport () {
      return union(this.audioLanguagesSupport, this.textLanguagesSupport)
    },

    rating () {
      return this.requirements.rating
    },

    ratingStyle () {
      return { backgroundImage: `url(${ this.rating })` }
    },

    systems () {
      return this.requirements.systems
    }
  },

  methods: {
    isLanguageSupport (lang, prop) {
      let supportList = this[`${ prop }LanguagesSupport`]
      return includes(supportList, lang)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.language-support
  margin-bottom: $space-base

  &__table
    width: 100%
    margin: ($space-base * 1.5) 0 ($space-base * 1.5)
    th,
    td
      padding: ($space-base / 1.5) $space-base
      font-size: 1.6rem
      font-weight: bold
      letter-spacing: -.02em
      &:first-child
        padding-left: 0
    th
      padding-bottom: ($space-base * 1.5)
      color: $text-color-light-1

.rating
  &__container
    width: 100%
    height: $block-md
    min-height: 12rem
    max-height: 20rem
    margin-top: ($space-base * 1.5)
    background-repeat: no-repeat
    background-position: center
    background-color: rgba(18, 18, 18, .15)
    border-radius: $border-radius
</style>

<style lang="stylus" module>
@import '~variables'

$tab-size = 8.4rem

.tabs
  [data-tab-name]::before
    content: ''
    background: transparent !important
  &__item
    width: $tab-size
    height: $tab-size
    padding: 0
    opacity: .4
    transition: opacity $transition-duration linear
    &:hover,
    &[class~="active"]
      opacity: 1
    &:not(:last-child)
      margin-right: ($space-base * 1.5)
</style>
