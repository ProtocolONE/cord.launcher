<template lang="pug">
box.box--icon(v-bind="bindingObject")
  q-icon(:name="icon")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Box from 'components/Box'

@Component({
  components: { Box }
})
export default class BoxIcon extends Vue {
  @Prop({ type: String, default: '84' }) size: string
  @Prop({ type: String }) width: string
  @Prop({ type: String }) height: string
  @Prop({ type: String, default: 'rgba(0, 0, 0, .5)' }) background: string
  @Prop({ type: String, default: '84', required: true }) icon: string

  get bindingObject () {
    return {
      ...this.$props,
      ...this.$attrs,
      width: this.width || this.size,
      height: this.height || this.size
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
