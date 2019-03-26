export default ({ Vue }) => {
  Vue.prototype.$openUrl = function (url) {
    if (process.env.MODE === 'electron') {
      require('electron').shell.openExternal(url)
    }
    else {
      require('quasar').openURL(url)
    }
  }
}
