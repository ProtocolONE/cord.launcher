<template lang="pug">
section.reviews

  header.row
    .col-lg-3.col-12: base-title {{ $trans('titles', 'reviews') }}

    each label in ['overall', 'byGameOwners', 'byGameOwners']
      .col-lg-3.col-md-4.col-sm-4.col-xs-12.flex.items-center
        q-icon.q-mr-sm(name="fas fa-star" size="16px")
        .flex.column
          b.reviews-count.text-center 5
          b.reviews-label.text-center {{ $trans('labels', '#{label}') }}

  .q-mt-md-none.q-mt-xs-xl
    ul.list.flex.text-bold
      each label in ['best', 'all']
        li.q-mr-sm
          q-btn.capitalize(href="#" @click.prevent flat) {{ $trans('labels', '#{label}') }}

  .row.gutter-sm.justify-md-center.q-mt-xs
    each _ in [1, 2, 3]
      .col-lg-4.col-md-6.col-sm-12.col-xs-12
        .row.q-pa-lg.reviews__item
          .col-12.q-mb-lg: base-paragraph {{ review.text }}
          .col-5.flex: q-rating(:value="review.rating" size="16px" color="white" readonly)
          .col-7.text-right
            q-btn.row.items-center.capitalize.user(:to="review.user.url" flat)
              .col.flex.column.q-mr-sm
                span.user__name {{ review.user.name }}
                span.user__reviews
                  | {{ review.user.reviews }} {{ $trans('labels', 'reviews') }}
              .col.user__logo(:style="{ backgroundImage: `url(${ review.user.logo })` }")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component()
export default class Reviews extends Vue {
  review = {
    text: 'Shattered Planet is a strategic tactics game, the kind that implores you to choose your turns and decisions carefully. Explore planet surfaces and return with loot to empower your next missions.',
    rating: 3,
    user: {
      name: 'Anton Frolov',
      logo: 'statics/images/user-logo.jpg',
      url: '/user',
      reviews: 800
    }
  }
}
</script>

<style lang="stylus" scoped>
.reviews
  padding: $base-padding
  background: linear-gradient(360deg, rgba(62, 62, 62, 0.5) 45.2%, rgba(0, 0, 0, 0) 119.77%)

  &__item
    background-color: #373737

.reviews-count,
.reviews-label
  letter-spacing: -.02em
  line-height: normal

.reviews-count
  font-size: 32px

.list
  font-size: 16px
  letter-spacing: -0.02em

.user

  &__name
    font-size: 16px
    color: #909090
    letter-spacing: -0.02em

  &__reviews
    font-size: 12px
    letter-spacing: -0.02em
    color: rgba(144, 144, 144, .4)

  &__logo
    width: 36px
    height: 36px
    flex: 0 0 36px
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    border-radius: 50%
</style>
