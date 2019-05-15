export default ({ Vue }) => {
  if (process.env.CLIENT) {
    try {
      Vue.prototype.$appStore = require('electron').remote.app.$store
    }
    catch (error) {
      // --- skip
      console.error(error)
    }
  }
}
