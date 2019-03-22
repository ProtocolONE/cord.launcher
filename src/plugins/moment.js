import moment from 'moment'

export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $moment () {
        moment().locale(this.$q.i18n.locale)
        return moment
      }
    }
  })
}
