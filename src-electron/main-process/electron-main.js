import {
  app,
  dialog,
  BrowserWindow,
  Menu,
  ipcMain
} from 'electron'

import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

import templateMenu from './electron-menu'
import Store from '../store'

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    channel: 'latest',
    windowBounds: {
      x: 0,
      y: 0,
      width: 800,
      height: 800,
      fullscreen: false
    }
  }
})

app.$store = store

let mainWindow

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

function sendStatusToWindow (text) {
  log.info(text)
  mainWindow.webContents.send('message', text)
}

function handleMovedOrResize () {
  store.set('windowBounds', {
    ...mainWindow.getBounds(),
    fullscreen: mainWindow.isFullScreen()
  })
}

function handleClosed () {
  mainWindow = null
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    ...store.get('windowBounds'),
    useContentSize: true
    // --- TODO: do it in future !
    // --- TODO: app without frame with custom window
    // frame: false,
    // transparent: true
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('moved', handleMovedOrResize)
  mainWindow.on('resize', handleMovedOrResize)

  mainWindow.on('closed', handleClosed)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(templateMenu)
  )
  createWindow()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
const server = 'https://github.com/ProtocolONE/cord.launcher'

require('update-electron-app')()

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
autoUpdater.channel = store.get('channel')

autoUpdater.setFeedURL(
  `${ server }/${ process.platform }-${ process.arch }/${ app.getVersion() }`
)

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
  store.set('channel', value)
  autoUpdater.channel = value
  // --- https://electronjs.org/docs/api/app#apprelaunchoptions
  app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
  app.exit(0)
})

app.on('ready', () => {
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 1000)
})
