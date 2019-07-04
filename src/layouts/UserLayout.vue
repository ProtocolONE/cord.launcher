<template lang="pug" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
base-layout
  .layout-container.row.q-col-gutter-md

    .col-lg-2.col-md-3.col-4
      // toolbar
      q-toolbar.toolbar.base-padding.text-white
        q-btn.q-btn__back(to="/" :label="$trans('labels', 'back')")
        q-toolbar-title.flex.items-center
          .flex.justify-between.full-width.q-pa-xs
            | {{ $trans('routes', $route.name) }}
            q-btn(
              :label="$trans('labels', 'save')"
              :form="form_id"
              type="submit")

      aside.user-nav
        q-list(dark)
          q-item.user-nav__item(
              v-for="{ name, label, path } in routes"
              v-ripple
              :key="name"
              :active="$route.name === name"
              active-class="text-white text-bold"
              clickable
              @click="$router.push({ name })")
            q-item-section {{ label }}

    .col-lg-10.col-md-9.col-8
      router-view.user-view(
          v-if="user_data"
          :id="$route.name"
          :user="user_data"
          :form-id="form_id"
          @save="update_user_data")
</template>

<script>
import BaseLayout from 'layouts/BaseLayout'

import { mapState, mapActions } from 'vuex'
import { uniqueId, cloneDeep, merge } from 'lodash-es'
import { LocalStorage } from 'quasar'

import { user_routes } from 'src/router/routes'

export default {
  name: 'UserLayout',

  components: {
    BaseLayout
  },

  data () {
    return {
      form_id: uniqueId('user-form-'),
      routes: user_routes.map(route => ({
        name: route.name,
        path: route.path,
        label: this.$trans('routes', route.name)
      }))
    }
  },

  computed: {
    ...mapState('user', ['user_data'])
  },

  async created () {
    await this.load_user_data()
    this.$watch('user_data.account.primary_language', locale => {
      LocalStorage.set('locale', locale)
      this.$router.go({ force: true })
    })
  },

  methods: {
    ...mapActions('user', ['load_user_data', 'save_user_data']),

    async update_user_data (data) {
      let user_data = cloneDeep(this.user_data)
      let updated_user_data = merge(user_data, data)

      await this.save_user_data(updated_user_data)

      this.$q.notify({
        icon: 'info',
        color: 'neutral',
        position: 'top-right',
        message: this.$trans('paragraphs', 'accounts_data_successfully_updated')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
$toolbar-height = 120px

.layout-container
  position: relative
  padding-top: $toolbar-height

.toolbar
  position: absolute
  top: 15px
  left: 0
  width: 100%
  height: $toolbar-height
  background: rgba($primary, 0.6)

.user-nav,
.user-view
  padding: $base-padding

.user-nav
  padding-top: 30px
  font-size: 16px

  &__item
    color: $grey
</style>
