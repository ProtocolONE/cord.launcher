<template>
<section class="row gutter-sm q-pa-lg app-footer">

  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 row">
    <div class="col-12">
      <logo-box :logo="logo"/>
    </div>
    <div class="col-12">
      <icon-box background="transparent">2019</icon-box>
    </div>
  </div>

  <div class="col-lg-2 col-md-4 col-sm-6 col-xs-6">
    <ul class="list">
      <li v-for="{ name, url, target } in links" :key="name">
        <a :href="url" :target="target">{{ name }}</a>
      </li>
    </ul>
  </div>

  <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12">
    <p class="copyright">{{ copyright }}</p>
    <div class="row gutter-sm justify-lg-center">
      <div v-for="{ name, url } in icons" :key="name">
        <a :href="url">
          <icon-box>
            <icon :name="name"/>
          </icon-box>
        </a>
      </div>
    </div>
  </div>

</section>
</template>

<script>
import Icon from '@components/icons'
import IconBox from '@components/blocks/IconBox'
import LogoBox from '@components/blocks/LogoBox'

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
    return {
      links: [
        { name: 'Super.com', url: 'http://super.com', target: '_blank' },
        { name: 'Vacancies', url: 'javascript:void(0)' },
        { name: 'Company', url: 'javascript:void(0)' },
        { name: 'Terms & Conditions', url: 'javascript:void(0)' },
        { name: 'Legal Agreement', url: 'javascript:void(0)' }
      ],
      copyright: '© 2018, Super.com, Experiments for discovering such facts. But all that is valuable in each, in that part of the octagon-shaped wall he found another Besides ways of being conscious. These ways, taken together, are called the cognitive elements in mind, and it concealed her face. She carried a bucket.',
      icons: [
        { name: 'youtube', url: 'javascript:void(0)' },
        { name: 'twitter', url: 'javascript:void(0)' },
        { name: 'facebook', url: 'javascript:void(0)' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '~styl/@mixins'

.list
  a
    fontScaleOnlyDesktop(1.6rem, 1.6rem / 1.5)
    lineHeightScaleOnlyDesktop(2.5em)

    color: $white
    letter-spacing: -.02em

    &:hover
      color: $white

.copyright
  lineHeightScaleOnlyDesktop(2.7rem)

  margin-bottom: 3rem
  color: $text-color-light-2
</style>
