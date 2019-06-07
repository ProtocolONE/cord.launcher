const DotEnv = require('dotenv')
const { pickBy, identity } = require('lodash')

module.exports = function get_env (parse = true) {
  let parsed_env = DotEnv.config().parsed

  for (let key in parsed_env) {
    if (!parsed_env.hasOwnProperty(key)) continue
    // --- check for non-string data
    try {
      parsed_env[key] = JSON.parse(parsed_env[key])
    }
    catch {
      if (!parse) continue
      if (parsed_env[key] && typeof parsed_env[key] === 'string') {
        parsed_env[key] = JSON.stringify(parsed_env[key])
      }
    }
  }

  return pickBy(parsed_env, identity)
}
