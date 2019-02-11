<template>
<section class="row cord-padding l-game-social">

  <h2 class="col-lg-5 col-md-6 col-sm-12 col-xs-12 title color-light-3">{{ title }}</h2>

  <div class="no-wrap q-ml-lg-auto q-ma-md-none">
    <icon-box v-for="{ icon, url } in followSocial" :key="icon" background>
      <a :href="url" class="t-hover-opacity">
        <icon :name="icon" :size="iconsSize" :fill="iconsColor"/>
      </a>
    </icon-box>
  </div>

</section>
</template>

<script>
import Icon from '@components/Icon'
import IconBox from '@components/blocks/IconBox'

export default {
  name: 'GameSocial',

  components: { Icon, IconBox },

  props: {
    name: String,
    followSocial: Array
  },

  data () {
    return {
      iconsSize: 30,
      iconsColor: '#686868'
    }
  },

  computed: {
    title () {
      return `${ this.$t('followSocialTitle') } ${ this.name }`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.l-game-social
  background-color: rgba(18, 18, 18, .15)
  @media (min-width $breakpoint-xl-min)
    padding: ($space-base * 1.5)
  .title
    display: inline-flex
    align-items: center
    height: 8.4rem
    margin-bottom: 0
    line-height: inherit
</style>
