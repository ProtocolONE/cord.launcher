module.exports = {
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
  AUTH1_REDIRECT_URL: 'https://cordlauncher.tst.protocol.one/auth1/callback',
  SESSION_AGE: 21600
}
