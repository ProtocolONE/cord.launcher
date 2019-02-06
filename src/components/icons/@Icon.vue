<template>
<component :is="name" v-bind="{ ...$props, ...$attrs }"/>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  created () {
    this.registerIcon(this.name)
  },

  methods: {
    registerIcon (iconName) {
      let upperIconName = iconName.replace(/^\w/, c => c.toUpperCase())
      Vue.component(iconName, () => import(`./${ upperIconName }`))
    }
  }
}
</script>
