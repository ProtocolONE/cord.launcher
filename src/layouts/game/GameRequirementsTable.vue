<template>
<div class="l-game-requirements-table">

  <h5 class="title">{{ title }}</h5>

  <table>
    <tbody>
      <tr v-for="(value, key) in requirements" :key="key">
        <td width="100" class="text-bold">{{ $t(key) }}</td>
        <td>{{ value }}</td>
      </tr>
    </tbody>
  </table>

</div>
</template>

<script>
export default {
  name: 'GameRequirementsTable',

  props: {
    title: String,
    requirements: Object
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-requirements-table
  table
    width: 100%
    margin: ($space-base * 1.5) 0 ($space-base * 1.5)
    td
      padding: $space-base
      font-size: 1.6rem
      letter-spacing: -.02em
      &:first-child
        padding-left: 0
    td:first-child
      color: $text-color-light-1
</style>
