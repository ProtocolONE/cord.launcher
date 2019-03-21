<template lang="pug">
section.preview: .row

  .col-lg-5
    .col-12: base-title.text-white(level="4") {{ $trans('titles', 'whyLikeGame') }}

    .row.col-12.q-mb-xl
      .col-lg-auto.col-md-auto.col-sm-6.col-xs-12(v-for="tag in iconTags" :key="tag.icon")
        base-tag(type="icon" :icon="tag.icon" :label="tag.label" color="rgba(0, 0, 0, 0.3)")

    .col-12.q-mb-xl
      base-title.text-white.text-bold(level="6") {{ $trans('titles', 'followingTags') }}
      base-tag(v-for="tag in tags" :key="tag" :label="tag")

    .col-12
      base-title.text-white.text-bold(level="6") {{ $trans('titles', 'friendAlsoPlaying') }}

    .row.col-12.q-mb-xl
      each _ in [1, 2]
        q-btn.q-mr-sm.player(label="Anton Frolov" rounded flat)
          .player__logo.q-ml-sm(:style="{ backgroundImage: 'url(statics/images/user-logo.jpg)' }")

    .review
      base-title.text-white.text-bold(level="6") {{ $trans('titles', 'bestReview') }}
      .row.reviews__item
        .col-12.q-mb-lg: base-paragraph {{ review.text }}
        .col-12
          q-btn.items-center.capitalize.user(:to="review.user.url" flat)
            .col.flex.column.q-mr-sm
              span.user__name {{ review.user }}
              span.user__reviews
                | {{ review.count }} {{ $trans('labels', 'reviews') }}
            box(size="32" radius="50%" background="#242424")

  .offset-lg-1

  .col-lg-6
    q-btn.q-pa-none.banner(to="/game/1")
      img.banner__img(src="statics/images/game-banner.jpg" alt="banner")

    .col-12.q-mt-xl
      base-title.text-white(level="4")
        | Explore a dangerous planet that's different every time and try to survive!
      base-paragraph
        | The Galactic Union's job for you is clear: research the alien wildlife — for science! However, in this case, researching may include lasers, explosions, hungry aliens, space sushi, and other similarly delicious-or-terrifying hazards. In-between missions, use scrap metal you've collected to upgrade your stats. Read more
      a.q-link.inline-block.q-mt-md.capitalize(href="/more")
        | {{ $trans('labels', 'readMore') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Box from 'components/Box'

@Component({
  components: { Box }
})
export default class Gallery extends Vue {
  tags = ['strategy', 'sci-fi', 'isometric']

  iconTags = [
    { icon: 'fas fa-rocket', label: 'SOME KIND OF TAG' },
    { icon: 'fas fa-fighter-jet', label: 'ANOTHER ONE' }
  ]

  review = {
    text: 'Shattered Planet is a strategic tactics game, the kind that implores you to choose your turns and decisions carefully. Explore planet surfaces and return with loot to empower your next missions.',
    user: 'Sexy user',
    count: 333
  }
}
</script>

<style lang="stylus" scoped>
.preview
  padding: $base-padding

.player

  &__logo
    width: 36px
    height: 36px
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    border-radius: 50%

.user

  &__name
    font-size: 16px
    color: #909090
    letter-spacing: -0.02em

  &__reviews
    font-size: 12px
    letter-spacing: -0.02em
    color: rgba(144, 144, 144, .4)

.banner
  width: 100%

  &__img
    width: 100%
    height: 100%
</style>
