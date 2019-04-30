<template lang="pug">
q-checkbox(
  v-model="model"
  :label="label"
  :readonly="readonly"
  :dark="true"
  color="white"
  @change="change"
)
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop(String) label: string
  @Prop(Boolean) value: boolean
  @Prop(Boolean) readonly: boolean

  model = this.value || false

  @Emit()
  change (value: boolean) {
    this.model = value || false
    this.$emit('input', this.model)
  }
}
</script>
