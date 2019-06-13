<template lang="pug">
.tags.roboto.text-bold
  q-btn.tags__item(v-for="{ id, title } in tags"
        :key="id"
        :label="title")
</template>

<script>
export default {
  name: 'Tags',

  props: {
    tags: {
      type: Array,
      default: () => [],
      validator: v => Array.isArray(v)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tags

  &__item
    border-radius: 15px
    font-size: 12px
    line-height: 14px
    letter-spacing: 0.1em
</style>
