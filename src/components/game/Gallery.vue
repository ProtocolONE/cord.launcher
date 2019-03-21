<template lang="pug">
section.gallery: .row.gutter-sm
  each _ in [1, 2, 3, 4, 5, 6, 7, 8]
    .col-lg-3.col-md-6.col-sm-6.col-xs-12
      q-btn.gallery__item(:style="style")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component()
export default class Gallery extends Vue {
  get style () {
    return {
      backgroundImage: 'url(statics/images/game-preview.jpg)'
    }
  }
}
</script>

<style lang="stylus" scoped>
.gallery
  padding: $base-padding

  &__item
    width: 100%
    height: calc(100vw / 6)
    max-height: 200px
    background-repeat: no-repeat
    background-position: center
    background-color: rgba(18, 18, 18, .15)
    background-size: cover
    border-radius: 4px
</style>
