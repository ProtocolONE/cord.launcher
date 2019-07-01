import axios from 'axios'

export default async ({ app, Vue }) => {
  axios.defaults.withCredentials = true
  // --- toggle Authorization header if has access_token
  // --- also set app lang
  axios.interceptors.request.use((config) => {
    let token = app.store.getters.get_access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = app.i18n.locale || navigator.language
    return config
  })

  Vue.prototype.$axios = axios
}
