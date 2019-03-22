<template lang="pug">
q-btn.roboto.text-bold.base-tag(
  v-if="type === 'default'"
  v-bind="{ ...$props, ...$attrs }"
  :label="label"
  rounded
)
q-btn.roboto.text-bold.base-tag.base-tag--icon(
  v-else-if="type === 'icon'"
  rounded
  flat
)
  box-icon.q-mr-md(
    :icon="icon"
    size="48"
    radius="50%"
    background="rgba(0, 0, 0, .3)"
  )
  span.ellipsis {{ label }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import BoxIcon from 'components/BoxIcon'

@Component({
  components: { BoxIcon }
})
export default class Tag extends Vue {
  @Prop({
    type: String,
    default: 'default',
    validator (value: string): boolean {
      return ['default', 'icon'].includes(value)
    }
  })
  type: string

  @Prop(String) icon: string
  @Prop({ type: null, required: true }) label: string | null
}
</script>

<style lang="stylus" scoped>
.base-tag
  height: 40px
  padding-top: 0
  padding-bottom: 0
  background-color: rgba($black, .5)
  letter-spacing: 0.1em
  font-size: 12px
  line-height: 40px

  &--icon
    min-width: 180px
    height: auto
    padding: 0
    padding-right: $space-base
    background-color: transparent
    color: #909090

    /deep/ .q-btn-inner
      flex-wrap: nowrap

  ~ .base-tag
    margin-left: 6px
</style>
