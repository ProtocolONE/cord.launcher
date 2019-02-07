<template>
<div class="items-center justify-center b-icon-box" :style="style">
  <slot/>
</div>
</template>

<script>
export default {
  name: 'IconBox',

  props: {
    size: {
      type: [String, Number],
      default: 84
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.5)'
    }
  },

  computed: {
    style () {
      let props = { ...this.$attrs, ...this.$props }
      let { width, height, size, background } = props

      if (width) {
        width = (Number(width)) ? `${ width }px` : width
      }
      else {
        width = size + 'px'
      }

      if (height) {
        height = (Number(height)) ? `${ height }px` : height
      }
      else {
        height = size + 'px'
      }

      return {
        width,
        height,
        backgroundColor: background
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.b-icon-box
  display: inline-flex
  border-radius: $border-radius
</style>
