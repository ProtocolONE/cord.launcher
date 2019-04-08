<template lang="pug">
div#q-app.app
  router-view
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class App extends Vue {
  @State('locale') locale: string | undefined

  @Watch('locale', { immediate: true })
  onLocaleChanged (value: string) {
    // TODO: fix it please - globally vue proto
    this.$updateLocale(value)
  }

  created () {
    console.log(
      'v0.0.1'
    )
  }
}
</script>
