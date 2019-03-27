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
    this.$updateLocale(value)
  }

  created () {
    console.log(process.env)
    if (process.env.MODE === 'electron') {
      try {
        // --- TODO: messages
        let { ipcRenderer } = require('electron')
        ipcRenderer.on('message', (event, text) => this.$q.notify({
          message: text,
          type: 'info',
          position: 'top-right'
        }))
      }
      catch (error) {
        // --- skip
        console.error(error)
      }
    }
  }
}
</script>
