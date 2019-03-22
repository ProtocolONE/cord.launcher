<template lang="pug">
main-layout
  .row.gutter-sm
    .col-lg-2.col-md-3.col-sm-3.col-xs-12
      aside.user-nav
        ul.list
          li.text-bold.list__item(v-for="{ name, label, path } in routes" :key="name")
            router-link.q-link(:to="path" :aria-label="label" active-class="active")
              | {{ label }}
    .col-lg-10.col-md-9.col-sm-9.col-xs-12
      router-view.user-view(:id="$route.name")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { USER_ROUTES } from '@/router/routes'

import MainLayout from './main'

@Component({
  components: { MainLayout }
})
export default class UserLayout extends Vue {
  get routes () {
    return USER_ROUTES.map(item => {
      item.label = this.$trans('links', item.name)
      return item
    })
  }
}
</script>

<style lang="stylus" scoped>
.user-nav,
.user-view
  padding: $base-padding
  @media (max-width: $breakpoint-xs-max)
    padding: ($base-padding / 2)

.user-view
  @media (max-width: $breakpoint-xs-max)
    padding-top: 0

.user-nav
  padding-top: 30px
  @media (max-width: $breakpoint-xs-max)
    padding: 15px
    padding-bottom: 0

.list
  @media (max-width: $breakpoint-xs-max)
    display: flex
    flex-wrap: wrap
    &__item
      &:not(:last-child)
        padding-right: $space-base

  &__item
    font-size: 16px
    line-height: 40px

    .q-link
      color: $grey

      &.active
        color: $white
</style>
