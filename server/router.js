'use strict'

const Router = require('koa-router')
const Redis = require('ioredis')

const {
  JwtVerifier,
  StorageRedis,
  koaOauthMiddleware: { oauthEndpoints }
} = require('authone-jwt-verifier-node')

const {
  NAMESPACE,
  POSTMESSAGE_TEMPLATE,
  POSTMESSAGE_TARGET_ORIGIN,
  ISSUER,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  SCOPES,
  REDIS_HOST,
  REDIS_PORT
} = require('../config/oauth2')

const verifier_options = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUrl: REDIRECT_URL,
  scopes: SCOPES
}

const endpoints_options = {
  namespace: NAMESPACE,
  postMessageHtmlTemplate: POSTMESSAGE_TEMPLATE,
  postMessageTargetOrigin: POSTMESSAGE_TARGET_ORIGIN
}

const redis = new Redis(REDIS_HOST, REDIS_PORT)
const storage = new StorageRedis(redis)

const jwtVerifier = new JwtVerifier(verifier_options, storage)
const endpoints = oauthEndpoints(jwtVerifier, endpoints_options)

const router = new Router()

router
  .get('/login', endpoints.login)
  .get('/callback', endpoints.authorize)
  .get('/refresh', endpoints.refresh)
  .get('/logout', endpoints.logout)

module.exports = router
