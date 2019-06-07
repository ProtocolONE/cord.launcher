'use strict'

const app = require('./app')

const { pino_logger: log } = require('./logger')
const { PORT } = require('../config/oauth2')

module.exports = app.listen(PORT, () => log.info(`Server listening on port: ${PORT}`))
