<template lang="pug">
q-page.home
  .row.gutter-sm: .col
    base-title.text-white.text-center Homepage updated
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
.home
  padding: $base-padding
</style>
