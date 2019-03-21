<template lang="pug">
.flex.items-center.platforms
  q-btn.q-pa-none(
    v-for="(item, i) in items"
    :key="item.icon"
    :to="item.url"
    :class="{ ['q-mr-sm']: i !== (items.length - 1) }"
    size="sm"
    flat
  )
    box-icon(
      size="48"
      :icon="`fab fa-${ item.icon } fa-2x`"
      :background="getBackground"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { map } from 'lodash'
import { Social } from 'interfaces'

import BoxIcon from 'components/BoxIcon'

@Component({
  components: { BoxIcon }
})
export default class Platforms extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  icons: Social[] | Array<string>

  @Prop({
    type: Boolean,
    default: true
  })
  background: boolean

  @Prop({
    type: String,
    default: 'rgba(0, 0, 0, .25)'
  })
  backgroundColor: string

  get items () {
    return map(this.icons, item => ({
      icon: item.icon || item,
      url: item.url
    }))
  }

  get getBackground () {
    return (this.background && this.backgroundColor) || 'transparent'
  }
}
</script>

<style lang="stylus" scoped>
.info
  padding: $base-padding
</style>
