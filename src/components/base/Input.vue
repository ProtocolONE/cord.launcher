<template lang="pug">
q-input(v-model="model"
        :type="type"
        :label="label"
        :readonly="readonly"
        :dark="true"
        color="white"
        @change="$emit('input', model)")
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    value: String,
    label: String,
    readonly: Boolean,
    type: String
  },

  data () {
    return {
      model: this.value || null
    }
  }
}
</script>
