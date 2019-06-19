'use strict'

const cors = require('koa2-cors')

module.exports = cors({
  allowMethods: ['GET', 'OPTIONS'],
  maxAge: 5,
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  origin: (function () {
    // --- TODO: bad idea, need fix in future
    // --- bypass local CORS
    if (process.env.NODE_ENV === 'production') {
      let { AUTH1_CORS_ROUTES, AUTH1_CORS_VALID_ORIGIN } = require('../../config/env')

      return function (ctx) {
        if (!AUTH1_CORS_ROUTES.includes(ctx.url)) return false
        if (AUTH1_CORS_VALID_ORIGIN.includes('*')) return '*'

        let origin = ctx.accept.headers.origin
        if (!AUTH1_CORS_VALID_ORIGIN.includes(origin)) {
          return ctx.throw(`${origin} is not a valid origin`)
        }

        return origin
      }
    }

    return null
  })()
})
