const { resolve } = require('path')
const { readFileSync } = require('fs')

const get_env = require('./env')
const env = get_env(false)

let postmessage_template = ''
try {
  let path = env.POSTMESSAGE_TEMPLATE || 'server/templates/postmessage.html.template'
  let file = resolve(path)
  postmessage_template = readFileSync(file).toString('utf8')
}
catch (error) {
  console.error(error)
}

module.exports = {
  HOST: env.HOST,
  PORT: env.PORT,

  REDIS_HOST: env.REDIS_HOST,
  REDIS_PORT: env.REDIS_PORT,

  OAUTH2_PORT: env.OAUTH2_PORT,

  NAMESPACE: env.NAMESPACE,
  ISSUER: env.ISSUER,
  CLIENT_ID: env.CLIENT_ID,
  CLIENT_SECRET: env.CLIENT_SECRET,

  POSTMESSAGE_TEMPLATE: postmessage_template,
  POSTMESSAGE_TARGET_ORIGIN: env.POSTMESSAGE_TARGET_ORIGIN || '*',

  REDIRECT_URL: env.REDIRECT_URL,

  SCOPES: env.SCOPES || [],
  CORS_ROUTES: env.CORS_ROUTES || [],
  CORS_VALID_ORIGIN: env.CORS_VALID_ORIGIN || [],

  SESSION_NAME: env.SESSION_NAME,
  SESSION_KEY: env.SESSION_KEY,
  SESSION_AGE: env.SESSION_AGE
}
