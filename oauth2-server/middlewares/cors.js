'use strict'

const cors = require('koa2-cors')
const { CORS_ROUTES, CORS_VALID_ORIGIN } = require('../../config/oauth2')

// --- TODO: bad idea, need fix in future
// --- bypass local CORS
let origin = null
if (process.env.PROD) {
  origin = function (ctx) {
    if (!CORS_ROUTES.includes(ctx.url)) return false
    if (CORS_VALID_ORIGIN.includes('*')) return '*'

    let origin = ctx.accept.headers.origin
    if (!CORS_VALID_ORIGIN.includes(origin)) {
      return ctx.throw(`${origin} is not a valid origin`)
    }

    return origin
  }
}

module.exports = cors({
  origin: origin,
  allowMethods: ['GET', 'OPTIONS'],
  maxAge: 5,
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
})
