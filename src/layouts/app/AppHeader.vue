<template>
<section class="row cord-padding app-header">

  <div class="col-lg-1 col-md-2">
    <logo-box :logo="logo" height="48" background="rgba(8, 8, 8, .35)"/>
  </div>

  <div class="col-lg-auto col-md-auto">
    <app-nav/>
  </div>

  <div class="col-auto flex column justify-center q-ml-auto">
    <q-select
      v-model="$i18n.locale"
      color="orange"
      separator
      inverted-light
      :options="[
        { label: $t('en-us'), value: 'en-us' },
        { label: $t('ru-ru'), value: 'ru-ru' },
      ]"
      :stack-label="$t('language')"
    />
  </div>

</section>
</template>

<script>
import LogoBox from '@/components/blocks/LogoBox'
import AppNav from './AppNav'

export default {
  name: 'AppHeader',

  components: { LogoBox, AppNav },

  props: {
    logo: {
      type: null,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.app-header
  font-family: Roboto
  @media (min-width $breakpoint-lg-min)
    $p = 3.6rem
    padding-top: $p
    padding-bottom $p
</style>

<style lang="stylus">
.q-popover {
  background-color: #000
}  
</style>
