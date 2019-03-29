import {
  app,
  BrowserWindow,
  Menu
} from 'electron'

import templateMenu from './electron-menu'
import Store from '../store'
import AutoUpdateManager from './auto-update-manager'

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

let mainWindow = null

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
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

  /**
   * Auto Updater
   *
   * Uncomment the following code below and install `electron-updater` to
   * support auto updating. Code Signing with a valid certificate is required.
   * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
   */
  new AutoUpdateManager(mainWindow)
})
