<template lang="pug">
q-layout
  q-layout-header: main-header
  q-page-container: keep-alive
    slot: router-view(:id="$route.name")
  q-layout-footer: main-footer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import MainHeader from 'components/MainHeader'
import MainFooter from 'components/MainFooter'

@Component({
  components: { MainHeader, MainFooter }
})
export default class MainLayout extends Vue {}
</script>
