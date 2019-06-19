const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const {
  merge,
  pick,
  pickBy,
  keys,
  identity
} = require('lodash')

const data = []

// --- custom .env before if stage is development
if (fs.existsSync(path.resolve('.env'))) {
  data.push(dotenv.config())
}

// --- other .env after
data.push(
  dotenv.config({
    path: path.resolve('.env.production')
  })
)

module.exports = (function () {
  let _data = data
    .map(config => config.parsed)
    // --- coz .env is first
    .reduceRight((out, next) => merge(out, pickBy(next, identity)), {})

  let path_to_template = _data.AUTH1_POSTMESSAGE_TEMPLATE
  if (path_to_template) {
    try {
      _data.AUTH1_POSTMESSAGE_TEMPLATE = fs
        .readFileSync(path.resolve(path_to_template))
        .toString('utf8')
    }
    catch (error) {
      console.error(error)
    }
  }

  let _example_data = dotenv.config({
    path: path.resolve('.env.example')
  })
  let _keys = keys(_example_data.parsed)

  return merge(pick(process.env, _keys), _data)
})()
