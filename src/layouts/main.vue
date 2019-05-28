<template lang="pug">
q-layout.main
  electron-header(v-if="isElectron")
  q-layout-header.main-header: main-header
  q-page-container.main-container: slot: router-view
  q-layout-footer.main-footer: main-footer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import MainHeader from 'components/MainHeader'
import MainFooter from 'components/MainFooter'

@Component({
  components: {
    MainHeader,
    MainFooter,
    ElectronHeader: () => import('components/electron/Header')
  }
})
export default class MainLayout extends Vue {
  isElectron = (process.env.MODE === 'electron')
}
</script>
