<template lang="pug">
q-search.base-search(
  v-model="model"
  :float-label="label || $trans('labels', 'search')"
  :placeholder="placeholder || ' '"
  :readonly="readonly"
  :dark="true"
  color="white"
  @input="input"
  @change="change"
)
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop(String) value: string
  @Prop(String) label: string
  @Prop(String) placeholder: string
  @Prop(Boolean) readonly: boolean

  model = this.value || null

  @Emit()
  input (value: string) {
    this.model = value || null
  }

  @Emit()
  change (value: string) {
    this.model = value || null
  }
}
</script>

<style lang="stylus" scoped>
.base-search
  padding-top: 0
  /deep/ .q-icon
    font-size: 18px
</style>
