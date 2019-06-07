'use strict'

const { KoaReqLogger } = require('koa-req-logger')
const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const session = require('koa-session2')
const Redis = require('ioredis')

const logger = new KoaReqLogger({ alwaysError: true })

const {
  JwtVerifier,
  StorageRedis,
  koaOauthMiddleware
} = require('authone-jwt-verifier-node')

const OAUTH2_CONFIG = require('./oauth2-config')

// oauth endpoints middleware creation
// You must set your own values here
const verifierOptions = {
  issuer: OAUTH2_CONFIG.ISSUER_URL,
  clientId: OAUTH2_CONFIG.CLIENT_ID,
  clientSecret: OAUTH2_CONFIG.CLIENT_SECRET,
  redirectUrl: OAUTH2_CONFIG.REDIRECT_URL,
  scopes: OAUTH2_CONFIG.SCOPES
}

const endpointsOptions = {
  namespace: OAUTH2_CONFIG.NAMESPACE,
  postMessageHtmlTemplate: OAUTH2_CONFIG.POSTMESSAGE_TEMPLATE,
  postMessageTargetOrigin: OAUTH2_CONFIG.POSTMESSAGE_TARGET_ORIGIN
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

app.use(logger.getMiddleware())
app.use(session({ signed: true, httpOnly: process.env.PROD }))
app.use(corsMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

const serverPort = 3000

// create server
const server = app.listen(serverPort, () => {
  console.log(`Server listening on port: ${serverPort}`)
})

module.exports = server
