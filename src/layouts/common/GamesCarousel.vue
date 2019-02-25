<template>
<section class="cord-padding l-game-carousel">

    <header v-if="title" class="l-game-carousel__header">
      <h2 v-if="title" class="title title--light color-light-3">
        {{ title }}
        <q-icon v-if="tooltip" :name="tooltipIcon" size=".7em" class="more-icon">
          <q-tooltip>{{ tooltip }}</q-tooltip>
        </q-icon>
      </h2>
      <q-btn v-if="more" :label="$t('more')" class="more-btn" @click="$router.push(more)"/>
    </header>

    <div class="row gutter-sm more-list">
      <div
        v-for="item in list"
        :key="`${ item.name }-${ _uid }`"
        :class="classes"
        class="more-list__item">

        <div
            class="shadow-10 t-hover-opacity row more-list__container"
            :style="{ backgroundImage: `url(${ item.preview })` }"
        >

          <header class="flex justify-between col-12">
            <router-link :to="item.url" class="more-list__link">
              {{ item.name }}
            </router-link>
            <div v-if="item.users" class="flex justify-center">
              <a :href="item.users[0].url" class="more-user">
                <div
                  class="more-user__logo"
                  :style="{ backgroundImage: `url(${ item.users[0].logo })` }"
                ></div>
                <span class="more-user__name">{{ item.users[0].name }}</span>
              </a>
              <b class="more-user__count roboto">
                + {{ item.users.length - 1 }}
              </b>
            </div>
          </header>

          <footer
              v-if="item.platforms || item.price"
              class="row items-center justify-between"
          >

            <div class="flex items-center justify-between">
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
              <a href="javascript:void(0)" class="q-mr-sm">
                <icon-box size="48">
                  <icon name="heart" size="20" fill="white"/>
                </icon-box>
              </a>

              <a href="javascript:void(0)">
                <icon-box width="10rem" height="48">
                  $ {{ item.price }}
                </icon-box>
              </a>
            </div>

          </footer>

        </div>

      </div>
    </div>

</section>
</template>

<script>
import Icon from '@components/Icon'
import IconBox from '@components/blocks/IconBox'

export default {
  name: 'GamesCarousel',

  components: { Icon, IconBox },

  props: {
    title: String,
    tooltip: String,
    tooltipIcon: {
      type: String,
      default: 'info' // icons from https://material.io/tools/icons/
    },
    more: String,
    list: Array,
    classes: {
      type: String,
      default: 'col-lg-3 col-md-6 col-sm-6 col-xs-12'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-carousel
  &__header
    display: flex
    align-items: center
    margin-bottom: ($space-base * 1.5)
  @media (max-width $breakpoint-md-max)
    margin-top: ($space-base * 1.5)
    margin-bottom: ($space-base * 1.5)

.more-icon
  color: rgba(144, 144, 144, .5)

.more-btn
  margin-left: auto
  text-transform: capitalize
  background-color: rgba(18, 18, 18, .3)

.more-list
  &__container
    display: inline-flex
    width: 100%
    height: $block-sm
    max-height: 25rem
    min-height: 20rem
    padding: $space-base
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    border-radius: $border-radius
    footer
      width: 100%
      margin-top: auto
  &__item
    @media (min-width $breakpoint-xs-min)
      padding-left: ($space-base / 2)
  &__link
    font-size: 2.4rem
    letter-spacing: -.02em
    text-shadow: 0 .2rem .2rem rgba(0, 0, 0, .45)
    &:hover
      text-decoration: underline

.more-user
  $logo-size = 32px

  position: relative
  display: inline-flex
  flex-direction: column
  justify-content: center
  height: 4rem
  margin-right: $space-base
  padding-left: $space-base + $logo-size

  &__logo
    position: absolute
    top: 50%
    left: 0
    bottom: 50%
    transform: translateY(-50%)
    width: $logo-size
    height: $logo-size
    margin-right: ($space-base / 2)
    background-color: $bg-dark-1
    border-radius: 50%

  &__name
    font-size: 1.6rem
    letter-spacing: -.02em

  &__count
    $count-size = 4rem

    display: inline-flex
    align-items: center
    justify-content: center
    width: $count-size
    height: $count-size
    border-radius: 50%
    background-color: rgba(29, 29, 29, .4)
    font-family: Roboto
    font-weight: bold
    font-size: 1.6rem
    letter-spacing: -.05em
</style>
