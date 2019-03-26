<template lang="pug">
table.requirements-table
  base-title.text-white.requirements__title(level="4")
  table.table
    tbody
      tr(v-for="(v, k) in requirements" :key="k")
        td.text-bold.td(width="100") {{ $trans('system', k) }}
        td.td {{ v }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SystemRequirementsTable extends Vue {
  @Prop(String) label: string
  @Prop(Object) requirements: Record<string | any>
}
</script>

<style lang="stylus" scoped>
.requirements-table
  &__title
    text-shadow: 0 4px 4px rgba(0, 0, 0, .25)

.table
  width: 100%
  font-size: 16px
  letter-spacing: -.02em
  .td
    padding: $space-base
    &:first-child
      padding-left: 0
      color: #909090
</style>
