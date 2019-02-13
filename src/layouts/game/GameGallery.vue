<template>
<section class="row gutter-sm cord-padding l-game-gallery">

  <template v-for="(item, index) in gallery">

    <div
        v-if="item.isImage"
        :key="`gallery-item-${ _uid }-${ index }`"
        class="col-lg-3 col-md-6 col-sm-6 col-xs-12"
    >

      <div
          class="t-hover-opacity l-game-gallery__image"
          :style="{ backgroundImage: `url(${ item.image.tmp200 })` }"
      ></div>

    </div>

    <div
        v-else
        :key="`gallery-item-${ _uid }-${ index }`"
        class="col-lg-3 col-md-6 col-sm-6 col-xs-12"
    >

      <q-video :type="item.video.type" :src="item.video.url" class="l-game-gallery__video"/>

    </div>

  </template>

</section>
</template>

<script>
export default {
  name: 'GameGallery',

  props: {
    gallery: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-gallery

  @media (min-width $breakpoint-lg-min)
    padding-top: 0

  &__image
    width: 100%
    height: $block-md
    max-height: 20rem
    background-repeat: no-repeat
    background-position: center
    background-color: rgba(18, 18, 18, .15)
    background-size: cover
    border-radius: $border-radius
    cursor: pointer

  &__video
    width: 100%
    height: $block-md
    max-height: 20rem
    border-radius: $border-radius
</style>
