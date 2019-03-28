<template lang="pug">
q-layout.main
  q-layout-header.main-header: main-header
  q-page-container.main-container
    slot
      router-view(v-if="online" :id="$route.name")
      offline(v-else)
  q-layout-footer.main-footer: main-footer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

import Offline from 'pages/offline'
import MainHeader from 'components/MainHeader'
import MainFooter from 'components/MainFooter'

@Component({
  components: { Offline, MainHeader, MainFooter }
})
export default class MainLayout extends Vue {
  @State('online') private online: boolean
}
</script>
