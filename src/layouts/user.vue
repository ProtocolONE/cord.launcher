<template lang="pug">
main-layout
  aside.user-nav
    ul.list
      li.text-bold.list__item(v-for="{ name, label, path } in routes" :key="name")
        router-link.q-link(:to="path" :aria-label="label" active-class="active")
          | {{ label }}
  keep-alive: router-view.user-view(:id="$route.name" :user="user")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from 'interfaces'
import { cloneDeep } from 'lodash'
import { USER_ROUTES } from '@/router/routes'

import MainLayout from './main'

@Component({
  components: { MainLayout }
})
export default class UserLayout extends Vue {
  @namespace('user').State(state => state) userState: User

  get user () {
    return cloneDeep(this.userState)
  }

  get routes () {
    return USER_ROUTES.map(item => {
      item.label = this.$trans('links', item.name)
      return item
    })
  }
}
</script>

<style lang="stylus" scoped>
.user-nav
  min-width: 200px
  flex-basis: 250px
  padding: $base-padding
  padding-top: 30px

.user-view
  flex: 1 0 auto
  padding: $base-padding

.list
  &__item
    font-size: 16px
    line-height: 40px

    .q-link
      color: $grey

      &.active
        color: $white
</style>
