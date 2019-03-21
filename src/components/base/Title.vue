<template lang="pug">
component.base-title(
  :is="tag"
  :style="style"
  :class="[`level-${ level }`, { [`color-${ color }`]: color }]"
)
  slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseTitle extends Vue {
  @Prop({
    type: String,
    default: '2',
    validator (value: string): boolean {
      return ['1', '2', '3', '4', '5', '6'].includes(value)
    }
  }) level: string

  @Prop(String) size: string
  @Prop(String) color: string

  get tag () {
    return 'h' + this.level
  }

  get style () {
    return (this.size) ? { fontSize: (this.size + 'px') } : null
  }
}
</script>

<style lang="stylus" scoped>
.base-title
  line-height: normal
  letter-spacing: -0.02em

  &.level-2
    font-size: 32px

  &.level-4
    font-size: 24px

  &.level-5
    font-size: 20px

  &.level-6
    font-size: 16px

  &:not([class*="text-bold"])
    font-weight: 300

  &:not([class*="color-"])
    color: $grey

  &:not([class*="q-mt"])
    margin-top: 0

  &:not([class*="q-mb"])
    margin-bottom: 1em
</style>
