'use strict'
const { existsSync } = require('fs')

if (!existsSync('.env')) {
  throw Error('.env file is not exist')
}

// --- TODO: add check for .env file

const app = require('./app')

const { pino_logger: log } = require('./logger')
const { OAUTH2_PORT } = require('../config/oauth2')

module.exports = app.listen(OAUTH2_PORT, () => log.info(`Server listening on port: ${OAUTH2_PORT}`))
