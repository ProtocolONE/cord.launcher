<template lang="pug">
p.base-paragraph(:style="{ fontSize, color }")
  slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Paragraph extends Vue {
  @Prop({ type: String, default: '16' }) size: string
  @Prop({ type: String, default: '#909090' }) color: string

  fontSize = this.size + 'px'
}
</script>

<style lang="stylus" scoped>
.base-paragraph
  line-height: 30px
  letter-spacing: -0.02em

  &:not([class*="q-mb-"])
    margin-bottom: 0
</style>
