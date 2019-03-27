export default ({ app, Vue }) => {
  /**
   * Change locale
   *
   * @param value {String}
   */
  Vue.prototype.$updateLocale = function (value) {
    let $q = (this) ? this.$q : app.i18n._vm.$q
    $q.i18n.set(
      require(`@/i18n/${ value }`).default
    )
  }
}
