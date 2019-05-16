const { app, remote } = require('electron')
const path = require('path')
const fs = require('fs')

function parseDataFile (filePath, defaults) {
  try {
    let data = fs.readFileSync(filePath)
    return JSON.parse(data)
  }
  catch (error) {
    console.error(error)
    return defaults
  }
}

export default
class Store {
  constructor (options = {}) {
    this.app = (app || remote.app)
    this.path = path.join(this.app.getPath('userData'), options.configName + '.json')
    this.data = parseDataFile(this.path, options.defaults)
  }

  get (key) {
    return this.data[key]
  }

  set (key, value) {
    this.data[key] = value
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}
