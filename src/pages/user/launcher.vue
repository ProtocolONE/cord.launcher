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
import { remote, ipcRenderer } from 'electron'

@Component
export default class Launcher extends Vue {
  channels = ['latest', 'beta'].map(c => ({ label: c, value: c }))
  channel = remote.app.$store.get('channel') || this.channels[0].value

  handleChange (value) {
    ipcRenderer.send('change-channel', value)
  }
}
</script>
