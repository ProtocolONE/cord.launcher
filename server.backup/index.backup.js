
'use strict'

const { KoaReqLogger } = require('koa-req-logger')
const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const session = require('koa-session2')
const Redis = require('ioredis')

const logger = new KoaReqLogger({
  alwaysError: true // treat all non-2** http codes as error records in logs
})

const { JwtVerifier, StorageRedis, koaOauthMiddleware } = require('authone-jwt-verifier-node')

// oauth endpoints middleware creation
// You must set your own values here
const verifierOptions = {
  issuer: 'http://localhost',
  clientId: '5cf52565f549611e2d12802a',
  clientSecret: 'yHfzD6B5N73BNK9NE3fxYA9oGHMOe3WEdzc06zCPRoGF5D6vQ3GliZWh4b5x1Yrx',
  redirectUrl: 'http://localhost:3000/callback',
  scopes: ['offline']
}

const postMessageHtmlTemplate = '<script>var result = { error: "{errorCode}", ' +
  'access_token: "{accessToken}", ' +
  'expires_in: {expiresIn}, success: {isSuccess} }; ' +
  'var targetOrigin = "{targetOrigin}";console.log("{accessToken}");' +
  'parent.postMessage(JSON.stringify(result), targetOrigin)</script>'

const endpointsOptions = {
  namespace: 'auth1',
  postMessageHtmlTemplate: postMessageHtmlTemplate,
  postMessageTargetOrigin: 'http://localhost:8080'
}

const redisInstance = new Redis('localhost', 6379)
const redisStorage = new StorageRedis(redisInstance)
const jwtVerifier = new JwtVerifier(verifierOptions, redisStorage)
const oauthEndpoints = koaOauthMiddleware.oauthEndpoints(jwtVerifier, endpointsOptions)

// Oauth routes setup
const router = new Router()
router
  .get('/login', oauthEndpoints.login)
  .get('/callback', oauthEndpoints.authorize)
  .get('/refresh', oauthEndpoints.refresh)
  .get('/logout', oauthEndpoints.logout)

// CORS setup
const corsRoutes = ['/refresh', '/logout']
const corsValidOrigins = ['*']
const corsMiddleware = cors({
  origin: function (ctx) {
    if (!corsRoutes.includes(ctx.url)) {
      return false
    }
    if (corsValidOrigins.includes('*')) {
      return '*'
    }
    const requestOrigin = ctx.accept.headers.origin
    if (!corsValidOrigins.includes(requestOrigin)) {
      return ctx.throw(`${requestOrigin} is not a valid origin`)
    }
    return requestOrigin
  },
  allowMethods: ['GET', 'OPTIONS'],
  maxAge: 5,
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
})

// App create and middleware setup
const app = new Koa()
app.keys = ['sessionCookieSignKey']
// app.use(logger())
app.use(logger.getMiddleware())
app.use(session({
  signed: true,
  httpOnly: true
}))
app.use(corsMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

const serverPort = 3000

// create server
const server = app.listen(serverPort, () => {
  console.log(`Server listening on port: ${serverPort}`)
})

module.exports = server
