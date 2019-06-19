let oauth2_url = process.env.HOST || 'https://cordlauncher.tst.protocol.one'
oauth2_url += `:${process.env.OAUTH2_PORT || 3000}`

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
