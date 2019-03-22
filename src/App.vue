<template lang="pug">
div#q-app.app
  router-view
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class App extends Vue {
  @State('locale') locale

  @Watch('locale', { immediate: true })
  onLocaleChanged (value: string) {
    this.$updateLocale(value)
  }
}
</script>
