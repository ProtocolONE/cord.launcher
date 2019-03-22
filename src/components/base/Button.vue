<template lang="pug">
q-btn.capitalize.base-button(
  :label="label"
  :icon="icon"
  :flat="flat"
  :round="round"
  :color="getColor"
  :class="{ [`base-button--flat`]: flat }"
  @click="click"
)
  slot
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop(String) label: string
  @Prop(String) icon: string
  @Prop(Boolean) flat: boolean
  @Prop(Boolean) round: boolean
  @Prop(Boolean) dark: boolean
  @Prop({ type: String, default: 'dark' }) color: string

  iconColor = 'grey-10'

  get getColor () {
    if (this.icon) return this.iconColor
    return (!this.flat) ? this.color : null
  }

  @Emit()
  click () {}
}
</script>

<style lang="stylus" scoped>
.base-button
  min-height: 40px
  padding-right: 18px
  padding-left: 18px
  letter-spacing: 0.01em
  &:not(&--flat)
    background-color: #343434 !important
</style>
