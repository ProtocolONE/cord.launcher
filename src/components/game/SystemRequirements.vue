<template lang="pug">
.requirements
  base-title {{ $trans('titles', 'systemRequirements') }}
  q-tabs(underline-color="transparent" color="transparent" animated)

    // TODO: set default as current system
    q-tab.q-pa-none.q-mr-md.requirements__tab(
      v-for="(_, system, i) in requirements"
      :key="system"
      :name="system"
      :default="i === 0"
      slot="title"
    )
      q-btn.q-pa-none.q-btn(color="primary")
        box-icon(size="84" :icon="`fab fa-${ system } fa-2x`" background="transparent")

    q-tab-pane.q-pa-none(
      v-for="({ minimal, recommended }, system) in requirements"
      :key="system"
      :name="system"
    )
      .row.gutter-sm
        .col-lg-6.col-md-6.col-sm-12.col-xs-12
          requirements-table(:label="$trans('labels', 'minimal')" :requirements="minimal")
        .col-lg-6.col-md-6.col-sm-12.col-xs-12
          requirements-table(:label="$trans('labels', 'recommended')" :requirements="recommended")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import RequirementsTable from './SystemRequirementsTable'
import BoxIcon from 'components/BoxIcon'

@Component({
  components: { RequirementsTable, BoxIcon }
})
export default class SystemRequirements extends Vue {
  @Prop(Object) requirements: Record<string | any>
}
</script>

<style lang="stylus" scoped>
.requirements
  &__tab
    flex: 0 0 0 !important
    &.active .q-btn
      background: $tertiary !important
</style>
