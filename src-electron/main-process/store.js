const Store = require('electron-store')

const schema = {
  route: {
    types: ['object', 'null'],
    default: null
  },

  channel: {
    type: 'string',
    default: 'stable'
  },

  window_bounds: {
    type: 'object',
    default: {
      x: null,
      y: null,
      width: 800,
      height: 600
    }
  }
}

export default new Store({ schema })
