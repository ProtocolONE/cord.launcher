'use strict'

const Router = require('koa-router')
const Redis = require('ioredis')

const {
  JwtVerifier,
  StorageRedis,
  koaOauthMiddleware: { oauthEndpoints }
} = require('authone-jwt-verifier-node')

const {
  AUTH1_NAMESPACE,
  AUTH1_POSTMESSAGE_TEMPLATE,
  AUTH1_POSTMESSAGE_TARGET_ORIGIN,
  AUTH1_ISSUER,
  AUTH1_CLIENT_ID,
  AUTH1_CLIENT_SECRET,
  AUTH1_REDIRECT_URL,
  AUTH1_SCOPES,
  REDIS_HOST,
  REDIS_PORT
} = require('../config')

const verifier_options = {
  issuer: AUTH1_ISSUER,
  clientId: AUTH1_CLIENT_ID,
  clientSecret: AUTH1_CLIENT_SECRET,
  redirectUrl: AUTH1_REDIRECT_URL,
  scopes: AUTH1_SCOPES.split(',')
}

const endpoints_options = {
  namespace: AUTH1_NAMESPACE,
  postMessageHtmlTemplate: AUTH1_POSTMESSAGE_TEMPLATE,
  postMessageTargetOrigin: AUTH1_POSTMESSAGE_TARGET_ORIGIN
}

let storage = null
if (REDIS_HOST && REDIS_PORT) {
  storage = new StorageRedis(
    new Redis(REDIS_HOST, REDIS_PORT)
  )
}

const jwtVerifier = new JwtVerifier(verifier_options, storage)
const endpoints = oauthEndpoints(jwtVerifier, endpoints_options)

const router = new Router()
const prefix = (process.env.NODE_ENV === 'production') ? process.env.AUTH1_NAMESPACE : ''

router
  .get('/_healthz', async (ctx, next) => {
    ctx.body = {}
    next()
  })
  .get(`${prefix}/login`, endpoints.login)
  .get(`${prefix}/callback`, endpoints.authorize)
  .get(`${prefix}/refresh`, endpoints.refresh)
  .get(`${prefix}/logout`, endpoints.logout)

module.exports = router
