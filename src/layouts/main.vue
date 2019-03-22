<template lang="pug">
q-layout.main
  q-layout-header.main-header: main-header
  q-page-container.main-container
    slot: router-view(:id="$route.name")
  q-layout-footer.main-footer: main-footer
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
