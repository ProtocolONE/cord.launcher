<template lang="pug">
q-page.offline
  .row.gutter-sm: .col
    base-title.text-white(level="4") {{ $trans('paragraphs', 'offlineMode') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Offline extends Vue {}
</script>

<style lang="stylus" scoped>
.offline
  padding: $base-padding
</style>
