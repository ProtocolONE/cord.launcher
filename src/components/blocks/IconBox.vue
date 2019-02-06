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
      return {
        width: `${ width || size }px`,
        height: `${ height || size }px`,
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
