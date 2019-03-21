<template lang="pug">
section.row.column.overflow-hidden.popular-categories
  .col
    base-title.text-center {{ $trans('titles', 'popularCategories') }}
  .col.categories.flex.no-wrap.align-center.justify-center
    q-btn.q-mr-lg.categories__item(
      v-for="(category, index) in categories"
      :key="category + index"
      :label="category"
      color="secondary"
      rounded
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PopularCategories extends Vue {
  categories = ['Free', 'Top', 'New', 'Free', 'Sellers', 'Best']
}
</script>

<style lang="stylus" scoped>
.popular-categories
  min-height: 200px
  padding: 40px 0
  background-color: rgba(41, 41, 41, .3)

.categories
  &__item
    width: 216px
    flex-shrink: 0
</style>
