<template lang="pug">
component(:is="tag" :style="style" :class="className")
  slot
</template>

<script>
export default {
  name: 'BaseTitle',

  props: {
    level: {
      type: [String, Number],
      default: 2,
      validator: v => ['1', '2', '3', '4', '5', '6'].includes(v.toString())
    },
    size: String,
    color: String
  },

  computed: {
    tag () {
      return 'h' + this.level
    },

    style () {
      if (!this.size) return null
      return {
        fontSize: this.size + 'px'
      }
    },

    className () {
      let classes = ['base-title', `level-${this.level}`]
      if (this.color) {
        classes.push(`color-${this.color}`)
      }
      return classes
    }
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
