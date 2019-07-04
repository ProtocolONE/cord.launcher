import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

import { LocalStorage } from 'quasar'

const default_locale = 'en-us'
const current_locale = LocalStorage.getItem('locale') || default_locale

export default async ({ app, Vue }) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: current_locale,
    fallbackLocale: default_locale,
    messages
  })
}
