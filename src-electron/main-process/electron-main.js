import {
  app,
  BrowserWindow,
  Menu,
  Tray,
  ipcMain
} from 'electron'

import { join } from 'path'

import templateMenu from './template-menu'
import Store from '../store'
import AutoUpdateManager from './auto-update-manager'

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    route: null,
    channel: 'stable',
    windowBounds: {
      x: 0,
      y: 0,
      width: 800,
      height: 800,
      fullscreen: false
    }
  }
})

const autoUpdater = new AutoUpdateManager(store.get('channel') || 'stable')

app.$store = store

let mainWindow = null
let mainTray = null
let mainIcons = {
  darwin: join(__dirname, 'statics', 'icons', 'apple-icon-152x152.png'),
  win32: join(__dirname, 'statics', 'icons', 'ms-icon-144x144.png'),
  linux: join(__dirname, 'statics', 'icons', 'icon-512x512.png')
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
}
else {
  /**
   * Set `__statics` path to static files in production;
   * The reason we are setting it here is that the path needs to be evaluated at runtime
   */
  if (process.env.PROD) {
    global.__statics = join(__dirname, 'statics').replace(/\\/g, '\\\\')
  }

  const handleMovedOrResize = () => {
    let [bounds, fullscreen] = [mainWindow.getBounds(), mainWindow.isFullScreen()]
    store.set('windowBounds', { ...bounds, fullscreen })
  }

  const createWindow = () => {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      ...store.get('windowBounds'),
      useContentSize: true,
      webPreferences: {
        preload: join(__dirname, '..', 'sentry')
      }
      // --- TODO: do it in future !
      // --- TODO: app without frame with custom window
      // frame: false,
      // transparent: true
    })

    mainWindow.loadURL(process.env.APP_URL)

    mainWindow.on('moved', handleMovedOrResize)
    mainWindow.on('resize', handleMovedOrResize)

    mainWindow.on('close', e => {
      if (!app.isQuiting) {
        e.preventDefault()
        mainWindow.hide()
      }
      return false
    })

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    mainWindow.webContents.on('did-frame-finish-load', () => autoUpdater.init(mainWindow))

    mainTray = new Tray(mainIcons[process.platform])
    mainTray.setToolTip('Qilincord')
    mainTray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Qilincord',
          click: () => mainWindow.show()
        },
        {
          label: 'Quit',
          click () {
            app.isQuiting = true
            app.quit()
          }
        }
      ])
    )
  }

  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  ipcMain.on('change-channel', (_, value) => {
    store.set('channel', value)
    autoUpdater.updateChannel(value)
  })

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
}
