const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const {
  merge,
  pick,
  pickBy,
  identity
} = require('lodash')

const default_config = {
  NODE_ENV: 'production',
  PUBLIC_HOST: 'https://cordlauncher.tst.protocol.one',
  PUBLIC_PORT: 80,
  QILINSTORE_API_URL: 'https://qilinstoreapi.tst.protocol.one/api/v1',
  AUTH1_NAMESPACE: 'auth1',
  AUTH1_PORT: 3000,
  AUTH1_ISSUER: 'https://auth1.tst.protocol.one',
  AUTH1_POSTMESSAGE_TEMPLATE: 'oauth2-server/templates/postmessage.html.template',
  AUTH1_POSTMESSAGE_TARGET_ORIGIN: '*',
  AUTH1_CORS_VALID_ORIGIN: '*',
  AUTH1_CORS_ROUTES: '/refresh,/logout',
  AUTH1_SCOPES: 'openid,offline',
  AUTH1_REDIRECT_URL: 'https://cordlauncher.tst.protocol.one/auth1',
  SESSION_AGE: 21600
}

let _data = pickBy(dotenv.config().parsed, identity)
let _path_to_template = _data.AUTH1_POSTMESSAGE_TEMPLATE

if (_path_to_template) {
  try {
    _data.AUTH1_POSTMESSAGE_TEMPLATE = fs
      .readFileSync(path.resolve(_path_to_template))
      .toString('utf8')
  }
  catch (error) {
    console.error(error)
  }
}

// --- TODO: bad idea
let _keys = [
  'NODE_ENV',
  'PUBLIC_HOST',
  'PUBLIC_PORT',
  'QILINSTORE_API_URL',
  'AUTH1_NAMESPACE',
  'AUTH1_PORT',
  'AUTH1_ISSUER',
  'AUTH1_POSTMESSAGE_TEMPLATE',
  'AUTH1_POSTMESSAGE_TARGET_ORIGIN',
  'AUTH1_CORS_VALID_ORIGIN',
  'AUTH1_CORS_ROUTES',
  'AUTH1_SCOPES',
  'AUTH1_REDIRECT_URL',
  'AUTH1_CLIENT_ID',
  'AUTH1_CLIENT_SECRET',
  'REDIS_HOST',
  'REDIS_PORT',
  'SESSION_NAME',
  'SESSION_KEY',
  'SESSION_AGE'
]

module.exports = merge(
  default_config,
  pick(process.env, _keys),
  _data
)
