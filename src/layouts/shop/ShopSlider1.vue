<template>
<section class="l-shop-slider">

  <q-carousel
      :class="$style.slider"
      class="text-white"
      height="460px"
      quick-nav
      infinite
      autoplay
  >

    <q-carousel-slide
        v-for="(item, index) in items"
        :key="`${ item.name }-${ _uid }-${ index }`"
        :img-src="item.preview"
        class="flex column justify-between"
    >

      <header class="row gutter-sm justify-between">
        <div class="col-auto">
          <h5 class="title title--bold">
            <router-link :to="item.url">
              {{ item.name }}
            </router-link>
          </h5>
          <q-rating :value="item.rating" size="1.6rem" color="white" readonly/>
        </div>
        <div class="col-auto">
          <p class="paragraph roboto text-white q-mb-xs">
            {{ $t('mightFollowingTagsLabel') }}
          </p>

          <div class="row following-tags">

            <div
              v-for="tag in item.tags"
              :key="tag"
              class="col-auto following-tags__item"
            >
              <q-btn
                  :label="tag"
                  rounded
                  class="following-tags__btn"
                  style="background-color:rgba(0, 0, 0, 0.3)"
              />
            </div>

          </div>
        </div>
      </header>

      <footer class="row justify-between">
        <div class="flex items-center">
          <icon
              v-for="icon in item.platforms"
              :key="icon"
              :name="icon"
              size="20"
              fill="white"
              class="q-mr-md"
          />
        </div>
        <div class="flex items-center">
          <a href="javascript:void(0)" class="q-mr-sm t-hover-opacity">
            <icon-box size="48">
              <icon name="heart" size="20" fill="white"/>
            </icon-box>
          </a>

          <a href="javascript:void(0)" class="t-hover-opacity">
            <icon-box width="10rem" height="48">
              $ {{ item.price }}
            </icon-box>
          </a>
        </div>
      </footer>

    </q-carousel-slide>

  </q-carousel>

</section>
</template>

<script>
import Icon from '@components/Icon'
import IconBox from '@components/blocks/IconBox'

export default {
  name: 'ShopSlider1',

  components: { Icon, IconBox },

  props: {
    items: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.following-tags
  &__item:not(:last-child)
      margin-right: ($space-base / 2)
</style>

<style lang="stylus" module>
@import '~variables'

.slider
  --nav-height: 4rem
  --nav-offset: 1rem

  border-radius: $border-radius

  [class~="q-carousel-inner"]
    height: calc(100% - var(--nav-height) - var(--nav-offset))
    box-shadow: 0 6px 6px -3px rgba(0,0,0,0.2), 0 10px 14px 1px rgba(0,0,0,0.14), 0 4px 18px 3px rgba(0,0,0,0.12)

  [class~="q-carousel-quick-nav"]
    height: var(--nav-height)
    background: transparent
    [class~="q-btn"]
      color: $bg-dark-3 !important
      &:not([class~="inactive"])
        color: $white !important
</style>
