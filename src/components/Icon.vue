<template>
<object :data="iconSrc" type="image/svg+xml" class="c-icon">
  <img :src="iconSrc" :alt="name">
</object>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      default: 'svg'
    }
  },

  computed: {
    iconSrc () {
      let { name, extension: ext } = this
      let icon = `${ name }.${ ext }`
      return `statics/${ ext }/${ icon }`
    }
  }
}
</script>
