let auth1_url = 'https://qilin.tst.protocol.one/auth1'
let oauth2_url = process.env.HOST || process.env.OAUTH2_HOST || auth1_url
if (oauth2_url !== auth1_url && process.env.OAUTH2_PORT) {
  oauth2_url += `:${process.env.OAUTH2_PORT}`
}

export default {
  /**
   * p1 auth1 url for auth2 service
   * @type {String}
   */
  url: oauth2_url,

  /**
   * user access token
   * @type {String|null}
   */
  access_token: localStorage.getItem('access_token'),

  /**
   * token expires date
   * @type {String|null}
   */
  token_expires: localStorage.getItem('token_expires')
}
