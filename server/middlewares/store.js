const Redis = require('ioredis')
const { Store } = require('koa-session2')
const { pino_logger } = require('../logger')

module.exports =
class _Store extends Store {
  constructor (port, host, maxAge = 900, keyPrefix = 'SESSION') {
    super()

    this.keyPrefix = keyPrefix
    this.maxAge = maxAge

    this.redis = new Redis(port, host)
  }

  async get (sid) {
    let data = await this.redis.get(`${this.keyPrefix}:${sid}`)
    return JSON.parse(data)
  }

  async set (session, data = {}) {
    let {
      sid = this.getID(24),
      maxAge = this.maxAge
    } = data
    try {
      // Use redis set EX to automatically drop expired sessions
      let data = JSON.stringify(session)
      await this.redis.set(`${this.keyPrefix}:${sid}`, data, 'EX', maxAge)
    } catch (err) {
      pino_logger.info(err)
    }
    return sid
  }

  destroy (sid) {
    return this.redis.del(`${this.keyPrefix}:${sid}`)
  }
}
