<template lang="pug">
box.text-bold.uppercase.box--logo(v-bind="{ ...$props, ...$attrs }")
  | logo
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Box from 'components/Box'

@Component({
  components: { Box }
})
export default class BoxLogo extends Vue {
  @Prop({ type: String, default: '84' }) width: string
  @Prop({ type: String, default: '48' }) height: string
}
</script>

<style lang="stylus" scoped>
.box--logo
  border-radius: 2px
  letter-spacing: 0.2em
  font-size: 16px
</style>
