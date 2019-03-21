<template lang="pug">
section.flex.items-center.row.socials

  .col-lg-6.col-md-6.col-12.q-mb-md.q-mb-md-none
    base-title.q-mb-none {{ title }}

  .col-lg-6.col-md-6.col-12.flex.justify-md-end
    icons-list.socials__icons(:icons="socials" :background="false")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import IconsList from 'components/common/IconsList'

@Component({
  components: { IconsList }
})
export default class Socials extends Vue {
  @Prop(String) gameName: string
  @Prop(Array) socials: Array<string>

  get title () {
    return `${ this.$trans('labels', 'follow') } ${ this.gameName }`
  }
}
</script>

<style lang="stylus" scoped>
.socials
  min-height: 120px
  padding: $base-padding
  background-color: rgba(18, 18, 18, .15)

  &__icons
    color: #686868
</style>
