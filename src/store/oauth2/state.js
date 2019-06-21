import { LocalStorage } from 'quasar'

export default {
  /**
   * p1 auth1 url for auth2 service
   * @type {String}
   */
  url: (function () {
    if (process.env.NODE_ENV === 'production') {
      return `${process.env.PUBLIC_HOST}/${process.env.AUTH1_NAMESPACE}`
    }
    return `${process.env.PUBLIC_HOST}:${process.env.AUTH1_PORT}`
  })(),

  /**
   * auth1 full user data
   * @type {Object|null}
   */
  user_info: null,

  /**
   * user access token
   * @type {String|null}
   */
  access_token: LocalStorage.getItem('access_token'),

  /**
   * token expires date
   * @type {String|null}
   */
  token_expires: LocalStorage.getItem('token_expires')
}
