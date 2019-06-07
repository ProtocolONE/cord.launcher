'use strict'

const cors = require('koa2-cors')
const { CORS_ROUTES, CORS_VALID_ORIGIN } = require('../../config/oauth2')

module.exports = cors({
  origin: function (ctx) {
    if (!CORS_ROUTES.includes(ctx.url)) {
      return false
    }
    if (CORS_VALID_ORIGIN.includes('*')) {
      return '*'
    }

    let origin = ctx.accept.headers.origin
    if (!CORS_VALID_ORIGIN.includes(origin)) {
      return ctx.throw(`${origin} is not a valid origin`)
    }

    return origin
  },
  allowMethods: ['GET', 'OPTIONS'],
  maxAge: 5,
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
})
