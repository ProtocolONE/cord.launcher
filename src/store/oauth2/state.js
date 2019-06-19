let oauth2_url
if (process.env.DEV) {
  oauth2_url = process.env.HOST
  if (process.env.OAUTH2_PORT) {
    oauth2_url += `:${process.env.OAUTH2_PORT}`
  }
}
else {
  oauth2_url = process.env.OAUTH2_HOST
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
