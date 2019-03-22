export default ({ Vue }) => {
  /**
   * Change locale
   *
   * @param value {String}
   */
  Vue.prototype.$updateLocale = function (value) {
    import(`@/i18n/${ value }`)
      .then(lang => this.$q.i18n.set(lang.default))
  }
}
