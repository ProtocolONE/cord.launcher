const { resolve } = require('path')
const { readFileSync } = require('fs')

const { HOST, PORT } = require('./config')

let redirectUrl = HOST
if (PORT) {
  redirectUrl += '/' + PORT
}

let html = ''
try {
  let file = resolve('server', 'templates', 'postmessage.html.template')
  html = readFileSync(file).toString('utf8')
}
catch (err) {
  console.error(err)
}

module.exports =
{
  NAMESPACE: 'auth1',
  PORT: 3000,

  // TODO: set as env
  ISSUER_URL: 'https://auth1.tst.protocol.one',
  POSTMESSAGE_TEMPLATE: html,
  POSTMESSAGE_TARGET_ORIGIN: '*',

  // --- local oauth2 data
  // TODO: reg from p.one auth1
  CLIENT_ID: '5cf8ef24d8b43900017c6fe5',
  CLIENT_SECRET: 'dDnk7AGdQ1ku7yVHCw2xAQNWV3Iv8GQ9D03auira6PboUUYNZUMuDS0nlgZHOYSI',

  REDIRECT_URL: 'http://localhost:3000/callback',
  SCOPES: ['openid', 'offline']
}
