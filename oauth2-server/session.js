'use strict'

const session = require('koa-session2')
const url_parse = require('url-parse')

const Store = require('./middlewares/store')

const {
  PUBLIC_HOST,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_NAME,
  SESSION_AGE
} = require('../config')

const params = {
  key: SESSION_NAME,
  signed: true,
  httpOnly: process.env.NODE_ENV === 'production',
  domain: url_parse(PUBLIC_HOST).hostname,
  maxAge: SESSION_AGE * 1000
}

if (REDIS_PORT && REDIS_HOST) {
  params.store = new Store(REDIS_PORT, REDIS_HOST, SESSION_AGE)
}

module.exports = session(params)
