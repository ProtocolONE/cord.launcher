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
  channels = ['stable', 'beta', 'alpha'].map(c => ({ label: c, value: c }))
  channel = null

  created () {
    this.channel = this.$appStore.get('channel') || this.channels[0].value
  }

  handleChange (value: string) {
    require('electron').ipcRenderer.send('change-channel', value)
  }
}
</script>
