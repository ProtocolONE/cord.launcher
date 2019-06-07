<template lang="pug">
.text-white
  q-checkbox(v-model="model"
             :label="label"
             :readonly="readonly"
             :dark="true"
             color="teal"
             @change="$emit('input', !model)")
</template>

<script>
export default {
  name: 'BaseCheckbox',

  props: {
    value: Boolean,
    label: String,
    readonly: Boolean
  },

  data () {
    return {
      model: this.value || false
    }
  }
}
</script>
