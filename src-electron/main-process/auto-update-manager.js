/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

export default class AutoUpdateManager {
  constructor (channel) {
    this.autoUpdater = autoUpdater
    this.mainWindow = null
    this.timeout = null
    this.updateChannel(channel, false)
  }

  init (mainWindow) {
    this.mainWindow = mainWindow

    this.autoUpdater.logger = log
    this.autoUpdater.logger.transports.file.level = 'info'

    log.info('App starting...')

    this.autoUpdater.on('checking-for-update', () => this.sendMessageToWindow('Checking for update...'))
    this.autoUpdater.on('update-available', () => this.sendMessageToWindow('Update available.'))
    this.autoUpdater.on('update-not-available', () => this.sendMessageToWindow('Update not available.'))
    this.autoUpdater.on('error', error => this.sendMessageToWindow(`Error in auto-updater. ${ error }`))
    
    this.autoUpdater.on('download-progress', (progressObj) => {
      let { bytesPerSecond, percent, transferred, total } = progressObj
      let logMessage = `Download speed: ${ bytesPerSecond }`
    
      logMessage = `${ logMessage } - Downloaded ${ percent } %`
      logMessage = `${ logMessage } (${ transferred }/${ total })`
    
      this.sendMessageToWindow(logMessage, false)
    })
    
    this.autoUpdater.on('update-downloaded', () => {
      this.sendMessageToWindow('update-downloaded lats quitAndInstall', false)
      dialog.showMessageBox({
        type: 'info',
        title: 'Found updates',
        message: '🤘 Update downloaded, do you want update now ?',
        buttons: ['Yep', 'Nope']
      }, buttonIndex => {
        if (buttonIndex === 0) {
          let [isSilent, isForceRunAfter] = [true, true]
          autoUpdater.quitAndInstall(isSilent, isForceRunAfter)
        }
      })
    })

    this.checkForUpdates()
  }

  updateChannel (channel = 'stable', checkForUpdates = true) {
    this.sendMessageToWindow(`🤘 Current channel is ${ channel }`, false)

    this.autoUpdater.channel = channel
    this.autoUpdater.setFeedURL(this.feedURLOptions)

    if (checkForUpdates) {
      this.checkForUpdates()
    }
  }

  checkForUpdates () {
    clearTimeout(this.timeout)
    
    this.autoUpdater.checkForUpdatesAndNotify()
    this.timeout = setTimeout(this.checkForUpdates, 10 * 60 * 1000)
  }

  sendMessageToWindow (message, send = true) {
    log.info(message)
    if (send) {
      this.mainWindow.webContents.send('message', message)
    }
  }

  get feedURLOptions () {
    let channel = this.autoUpdater.channel
    return {
      url: `https://cordfiles.protocol.one/dist/releases/${ channel }`,
      provider: 'generic',
      channel
    }
  }
}
