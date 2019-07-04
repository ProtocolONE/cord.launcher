import moment from 'moment'
import 'moment/locale/ru'

export default async ({ app, Vue }) => {
  moment().locale(app.i18n.locale)
  Vue.prototype.$moment = moment
}
