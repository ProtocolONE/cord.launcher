<template lang="pug">
.logo.flex.items-center.justify-center
  span.roboto.text-uppercase.text-bold.logo__text logo
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="stylus" scoped>
.logo
  width: 84px
  height: 48px
  background-color: $secondary
  border-radius: 2px

  &__text
    font-size: 16px
    letter-spacing: 0.15em
    line-height: 19px
</style>
