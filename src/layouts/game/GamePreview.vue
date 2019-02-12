<template>
<section class="row cord-padding l-game-preview">

  <div class="col-lg-4 preview">

    <h5 class="col-12 l-game-preview__title">{{ $t('likeGameTitle') }}</h5>

    <div class="col-12 row liked-tags">
      <div
          v-for="{ icon, label } in likeTags"
          :key="label"
          class="col-lg-6 col-md-6 col-sm-6 col-xs-12 liked-tags__item">
        <icon-box size="48" radius="50%">
          <icon :name="icon" :size="iconsSize" :fill="iconsColor"/>
        </icon-box>
        <span class="liked-tags__label">{{ label }}</span>
      </div>
    </div>

    <h6 class="col-12 l-game-preview__title--sm">{{ $t('followingTagsTitle') }}</h6>

    <div class="col-12 row following-tags">
      <div
          v-for="tag in followTags"
          :key="tag"
          class="col-auto following-tags__item">
        <q-btn :label="tag" color="tertiary" rounded class="following-tags__btn"/>
      </div>
    </div>

    <h6 class="col-12 l-game-preview__title--sm">{{ $t('friendAlsoPlayingTitle') }}</h6>

    <div class="col-12 row friends">
      <a
          v-for="{ name, logo, url } in friends"
          :key="name"
          :href="url"
          class="col-auto t-hover-opacity friends__item">
        <div class="friends__logo" :style="{ backgroundImage: `url(${ logo })` }"></div>
        {{ name }}
      </a>
    </div>

    <div class="best-review">
      <h6 class="col-12 l-game-preview__title--sm">{{ $t('bestReviewTitle') }}</h6>
      <p class="paragraph best-review__label">{{ bestReview.label }}</p>
      <a :href="bestReviewUser.url" class="t-hover-opacity best-review__user">
        <div
            class="best-review__user-logo"
            :style="{ backgroundImage: `url(${ bestReviewUser.logo })` }">
        </div>
        <span class="best-review__user-name">{{ bestReviewUser.name }}</span>
        <span class="best-review__user-count">
          {{ bestReviewUser.reviews }} {{ $t('gameReviewsLabel').toLowerCase() }}
        </span>
      </a>
    </div>

  </div>

  <div class="offset-lg-1"></div>

  <div class="col-lg-7 info">

    <div class="col-12 shadow-10 info__banner">
      <a :href="info.bannerUrl" class="t-hover-opacity">
        <img :src="info.banner" alt="game banner">
      </a>
    </div>

    <h5 class="col-12 l-game-preview__title">{{ info.title }}</h5>

    <p class="paragraph">{{ info.description }}</p>

    <a :href="info.readMoreUrl">{{ $t('readMoreLabel') }}</a>

  </div>

</section>
</template>

<script>
import Icon from '@components/Icon'
import IconBox from '@components/blocks/IconBox'

export default {
  name: 'GamePreview',

  components: { Icon, IconBox },

  props: {
    likeTags: Array,
    followTags: Array,
    friends: Array,
    bestReview: Object,
    info: Object
  },

  data () {
    return {
      iconsSize: 24,
      iconsColor: '#FFF'
    }
  },

  computed: {
    bestReviewUser () {
      return this.bestReview.user
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '~styl/@mixins'

.preview
  margin-bottom: $space-base

.l-game-preview
  &__title
    font-size: 2.4rem
    font-weight: normal
    letter-spacing: -.02em
    line-height: 4rem
    &--sm
      font-size: 1.6rem
      font-weight: bold
      letter-spacing: -.02em

.liked-tags
  margin: $space-base 0
  doOpacity(.7)

  &__item
    display: flex
    align-items: center
    margin-bottom: $space-base
    .b-icon-box
      flex-shrink: 0

  &__label
    margin-left: $space-base
    font-family: Roboto
    font-size: 1.2rem
    font-weight: bold
    text-transform: uppercase
    letter-spacing: .1em
    color: $text-color-light-1

.following-tags
  margin: ($space-base * 1.5) 0 ($space-base * 2)

  &__item
    margin-bottom: $space-base

    &:not(:last-child)
      margin-right: ($space-base / 2)

  &__btn
    height: 4rem
    padding: $space-base ($space-base * 1.5)
    font-family: Roboto
    font-weight: bold
    font-size: 1.2rem
    letter-spacing: .1em
    line-height: 1em
    text-transform: uppercase

.friends
  $logo-size = 4rem

  margin: $space-base 0 ($space-base * 2)

  &__item
    display: flex
    align-items: center
    margin-bottom: ($space-base / 2)
    color: $white
    line-height: 0

    &:not(:last-child)
      margin-right: $space-base

  &__logo
    width: $logo-size
    height: $logo-size
    margin-right: ($space-base / 2)
    background-color: $bg-dark-1
    border-radius: 50%

.best-review
  $logo-size = 32px

  &__label
    margin: $space-base 0

  &__user
    position: relative
    display: inline-flex
    flex-direction: column
    justify-content: center
    height: 4rem
    padding-left: $space-base + $logo-size

    &-logo
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

    &-name
      font-size: 1.6rem
      font-weight: bold
      letter-spacing: -.02em
      line-height: 1.2
      color: $text-color-light-1

    &-count
      font-weight: bold
      line-height: 1.2
      color: $text-color-gray-1

.info
  margin-bottom: $space-base

  &__banner
    margin-bottom: ($space-base * 3)
    img
      width: 100%
      border-radius: $border-radius

  .paragraph
    margin: $space-base 0 ($space-base * 1.5)
</style>
