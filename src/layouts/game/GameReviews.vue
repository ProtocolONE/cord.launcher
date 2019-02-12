<template>
<section class="cord-padding l-game-reviews">

  <header class="row l-game-reviews__header">
    <div class="col-lg-3 col-12">
      <h2 class="title color-light-3">
        {{ $t('reviews') }}
      </h2>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 b-rating">
      <q-icon name="grade" size="1.6rem" class="b-rating__icon"/>
      <div class="b-rating__content">
        <span class="b-rating__rating">{{ gameRating.overall }}</span>
        <span class="b-rating__label">{{ $t('overall') }}</span>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 b-rating">
      <q-icon name="grade" size="1.6rem" class="b-rating__icon"/>
      <div class="b-rating__content">
        <span class="b-rating__rating">{{ gameRating.owners }}</span>
        <span class="b-rating__label">{{ $t('byGameOwners') }}</span>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 b-rating">
      <q-icon name="grade" size="1.6rem" class="b-rating__icon"/>
      <div class="b-rating__content">
        <span class="b-rating__rating">{{ gameRating.owners }}</span>
        <span class="b-rating__label">{{ $t('byGameOwners') }}</span>
      </div>
    </div>
  </header>

  <ul class="row q-ma-none q-pa-none reviews-link">
    <li class="reviews-link__item active">
      <a href="javascript:void(0)">{{ $t('reviewsBestLabel') }}</a>
    </li>
    <li class="reviews-link__item">
      <a href="javascript:void(0)">{{ $t('reviewsAllLabel') }}</a>
    </li>
  </ul>

  <div class="row gutter-sm justify-md-center reviews">
    <div
        v-for="{ review, rating, user } in reviews"
        :key="`${ user.name }-${ user.id }`"
        class="col-lg-4 col-md-6 col-sm-12 col-xs-12">

      <div class="row reviews__item">
        <p class="col-12 paragraph">{{ review }}</p>
        <div class="col-5">
          <q-rating :value="rating" size="1.6rem" color="white" readonly/>
        </div>
        <div class="col-7 text-right">
          <a :href="user.url" class="t-hover-opacity reviews__user">
            <div
              class="reviews__user-logo"
              :style="{ backgroundImage: `url(${ user.logo })` }">
            </div>
            <span class="reviews__user-name">{{ user.name }}</span>
            <span class="reviews__user-count">
              {{ user.reviews }} {{ $t('gameReviewsLabel').toLowerCase() }}
            </span>
          </a>
        </div>
      </div>

    </div>
  </div>

</section>
</template>

<script>
export default {
  name: 'GameReviews',

  props: {
    gameRating: Object,
    reviews: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-reviews
  background: linear-gradient(360deg, rgba(62, 62, 62, .5) 50%, rgba(0, 0, 0, 0) 120%)
  &__header
    margin-bottom: ($space-base * 2)
  @media (max-width $breakpoint-sm-min)
    .title
      margin-bottom: $space-base

.b-rating
  display: flex
  flex-wrap: wrap
  align-items: center
  &__content
    display: flex
    flex-direction: column
    @media (max-width $breakpoint-sm-max)
      margin-bottom: $space-base
  &__icon
    margin-right: ($space-base * 1.5)
  &__rating
    font-weight: bold
    font-size: 3.2rem
    letter-spacing: -.02em
    line-height: normal
  &__label
    font-weight: bold
    font-size: 1.4rem
    letter-spacing: -.02em
    line-height: normal
  @media (min-width $breakpoint-lg-min)
    padding-left: ($space-base * 4)

.reviews-link
  margin-bottom: $space-base
  list-style-type: none
  &__item
    padding: $space-base
    text-align: center
    font-size: 1.6rem
    letter-spacing: -.02em
    text-shadow: 0 .4rem .4rem rgba(0, 0, 0, .25)
    opacity: .45
    &.active
      opacity: 1
    &:first-child
      padding-left: 0

.reviews
  $logo-size = 32px

  &__item
    padding: ($space-base * 2)
    background-color: $bg-dark-2
    border-radius: $border-radius

  &__user
    position: relative
    display: inline-flex
    flex-direction: column
    justify-content: center
    height: 4rem
    padding-right: $space-base + $logo-size

    &-logo
      position: absolute
      top: 50%
      right: 0
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
</style>
