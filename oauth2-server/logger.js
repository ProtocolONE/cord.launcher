'use strict'

const pino = require('pino')
const { KoaReqLogger } = require('koa-req-logger')

const pino_logger = pino({
  useLevelLabels: true,
  timestamp: pino.stdTimeFunctions.unixTime
})

const logger = new KoaReqLogger({
  pinoInstance: pino_logger,
  alwaysError: true
})

module.exports.pino_logger = pino_logger
module.exports.logger = logger
