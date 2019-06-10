'use strict'

const app = require('./app')

const { pino_logger: log } = require('./logger')
const { OAUTH2_PORT } = require('../config/oauth2')

module.exports = app.listen(OAUTH2_PORT, () => log.info(`Server listening on port: ${OAUTH2_PORT}`))
