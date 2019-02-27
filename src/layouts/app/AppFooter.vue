<template>
<section class="row cord-padding app-footer">

  <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4 row">
    <div class="col-12">
      <logo-box :logo="logo"/>
    </div>
    <div class="col-12">
      <icon-box background>2019</icon-box>
    </div>
  </div>

  <div class="col-lg-2 col-md-4 col-sm-9 col-xs-8">
    <ul class="list">
      <li v-for="{ name, trans, url, target } in links" :key="name">
        <a :href="url" :target="target">
          {{ name }}
        </a>
      </li>
    </ul>
  </div>

  <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12 order-xs-first order-md-none q-mb-xs-md q-mb-md-none">
    <p class="copyright">{{ $t('copyright') }}</p>
    <div class="row gutter-sm">
      <div v-for="{ name, url } in icons" :key="name">
        <a :href="url" class="icon-box-link">
          <icon-box>
            <icon :name="name" :size="iconsSize" :fill="iconsColor"/>
          </icon-box>
        </a>
      </div>
    </div>
  </div>

</section>
</template>

<script>
import Icon from '@/components/Icon'
import IconBox from '@/components/blocks/IconBox'
import LogoBox from '@/components/blocks/LogoBox'

export default {
  name: 'AppFooter',

  components: { Icon, IconBox, LogoBox },

  props: {
    logo: {
      type: null,
      required: true
    }
  },

  data () {
    let $t = this.$t
    return {
      links: [
        { name: 'Super.com', url: 'http://super.com', target: '_blank' },
        { name: $t('vacancies'), url: 'javascript:void(0)' },
        { name: $t('company'), url: 'javascript:void(0)' },
        { name: $t('terms'), url: 'javascript:void(0)' },
        { name: $t('legalAgreement'), url: 'javascript:void(0)' }
      ],
      icons: [
        { name: 'youtube', url: 'javascript:void(0)' },
        { name: 'twitter', url: 'javascript:void(0)' },
        { name: 'facebook', url: 'javascript:void(0)' }
      ],
      iconsSize: 30,
      iconsColor: '#818181'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '~styl/@mixins'

.list
  fontScaleOnlyDesktop(1.6rem, 1.6rem / 1.5)
  lineHeightScaleOnlyDesktop(2.5em)

  font-weight: bold

  a
    color: $white
    letter-spacing: -.02em

    &:hover
      color: $white

.copyright
  lineHeightScaleOnlyDesktop(2.7rem)

  margin-bottom: 3rem
  color: $text-color-light-2
</style>
