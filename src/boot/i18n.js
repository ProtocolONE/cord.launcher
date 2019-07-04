import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

export default async ({ app, Vue }) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages
  })

  /**
   * Change locale
   *
   * @param locale {String}
   */
  Vue.prototype.$set_locale = async function (locale) {
    try {
      // let messages = await require(`src/i18n/${locale}`).default
      // app.i18n.locale = locale
      // this.$q.lang.set(messages)
    }
    catch (err) {
      console.error(err)
    }
  }
}
