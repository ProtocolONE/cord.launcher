import { app, dialog, ipcMain, remote } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

export default
class AutoUpdaterManager {
  // --- TODO: changet fckng it
  constructor (mainWindow) {
    this.mainWindow = mainWindow

    app.on('remote-require', () => {
      autoUpdater.logger = log
      autoUpdater.logger.transports.file.level = 'info'
      autoUpdater.channel = app.$store.get('channel')

      log.info('App starting...')

      autoUpdater.on('checking-for-update', () => {
        this.sendStatusToWindow('Checking for update...')
      })

      autoUpdater.on('update-available', () => {
        this.sendStatusToWindow('Update available.')
      })

      autoUpdater.on('update-not-available', () => {
        this.sendStatusToWindow('Update not available.')
      })

      autoUpdater.on('error', error => {
        this.sendStatusToWindow(`Error in auto-updater. ${ error }`)
      })

      autoUpdater.on('download-progress', (progressObj) => {
        let { bytesPerSecond, percent, transferred, total } = progressObj
        let logMessage = `Download speed: ${ bytesPerSecond }`

        logMessage = `${ logMessage } - Downloaded ${ percent } %`
        logMessage = `${ logMessage } (${ transferred }/${ total })`

        this.sendStatusToWindow(logMessage)
      })

      autoUpdater.on('update-downloaded', () => {
        console.log('update-downloaded lats quitAndInstall')
        dialog.showMessageBox({
          type: 'info',
          title: 'Found Updates',
          message: 'Found updates, do you want update now?',
          buttons: ['Sure', 'No']
        }, buttonIndex => {
          if (buttonIndex === 0) {
            let isSilent = true
            let isForceRunAfter = true
            autoUpdater.quitAndInstall(isSilent, isForceRunAfter)
          }
        })
      })

      ipcMain.on('change-channel', (event, value) => {
        app.$store.set('channel', value)
        autoUpdater.channel = value
        // --- https://electronjs.org/docs/api/app#apprelaunchoptions
        app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
        app.exit(0)
      })

      setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify()
      }, 10 * 60 * 1000)
    })
  }

  sendStatusToWindow (message) {
    log.info(message)
    this.mainWindow.webContents.send('message', message)
  }
}
