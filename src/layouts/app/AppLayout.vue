<template>
<q-layout class="app-layout">

  <!-- header -->
  <q-layout-header class="app-layout__header">
    <slot name="header">
      <app-header :logo="logo"/>
    </slot>
  </q-layout-header>

  <!-- body -->
  <q-page-container class="app-layout__container">
    <q-page padding>
      <slot/>
    </q-page>
  </q-page-container>

  <!-- footer -->
  <q-layout-footer class="app-layout__footer">
    <slot name="footer">
      <app-footer :logo="logo"/>
    </slot>
  </q-layout-footer>

</q-layout>
</template>

<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

import { mapState } from 'vuex'

export default {
  name: 'AppLayout',

  components: { AppHeader, AppFooter },

  computed: {
    ...mapState('initial', ['logo'])
  }
}
</script>
