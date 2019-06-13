<template lang="pug" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
base-layout
  .row.gutter-sm

    .col-lg-2.col-md-3.col-4
      aside.user-nav
        q-list(dark bordered separator)
          q-item(v-for="{ name, label, path } in routes"
                 v-ripple
                 :key="name"
                 :active="$route.name === name"
                 active-class="bg-white text-black"
                 clickable
                 @click="$router.push(path)")
            q-item-section {{ label }}

    .col-lg-10.col-md-9.col-8
      router-view.user-view(:id="$route.name")
</template>

<script>
import BaseLayout from 'layouts/BaseLayout'

import { user_routes } from 'src/router/routes'

export default {
  name: 'UserLayout',

  components: {
    BaseLayout
  },

  data () {
    return {
      routes: user_routes.map(route => ({
        name: route.name,
        path: route.path,
        label: this.$trans('links', route.name)
      }))
    }
  },

  created () {
    // --- TODO: add /me (for check user)
    // let url = 'https://qilinapi.tst.protocol.one/api/v1/me'
    // url = process.env.API_URL + '/accounts/login'
    // this.$axios.post(url)
  }
}
</script>

<style lang="stylus" scoped>
.user-nav,
.user-view
  padding: $base-padding

.user-nav
  padding-top: 30px
</style>
