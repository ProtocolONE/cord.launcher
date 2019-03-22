<template lang="pug">
q-input(
  v-model="model"
  :float-label="label"
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
  @Prop(String) value: string
  @Prop(String) label: string
  @Prop(Boolean) readonly: boolean

  model = this.value || null

  @Emit()
  change (value: string) {
    this.model = value || null
  }
}
</script>
