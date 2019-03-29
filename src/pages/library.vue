<template lang="pug">
q-page.library
  .row.gutter-sm: .col
    base-title.text-white.text-center Library page updated
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Library extends Vue {}
</script>

<style lang="stylus" scoped>
.library
  padding: $base-padding
</style>
