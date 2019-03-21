export default ({ Vue }) => {
  /**
   * Global method-mixin for translate
   * Used quasar i18n
   *
   * @param key {String}
   * @param value {String}
   *
   * @returns translated label {String}
   */
  Vue.prototype.$trans = function (key, value) {
    let i18n = this.$q.i18n
    return (i18n[key] && i18n[key][value]) || null
  }
}
