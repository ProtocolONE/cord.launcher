export default ({ Vue }) => {
  /**
   * Change locale
   *
   * @param value {String}
   */
  Vue.prototype.$updateLocale = function (value) {
    this.$q.i18n.set(
      require(`@/i18n/${ value }`).default
    )
  }
}
