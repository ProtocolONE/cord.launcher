<template lang="pug">
p.text-bold.copyright {{ $trans('paragraphs', 'copyright') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Copyright extends Vue {}
</script>

<style lang="stylus" scoped>
.copyright
  color: rgba($grey, .5)
  letter-spacing: -0.02em
  font-size: 14px
  line-height: 27px
</style>
