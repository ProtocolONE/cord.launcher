const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const { merge, pickBy, identity } = require('lodash')

const default_config = {
  NODE_ENV: 'production',
  PUBLIC_HOST: 'http://localhost',
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
  AUTH1_REDIRECT_URL: 'http://localhost:3000/callback',
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

module.exports = merge(default_config, _data)
