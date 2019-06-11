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
  HOST: env.HOST || 'http://localhost',
  PORT: env.PORT || 8080,

  REDIS_HOST: env.REDIS_HOST || 'localhost',
  REDIS_PORT: env.REDIS_PORT || 6379,

  OAUTH2_PORT: env.OAUTH2_PORT || 3000,

  NAMESPACE: env.NAMESPACE,
  ISSUER: env.ISSUER,
  CLIENT_ID: env.CLIENT_ID,
  CLIENT_SECRET: env.CLIENT_SECRET,

  POSTMESSAGE_TEMPLATE: postmessage_template,
  POSTMESSAGE_TARGET_ORIGIN: env.POSTMESSAGE_TARGET_ORIGIN || '*',

  REDIRECT_URL: env.REDIRECT_URL || 'http://localhost:3000/callback',

  SCOPES: env.SCOPES || [],
  CORS_ROUTES: env.CORS_ROUTES || [],
  CORS_VALID_ORIGIN: env.CORS_VALID_ORIGIN || [],

  SESSION_NAME: env.SESSION_NAME || 'session_name',
  SESSION_KEY: env.SESSION_KEY || 'session_key',
  SESSION_AGE: env.SESSION_AGE || 21600
}
