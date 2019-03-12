import { app } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

export default function initAutoUpdater (mainWindow) {
  function sendStatusToWindow (text) {
    log.info(text)
    mainWindow.webContents.send('message', text)
  }

  autoUpdater.logger = log
  autoUpdater.logger.transports.file.level = 'info'

  log.info('App starting...')

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
  })

  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available.')
  })

  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available.')
  })

  autoUpdater.on('error', error => {
    sendStatusToWindow(`Error in auto-updater. ${ error }`)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    let { bytesPerSecond, percent, transferred, total } = progressObj
    let logMessage = `Download speed: ${ bytesPerSecond }`

    logMessage = `${ logMessage } - Downloaded ${ percent } %`
    logMessage = `${ logMessage } (${ transferred }/${ total })`

    sendStatusToWindow(logMessage)
  })

  autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('Update downloaded')
  })

  app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify()
  })
}
