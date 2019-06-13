import { get } from 'lodash-es'

export default ({ app, Vue }) => {
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
    let locale = get(app, ['i18n', 'locale'], 'en-us')
    return get(app.i18n.messages[locale], [key, value], 'no trans')
  }
}
