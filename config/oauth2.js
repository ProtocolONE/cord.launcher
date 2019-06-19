const { resolve } = require('path')
const { readFileSync } = require('fs')

const get_env = require('./env')
const env = get_env(false)

let postmessage_template = ''
try {
  let path = env.POSTMESSAGE_TEMPLATE || 'oauth2-server/templates/postmessage.html.template'
  let file = resolve(path)
  postmessage_template = readFileSync(file).toString('utf8')
}
catch (error) {
  console.error(error)
}

module.exports = {
  HOST: env.HOST || 'http://localhost',
  PORT: env.PORT || 8080,

  REDIS_HOST: env.REDIS_HOST || 'redis',
  REDIS_PORT: env.REDIS_PORT || 6379,

  OAUTH2_HOST: env.OAUTH2_HOST || 'https://qilin.tst.protocol.one/auth1',
  OAUTH2_PORT: env.OAUTH2_PORT || 3000,

  NAMESPACE: env.NAMESPACE || 'auth1',
  ISSUER: env.ISSUER || 'https://auth1.tst.protocol.one',
  CLIENT_ID: env.CLIENT_ID,
  CLIENT_SECRET: env.CLIENT_SECRET,

  POSTMESSAGE_TEMPLATE: postmessage_template,
  POSTMESSAGE_TARGET_ORIGIN: env.POSTMESSAGE_TARGET_ORIGIN || '*',

  REDIRECT_URL: env.REDIRECT_URL || 'http://localhost:3000/callback',

  SCOPES: env.SCOPES || ['openid', 'offline'],

  CORS_ROUTES: env.CORS_ROUTES || ['/refresh', '/logout'],
  CORS_VALID_ORIGIN: env.CORS_VALID_ORIGIN || ['*'],

  SESSION_NAME: env.SESSION_NAME,
  SESSION_KEY: env.SESSION_KEY,
  SESSION_AGE: env.SESSION_AGE || 21600, // 6 hours

  API_URL: env.API_URL || 'https://qilinstoreapi.tst.protocol.one/api/v1'
}
