'use strict'
const app = require('./app')

const { pino_logger: log } = require('./logger')
const { AUTH1_PORT: port } = require('../config')

module.exports = app.listen(port, () => log.info(`Server listening on port: ${port}`))
