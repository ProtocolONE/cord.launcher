<template lang="pug">
.box(:style="style"): slot
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Box extends Vue {
  @Prop({ type: String, default: '84' }) size: string
  @Prop(String) background: string
  @Prop(String) radius: string
  @Prop(String) width: string
  @Prop(String) height: string
  @Prop(String) color: string

  get style () {
    let style = {
      width: (this.width || this.size) + 'px',
      height: (this.height || this.size) + 'px',
      minWidth: (this.width || this.size) + 'px',
      minHeight: (this.height || this.size) + 'px'
    }
    if (this.background) style.background = this.background
    if (this.radius) style.borderRadius = this.radius
    if (this.color) style.color = this.color
    return style
  }
}
</script>

<style lang="stylus" scoped>
.box
  display: inline-flex
  align-items: center
  justify-content: center
  border-radius: 4px
</style>
