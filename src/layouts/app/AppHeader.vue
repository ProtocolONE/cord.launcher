<template>
<section class="row q-pa-lg app-header row">

  <div class="col-lg-1 col-md-2">
    <logo-box :logo="logo" height="48" background="rgba(8, 8, 8, .35)"/>
  </div>

  <div class="col-lg-auto col-md-auto">
    <app-nav/>
  </div>

  <!--<div class="col">-->
    <!--logo-->
  <!--</div>-->

  <!--<div class="col">-->
    <!--col-->
  <!--</div>-->

  <!--<nav>-->
    <!--menu-->
  <!--</nav>-->

  <!--<div>-->
    <!--search-->
  <!--</div>-->

  <!--<div>-->
    <!--icons-->
  <!--</div>-->

  <!--<div>-->
    <!--user-->
  <!--</div>-->

</section>
</template>

<script>
import LogoBox from '@components/blocks/LogoBox'
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
.app-header
  font-family: Roboto
</style>
