<template lang="pug">
q-page.row.gutter-sm.launcher
  .col-auto: base-select.q-mb-xl(
    v-model="channel"
    :label="$trans('labels', 'channel')"
    :options="channels"
    @change="handleChange"
  )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Launcher extends Vue {
  channels = ['latest', 'beta'].map(c => ({ label: c, value: c }))
  channel = null

  handleChange (value: string) {
    require('electron').ipcRenderer.send('change-channel', value)
  }

  created () {
    this.channel = require('electron').remote.app.$store.get('channel') ||
      this.channels[0].value
  }
}
</script>
