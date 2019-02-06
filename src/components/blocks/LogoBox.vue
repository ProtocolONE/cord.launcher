<template>
<icon-box v-bind="{ ...$props, ...$attrs }" class="b-logo-box">
  <div v-if="logo"></div>
  <span v-else class="b-logo-box__text">
    {{ emptyText }}
  </span>
</icon-box>
</template>

<script>
import IconBox from './IconBox'

export default {
  name: 'LogoBox',

  components: { IconBox },

  props: {
    logo: {
      type: null,
      required: true
    }
  },

  data () {
    return {
      emptyText: 'Logo'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.b-logo-box
  font-family: Roboto
  font-weight: bold

  &__text
    color: $white
    text-transform: uppercase
    letter-spacing: 0.15em
    opacity: .25
</style>
