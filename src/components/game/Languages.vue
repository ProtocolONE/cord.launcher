<template lang="pug">
.languages
  base-title {{ $trans('titles', 'languagesSupport') }}
  table.table
    thead: tr
      th.th(v-for="thead in theads" :key="thead.label" :width="thead.width")
        | {{ thead.label }}
    tbody
      tr(v-for="lang in availableLanguages" :key="lang")
        td.td {{ lang }}
        td.td: q-icon(v-if="isSupported(lang, 'text')" name="fas fa-check")
        td.td: q-icon(v-if="isSupported(lang, 'audio')" name="fas fa-check")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { LanguagesSupport } from 'interfaces'
import { union, includes } from 'lodash'

@Component
export default class Rating extends Vue {
  @Prop(Object) languages: LanguagesSupport

  get theads () {
    return [
      { label: this.$trans('labels', 'language') },
      { label: this.$trans('labels', 'text'), width: '25%' },
      { label: this.$trans('labels', 'audio'), width: '25%' }
    ]
  }

  get availableLanguages () {
    return union(this.languages.audio, this.languages.text)
  }

  isSupported (lang, prop) {
    return includes(this.languages[prop], lang)
  }
}
</script>

<style lang="stylus" scoped>
.table
  width: 100%
  font-size: 16px

  .th
    padding-bottom: ($space-base * 1.5)
    color: #909090
    text-align: left

  .td
    font-size: 14px

  .td,
  .th
    padding: ($space-base / 1.5) $space-base
    font-weight: bold
    letter-spacing: -.02em
    &:first-child
      padding-left: 0
</style>
