<template lang="pug">
.tags.roboto.text-bold
  q-btn.tags__item(
      v-for="(tag, i) in tags"
      :key="tag.id"
      :label="tag.title"
      :class="{ 'q-mr-sm': i < tags.length }"
      :ripple="false")
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
    cursor: default
</style>
