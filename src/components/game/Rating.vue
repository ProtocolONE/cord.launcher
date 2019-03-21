<template lang="pug">
.rating
  base-title {{ $trans('titles', 'rating') }}
  .rating__container(:style="style")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Rating extends Vue {
  @Prop(String) rating: string

  get style () {
    return {
      backgroundImage: `url(${ this.rating })`
    }
  }
}
</script>

<style lang="stylus" scoped>
.rating
  &__container
    width: 100%
    height: calc(100vw / 6)
    min-height: 120px
    max-height: 200px
    background-repeat: no-repeat
    background-position: center
    background-color: rgba(18, 18, 18, .15)
    border-radius: 4px
</style>
