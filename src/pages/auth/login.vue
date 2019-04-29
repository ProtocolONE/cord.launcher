<template lang="pug">
q-page.login
  .row.gutter-sm
    .col.flex.justify-center
      base-title {{ $trans('titles', 'login') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {}
</script>

<style lang="stylus" scoped>
.login
  padding: $base-padding
</style>
