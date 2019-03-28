<template lang="pug">
main-layout: q-page.error-404: .row
  .col.flex.column.items-center.justify-center
    figure.text-center.q-mb-xs.q-pa-sm.q-pt-lg
      img.q-mb-lg.error-404__image(src="~assets/sad.svg" alt="error-404")
      figcaption
        | {{ $trans('paragraphs', 'nothingHere') }}... #[strong] (404)
    q-btn.error-404__btn(color="secondary" to="/")
      | {{ $trans('labels', 'goBack') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MainLayout from 'layouts/main'

@Component({
  components: { MainLayout }
})
export default class Error404 extends Vue {}
</script>

<style lang="stylus" scoped>
.error-404
  min-height: 100vh

  &__image
    width: 30vw
    max-width: 150px

  &__btn
    width: 200px
</style>
