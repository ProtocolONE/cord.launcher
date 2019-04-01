import { Notify } from 'quasar'

export default () => {
  if (process.env.CLIENT) {
    try {
      // --- TODO: messages
      let { ipcRenderer } = require('electron')
      console.log('ipcRenderer message init.')
      ipcRenderer.on('message', (event, text) => {
        console.info(text)
        Notify.create({
          message: text,
          type: 'info',
          position: 'top-right'
        })
      })
    }
    catch (error) {
      // --- skip
      console.error(error)
    }
  }
}
