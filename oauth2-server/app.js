'use strict'

const Koa = require('koa')

const cors = require('./middlewares/cors')
const session = require('./session')
const router = require('./router')

const { logger } = require('./logger')
const { SESSION_KEY } = require('../config/env')

const app = new Koa()

app.keys = [SESSION_KEY]

app.use(logger.getMiddleware())
app.use(cors)
app.use(session)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
