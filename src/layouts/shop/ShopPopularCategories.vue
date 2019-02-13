<template>
<section class="row cord-padding l-shop-popular-categories">

  <h2 class="title title--light color-light-3 col-12 text-center">
    {{ $t('popularCategoriesTitle') }}
  </h2>

  <div class="row gutter-sm col-12 q-pb-sm justify-center categories">
    <div
      v-for="category in categories"
      :key="category"
      class="col-lg-2 col-md-3 col-sm-4 col-xs-6 categories__item"
    >
      <q-btn
        :label="category"
        rounded
        class="categories__btn"
      />
    </div>
  </div>

</section>
</template>

<script>
export default {
  name: 'ShopPopularCategories',

  props: {
    categories: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-shop-popular-categories
  background-color: rgba(41, 41, 41, .3)
  .title
    margin-bottom: ($space-base * 2)

.categories
  &__btn
    width: 100%
    background-color: $bg-dark-3
</style>
