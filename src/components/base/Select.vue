<template lang="pug">
q-select(
  v-model="model"
  :options="options"
  :float-label="label"
  :disable="disable"
  :dark="true"
  color="white"
  @input="change"
)
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { BaseSelectOption } from 'interfaces'

@Component
export default class Select extends Vue {
  @Prop(String) value: string
  @Prop(String) label: string
  @Prop(Boolean) disable: boolean
  @Prop({ type: Array, default: () => [] }) options: BaseSelectOption[]

  model = this.value || null

  @Emit()
  change (value: string) {
    this.model = value || null
    this.$emit('input', this.model)
  }
}
</script>
