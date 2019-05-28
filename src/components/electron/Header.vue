<template lang="pug">
header.e-header.flex.justify-end
  ul.list.flex
    li.list__item(v-for="{ name, action } in buttons" :key="name")
      q-btn.list__btn(flat @click="sendMessage(action)")
        q-icon(:name="name")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'

@Component
export default class ElectronHeader extends Vue {
  buttons = [
    {
      name: 'far fa-window-minimize',
      action: 'minimize'
    },
    {
      name: 'fas fa-square-full',
      action: 'fullscreen'
    },
    {
      name: 'fas fa-times',
      action: 'close'
    }
  ]

  sendMessage (action: string) {
    let { width, height } = screen
    ipcRenderer.send(`e-${action}`, { width, height })
  }
}
</script>

<style lang="stylus" scoped>
.e-header
  position: fixed
  top: 0
  left: 0
  z-index: 99999
  width: 100%
  height: 25px
  background-color: $grey
  /deep/ + *
    padding-top: 25px

.list
  &__item
    &:not(:last-child)
      margin-right: 1px
  &__btn
    padding: 0 10px
    font-size: .6em
</style>
